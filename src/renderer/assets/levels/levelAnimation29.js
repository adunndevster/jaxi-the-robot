var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'I just want more than 31 petals. Please?' }
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
