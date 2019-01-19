var AnimationGetter = {

    get: function (vue)
    {
        return [
                {func:vue.setupToolTips, params:[{sprite:vue.gator, text:"gatorbot<br>Wants 2 flowers that have 6 petals and are blue."}]},
                
                {func:vue.say, params:[{character:vue.gator, text:'Can I please have two flowers that have 6 pedals and are blue?'},
                {character:vue.chopperbot, text:'Remember, the way to check if 2 values are true is to use “&&”.<br><br>Example:<br><code>flower.petals == 6 && flower.color == “blue”</code>'},
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
