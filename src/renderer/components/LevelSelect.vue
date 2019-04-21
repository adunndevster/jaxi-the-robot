<template>
<div id="levelSelect" ref="levelSelect" class="level-select-wrapper">
  <div class="level-select">
    <nav>
      <div @click="clearUserData" class="title">Level Selection</div>
      <div @click="showPlayersModal" class="profile" :class="{'hide':(currentPlayer==null || currentPlayer=='')}" >{{currentPlayer}}</div>
    </nav>

    <div class="zones">
      
      <div class="zone">
        
        <div class="sidebar">
          The Junkyard
        </div>
        
        <levels :startLevel="0" :unlockedLevels="unlockedLevels" />

        <div v-bind:class="{'zone-bg':true, junkyard:true, brighten:(zone==1)}"></div>

      </div>
      <div class="zone">
        
        <div class="sidebar">
          The Forest
        </div>
        
        <levels :startLevel="10" :unlockedLevels="unlockedLevels"/>

        <div v-bind:class="{'zone-bg':true, forest:true, brighten:(zone==2)}"></div>
        
      </div>
      <div class="zone">
        
        <div class="sidebar">
          Sprockets Cavern
        </div>
        
        <levels :startLevel="20" :unlockedLevels="unlockedLevels"/>

        <div v-bind:class="{'zone-bg':true, cave:true, brighten:(zone==3)}"></div>
        
      </div>
      <div class="zone">
        
        <div class="sidebar">
          Candy City
        </div>

        <levels :startLevel="30" :unlockedLevels="unlockedLevels" />
        
        <div v-bind:class="{'zone-bg':true, 'candycity':true, brighten:(zone==4)}"></div>
        
      </div>
      <div class="zone">
        
        <div class="sidebar">
          Motherboard's Factory
        </div>

        <levels :startLevel="40" :unlockedLevels="unlockedLevels" />
        
        <div v-bind:class="{'zone-bg':true, factory:true, brighten:(zone==5)}"></div>
        
      </div>
    </div>

    <b-modal id="newPlayerModal" ref="newPlayerModal" title="New Player..."
      @ok="handleNewPlayerOk" 
      @hide="onNewPlayerNoSave"
      ok-only
      ok-title="Save"
      :no-close-on-backdrop="(players==null || players.length < 1)"
      :no-close-on-esc="(players==null || players.length < 1)"
      :hide-header-close="(players==null || players.length < 1)" >
      <p class="my-4" v-if="(players==null || players.length < 1)">
        Looks like you are new! Who will be playing?
      </p>
      <p class="my-4" v-if="(players==null || players.length < 1)">
        Who will be playing?
      </p>
      <b-form-input type="text" v-model="currentPlayer" />
    </b-modal>

    <b-modal id="playersModal" ref="playersModal" title="Players" ok-title="Close" ok-only>
      <p class="my-4">Select your player profile, or create a new one.</p>
      <div class="player-select" v-for="player in players">
        <div @click="selectPlayer(player)">
          {{player}}
          <div @click="deletePlayer(player)" v-if="players.length > 1" class="float-right">&#10006;</div>
        </div>
      </div>
      <div v-if="players.length<6" class="player-select">
        <div @click="showCreatePlayerModal">Create new player...</div>
      </div>
    </b-modal>

    <b-modal id="deletePlayerModal" ref="deletePlayerModal" 
      title="Delete player..." 
      ok-title="Delete"
      @ok="confirmDelete">
      <p class="my-4">Are you sure you want to delete {{playerToDelete}}? This cannot be undone!</p>
    </b-modal>
  </div>
</div>
</template>

<script>
import router from '../router'
import Levels from './LevelSelect/Levels'

