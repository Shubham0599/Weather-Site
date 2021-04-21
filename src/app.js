const path=require('path');
const hbs=require('hbs');
const express=require('express');
const app=express();
//loading utils file
const geocoding=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');


const newpath=path.join(__dirname,'../public')
app.set('public',newpath);
// console.log(newpath);
app.use(express.static(newpath));
app.set('views',path.join(__dirname,'../views'));
app.set('view engine','hbs');

//define path for partials
const partialPath= path.join(__dirname,'../views/partials')
hbs.registerPartials(partialPath);





app.get('',(req,res)=>{
    res.render("index",{
        // root:newpath,
        title:'Weather',
        name:'Shubham',
        course:'Complete Nodejs development'
    });
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:'Help',
        name:'Shubham'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Shubham'
    });
})
app.get('/weather',(req,res)=>{
    const location=req.query.address;
    if(!req.query.address){
      return res.send({
            error:"you must provide a address"
        })
    }
    geocoding(location,(error,{lat,lon,full_a}={})=>{
        if(error){
            return res.send({error});
        }
        const geoaddress="Searched for :"+full_a;
        forecast(lat,lon,(error,forecastdata)=>{
            if(error){
                return res.send({error});
            }
            const fordata="Data from forecast :"+forecastdata;
            res.send({
                address:geoaddress,
                data:fordata
            })
            })
           
    })
   
})
 
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shubham',
        errmsg:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shubham',
        errmsg:'Page not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server has Started');
})