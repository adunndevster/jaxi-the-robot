var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'MOAR FLOWERS!' }]},
        {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
