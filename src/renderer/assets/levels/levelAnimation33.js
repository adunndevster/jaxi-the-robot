var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.gator, text:'Can you pick up all the flowers, but just give me the last one?' },
                                        {character:vue.chopperbot, text:'Hmmm… how do we just give the gatorbot only the last flower you picked up?' },
                                        {character:vue.chopperbot, text:'Sounds like a job for “array.pop()!”' },
                                        {character:vue.chopperbot, text:'So, “array.push()” puts an item on the end of an array, and “array.pop()” takes it off and gives it back to us.' },
                                        {character:vue.chopperbot, text:'Here is a full example to keep this gator happy...<br><code>var flowersArray = []<br>run()<br>flowersArray.push(pickUp())<br>run()<br>flowersArray.push(pickUp())<br>run(2)<br>flowersArray.push(pickUp())<br>putDown(flowersArray.pop())<br></code>' },
        ]},
                                       
                {func:vue.chopperbot_flyAway},
        
                {func:vue.setupToolTip, params:{sprite:vue.gator, text:"gatorbot<br>Wants Jaxi to pick up all the flowers, but to give him just the last one she picks up."}}]
    }

}

exports.AnimationGetter = AnimationGetter
