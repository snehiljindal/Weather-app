const yargs=require('yargs');
const axios=require('axios')
const fs=require('fs')

const geocode=require('./geocode')
const weather=require('./weather')

const argv=yargs
.options({
    a:{
        demand:false,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true,
        
    },
    d:{
        demand:false,
        alias:'default',
        describe:'Address to fetch weather for',
        string:true,
    }
})
.help()
.alias('help','h')
.argv;
let location;
if(!argv.d && !argv.a) {
  try{
   location=fs.readFileSync('./main.txt','utf8')
    console.log(location)}
  catch (err) {
    console.log('default location not set.')
    console.log('use -d or --default to set the location and try again')
    process.exit(1);
  }
}
 if(argv.d){
   location=argv.d
   fs.writeFile('./main.txt',location,(error) =>{
    if(error) console.log('can\'t set the default location' )
    console.log('default location changed')
   })
 }
 if(argv.a){
   location=argv.a
 }
// geocode.addressgeocode(location,(errormessage,result) =>{
//     if(errormessage)
//     {console.log(errormessage)}
//     else
//     console.log(result)
//     weather.weatherinquiry(result.latitude,result.longitude,(errormessage,result) =>{
//         if(errormessage)
//         {console.log(errormessage)}
//         else
//         console.log(`its currently ${result.value} ,buts feels like ${result.value1} .`)
//     }) 
// })
const elements=location.split(' ')
const values=elements.join('+')
 var geocodeurl=`https://geocoder.api.here.com/6.2/geocode.json?app_id=9loQzPmJgjx0IVhOk2Qj&app_code=DERZWATnOnqMR6hp7mupGQ&searchtext=${values}`
axios.get(geocodeurl)
  .then(function (response) {
    if(!response.data.Response.View)
    {throw new Error('no address found')
    }
    var lat=response.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
    var long=response.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
    const weatherurl=`https://api.darksky.net/forecast/4c18bbc1553dde81146ceaffc6d02d61/${lat},${long}`
    return axios.get(weatherurl)
}).then(function (response){
        const answer=response.data.currently.temperature
        const value=(answer-32)*5/9
        const answer1 = response.data.currently.apparentTemperature
        
        const value1=(answer1-32)*5/9
        //console.log(value1,value)
        console.log(`its currently ${value} ,buts feels like ${value1} .`)
    })
  .catch(function (e) {
    if(e.errno==='ENOTFOUND')
    console.log('unable to connect to api server')
    else
    console.log(e.message)
  });
  console.log('snehil')