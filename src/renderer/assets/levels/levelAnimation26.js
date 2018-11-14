var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'May I please have just 2 flowers with 8 petals?' },
                {character:vue.gator2, text:'Can I have 4 flowers with 8 petals?' }
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
