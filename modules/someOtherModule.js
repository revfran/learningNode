
let theOtherModule=require('./someModule')

let someOtherFunction= async(param) => { 
    let justAVar= await theOtherModule.afun('from the other module')
    return  param + justAVar}

module.exports.afun2=someOtherFunction;