var AnimationGetter = {

    get: function (vue)
    {
        return [
                {func:vue.setupToolTips, params:[{sprite:vue.gator, text:"gatorbot<br>Wants the first 2 flowers Jaxi picks up."},
                                                  {sprite:vue.gator2, text:"gatorbot<br>Wants the last 2 flowers Jaxi picks up."},
                                                  {sprite:vue.gator3, text:"gatorbot<br>Wants the remaining 4 flowers."}]},

                {func:vue.say, params:[{character:vue.gator, text:'Can I please have the first 2 flowers you picked up?' },
                                        {character:vue.gator2, text:'Can I please have the last 2 flowers you picked up?' },
                                        {character:vue.gator3, text:'May I have all the remaining 4 flowers?' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
