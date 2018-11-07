var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'MOAR FLOWERS!' }]}]
    }

}

exports.AnimationGetter = AnimationGetter
