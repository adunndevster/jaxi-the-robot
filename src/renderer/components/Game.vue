<template>
<div class="game-screen">
  <div class="code-area">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a @click="setCodeMode('main')" class="nav-link" v-bind:class="{ active:(codeMode == 'main') }">Main</a>
            </li>
            <li class="nav-item">
                <a @click="setCodeMode('functions')" class="nav-link" v-bind:class="{ active:(codeMode == 'functions') }">My functions</a>
            </li>
            <li class="nav-item">
                <a @click="setCodeMode('api')" class="nav-link" v-bind:class="{ active:(codeMode == 'api') }">API</a>
            </li>
        </ul>
        
    <div id="mainCode" v-bind:class="{ hidden:(codeMode != 'main')}">
        <div>
        <editor id="editor"
            style="height: calc(100vh - 90px); width:100%; overflow: auto;" 
            @init="editorInit" 
            lang="javascript" 
            theme="monokai"
            value=""></editor>

        </div>
        <div class="action-buttons">
            <button v-on:click="runCode" value="Run Code" class="btn btn-dark float-right btn-run-code" :disabled="runCodeDisabled">Run Code</button>
            <router-link to="/level-select" class="btn btn-dark float-right">Level Select</router-link>
        </div>
    </div>

    <div id="funcs" v-bind:class="{ hidden:(codeMode != 'functions')}">
        <div>
            <editor id="functionsEditor"
                style="height: calc(100vh - 90px); width:100%; overflow: auto;" 
                lang="javascript" 
                theme="monokai"
                value=""></editor>

        </div>
    </div>
    
    <div id="api" v-bind:class="{ hidden:(codeMode != 'api')}">
        <api />
    </div>

  </div>
  <div class="game-area">
      <div id='gameCanvas'></div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import router from '../router'
import Phaser from 'phaser'
import Interpreter from 'js-interpreter';
import { clearInterval, setTimeout } from 'timers';
import API from './API/API'
import SpeechBubble from './Game/SpeechBubble'
import ToolTip from './Game/ToolTip'


var main = this;
var jaxi, chopperbot;
var jaxiInterpreter;
var codePause = false;
var levelComplete = false;
var levelNum = 1;
var vue;
var phaser;
var game;
var mainScope;

