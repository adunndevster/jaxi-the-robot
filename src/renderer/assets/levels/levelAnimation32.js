var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'How many flowers are you holding?' },
                                        {character:vue.gator2, text:'How many flowers will you be holding, when you get to me?' },
        ]},
                                       
                {func:vue.chopperbot_flyAway},
        
                {func:vue.setupToolTip, params:{sprite:vue.gator, text:"gatorbot<br>Wants to know how many flowers Jaxi is holding."}}]
    }

}

exports.AnimationGetter = AnimationGetter
