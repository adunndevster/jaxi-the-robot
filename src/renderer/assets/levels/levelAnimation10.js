var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'<code>climb();</code> That is all.'}]},{func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
