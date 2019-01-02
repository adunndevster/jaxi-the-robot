var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Hey! Look at all the different flowers!.' },
                                       {character:vue.chopperbot, text:'Mouse over them… Notice they each have different properties. Some have 6 petals, some have 8. Some are blue, yellow, or pink.' },
                                       {character:vue.gator, text:'May I please have all the blue flowers?' },
                                       {character:vue.chopperbot, text:'To see the properties an object has, you must be by the object and use the “inspect” function.' },
                                       {character:vue.chopperbot, text:'Like this...<br><code>//You MUST be right by the object<br>var flower = inspect();<br>if(flower.petals == 6){<br> pickUp() //pick up flower<br>}</code><br>OR<br><code>if(flower.color == "blue"){<br> pickUp() //pick up flower<br>}</code><br>If the flower has the right property, pick it up.See if you can get the gatorbot what he wants.'}]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
