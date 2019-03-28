const request=require('request')
const weatherinquiry=(lat,long,callback) =>{
request({
    url:`https://api.darksky.net/forecast/4c18bbc1553dde81146ceaffc6d02d61/${lat},${long}`,
    json:true
},(error,response,body) =>{
    if(error){
        callback('connection problem')
    }
    else if(response.body==='Not Found\n')
    callback('address not found')
    
    else
    {   
        let answer=body.currently.temperature
        const value=(answer-32)*5/9
        
        let answer1=body.currently.apparentTemperature
        const value1=(answer1-32)*5/9
        callback(undefined,{value,value1})
    }
})
}
module.exports={
    weatherinquiry
}