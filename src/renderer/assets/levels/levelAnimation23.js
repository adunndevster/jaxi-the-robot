var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Did you notice that if statement we used? If statements are magical. They are like a while loop, but they only run once.<br><code>if(<i>condition</i>){<br> //stuff to do, logic to run :)<br>}</code><br>If that <i>condition</i> is true, then the stuff inside the braces gets executed. Magical.' },
                                       {character:vue.gator, text:'May I please have all the yellow flowers?' }]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