export default {
  name: 'level-select',
  components: {
    editor: require('vue2-ace-editor'),
    api: API,
    speechbubble: SpeechBubble
  },
  data() {
        return {
            code: '',
            functions: '',
            codeMode: 'main', //main, functions, api
            animationStep: 0,
            animationArray: [],
            runCodeDisabled: true,
            interactivesArray: [],
            gatorsArray: [],
            updateEvent: null,
            totalFlowers: 0
        }
    },
  mounted() {
    this.code = localStorage.getItem('code_' + levelNum);
    this.functions = localStorage.getItem('jaxiFunctions');
    var editor = ace.edit("editor");
    var functionsEditor = ace.edit("functionsEditor");
    editor.getSession().setValue(this.code);
    functionsEditor.getSession().setValue(this.functions);

    var langTools = require('brace/ext/language_tools') //language extension prerequsite...

    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
  },
  methods: {
    setCodeMode: function(mode)
    {
        this.codeMode = mode;
    },
    fadeOut: function() {
        this.$emit("fadeFunc", true);
    },
    editorInit: function () {
        // require('brace/mode/html')                
        require('brace/mode/javascript')    //language
        // require('brace/mode/less')
        require('brace/theme/monokai')
        
        vue = this; 
        
        this.runGame();

    },
    makeFLower: function(element, dirt, skipGrow)
    {
        var sprite = phaser.matter.add.sprite(element.x, element.y, "g_flower").setStatic(true);
        if(dirt) dirt.depth = 10000;
        if(!skipGrow)
        {
            sprite.y += sprite.height/2;
            sprite.scaleX = sprite.scaleY = 0;
            phaser.tweens.add({
                    targets: sprite,
                    scaleY: 1,
                    scaleX: 1,
                    y: (dirt) ? sprite.y - sprite.height : sprite.y - sprite.height/2,
                    ease: 'Quad.easeOut',
                    //delay:300,
                    duration: 300
                });
        }
        
        sprite.setSensor(true);
        sprite.isFlower = true;
        if(dirt) sprite.dirt = dirt;
        sprite.label = 'flower';
        var rando = Math.floor(Math.random()*9) + 1;
        sprite.vals = new Object();
        sprite.vals.id = "flower_" + vue.totalFlowers;
        sprite.vals.color = 'pink'
        if(element.color)
        {
            sprite.vals.color = element.color;
            
        } else {
            if(rando == 2 || rando == 5 || rando == 8) sprite.vals.color = 'yellow';
            if(rando % 3 == 0) sprite.vals.color = 'blue';
        }
        sprite.vals.petals = 6;
        if(element.petals){
            sprite.vals.petals = element.petals;
            var flowerFrame = 1;
            if(element.color == 'yellow') flowerFrame = 2;
            if(element.color == 'blue') flowerFrame = 3;
            if(element.petals == 8) flowerFrame += 3;
            if(element.petals == 12) flowerFrame += 6;
            sprite.anims.play('all_flower', false, flowerFrame-1);
            sprite.anims.pause();
        } else {
            if(rando > 3) sprite.vals.petals = 8;
            if(rando > 6) sprite.vals.petals = 12;
            sprite.anims.play('all_flower', false, rando-1);
            sprite.anims.pause();
        }
        
        vue.setupToolTip(sprite, 'id: ' + sprite.vals.id + '<br>color: ' + sprite.vals.color + '<br>petals: ' + sprite.vals.petals );
        vue.totalFlowers++;
        vue.interactivesArray.push(sprite);
    },
    scrambleFlowers: function()
    {
        var flowersArray = vue.interactivesArray.filter(obj => {
            return obj.isFlower;
        });
        let rando = Math.floor(Math.random()*3) + 1;

        if(rando == 1)
        {
            //do nothing
        } else {
            let offset = (rando === 2) ? 1 : -1;
            if(offset === 1)
            {
                let zeroX = flowersArray[0].x;
                let zeroY = flowersArray[0].y;
                for(var i = 0; i<flowersArray.length; i++)
                {
                    if(i === flowersArray.length-1)
                    {
                        flowersArray[i].x = zeroX;
                        flowersArray[i].y = zeroY;
                    } else {
                        flowersArray[i].x = flowersArray[i + offset].x;
                        flowersArray[i].y = flowersArray[i + offset].y;
                    }
                    
                }
            } else {
                let zeroX = flowersArray[flowersArray.length-1].x;
                let zeroY = flowersArray[flowersArray.length-1].y;
                for(var i = flowersArray.length-1; i>0; i--)
                {
                    if(i === 1)
                    {
                        flowersArray[i].x = zeroX;
                        flowersArray[i].y = zeroY;
                    } else {
                        flowersArray[i].x = flowersArray[i + offset].x;
                        flowersArray[i].y = flowersArray[i + offset].y;
                    }
                    
                }
            }
            
        }
    },
    runGame: function()
    {

levelNum = Number(this.$route.params.level);
var levelData = require('../assets/levels/level' + levelNum + '.js');


var gameArea = document.getElementsByClassName('game-area')[0];
// var gWidth = Math.floor(window.innerWidth * .7);
// var gHeight = window.innerHeight;
var devRatio = 2048 / 1806; //1244 / 1095 // 1.33
var wAdjust = Math.round(((gameArea.clientWidth / gameArea.clientHeight) - devRatio) * gameArea.clientWidth);

var config = {
    type: Phaser.AUTO,
    width: levelData.bounds.w + wAdjust,
    height: levelData.bounds.h,
    parent: 'gameCanvas',
    physics: {
        default: 'matter',
        matter: {
            //  gravity: {
            //      x: 0,
            //      y: 1
            //  },
             enableSleeping: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

game = new Phaser.Game(config);

function preload ()
{
    phaser = this;

    this.load.atlas("jaxi", require("../assets/toybox/JaxiSprites.png"), require("../assets/toybox/JaxiSprites.json"));
    this.load.image("g_bg_" + levelData.zone, require("../assets/toybox/g_bg_" + levelData.zone + ".png"));
    this.load.image("g_metalladder", require("../assets/toybox/g_metalladder.png"));
    this.load.image("g_ground_" + levelData.zone, require("../assets/toybox/g_ground_"  + levelData.zone + ".png"));
    this.load.image("g_ground_rounded_" + levelData.zone, require("../assets/toybox/g_ground_rounded_" + levelData.zone + ".png"));
    this.load.image("g_ground_rounded2_" + levelData.zone, require("../assets/toybox/g_ground_rounded2_" + levelData.zone + ".png"));
    this.load.image("g_earth_" + levelData.zone, require("../assets/toybox/g_earth_" + levelData.zone + ".png"));
    this.load.image("g_spikes", require("../assets/toybox/g_spikes.png"));
    this.load.image("g_dirt", require("../assets/toybox/g_dirt.png"));
    this.load.atlas("g_teleporter", require("../assets/toybox/TeleporterSprites.png"), require("../assets/toybox/TeleporterSprites.json"));
    this.load.image("g_teleporter", require("../assets/toybox/g_teleporter.png"));
    this.load.atlas("g_chopperbot", require("../assets/toybox/ChopperbotSprites.png"), require("../assets/toybox/ChopperbotSprites.json"));
    this.load.image("g_chopperbot", require("../assets/toybox/ChopperbotSprites.png"));
    this.load.atlas("g_tar", require("../assets/toybox/TarSprites.png"), require("../assets/toybox/TarSprites.json"));
    this.load.image("g_tar", require("../assets/toybox/TarSprites.png"));
    this.load.atlas("g_flower", require("../assets/toybox/FlowerSprites.png"), require("../assets/toybox/FlowerSprites.json"));
    this.load.image("g_flower", require("../assets/toybox/FlowerSprites.png"));
    this.load.atlas("g_gator", require("../assets/toybox/GatorSprites.png"), require("../assets/toybox/GatorSprites.json"));
    this.load.image("g_gator", require("../assets/toybox/GatorSprites.png"));

    //scenery
    var sceneryFiles = ['g_sc_bluebotbuilding.png', 'g_sc_junk_silhouette1.png', 'g_sc_rock1.png', 'g_sc_rocks.png', 'g_sc_trashclump1.png',
                        'g_sc_container.png', 'g_sc_rock2.png', 'g_sc_crane.png', 'g_sc_fence.png', 'g_rock_crystal.png'];
    sceneryFiles.forEach(file => {
        this.load.image(file.split('.')[0], require('../assets/toybox/scenery/' + file));
    });

}

function create ()
{
    //alert(JSON.stringify(levelData.level.elements[0].type));

    this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);

    this.anims.create({ key: 'idol', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:0, end:0, zeroPad:4}), repeat: -1 });
    this.anims.create({ key: 'run', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:1, end:10, zeroPad:4}), repeat: -1 });
    this.anims.create({ key: 'jump', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:11, end:20, zeroPad:4}), frameRate: 12, repeat: 0 });
    this.anims.create({ key: 'pickup', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:21, end:31, zeroPad:4}), repeat: 0 });
    this.anims.create({ key: 'wakeup', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:32, end:152, zeroPad:4}), repeat: 0 });
    this.anims.create({ key: 'teleport', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:153, end:248, zeroPad:4}), repeat: 0 });
    this.anims.create({ key: 'die', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:249, end:318, zeroPad:4}), repeat: 0 });
    this.anims.create({ key: 'dance', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:319, end:342, zeroPad:4}), repeat: 0 });
    this.anims.create({ key: 'climb', frames: this.anims.generateFrameNames('jaxi', {prefix:'mcPink_SpriteSheet', start:343, end:349, zeroPad:4}), repeat: -1 });

    //teleporter
    this.anims.create({ key: 'all', frames: this.anims.generateFrameNames('g_teleporter'), repeat: -1 });

    //chopperbot
    this.anims.create({ key: 'all_chopperbot', frames: this.anims.generateFrameNames('g_chopperbot'), repeat: -1 });

    //tar
    this.anims.create({ key: 'all_tar', frames: this.anims.generateFrameNames('g_tar'), repeat: -1 });

    //flower
    this.anims.create({ key: 'all_flower', frames: this.anims.generateFrameNames('g_flower'), repeat: 0 });

    //gator
    this.anims.create({ key: 'gator_idol', frames: this.anims.generateFrameNames('g_gator', {prefix:'Gator_SpriteSheet', start:0, end:0, zeroPad:4}), repeat: 0 });
    this.anims.create({ key: 'gator_laugh', frames: this.anims.generateFrameNames('g_gator', {prefix:'Gator_SpriteSheet', start:2, end:20, zeroPad:4}), repeat: 0 });
    this.anims.create({ key: 'gator_turn', frames: this.anims.generateFrameNames('g_gator', {prefix:'Gator_SpriteSheet', start:32, end:44, zeroPad:4}), repeat: 0 });


    levelData.level.elements.forEach(element => {
        //console.log(element.type);
        if(element.type.indexOf('g_bg') != -1)
        {
            var bg = this.matter.add.sprite(0, 0, element.type).setStatic(true).setOrigin(0, 0);
            bg.setCollidesWith([]);
            bg.displayWidth = game.config.width;
            bg.displayHeight = game.config.height;
        } 
        else if(element.type.indexOf('jaxi') != -1)
        {
            var shapes = {
                    "jaxiShape": [
                        [ {"x":0,"y":0}, {"x":89,"y":0}, {"x":89,"y":228}, {"x":0,"y":228}]
                    ]
                };

            jaxi = this.matter.add.sprite(element.x, element.y, element.type, null, 
            {inertia: Infinity,
            shape: { type: 'fromVerts', verts: shapes.jaxiShape }})
            .setOrigin(.5, .5);

            //jaxi.setTint(0x22eeff);

            jaxi.setBounce(.1);
            jaxi.setFriction(.5);

            jaxi.setSleepThreshold(10);
            jaxi.setSleepEvents(true, true);

            jaxi.bag = [];

        } 
        else if(element.type.indexOf('g_teleporter') != -1)
        {
            var sprite = this.matter.add.sprite(element.x, element.y, element.type).setStatic(true);
            sprite.anims.play('all');
            sprite.setSensor(true);
            sprite.isTeleporter = true;
            vue.setupToolTip(sprite, 'teleporter');
            vue.interactivesArray.push(sprite);
        }
        else if(element.type.indexOf('g_tar') != -1)
        {
            var sprite = this.matter.add.sprite(element.x, element.y, element.type).setStatic(true);
            sprite.anims.play('all_tar');
            sprite.setSensor(true);
            sprite.isTar = true;
            sprite.label = 'tar';
            vue.setupToolTip(sprite, sprite.label);
            vue.interactivesArray.push(sprite);
        }
        else if(element.type.indexOf('g_dirt') != -1)
        {
            var sprite = this.matter.add.sprite(element.x, element.y, element.type).setStatic(true);
            sprite.setSensor(true);
            sprite.isDirt = true;
            sprite.label = "dirt";
            sprite.elementObj = element;
            sprite.growFlower = function(dirt){
                window.setTimeout(function(){
                                    vue.makeFLower(dirt.elementObj, dirt)
                                  }, 1000);
            }
            vue.makeFLower(element, sprite);
            vue.setupToolTip(sprite, sprite.label);
        }
        else if(element.type.indexOf('g_flower') != -1)
        {
            vue.makeFLower(element, null, true);
        }
        else if(element.type.indexOf('g_gator') != -1)
        {
            var sprite = this.matter.add.sprite(element.x, element.y, element.type).setStatic(true);
            sprite.setSensor(true);
            sprite.isGator = true;
            sprite.label = 'gatorbot';
            sprite.anims.play('gator_idol');
            if(element.id != "") (eval("vue." + element.id + " = sprite"));
            sprite.appeasement = element.appeasement; //"words"||"flowers"
            sprite.appeasementValue = element.appeasementValue;
            vue.setupToolTip(sprite, sprite.label);
            vue.interactivesArray.push(sprite);
            vue.gatorsArray.push(sprite);
        }
        else if(element.type.indexOf('g_chopperbot') != -1)
        {
            chopperbot = this.matter.add.sprite(element.x, element.y, element.type).setStatic(true);
            chopperbot.anims.play('all_chopperbot');
            chopperbot.setSensor(true);
        }
        else if(element.type.indexOf('g_spikes') != -1)
        {
            var sprite = this.matter.add.sprite(element.x, element.y, element.type).setStatic(true);
            sprite.setSensor(true);
            sprite.isSpikes = true;
            vue.setupToolTip(sprite, 'spikes');
            vue.interactivesArray.push(sprite);
        }
        else {
            var sprite = this.add.tileSprite(element.x, element.y, element.width, element.height, element.type);
            this.matter.add.gameObject(sprite).setStatic(true);

            if(element.scenery) sprite.setCollidesWith([]);
            if(element.tooltip)
            {
                vue.setupToolTip(sprite, element.tooltip);
                vue.interactivesArray.push(sprite);
                
            } 
            if(element.sensor) sprite.setSensor(true);
            sprite.type = element.type;

            if(element.type == 'g_metalladder')
            {
                sprite.originY = 0;
            }
        }
    });

    //scramble flowers
    vue.scrambleFlowers();

    this.matter.world.on('sleepstart', function (event) {
        
        if(!jaxiInterpreter && (vue.animationStep <= vue.animationArray.length))
        {
            jaxi.anims.play('idol');
        }
        
        if(jaxiInterpreter && !levelComplete)
        {
            idolJaxi();
        }
 
    });

    //collision logic
    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

        if((bodyA.gameObject === jaxi || bodyB.gameObject === jaxi))
        {
            console.log(bodyA, bodyB)
            //teleporter
            if(((bodyA.gameObject != null && bodyA.gameObject.isTeleporter) || 
            (bodyB.gameObject != null && bodyB.gameObject.isTeleporter)))
            {
                finishLevel();
            }

            //spikes
            if(((bodyA.gameObject != null && bodyA.gameObject.isSpikes) || 
            (bodyB != null && bodyB.isSpikes)))
            {
                restartLevel();
            }

            //tar
            if(((bodyA.gameObject != null && bodyA.gameObject.isTar) || 
            (bodyB.gameObject != null && bodyB.gameObject.isTar)))
            {
                jaxi.tar = (bodyA.gameObject != null && bodyA.gameObject.isTar) ? bodyA.gameObject : bodyB.gameObject;
                jaxi.stickCount = Math.floor(Math.random()*4) + 2;
                (jaxi.body.velocity.x > 0) ? jaxi.setVelocity(23,0) : jaxi.setVelocity(-23,0);
                
            }

            //gators
            if(((bodyA.gameObject != null && bodyA.gameObject.isGator) || 
            (bodyB != null && bodyB.isGator)))
            {
                var gator = (bodyA.gameObject.isGator) ? bodyA.gameObject : bodyB;
                if(gator.isAppeased != true)
                {
                    gator.anims.delayedPlay(1100, 'gator_laugh');
                    restartLevel();
                }
                
            }
        }

    });
    
    // waiting for user input
        this.input.on("pointerdown", function(pointer){
 
            // getting Matter bodies under the pointer
            var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);
 
            // if there isn't any body under the pointer...
            //if(bodiesUnderPointer.length == 0){
 
                // create a crate
                var sprite = this.matter.add.sprite(pointer.x, pointer.y, "teleporter");
            //}
 
            // this is where I wanted to remove the crate. Unfortunately I did not find a quick way to delete the Sprite
            // bound to a Matter body, so I am setting it to invisible, then remove the body.
            //else{
                //bodiesUnderPointer[0].gameObject.visible = false;
                //this.matter.world.remove(bodiesUnderPointer[0])
            //}
        }, this);


        vue.chopperbot = chopperbot;
        vue.chopperbot_flyAway = chopperbot_flyAway;
        vue.jaxi = jaxi;
        var animationGetter = require('../assets/levels/levelAnimation' + levelNum + '.js').AnimationGetter;
        vue.animationArray = animationGetter.get(vue);
        if(vue.animationArray.length == 0) vue.runCodeDisabled = false;
        vue.runLevelAnimation();

        vue.updateEvent = this.time.addEvent({ delay: 500, callback: onUpdateEvent, callbackScope: this, loop: true });

}

