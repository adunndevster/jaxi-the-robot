var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Let’s take a closer look at how “array.filter” works…' },
                                        {character:vue.chopperbot, text:'First, we created a big ol’ array to store our flowers in.<br><code>var flowers = []</code><br>We then went and grabbed a bunch of different flowers and pushed them onto that array.' },
                                        {character:vue.chopperbot, text:'When we were ready to just pull out the blue flowers we used filter...<br><code>var blueFlowers = flowers.filter(function(flower){<br> return flower.color == "blue"<br>})</code><br>If you look closely, what you will see is that filter really just loops through each item in the flowers array, and asks, “is my color equal to blue?” If it is, it returns it to the new “blueFlowers” array. It’s as simple as that.' },
                                        {character:vue.gator, text:'Can I please just have 4 pink flowers?'},
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
