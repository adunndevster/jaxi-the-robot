var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'May I please have at least 7 flowers with 8 petals?' },
                {character:vue.chopperbot, text:'">" is the greater than operator. Try using it here in your if statement when seeing if you have more than 6 flowers with 8 petals.' }
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
