var AnimationGetter = {

    get: function (vue)
    {
        return [
                {func:vue.say, params:[{character:vue.chopperbot, text:'Consider the lilies… they work not, and yet even that gatorbot is not arrayed like one of  them.' },
                                        {character:vue.chopperbot, text:'What if there were a way to keep the things you pick up organized? What if you wanted to only put down the blue flowers you have picked up?                                        ' },
                                        {character:vue.chopperbot, text:'There is a way, and it’s called the "array".' },
                                        {character:vue.chopperbot, text:'To make a new array, just do this:<br><code>//empty brackets make an array<br>var flowersArray = []</code>' },
                                        {character:vue.chopperbot, text:'To add something to your array, just do this:<br><code>flowersArray.push(<i>some_object</i>)</code><br><br>That "some_object" can be any type of object. A number, a string, or say, a flower.' },
                                        {character:vue.chopperbot, text:'To see how many items are in your array just use the length property:<br><code>flowersArray.length</code>' },
                                        {character:vue.gator, text:'How many flowers are you holding?' },
                                        {character:vue.chopperbot, text:'Why don’t you go pick up those flowers and tell that gatorbot how many you picked up?<br><code>var flowersArray = []<br>run()<br>//notice our pickUp() returns the flower object, <br>//and passes it into the push function :)<br>flowersArray.push(pickUp())<br>run(2)<br>flowersArray.push(pickUp())<br>run(2)<br>flowersArray.push(pickUp())<br>say(flowersArray.length)<br>run(4)' },
        ]},
                         
        {func:vue.chopperbot_flyAway},
        
        {func:vue.setupToolTip, params:{sprite:vue.gator, text:"gatorbot<br>Wants to know how many flowers Jaxi is holding."}}]

    }

}

exports.AnimationGetter = AnimationGetter
