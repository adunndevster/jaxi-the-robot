var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Ooh! Flowers! Gatorbots love flowers.' },
                                       {character:vue.gator, text:'Can I please have that flower?'},
                                       {character:vue.chopperbot, text:'Use “pickUp()” when you are near a flower to pick it up, and “putDown()” to put it down. Place the flower at the gatorbot\'s feet, and he should be happy!'}]},
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
