var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Nice! Okay, so now we know that a while loop runs as long as the condition inside the parentheses "()" is true.' },
                                       {character:vue.chopperbot, text:'But just putting "true" in the parentheses is NOT the way to go about things.'},
                                       {character:vue.chopperbot, text:'That will cause an infinite loop! A loop that never ends, and freezes up your curcuits!'}, 
                                       {character:vue.chopperbot, text:'Instead, to get through the tar, lets ask if we are actually touching tar each iteration, or time we go through the loop.'},
                                       {character:vue.chopperbot, text:'Try this: <code>while(isTouching("tar")){<br> run();<br> }</code> The "isTouching" function takes a string, "tar", and tells us if it is touching that object.'}]},
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
