var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'How many flowers are on this row?'}]},
                {func:vue.say, params:[{character:vue.gator2, text:'And I need to know how many are on the whole level.'}]}]
    }

}

exports.AnimationGetter = AnimationGetter
