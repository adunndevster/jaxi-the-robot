var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'Can I please just have 3 blue flowers?' },
                                        {character:vue.chopperbot, text:'Yeash, these gatorbots sure are getting picky.' },
                                        {character:vue.chopperbot, text:'This looks like a job for… "ARRAY.FILTER!"' },
                                        {character:vue.chopperbot, text:'"array.filter()" is pretty neat. When you use it, it loops through each element inside the array, and if that element meets a certain condition, it gets returned.' },
                                        {character:vue.chopperbot, text:'This code sample has you run back and forth until you have all the flowers you need...' },
                                        {character:vue.chopperbot, text:'<code>var flowers = []<br>var isRight = true<br>var goodFlowers = []<br>while(goodFlowers.length < 3){<br> if(isRight){<br>  run()<br> } else {<br>  run(-1)<br> }<br><br> if(isTouching("flower")){<br>  flowers.push(pickUp())<br>  isRight = !isRight; //simple way to toggle isRight...'},
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
