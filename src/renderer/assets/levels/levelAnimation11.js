var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:"Oh boy. It's a gatorbot."},
                                       {character:vue.chopperbot, text:'They are very exacting. That is, they like correct answers.'},
                                       {character:vue.gator, text:'How many flowers are here?'}, 
                                       {character:vue.chopperbot, text:'Okay, if you say "There are 2", he should be happy, and let you by.'},
                                       {character:vue.chopperbot, text:'Try this: <code>var myString = "There are "<br>var numFlowers = 2<br>myString = myString + numFlowers<br>say(myString);</code>'}]},
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
