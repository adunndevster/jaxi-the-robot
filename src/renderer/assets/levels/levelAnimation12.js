var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'How many flowers are on this row?'}]},
                {func:vue.say, params:[{character:vue.gator2, text:'And I need to know how many are on the whole level.'}]},
                {func:vue.say, params:[{character:vue.gator, text:'We need your statement phrased like, \"There are _\"'}]},
                {func:vue.say, params:[{character:vue.gator2, text:'Isn\'t that a little extreme Hank?'}]},
                {func:vue.say, params:[{character:vue.gator, text:'No it isn\'t! Exactly like \"There are _\"'}]},
                
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
