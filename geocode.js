const request=require('request');
 const addressgeocode=function(location,callback){
 }
 const elements=location.split(' ')
 const value=elements.join('+')
 request({
     url:`https://geocoder.api.here.com/6.2/geocode.json?app_id=9loQzPmJgjx0IVhOk2Qj&app_code=DERZWATnOnqMR6hp7mupGQ&searchtext=${value}`,
     json:true
     
 },(error,Response,body) => {
     if(error)
     {
         callback("bad network of the server")
     }
     else if(!body.Response.View.length)
     callback("we don't find any address")
     else {
     callback(undefined,{ latitude:body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
     longitude:body.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
     ADDRESS:body.Response.View[0].Result[0].Location.Address.Label})
 }
 })
module.exports={
    addressgeocode
}