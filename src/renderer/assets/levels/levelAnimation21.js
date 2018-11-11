var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Let’s look at this...<br><code>function runThroughTar(direction){<br> while(isTouching(“tar”)){<br>  run(direction)<br> }<br>}</code><br>You created a function named "runThroughTar".' },
                                       {character:vue.chopperbot, text:'You declared that it would have a “direction” parameter by placing a “direction” variable inside the parentheses.' },
                                       {character:vue.chopperbot, text:'Then, inside the braces you said what the function does, which is loop while you are touching tar. In that loop, you run according to the direction.' },
                                       {character:vue.chopperbot, text:'When you call the function:<br><code>runThroughTar(-4)</code><br>You are saying that inside the function, direction will be equal to -4, and it will run through the logic accordingly. The nice thing is, you now only need to write one line of code to get through tar!' },
                                       {character:vue.chopperbot, text:'See how easy it is to get through tar now...'},
                                       {character:vue.gator, text:'4 flowers please?'}]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
