var AnimationGetter = {

    get: function (vue)
    {
        return [
                {func:vue.setupToolTips, params:[{sprite:vue.gator, text:"gatorbot<br>Wants the first flower Jaxi picked up."},
                                                {sprite:vue.gator2, text:"gatorbot<br>Wants the last flower flower Jaxi picked up."},
                                                {sprite:vue.gator3, text:"gatorbot<br>Wants all the flowers that have 12 petals"}]},
                
                {func:vue.say, params:[{character:vue.gator, text:'Can I please have the first flower you picked up?'},
                                        {character:vue.gator2, text:'Can I please have the last flower you picked up?'},
                                        {character:vue.gator3, text:'Can I please have all the flowers that have 12 pedals?'},
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
