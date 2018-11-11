var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Having to write a while loop for each time you encounter a tar pit can get tedious.' },
                                       {character:vue.chopperbot, text:'What if there was a way to condense your code, so you only needed to write one line to do the same thing?' },
                                       {character:vue.chopperbot, text:'There is! It’s called a "function".' },
                                       {character:vue.chopperbot, text:'Click on your functions tab and add this:<br/><code>function runThroughTar(direction){<br> while(isTouching("tar")){<br>  run(direction)<br> }<br>}</code><br><br>Writing code in the function panel, will save from level to level, so it will still be handy to you next time you see tar.' },
                                       {character:vue.chopperbot, text:'Now if you land in a tar pit, running through it is as simple as calling <br><code>runThroughTar(4)</code> <br><br>OR<br><br><code>runThroughTar(-4)</code><br><br>back over in your code tab. See if you can figure out how to use this function.'}]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
