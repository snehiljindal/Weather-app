const request=require('request')
var geocodeaddress=(location) =>{
    return new Promise((resolve,reject) =>{
    const elements=location.split(' ')
    const value=elements.join('+')
    request({
        url:`https://geocoder.api.here.com/6.2/geocode.json?app_id=9loQzPmJgjx0IVhOk2Qj&app_code=DERZWATnOnqMR6hp7mupGQ&searchtext=${value}`,
        json:true
        
    },(error,Response,body) => {
        if(error)
        {
            reject("bad network of the server")
        }
        else if(!body.Response.View.length)
        reject("we don't find any address")
        else {
        resolve({ latitude:body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
        longitude:body.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
        ADDRESS:body.Response.View[0].Result[0].Location.Address.Label})
    }
    })
})
}
geocodeaddress('00200').then((answer) =>{
    console.log(answer)
},(errormessage) =>{
console.log(errormessage)
})