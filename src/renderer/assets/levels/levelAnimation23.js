var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Did you notice that if statement we used? If statements are magical. They are like a while loop, but they only run once.<br><code>if(<i>condition</i>){<br> //stuff to do, logic to run :)<br>}</code><br>If that <i>condition</i> is true, then the stuff inside the braces gets executed. Magical.' },
                                       {character:vue.chopperbot, text:'One other thing to think about... If you see yourself running the same bit of code over and over, try making it into a function, in your functions panel. Maybe you could do that with those if statements?' },
                                       {character:vue.gator, text:'May I please have all the yellow flowers?' }]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