export default {
  name: 'level-select',
  components: { Levels },
  data () {
    return {
      currentPlayer: null,
      playerToDelete: null,
      players: [],
      zone: 1,
      unlockedLevels: []
    }
  },
  methods: {
    clearUserData (){
      localStorage.removeItem('currentPlayer');
      localStorage.removeItem('players');
    },
    handleScroll () {
      var levelSelect = this.$refs.levelSelect;
      this.zone = Math.ceil((levelSelect.scrollTop - 100) / 732) + 1
    },
    showPlayersModal(){
      this.$refs.playersModal.show()
    },
    showCreatePlayerModal(){
      this.$refs.playersModal.hide()
      this.$refs.newPlayerModal.show()
    },
    handleNewPlayerOk(evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.currentPlayer) {
        alert('Please enter your name')
      } else if(this.players.some(player => player.toLowerCase() == this.currentPlayer.toLowerCase()))
      {
        alert("Please enter a name that hasn't been used yet.")
      } else {
        localStorage.setItem('currentPlayer', this.currentPlayer);
        this.players.push(this.currentPlayer);
        localStorage.setItem('players', JSON.stringify(this.players));
        this.$refs.newPlayerModal.hide()
      }
    },
    onNewPlayerNoSave() {
      this.currentPlayer = localStorage.getItem('currentPlayer');
      this.getunlockedLevels();
    },
    selectPlayer(player)
    {
      this.currentPlayer = player;
      localStorage.setItem('currentPlayer', this.currentPlayer);
      this.$refs.playersModal.hide()
      this.getunlockedLevels();
    },
    deletePlayer(player)
    {
      this.playerToDelete = player;
      this.$refs.playersModal.hide();
      this.$refs.deletePlayerModal.show();
    },
    confirmDelete()
    {
      this.players = this.players.filter(player => player != this.playerToDelete);
      if(this.players.length > 0)
      {
        this.currentPlayer = this.players[0];
        localStorage.setItem('currentPlayer', this.currentPlayer)
        localStorage.setItem('players', JSON.stringify(this.players))
      } else {
        this.players = null;
        this.currentPlayer = null;
        localStorage.removeItem('currentPlayer');
        localStorage.removeItem('players');
        showCreatePlayerModal();
      }
      this.playerToDelete = null;
      this.$refs.deletePlayerModal.hide();
    },
    getunlockedLevels()
    {
      var levels = 50;
      this.unlockedLevels = [];
      this.unlockedLevels.push(1);
      for(var i=1; i<=levels; i++)
      {
        var levelCode = localStorage.getItem(this.currentPlayer + '_code_' + i);
        if(levelCode) this.unlockedLevels.push(i+1);
      }
    }
  },
  mounted () {
    var levelSelect = this.$refs.levelSelect;
    levelSelect.addEventListener('scroll', this.handleScroll)

    this.currentPlayer = localStorage.getItem('currentPlayer');
    if(!this.currentPlayer)
    {
      this.showCreatePlayerModal();
    } else {
      this.players = JSON.parse(localStorage.getItem('players'));
      if(!this.players){
        this.players = [];
        this.players.push(this.currentPlayer);
        localStorage.setItem('players', JSON.stringify(this.players));
        alert(this.players);
      }
      
      this.getunlockedLevels();
    }
  },
  destroyed () {
    var levelSelect = this.$refs.levelSelect;
    if(levelSelect) levelSelect.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>

.level-select-wrapper
{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}

.level-select *{
  font-family: Righteous;
}

nav{
  width: 100%;
  position: fixed;
  top: 0px;
  height: 100px;
  background-color: #72254C;
  text-align: center;
  padding-top: 10px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    z-index: 1000;
}

.title{
  color:white;
  font-size: 56px;
}

.profile{
  border-color: white;
  border-radius: 6px;
  border-style: solid;
  border-width: 2px;
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  padding: 10px;
  color: white;
}

.zones
{
  padding-top:100px;
}

.zone
{
  position: relative;
  width: 100%;
  height: 732px;
}
.zone div{
  position: absolute;
}
.zone .sidebar{
  background-color: rgba(255, 255, 255, 0.6);
  width: 732px;
  transform: rotate(270deg);
  color: black;
  height: 90px;
  z-index: 100;
  top:322px;
  left: -322px;
  text-align: center;
  font-size: 42px;
  padding-top: 10px;
}
.zone-bg
{
  position: absolute;
  top:0px;
  width: 100%;
  height: 732px;
  background-size: cover;
  background-position-x: center;
  opacity: .3;
}
.zone .brighten
{
  opacity: 1;
}

.zone .junkyard
{
  background-image: url("~@/assets/levels/mcJunkyard.png");
}
.zone .forest
{
  background-image: url("~@/assets/levels/mcForest.png");
}
.zone .cave
{
  background-image: url("~@/assets/levels/mcCave.png");
}
.zone .candycity
{
  background-image: url("~@/assets/levels/mcCandyCity.png");
}
.zone .factory
{
  background-image: url("~@/assets/levels/mcFactory.png");
}

.hide{
  display: none;
}

.player-select div{
  cursor: pointer;
  user-select: none;
}

  
</style>
