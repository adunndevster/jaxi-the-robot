var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'How many flowers are you holding?' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
