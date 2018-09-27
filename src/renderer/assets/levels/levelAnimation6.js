var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'I\'m sure you can put a number parameter into the "jump()" function to help you get through this level too. See if you can get to the teleporter!'}]},{func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
