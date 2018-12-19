var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'What is the 16th prime number?'},
                {character:vue.chopperbot, text:'Hmmm… That’s pretty tricky. <br><br>A prime number is any number that cannot be divided by any number besides 1 and itself. 1 is not a prime number. 2 is the first prime number. Maybe we can write a function that will help us calculate the 16th prime number?'}
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
