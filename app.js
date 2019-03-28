const yargs=require('yargs');

const geocode=require('./geocode')
const weather=require('./weather')
const argv=yargs
.options({
    a:{
        demand:true,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    }
})
.help()
.alias('help','h')
.argv;
let x=argv.a
console.log(argv)
geocode.addressgeocode(x,(errormessage,result) =>{
    if(errormessage)
    {console.log(errormessage)}
    else
    console.log(result)
    weather.weatherinquiry(result.latitude,result.longitude,(errormessage,result) =>{
        if(errormessage)
        {console.log(errormessage)}
        else
        console.log(`its currently ${result.value} ,buts feels like ${result.value1} .`)
    }) 
})
