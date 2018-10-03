var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Try not to get stuck in that tar pit! If you do, you can run your way out of it.'}]},{func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