function update ()
{

}

function onUpdateEvent()
{
    //rotate gators to face Jaxi
    vue.gatorsArray.forEach(gator => {
        var flip = gator.x > jaxi.x;
        gator_flip(gator, flip);
    })
}


    },
    runCode: function()
    {
        this.runCodeDisabled = true;
        var editor = ace.edit("editor");
        var functionsEditor = ace.edit("functionsEditor");
        this.code = editor.getSession().getValue();
        this.functions = functionsEditor.getSession().getValue();
        var wrapperCode = 'Array.prototype.copyWithin||(Array.prototype.copyWithin=function(r,t){if(null==this)throw new TypeError("this is null or not defined");var e=Object(this),n=e.length>>>0,o=r>>0,i=o<0?Math.max(n+o,0):Math.min(o,n),a=t>>0,f=a<0?Math.max(n+a,0):Math.min(a,n),l=arguments[2],y=void 0===l?n:l>>0,p=y<0?Math.max(n+y,0):Math.min(y,n),u=Math.min(p-f,n-i),h=1;for(f<i&&i<f+u&&(h=-1,f+=u-1,i+=u-1);0<u;)f in e?e[i]=e[f]:delete e[i],f+=h,i+=h,u--;return e}),Array.prototype.every||(Array.prototype.every=function(r,t){"use strict";var e,n;if(null==this)throw new TypeError("this is null or not defined");var o=Object(this),i=o.length>>>0;if("function"!=typeof r)throw new TypeError;for(1<arguments.length&&(e=t),n=0;n<i;){var a;if(n in o)if(a=o[n],!r.call(e,a,n,o))return!1;n++}return!0}),Array.prototype.fill||Object.defineProperty(Array.prototype,"fill",{value:function(r){if(null==this)throw new TypeError("this is null or not defined");for(var t=Object(this),e=t.length>>>0,n=arguments[1]>>0,o=n<0?Math.max(e+n,0):Math.min(n,e),i=arguments[2],a=void 0===i?e:i>>0,f=a<0?Math.max(e+a,0):Math.min(a,e);o<f;)t[o]=r,o++;return t}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(r){if(null==this)throw new TypeError(\'"this" is null or not defined\');var t=Object(this),e=t.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],o=0;o<e;){var i=t[o];if(r.call(n,i,o,t))return i;o++}},configurable:!0,writable:!0}),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(r){if(null==this)throw new TypeError("\'this\' is null or not defined");var t=Object(this),e=t.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],o=0;o<e;){var i=t[o];if(r.call(n,i,o,t))return o;o++}return-1},configurable:!0,writable:!0}),Array.prototype.forEach||(Array.prototype.forEach=function(r){var t,e;if(null==this)throw new TypeError("this is null or not defined");var n=Object(this),o=n.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(1<arguments.length&&(t=arguments[1]),e=0;e<o;){var i;e in n&&(i=n[e],r.call(t,i,e,n)),e++}}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(r,t){if(null==this)throw new TypeError("\'this\' is null or not defined");var e=Object(this),n=e.length>>>0;if(0===n)return!1;var o,i,a=0|t,f=Math.max(0<=a?a:n-Math.abs(a),0);for(;f<n;){if((o=e[f])===(i=r)||"number"==typeof o&&"number"==typeof i&&isNaN(o)&&isNaN(i))return!0;f++}return!1}}),Array.prototype.map||(Array.prototype.map=function(r){var t,e,n;if(null==this)throw new TypeError("this is null or not defined");var o=Object(this),i=o.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(1<arguments.length&&(t=arguments[1]),e=new Array(i),n=0;n<i;){var a,f;n in o&&(a=o[n],f=r.call(t,a,n,o),e[n]=f),n++}return e}),Array.prototype.reduce||Object.defineProperty(Array.prototype,"reduce",{value:function(r){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof r)throw new TypeError(r+" is not a function");var t,e=Object(this),n=e.length>>>0,o=0;if(2<=arguments.length)t=arguments[1];else{for(;o<n&&!(o in e);)o++;if(n<=o)throw new TypeError("Reduce of empty array with no initial value");t=e[o++]}for(;o<n;)o in e&&(t=r(t,e[o],o,e)),o++;return t}}),"function"!=typeof Array.prototype.reduceRight&&(Array.prototype.reduceRight=function(r){"use strict";if(null==this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof r)throw new TypeError(r+" is not a function");var t,e=Object(this),n=(e.length>>>0)-1;if(2<=arguments.length)t=arguments[1];else{for(;0<=n&&!(n in e);)n--;if(n<0)throw new TypeError("Reduce of empty array with no initial value");t=e[n--]}for(;0<=n;n--)n in e&&(t=r(t,e[n],n,e));return t});';
        wrapperCode += "function inspect(){return JSON.parse(inspectWrapper())}function pickUp(){return JSON.parse(pickUpWrapper())}function putDown(items){strItems = JSON.stringify(items);putDownWrapper(strItems)}function isTouching(item){return JSON.parse(isTouchingWrapper(item))}function isNear(item){return JSON.parse(isNearWrapper(item))}";
        var execCode = wrapperCode + this.functions + this.code;

        var initFunc = function(interpreter, scope) {

            mainScope = scope;
             interpreter.setProperty(scope, 'dance',
                 interpreter.createNativeFunction(dance));

            interpreter.setProperty(scope, 'inspectWrapper',
                 interpreter.createNativeFunction(inspectWrapper));

            interpreter.setProperty(scope, 'pickUpWrapper',
                 interpreter.createNativeFunction(pickUpWrapper));
                 
            interpreter.setProperty(scope, 'putDownWrapper',
                 interpreter.createNativeFunction(putDownWrapper));

            interpreter.setProperty(scope, 'jump',
                 interpreter.createNativeFunction(jump));

            interpreter.setProperty(scope, 'run',
                 interpreter.createNativeFunction(run));

            interpreter.setProperty(scope, 'climb',
                 interpreter.createNativeFunction(climb));

            interpreter.setProperty(scope, 'isTouchingWrapper',
                 interpreter.createNativeFunction(isTouchingWrapper));

            interpreter.setProperty(scope, 'isNearWrapper',
                 interpreter.createNativeFunction(isNearWrapper));

            interpreter.setProperty(scope, 'say',
                 interpreter.createNativeFunction(say));

            interpreter.setProperty(scope, 'lert',
                 interpreter.createNativeFunction(lert));

        };

        jaxiInterpreter = new Interpreter(execCode, initFunc);
        
        nextStep();
        console.log(jaxiInterpreter);
        
    },
    setupToolTip(sprite, toolTipText)
    {
        sprite.setInteractive();
        sprite.on('pointerover', function () {
            sprite.toolTip = vue.showToolTip([{character:sprite, text:toolTipText}]);
        });
        sprite.on('pointerout', function () {
            sprite.toolTip.destroy();
        });
    },
    runLevelAnimation: function()
    {   
        if(vue.animationArray != []) this.nextAnimationStep();
    },
    nextAnimationStep: function()
    {
        if(vue.animationStep < vue.animationArray.length)
        {
            var animProps = vue.animationArray[vue.animationStep];
            animProps.func(animProps.params);
            vue.animationStep++;
            this.runCodeDisabled = vue.animationStep < vue.animationArray.length;
        }
    },
    say: function(dialogueArray)
    {
        //dialagueArray example:
        // [{character:jaxi, text:"This is what a whole munch of text looks like. It's going to affect a bunch when it comes to styling this sucker."},
        // {character:chopperbot, text:"Pretty neat, huh?"},
        // {character:jaxi, text:"I think so."}]

        var bubble = new (Vue.extend(SpeechBubble))(
            {
                created() {
                    var EVENTS
                    if(vue.animationStep < vue.animationArray.length)
                    {
                        EVENTS = [
                            {name: 'nextAnim', callback: () => vue.nextAnimationStep()}
                        ]
                    } else {
                        EVENTS = [
                            {name: 'nextAnim', callback: () => nextStep()}
                        ]
                    }
                    

                    for (let e of EVENTS) {
                        this.$on(e.name, e.callback); // Add event listeners
                    }
                }

                
            }
        );
        bubble.$mount();
        vue.$el.appendChild(bubble.$el);
        bubble.startDialogue(dialogueArray, game);
    },
    showToolTip: function(toolTipArray)
    {
        var toolTip = new (Vue.extend(ToolTip))();
        toolTip.$mount();
        vue.$el.appendChild(toolTip.$el);
        toolTip.showToolTip(toolTipArray, game);
        return toolTip;
    }
    

  }
}

