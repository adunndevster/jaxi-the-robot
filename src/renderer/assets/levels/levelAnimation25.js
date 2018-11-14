var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'May I please have just 2 pink flowers?' },
                {character:vue.chopperbot, text:'Well this is new… The gatorbot wants exactly two pink flowers.' },
                {character:vue.chopperbot, text:'Let’s keep track of that with a Number variable.<br><code>var numFlowers = 0 //This is how we declare a variable, and set it to 0</code><br>...Then later after you pick up a pink flower...<br><code>numFlowers++ //This simply adds 1 to numFlowers</code><br>...To make sure we don’t pick up more than 2, there are a few choices we have...<br><code>if(numFlowers != 2){} //runs if numFlowers <i>doesn’t equal</i> 2<br> //code to pick up flower<br>}</code><br>OR<br><code>if(numFlowers < 2){} //runs as long as numFlowers is <i>less than</i> 2<br> //code to pick up flower<br>}</code><br>OR<br><code>if(numFlowers <= 1){} //runs as long as numFlowers is <i>less than, or equal<i> to 1<br> //code to pick up flower<br>}</code><br>' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
