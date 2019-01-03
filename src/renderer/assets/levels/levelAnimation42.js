var AnimationGetter = {

    get: function (vue)
    {
        return [
                {func:vue.setupToolTips, params:[{sprite:vue.gator, text:"gatorbot<br>Wants 3 yellow flowers."},
                                                 {sprite:vue.gator2, text:"gatorbot<br>Wants 3 flowers with 8 petals."}]},

                {func:vue.say, params:[{character:vue.gator, text:'Can I please have 3 yellow flowers?'},
                                        {character:vue.gator2, text:'Can I please have 3 flowers that have 8 petals?'},
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
