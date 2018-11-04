var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'It looks like we don\'t know how many times you need to run or jump to get out of those tar pits. Hmmm... I wonder what could be done...'},
                                       {character:vue.chopperbot, text:'You know, if we can detect if you are in a tar pit, you can run a loop!'},
                                       {character:vue.chopperbot, text:'Move your mouse over some objects. Those things that have a label are things in the world you can interact with. For instance "tar".'}, 
                                       {character:vue.chopperbot, text:'Try this: <code>while(isTouching("tar")){<br> run();<br>}</code>'}]},
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