//jaxi///////////////////
function dance()
{
    codePause = true;
    jaxi.anims.play('dance');
    window.setTimeout(idolJaxi, 1000);
}

function inspectWrapper()
{
    var result;

    var jaxiRect = jaxi.getBounds();
    var flowersArray = vue.interactivesArray.filter(obj => {
        return obj.isFlower;
    });
    flowersArray.some(flower => {
        
        var rect = flower.getBounds();
        rect.height = flower.height;

        //  var graphics = phaser.add.graphics({ fillStyle: { color: 0x0000ff } });
        //  graphics.fillRectShape(rect);

        //  graphics = phaser.add.graphics({ fillStyle: { color: 0xff0000 } });
        //  graphics.fillRectShape(jaxiRect);

        var iRect = Phaser.Geom.Intersects.GetRectangleIntersection(jaxiRect, rect);
        if(iRect.x > 0 && 
        iRect.y > 0)
        {
            
            result = flower.vals;            
        }
        
    });

    return JSON.stringify(result);
}

function pickUpWrapper()
{
    var pickUpReturnVal;
    codePause = true;
    jaxi.anims.play('pickup');
    window.setTimeout(idolJaxi, 600);

    var jaxiRect = jaxi.getBounds();
    var flowersArray = vue.interactivesArray.filter(obj => {
        return obj.isFlower;
    });
    flowersArray.some(flower => {
        if(!pickUpReturnVal)
        {
            var rect = flower.getBounds();
            rect.height = flower.height;

            //  var graphics = phaser.add.graphics({ fillStyle: { color: 0x0000ff } });
            //  graphics.fillRectShape(rect);

            //  graphics = phaser.add.graphics({ fillStyle: { color: 0xff0000 } });
            //  graphics.fillRectShape(jaxiRect);

            var iRect = Phaser.Geom.Intersects.GetRectangleIntersection(jaxiRect, rect);
            if(iRect.x > 0 && 
            iRect.y > 0)
            {
                jaxi.setFlipX(jaxiRect.x + 20 > iRect.x);

                phaser.tweens.add({
                    targets: flower,
                    scaleY: 0,
                    scaleX: 0,
                    x: jaxi.x + (jaxi.flipX ? -60 : 60),
                    y: jaxi.y,
                    ease: 'Quad.easeOut',
                    delay:300,
                    duration: 200,
                    onComplete: function() {
                        flower.x = -9999;
                    }
                });
                if(flower.dirt) flower.dirt.growFlower(flower.dirt);
                
                pickUpReturnVal = flower.vals;

                jaxi.bag.push(flower);
                
            }
        }
    });


    // jaxiInterpreter.setProperty(mainScope, 'newVal',
    //             pickUpReturnVal);
    return JSON.stringify(pickUpReturnVal);
}
function putDownWrapper(items)
{
    codePause = true;
    jaxi.anims.play('pickup');
    window.setTimeout(function(){
        idolJaxi();
        doAppeasementChecks();
    }, 600);
    if(String(items) == "undefined")
    {
        if(jaxi.bag.length > 0 &&
           jaxi.bag[0].vals != undefined && 
           jaxi.bag[0].vals.id != undefined) 
        {
            jaxi.bag.forEach(item =>
            {
                putDownItem(item.vals.id);
            });
            return;
        }
    } 

    items = JSON.parse(items);

    if(items.constructor === Array)
    {
        items.forEach(item =>
        {
            putDownItem(item);
        });
        return;
    }

    var item = items;

    putDownItem(item);

}
function putDownItem(item)
{
    var thing = jaxi.bag.filter(thing => {if(thing.vals != undefined && thing.vals.id != undefined) return thing.vals.id == item})[0];
    if(!thing) 
    {
        thing = jaxi.bag.filter(thing => {
                if(thing.vals != undefined && thing.vals.id != undefined) {
                    return thing.vals.id == item.id
                } 
            })[0];
    }
    thing.x = jaxi.x + (jaxi.flipX ? -60 : 60)
    thing.y = jaxi.y;
    phaser.tweens.add({
        targets: thing,
        scaleY: 1,
        scaleX: 1,
        x: thing.x + Math.floor(Math.random()*80) - 40,
        y: jaxi.y + 50,
        ease: 'Quad.easeOut',
        delay:300,
        duration: 200
    });
    jaxi.bag = jaxi.bag.filter( el => el !== thing );
}
function doAppeasementChecks(appeasementValue)
{
    //gators
    var response = null;
    var flowersArray = vue.interactivesArray.filter(obj => {
        return obj.isFlower;
    });
    vue.gatorsArray.forEach(gator => {
        var isGatorHappy = false;
        if(!gator.isAppeased && gator.appeasement == "flowers")
        {
            var gatorRect = new Phaser.Geom.Rectangle(gator.getBounds().x - 200, 
                                                      gator.getBounds().y, 
                                                      gator.getBounds().width + 400, 
                                                      gator.getBounds().height);
            var flowerCount = 0;
            var appeasementObj = JSON.parse(gator.appeasementValue);
            console.log('flower check...');
            flowersArray.forEach(flower => {
                
                var flowerRect = flower.getBounds();
                var iRect;
                
                 if((appeasementObj.petals && flower.vals.petals == appeasementObj.petals) ||
                    (appeasementObj.color && flower.vals.color == appeasementObj.color) ||
                    (appeasementObj.count))
                 {
                     console.log('making iRect...');
                    iRect = Phaser.Geom.Intersects.GetRectangleIntersection(gatorRect, flowerRect);

                    //  var graphics = phaser.add.graphics({ fillStyle: { color: 0x0000ff } });
                    //  graphics.fillRectShape(gatorRect);

                    //  graphics = phaser.add.graphics({ fillStyle: { color: 0xff0000 } });
                    //  graphics.fillRectShape(flowerRect);
                 } 
                if(iRect && iRect.x > 0 && iRect.y > 0)
                {
                    flowerCount++;
                }
            });
            console.log(flowerCount);
            if(flowerCount == appeasementObj.needed)
            {
                isGatorHappy = true;
            }
            
        } else if(gator.appeasement == "words" && gator.appeasementValue == appeasementValue)
        {
            isGatorHappy = true;
        }
        if(isGatorHappy)
        {
            gator.anims.play("gator_turn");
            gator.isAppeased = true;
            response = {character:gator, text:"I am pleased! You may pass."};
            return response;
        }
    });
    

    return response;
}

