let getuser = (id,callback) => {
    var user={
        id:id,
        name:'snehil'
    } ;
    setTimeout( () =>{
    callback(user)},2000)
    }
getuser(312,(userobj) =>{
    console.log(userobj)
})