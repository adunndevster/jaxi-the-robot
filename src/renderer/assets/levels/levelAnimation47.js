var AnimationGetter = {

    get: function (vue)
    {
        return [
                {func:vue.setupToolTips, params:[{sprite:vue.gator, text:"gatorbot<br>Wants to know what the 34th Fibonacci number is."}]},
                
                {func:vue.say, params:[{character:vue.gator, text:'How about the 34th Fibonocci number?'}
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
