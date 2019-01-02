var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'May I please have at least 5 flowers with 8 petals?' },
                {character:vue.gator2, text:'May I please have at least 5 yellow flowers?' },
                {character:vue.chopperbot, text:'Hey! I have an idea for a function that might come in handy for you...' },
                {character:vue.chopperbot, text:'What about a function that helps you get close to something. Maybe you could call it “runTo(object)”. It could use while, isNear(), and run together to help Jaxi run until she is close to the object? Just an idea.' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
