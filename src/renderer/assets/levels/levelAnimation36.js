var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'Can I please have the last three flowers you picked up?' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
