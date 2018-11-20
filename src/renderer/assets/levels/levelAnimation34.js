var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'There’s something else I think you should notice...' },
                                        {character:vue.chopperbot, text:'The "putDown()" function can take a parameter. Last time we used it, we passed it "flowersArray.pop()", which gave it the last flower you had picked up. This caused the "putDown()" function to only put down one flower, instead of all the flowers you had picked up.' },
                                        {character:vue.gator, text:'May I please have the last flower you pick up?' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
