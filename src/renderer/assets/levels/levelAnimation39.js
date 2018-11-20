var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'Can I please have the first two flowers you picked up?' },
                                        {character:vue.gator2, text:'Can I please have the last two flowers you picked up?' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
