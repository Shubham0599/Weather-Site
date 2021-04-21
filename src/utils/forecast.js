const request=require('request');


//isme url me last me ---&unit=f laga hua tha (if something went wrong)
const forecast=(lat,lon,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0997d1cd1bdef201f11a8d13277a6ac8&query='+encodeURIComponent(lat)+','+encodeURIComponent(lon);
    request({url:url,json:true},(err,res)=>{
        if(err){
            callback("Can't reach the weather server",undefined);
        }else if(res.body.error){
            callback('Please provide a valid location name',undefined);
        }else{
            const temp=res.body.current.temperature;
            const status=res.body.current.weather_descriptions[0];
            const place=res.body.location.name;
            callback(undefined,status+' outside in '+place+' . And the Temperature is '+temp+'deg');
        }
    })
}

module.exports=forecast;