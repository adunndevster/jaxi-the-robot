var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Did you notice this line of code?<br><code>flowersArray.push(pickUp())</code>' },
                                        {character:vue.chopperbot, text:'The pickUp() function actually returns a value when you call it, and it successfully picks up an object. The value it returns is the object. In that last case you used it, it was a flower object.' },
                                        {character:vue.chopperbot, text:'That object was then passed into flowersArray.push(), which <i>pushed</i> it onto the array.' },
                                        {character:vue.gator, text:'How many flowers are you holding?' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