function jump(speed)
{

    if(jaxi.stickCount != null && jaxi.stickCount > 0)
    {
        animateBeingStuck();
        return;
    }

    var isNeg = speed < 0;
    if(speed > 5) speed = 5;
    if(speed < -5) speed = -5;

    if(speed == null || speed == 0)
    {
        speed = 10; 
    } else {
        speed = 10 + (10 * ((Math.abs(speed)-1)/Math.abs(speed)));
    }
    if(isNeg) speed = -speed;
    codePause = true;
    jaxi.body.isSleeping = false;
    jaxi.anims.play('jump');
    jaxi.setVelocity(speed/2, -Math.abs(speed));

    jaxi.setFlipX(speed <= 0);
}

function run(speed)
{
    if(jaxi.stickCount != null && jaxi.stickCount > 0)
    {
        animateBeingStuck();
        return;
    }

    if(speed > 5) speed = 5;
    if(speed < -5) speed = -5;

    if(speed == null)
    {
        speed = 30;
    } else {
        speed = (speed > 0) ? 30 + ((speed-1) * 12) : -30 - ((speed+1) * -12);
    }
    codePause = true;
    jaxi.body.isSleeping = false;
    jaxi.anims.play('run');
    jaxi.setVelocity(speed, 0);

    jaxi.setFlipX(speed <= 0);
}
function animateBeingStuck()
{
    
    jaxi.setVelocity(30,0);
    jaxi.thrustBack(.001)
    jaxi.anims.play('run');
    codePause = true;
    phaser.tweens.add({
        targets: jaxi,
        x: jaxi.tar.x,
        ease: 'Bounce.easeInOut',
        duration: 800,
        //onUpdate: function() { jaxi.setPosition(pos.x, jaxi.y); },
        onComplete: function() {
            jaxi.stickCount--;
            nextStep();

            if(jaxi.stickCount == 0)
            {
                phaser.tweens.add({
                    targets: jaxi.tar,
                    scaleY: 0,
                    y: (jaxi.tar.height/2) + jaxi.tar.y,
                    ease: 'Quad.easeOut',
                    duration: 500,
                    onComplete: function(tween, target, sprite) {
                        console.log(target);
                        vue.interactivesArray = vue.interactivesArray.filter( el => el !== target ); 
                        target.x = -10000;
                    }
                });
            }
        }
    });
}
function climb()
{
    var jaxiRect = jaxi.getBounds();
    vue.interactivesArray.forEach(obj => {
        var rect = obj.getBounds();
        rect.height = obj.height;


        //debugging.
        // var graphics = phaser.add.graphics({ fillStyle: { color: 0x0000ff } });
        // graphics.fillRectShape(rect);

        var iRect = Phaser.Geom.Intersects.GetRectangleIntersection(jaxiRect, rect);
        if(iRect.x > 0 && 
           iRect.y > 0 &&
           obj.type == 'g_metalladder')
        {
            jaxi.stickCount = 0;
            var isUp = rect.y < jaxiRect.y;
            codePause = true;
            jaxi.anims.play('climb');
            jaxi.x = obj.x - obj.width/2;
            jaxi.setFlipX(false);
            phaser.tweens.add({
                targets: jaxi,
                y: jaxi.y + (obj.height * (isUp ? -1 : 1)),
                ease: 'None',
                duration: obj.height * 3,
                //onUpdate: function() { jaxi.setPosition(pos.x, jaxi.y); },
                onComplete: function() {
                    codePause = false;
                    jaxi.thrustBack(.001);
                    jaxi.anims.play('idol');
                }
            });
            return;
        }
    });
}
function isTouchingWrapper(item)
{
    let isTouching = "false";
    var jaxiRect = jaxi.getBounds();
    vue.interactivesArray.forEach(obj => {
        var rect = obj.getBounds();
        rect.height = obj.height;


        //debugging.
        //  var graphics = phaser.add.graphics({ fillStyle: { color: 0x0000ff } });
        //  graphics.fillRectShape(rect);
        //  graphics.fillRectShape(jaxiRect);

        var iRect = Phaser.Geom.Intersects.GetRectangleIntersection(jaxiRect, rect);
        if(iRect.x > 0 && 
           iRect.y > 0 &&
           obj.label == item)
        {
            isTouching = JSON.stringify(true);
        }

    });

    return isTouching;
    
}
function isNearWrapper(item)
{
    let isNear = "false";
    var jaxiRect = new Phaser.Geom.Rectangle(jaxi.getBounds().x - 150, 
                                                      jaxi.getBounds().y, 
                                                      jaxi.getBounds().width + 300, 
                                                      jaxi.getBounds().height);

    vue.interactivesArray.forEach(obj => {
        var rect = obj.getBounds();
        rect.height = obj.height;


        //debugging.
         //var graphics = phaser.add.graphics({ fillStyle: { color: 0x0000ff } });
         //graphics.fillRectShape(rect);

        //  var graphics = phaser.add.graphics({ fillStyle: { color: 0xff0000 } });
        //  graphics.fillRectShape(jaxiRect);
        //  console.log(jaxiRect);

        var iRect = Phaser.Geom.Intersects.GetRectangleIntersection(jaxiRect, rect);
        if(iRect.x > 0 && 
           iRect.y > 0 &&
           obj.label == item)
        {
            isNear = JSON.stringify(true);
        }

    });

    return isNear;
    
}
function say(text)
{
    codePause = true;
    
    var response = doAppeasementChecks(text);
    // var gatorsArray = vue.interactivesArray.filter(obj => {
    //     return obj.isGator;
    // });
    // gatorsArray.forEach(gator => {
    //     if(gator.appeasement == "words" && gator.appeasementValue == text)
    //     {
    //         gator.anims.play("gator_turn");
    //         gator.isAppeased = true;
    //         response = {character:gator, text:"I am pleased! You may pass."};
    //     }
    // });
    
     var sayArray = [{character:jaxi, text:text}];
    if(response != null) sayArray.push(response);
    vue.say(sayArray);

}
function lert(val)
{
    alert(val);
}
/////////////////////////



