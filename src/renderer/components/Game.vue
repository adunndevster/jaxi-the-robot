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
            interactivesArray: []
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
    this.load.atlas("g_teleporter", require("../assets/toybox/TeleporterSprites.png"), require("../assets/toybox/TeleporterSprites.json"));
    this.load.image("g_teleporter", require("../assets/toybox/g_teleporter.png"));
    this.load.atlas("g_chopperbot", require("../assets/toybox/ChopperbotSprites.png"), require("../assets/toybox/ChopperbotSprites.json"));
    this.load.image("g_chopperbot", require("../assets/toybox/ChopperbotSprites.png"));
    this.load.atlas("g_tar", require("../assets/toybox/TarSprites.png"), require("../assets/toybox/TarSprites.json"));
    this.load.image("g_tar", require("../assets/toybox/TarSprites.png"));

    //scenery
    var sceneryFiles = ['g_sc_bluebotbuilding.png', 'g_sc_junk_silhouette1.png', 'g_sc_rock1.png', 'g_sc_rocks.png', 'g_sc_trashclump1.png',
                        'g_sc_container.png', 'g_sc_rock2.png', 'g_sc_crane.png', 'g_sc_fence.png'];
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

            jaxi.setBounce(.1);
            jaxi.setFriction(.5);

            jaxi.setSleepThreshold(10);
            jaxi.setSleepEvents(true, true);

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

    if(vue.animationArray.length == 0) vue.runCodeDisabled = false;

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
            //teleporter
            if(((bodyA.gameObject != null && bodyA.gameObject.isTeleporter) || 
            (bodyB != null && bodyB.isTeleporter)))
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
            (bodyB != null && bodyB.isTar)))
            {
                console.log(jaxi);
                jaxi.tar = (bodyA.gameObject != null && bodyA.gameObject.isTar) ? bodyA.gameObject : bodyB;
                jaxi.stickCount = Math.floor(Math.random()*5) + 1;
                (jaxi.body.velocity.x > 0) ? jaxi.setVelocity(23,0) : jaxi.setVelocity(-23,0);
                
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
        vue.runLevelAnimation();

}

function update ()
{
}


    },
    runCode: function()
    {
        this.runCodeDisabled = true;
        var editor = ace.edit("editor");
        var functionsEditor = ace.edit("functionsEditor");
        this.code = editor.getSession().getValue();
        this.functions = functionsEditor.getSession().getValue();
        var execCode = this.functions + this.code;

        var initFunc = function(interpreter, scope) {

             interpreter.setProperty(scope, 'dance',
                 interpreter.createNativeFunction(dance));

            interpreter.setProperty(scope, 'jump',
                 interpreter.createNativeFunction(jump));

            interpreter.setProperty(scope, 'run',
                 interpreter.createNativeFunction(run));

            interpreter.setProperty(scope, 'climb',
                 interpreter.createNativeFunction(climb));

            interpreter.setProperty(scope, 'isTouching',
                 interpreter.createNativeFunction(isTouching));

                 interpreter.setProperty(scope, 'lert',
                 interpreter.createNativeFunction(lert));
        };

        jaxiInterpreter = new Interpreter(execCode, initFunc);
        nextStep();
        
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
                    const EVENTS = [
                        {name: 'nextAnim', callback: () => vue.nextAnimationStep()}
                    ]

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
                    onComplete: function() {
                        jaxi.tar.destroy();
                        vue.interactivesArray = vue.interactivesArray.filter( el => el !== jaxi.tar ); 
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
function isTouching(item)
{
    let isTouching = "false";
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
           obj.label == item)
        {
            isTouching = "true";
        }

    });

    return isTouching;
    
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
                var node =
                    jaxiInterpreter.stateStack[jaxiInterpreter.stateStack.length - 1].node;
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
