var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:' Hmmm… Okay… fireballs everywhere… No problem. You got this. I think we would have the best luck just throwing snowballs in every direction.'},
                                        {character:vue.chopperbot, text:'Say, that give me an idea. Why don’t we do just that? This is how you generate a random number between 0 and 270...<br><code>var randomAngle = Math.random() * 270</code>'},
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
