var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Excellent! Now try calling the run function twice. <code>run();<br>run();</code>'}]},{func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
