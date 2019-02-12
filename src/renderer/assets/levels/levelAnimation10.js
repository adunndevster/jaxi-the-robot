var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[
            {character:vue.chopperbot, text:'Hmmm. It looks like there are a couple of things here you have not encountered, Jaxi.'},
            {character:vue.chopperbot, text:'Notice the "Docs" tab above your code panel. Can you find a function that will help you get up those ladders? Can you find something that will help you put out those fireballs?'},
            {character:vue.chopperbot, text:'Documentation is one of the most important things to help programmers know how to code.'}]},
        
        
        {func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
