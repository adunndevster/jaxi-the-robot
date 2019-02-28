var AnimationGetter = {

        get: function (vue)
        {
            return [
                    {func:vue.setupToolTips, params:[{sprite:vue.motherboard, text:"motherboard<br>Wants any number of flower petals, just as long as the total is divisible by 5."},
                                                        {sprite:vue.gator, text:"gatorbot<br>Wants to know the 10th prime number."},
                                                        {sprite:vue.gator2, text:"gatorbot<br>Wants 5 yellow flowers."}]},
                    
                    {func:vue.say, params:[{character:vue.chopperbot, text:'There she is. Motherboard. This is what you have fought for Jaxi. This is your chance.'},
                        {character:vue.chopperbot, text:"Go convince her that it isn't just blue robots that can program!"},
                        {character:vue.gator2, text:'Can I please have 5 yellow flowers?'},
                        {character:vue.gator, text:'What is the 10th prime number?'},
                        {character:vue.motherboard, text:'Hi Jaxi.'},
                        {character:vue.motherboard, text:"I'm impressed you made it this far."},
                        {character:vue.motherboard, text:"I want a lot of petals. Just make sure that the total number of the petals, is divisible by 5."},
                        {character:vue.motherboard, text:"That could be 10 petals. 20 petals. 25 petals. 1000 petals. Just make sure the total is divisible by 5."},
            ]},
                                           
                    {func:vue.chopperbot_flyAway}]
        }
    
    }
    
    exports.AnimationGetter = AnimationGetter
    