//chopperbot//////////////
function chopperbot_flyAway()
{
    chopperbot.body.isSleeping = true;
    phaser.tweens.add({
                targets: chopperbot,
                y: -800,
                ease: 'Quad.easeIn',
                duration: 2200,
                //onUpdate: function() { },
                onComplete: function() { 
                    chopperbot.destroy();
                    vue.nextAnimationStep();
                }
            });

    
}
/////////////////////////   


//gator//////////////
function gator_flip(gator, flip)
{
    if(!gator.isAppeased && gator.flipX != flip)
    {
        gator.anims.play('gator_turn');
        window.setTimeout(function(){
            gator.anims.play('gator_idol');
            gator.setFlipX(flip);
        }, 400);
    }
}
/////////////////////

//experiments in better running
// function run(speed)
// {
//     var sign = (speed < 0) ? -1 : 1;
//     if(speed > 5) speed = 5;
//     if(speed < -5) speed = -5;

//     // if(speed == null || speed == 0)
//     // {
//     //     speed = 30;
//     // } else {
//     //     speed = (speed > 0) ? 30 + ((speed-1) * 12) : -30 - ((speed+1) * -12);
//     // }
//     //speed *= 200;
//     codePause = true;
//     jaxi.body.isSleeping = false;
//     jaxi.anims.play('run');
//     jaxi.setVelocity(30 * sign, 0);

