var AnimationGetter = {

    get: function (vue)
    {
        return [{func:vue.say, params:[{character:vue.chopperbot, text:'Whoo! This one looks like it will take a few tries. Make some mistakes, learn some things, and get to the teleporter!'}]},{func:vue.chopperbot_flyAway}]
    }

}

exports.AnimationGetter = AnimationGetter
