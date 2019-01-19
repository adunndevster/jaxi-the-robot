var AnimationGetter = {

    get: function (vue)
    {
        return [
        //         {func:vue.setupToolTips, params:[{sprite:vue.gator, text:"gatorbot<br>Wants 1 blue flower with 6 petals."},
        //                                         {sprite:vue.gator2, text:"gatorbot<br>Wants 1 yellow flower with 8 petals."},
        //                                         {sprite:vue.gator3, text:"gatorbot<br>Wants to know what the 43rd Fibonacci number is."},
        //                                         {sprite:vue.gator4, text:"gatorbot<br>Wants to know what the 17th Fibonacci number is."},
        
        // ]},

        //         {func:vue.say, params:[{character:vue.gator, text:'May I have 1 blue flower with 6 petals?'},
        //                                 {character:vue.gator2, text:'May I have 1 yellow flower with 8 petals?'},
        //                                 {character:vue.gator3, text:'What is the 43rd Fibonacci number?'},
        //                                 {character:vue.gator4, text:'What is the 17th prime number?'},
        // ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
