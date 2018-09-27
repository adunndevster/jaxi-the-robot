var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Putting a negative number into "run()" or "jump()" makes you move to the left. <code>run(-1);</code>'}]},{func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