//     var count = 0;
//     var interval = window.setInterval(function(){
//         if(count < Math.abs(speed) - 1) {
//             jaxi.setVelocity(30 * sign, 0);
//             count++;
//             console.log('run');
//         } else {
//             console.log('done');
//             window.clearInterval(interval);
//         }
//     }, 300);

//     // var pos = {x: jaxi.x};
//     // phaser.tweens.add({
//     //             targets: pos,
//     //             x: jaxi.x + speed,
//     //             ease: 'Quad.easeInOut',
//     //             duration: 300,
//     //             //onUpdate: function() { jaxi.setPosition(pos.x, jaxi.y); },
//     //             onComplete: function() { jaxi.setVelocity(10) }
//     //         });


//     jaxi.setFlipX(speed <= 0);
// }

function idolJaxi()
{
    jaxi.anims.play('idol');
    nextStep();
    vue.nextAnimationStep();
}

function finishLevel()
{
    jaxi.setBounce(0);
    jaxi.setFriction(1000);
    jaxi.setVelocity(0, 0);
    saveState();
    levelComplete = codePause = true;
    jaxi.anims.play('teleport');
    window.setTimeout(function(){
        vue.fadeOut();
        window.setTimeout(function (){
            router.push({ name: 'Game', params: { level: (levelNum + 1)}})
            location.reload(); //TODO: find a way to clear the memory space, and smoothly transition between pages... Why? So we can stick to the SPA vue paradigm.
        }, 650);
        
    }, 2000);   
}

