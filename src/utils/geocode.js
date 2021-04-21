var request=require('request');

const geocoding=(address,callback)=>{

    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2h1YmhhbWFuYW5kIiwiYSI6ImNrbjNqZzNlYjFpMGgybm56ZXdxbHNmZDAifQ.pxfervh-GLBtw-Iu1Gjqvg&limit=1';
    request({url:geourl,json:true},(err,res)=>{
        if(err){
            callback("Can't reach the server",undefined)
        }else if(res.body.features.length === 0){
            callback("Please provide a valid address",undefined)
        }else{
            const lat=res.body.features[0].center[1];
            const lon=res.body.features[0].center[0];
            const full_a=res.body.features[0].place_name;
            
            callback(undefined,{
                lat,
                lon:lon,
                full_a:full_a
            });
        }
    })
}

module.exports =geocoding;