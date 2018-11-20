var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'Pick up all the flowers on this row, and tell me how many you are holding, please.' },
                                        {character:vue.gator2, text:'Can you please give me the <i>first</i> flower you picked up?' },
                                        {character:vue.chopperbot, text:'"array.pop()" takes the top item off the array, but what slides an item out from the bottom?' },
                                        {character:vue.chopperbot, text:'"array.shift()!" So if you were to pick up 5 flowers, "array.shift()" will return the first flower picked up.' },
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
