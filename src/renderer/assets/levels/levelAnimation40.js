var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'Can I please just have 3 blue flowers?' },
                                        {character:vue.chopperbot, text:'Yeash, these gatorbots sure are getting picky.' },
                                        {character:vue.chopperbot, text:'This looks like a job for… "ARRAY.FILTER!"' },
                                        {character:vue.chopperbot, text:'"array.filter()" is pretty neat. When you use it, it loops through each element inside the array, and if that element meets a certain condition, it gets returned.' },
                                        {character:vue.chopperbot, text:'This code sample has you run back and forth until you have all the flowers you need...' },
                                        {character:vue.chopperbot, text:'<code>run(4)<br><br>var flowers = []<br>var numBlueFlowers = 0<br>while(numBlueFlowers < 3){<br> dance()<br> var flower = pickUp()<br> flowers.push(flower)<br> if(flower.color == "blue") numBlueFlowers++<br>}<br><br>while(!isNear("gatorbot")){<br> run()<br>}<br><br>var blueFlowers = flowers.filter(function(flower){<br> return flower.color == "blue"<br>})<br>putDown(blueFlowers)</code>'},
        ]},
                                       
                {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