function restartLevel()
{
    jaxi.setBounce(0);
    jaxi.setFriction(1000);
    jaxi.setVelocity(0, 0);
    saveState();
    levelComplete = codePause = true;
    jaxi.anims.play('die');
    window.setTimeout(function(){
        vue.fadeOut();
        window.setTimeout(function (){
            router.push({ name: 'Game', params: { level: (levelNum)}})
            location.reload(); //TODO: find a way to clear the memory space, and smoothly transition between pages... Why? So we can stick to the SPA vue paradigm.
        }, 650);
        
    }, 2000);   
}

function saveState()
{
    localStorage.setItem('code_' + levelNum, vue.code);
    localStorage.setItem('jaxiFunctions', vue.functions);
}

var range;
function nextStep() {
    codePause = false;
    do{
        try{
            var hasMoreCode = jaxiInterpreter.step();
            if (jaxiInterpreter.stateStack.length) {
                var node = jaxiInterpreter.stateStack[jaxiInterpreter.stateStack.length - 1].node;
                var start = node.start;
                var end = node.end;
            } else {
                var start = 0;
                var end = 0;
            }
            var activeCode = vue.code.substring(start, end);

            var editor = ace.edit("editor");
            editor.focus();
            if(range != null) range.start.row = (range.start.row > 1) ? range.start.row - 2 : range.start.row;
            range = editor.find(activeCode, {start:range}, true);
            //editor.addSelectionMarker(range);
            //createSelection(start, end);

            // var activeCode = vue.code.substring(start, end);
            // console.clear();
            // console.log(activeCode);

        } catch(error)
        {
            console.log(error);
        } finally
        {
            if(!hasMoreCode)
            {
                //level not solved
                restartLevel();
            }
        }
    } while(hasMoreCode && !codePause);
}

function createSelection(start, end) {

    var field = document.getElementsByClassName('ace_text-input')[0];
    if (field.createTextRange) {
    var selRange = field.createTextRange();
    selRange.collapse(true);
    selRange.moveStart('character', start);
    selRange.moveEnd('character', end);
    selRange.select();
    } else if (field.setSelectionRange) {
    field.setSelectionRange(start, end);
    } else if (field.selectionStart) {
    field.selectionStart = start;
    field.selectionEnd = end;
    }
    field.focus();
}

    

</script>

<style>
  
@font-face {
  font-family: Righteous;
  src: url('~@/assets/fonts/Righteous-Regular.ttf');
}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { 
    font-family: 'Source Sans Pro', sans-serif;
   }

.game-screen
{
    white-space: nowrap;
    overflow: hidden;
}

  .code-area
{
    background-color: #000000;
    height: 100vh;
    width:29vw;
    float: left;
}
.nav-tabs .nav-link
{
    color:white !important;
    cursor: pointer;
}
.nav-tabs .nav-link.active
{
    color:black !important;
}
.action-buttons
{
    padding: 0px;
}
.btn{
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
}
.btn-dark{
    background-color: #343a40;
}
.btn-dark:hover{
    background-color: #454a51;
}

.btn-run-code
{
    background-color: #596F14;
}
.btn-run-code:disabled:hover
{
    background-color: #343a40;
}
.btn-run-code:hover
{
    background-color: #B2D251;
}

.game-area
{
    background-color: black;
    height: 100vh;
    width:71vw;
    float: left;
}

canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hidden
{
    display: none;
}

#api{
    width: 100%;
    height: 100%;
    white-space: normal;
    overflow: auto;
    background-color: white;
}

</style>
