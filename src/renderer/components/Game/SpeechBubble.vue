<template>
  <div id="speechBubble">
      <div id="bubbleBody">
        <div id="bubbleText">

        </div>
        <br/>
        <a id="btnSpeechNext" href="#" v-on:click="nextText()">Next ></a>        
      </div>
      <div id="bubbleTail"></div>
  </div>
</template>

<script>
  export default {
    name: 'speechbubble',
    data () {
      return {
        currentPos: 0,
        dialogueArray: [],
        game: null
      }
    },
    methods:
    {
      startDialogue (_dialogueArray, game) {
        this.dialogueArray = _dialogueArray
        this.currentPos = 0
        this.game = game
        this.nextText()
        document.getElementById('btnSpeechNext').focus()

      },
      nextText () {
        var bubble = document.getElementById('speechBubble')
        var bubbleText = document.getElementById('bubbleText')

        if (this.currentPos == this.dialogueArray.length) {
          bubble.parentElement.removeChild(bubble)
          this.$emit('nextAnim')
          return
        }

        var obj = this.dialogueArray[this.currentPos]

        bubbleText.innerHTML = obj.text
  
        var gameCanvas = document.getElementById('gameCanvas')
        var gameCanvasRect = gameCanvas.getBoundingClientRect()
        var wRatio = gameCanvas.offsetWidth / this.game.config.width
        var hRatio = gameCanvas.offsetHeight / this.game.config.height
        var charX = obj.character.x * wRatio
        var charY = obj.character.y * hRatio

        //figure out which quadrant the character is, and render the bubble correctly
        var midX = gameCanvas.offsetWidth / 2;
        var midY = gameCanvas.offsetHeight / 2;
        var offsetX = (charX > midX) ? -bubbleBody.offsetWidth - 120 : 0;
        var offsetY = (charY < midY) ? bubbleBody.offsetHeight + 90 : 0;
 
        var speechBubbleX = gameCanvasRect.left + charX + (30) + offsetX
        var speechBubbleY = gameCanvasRect.top + charY - (obj.character.height / 4) - (bubbleBody.offsetHeight) + offsetY

        bubble.style.left = speechBubbleX + 'px'
        bubble.style.top = speechBubbleY + 'px'

        if(charX > midX)
        {
          bubbleTail.style.left = bubbleBody.offsetWidth - 20 + 'px';
        } else {
          bubbleTail.style.left = 17 + 'px';
        }
        if(charY < midY)
        {
          bubbleTail.style.transform = 'rotate('+180+'deg)';
          bubbleTail.style.bottom = bubbleBody.offsetHeight + 30 + 'px';
        } else {
          bubbleTail.style.transform = 'rotate('+0+'deg)';
          bubbleTail.style.bottom = 3 + 'px';
        }
        


        this.currentPos++
      }
    }
  }
</script>

<style>

#speechBubble
{
  position: absolute;
  z-index: 1000;
  /* -webkit-box-shadow: 0px 0px 0px 3px rgba(0,0,0,1);
  -moz-box-shadow: 0px 0px 0px 3px rgba(0,0,0,1);
  box-shadow: 0px 0px 0px 3px rgba(0,0,0,1); */
}


#bubbleBody{
  /* border-style: solid;
  border-width: 3px;
  border-color:black; */
  background-color: white;
  min-width: 150px;
  max-width: 450px;
  font-family: 'Comic Sans MS';
  font-size: 14px;
  padding: 30px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  white-space: normal;
}
#bubbleTail {
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


#bubbleBody a{
  float: right;
}

pre {
        font-family: "Courier 10 Pitch", Courier, monospace;
        font-size: 95%;
        line-height: 140%;
        white-space: pre;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
    }       
    
    code {
        font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
        font-size: 95%;
        line-height: 140%;
        white-space: pre;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        background: #faf8f0;
    }
    
    #bubbleBody code {
        display: block;
        padding: 0.5em 1em;
        border: 1px solid #bebab0;
        margin-top: 10px;
    }
  
</style>
