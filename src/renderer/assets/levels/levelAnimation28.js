var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'May I please have at least 5 flowers with 8 petals?' },
                {character:vue.gator2, text:'May I please have at least 5 yellow flowers?' }
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
