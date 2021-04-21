console.log('I m Shubham');


const form=document.querySelector('button');
const search=document.querySelector('input');
const msg1=document.querySelector('#msg1');
const msg2=document.querySelector('#msg2');

form.addEventListener('click',(e)=>{
    e.preventDefault();
    const location=search.value;
    console.log(location);
    msg1.textContent='Loading ......'
    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
        msg1.textContent='';
    res.json().then((data)=>{
        if(data.error){
            msg2.textContent=data.error
        }
        else{
            msg1.textContent=data.address;
            msg2.textContent=data.data;
            console.log(data.address);
            console.log(data.data);
        }
    })
})
})
