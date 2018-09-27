var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Did you know you can put stuff in between those function parantheses?'},{character:vue.chopperbot, text:'They are called parameters, and they make the function behave differently.'},{character:vue.chopperbot, text:'In the case of the "run()" function, it will make you run farther. <code>run(2);</code><br>If that doesn\'t get you far enough, try a bigger number.'}]},{func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
