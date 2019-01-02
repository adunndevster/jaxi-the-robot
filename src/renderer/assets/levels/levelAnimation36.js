var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'Can I please have the last three flowers you picked up?' },
        ]},
                                       
                {func:vue.chopperbot_flyAway},

                {func:vue.setupToolTip, params:{sprite:vue.gator, text:"gatorbot<br>Wants the last 3 flowers Jaxi picked up."}}]
    }

}

exports.AnimationGetter = AnimationGetter
