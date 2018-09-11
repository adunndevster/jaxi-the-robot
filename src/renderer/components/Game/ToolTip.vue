<template>
  <div id="toolTip">
      <div id="toolTipBody">
        <div id="toolTipText">

        </div> 
      </div>
  </div>
</template>

<script>

  export default {
    name: 'tooltip',
    data(){
      return {
        currentPos: 0,
        toolTipArray: [],
        game: null
      }
    },
    methods:
    {
      showToolTip(_toolTipArray, game)
      {
        this.toolTipArray = _toolTipArray;
        this.game = game;

        var obj = this.toolTipArray[0];

        var toolTip = document.getElementById('toolTip');
        var toolTipText = document.getElementById('toolTipText');

        toolTipText.innerHTML = obj.text;
        
        var gameCanvas = document.getElementById('gameCanvas');
        var gameCanvasRect = gameCanvas.getBoundingClientRect();
        var wRatio = gameCanvas.offsetWidth/this.game.config.width;
        var hRatio = gameCanvas.offsetHeight/this.game.config.height;
        var charX = obj.character.x * wRatio;
        var charY = obj.character.y * hRatio;
        var offsetX = (charX < this.game.config.width/2) ? -90 : 30;
        var toolTipX = gameCanvasRect.left + charX + offsetX;
        var toolTipY = gameCanvasRect.top + charY - (obj.character.height/4)

        toolTip.style.left = toolTipX + 'px';
        toolTip.style.top = toolTipY + 'px';
      },
      destroy()
      {
        var toolTip = document.getElementById('toolTip');
        toolTip.parentElement.removeChild(toolTip);
      }
    }
  }
</script>

<style>

#toolTip
{
  position: absolute;
  z-index: 1000;
  /* -webkit-box-shadow: 0px 0px 0px 3px rgba(0,0,0,1);
  -moz-box-shadow: 0px 0px 0px 3px rgba(0,0,0,1);
  box-shadow: 0px 0px 0px 3px rgba(0,0,0,1); */
}


#toolTipBody{
  /* border-style: solid;
  border-width: 3px;
  border-color:black; */
  background-color: white;
  /* min-width: 150px; */
  max-width: 280px;
  font-family: 'Comic Sans MS';
  font-size: 14px;
  padding: 20px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  white-space: normal;
}
#toolTipTail {
	content: '';
	position: absolute;
	bottom: 3px;
	left: 17px;
	width: 0;
	height: 0;
	border: 34px solid transparent;
	border-top-color:white;
	border-bottom: 0;
	border-left: 0;
	margin-left: -17px;
	margin-bottom: -34px;
  z-index: 1001;
  
  /* border-left-style: solid;
  border-left-width: 3px;
  border-left-color: black; */
}

  
</style>
