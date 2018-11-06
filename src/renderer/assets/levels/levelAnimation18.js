var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'I want ALL THE FLOWERS!' },
                                       {character:vue.chopperbot, text:'“putDown()” actually puts EVERYTHING down you are holding. Which in this case, is a good thing.'}]},
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
