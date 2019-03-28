
const asyncadd=(a,b) =>{
return new Promise((resolve,reject) =>{
    setTimeout(() =>{
    if(typeof a==='number' && typeof b==='number')
    resolve(a+b)
    else
    reject('arguments must be a number')
},2000)
})
}
asyncadd('2',3).then((msg) =>{
    console.log(msg)
    return asyncadd(msg,5)
}).then((msg) =>{
    console.log(`result may be${msg}`)
})
.catch((errormsg) =>{
console.log(errormsg)
})
// const somepromise=new Promise((resolve,reject) =>{
//     setTimeout(() =>{
//     resolve('hey this is snehil')
//     reject('this is an error')
//     },2000)
    
//     })
//     somepromise.then( (msg) =>{
//         console.log('success',msg)
//     },(msg) =>{
//         console.log('error',msg)
//     })