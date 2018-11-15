var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'May I please have at least 7 flowers with 8 petals?' },
                {character:vue.chopperbot, text:'">" is the greater than operator. Try using it here.' }
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
