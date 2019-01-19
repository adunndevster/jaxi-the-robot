var AnimationGetter = {

    get: function (vue)
    {
        return [
                {func:vue.setupToolTips, params:[{sprite:vue.gator, text:"gatorbot<br>Wants to know what the 19th Fibonacci number is."}]},

                {func:vue.say, params:[{character:vue.gator, text:'What is the 19th value of the Fibonacci sequence?'},
                                        {character:vue.chopperbot, text:'Hmmm… the Fibonacci sequence huh? Now these gatorbots want to know the solutions to mathematical mysteries? Luckily, I know what that is…'},
                                        {character:vue.chopperbot, text:' It’s a pattern seen all over the place in nature. Sea shells, ram horns… wherever you see spirals.'},
                                        {character:vue.chopperbot, text:'The pattern goes like this: 1, 1, 2, 3, 5, 8, 13… So the last two numbers added together make the next number.<br><br>So if we wanted, say, the 6th Fibonacci number, that would be 8.<br><br> But this gatorbot is asking for the 19th number. That would take a long time to figure out adding those numbers up by ourselves. Do you think you could write a function to calculate it for you? Rmember, online search is your friend.'}
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
