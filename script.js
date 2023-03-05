let number=document.getElementById('numbers');
let uppercase=document.getElementById('uppercase');
let lowercase=document.getElementById('lowercase');
let symbols=document.getElementById('symbols');
let generate_btn=document.getElementById('generate-btn');
let range_no=document.getElementById('st-range');
let strength_color=document.getElementById('st-strength');
let range_pipe=document.getElementById('range-pipe');
let password_field =document.getElementById('password-field');
let copytext=document.querySelector('[copy]');
let copymessage=document.getElementById('copymessage');
let cheackboxcontainer=document.getElementById('cheack-box-container');
let mixpass=document.getElementsByClassName('mixpass');

let range_no_=10;
// setslider 
setSlider();
function setSlider(){
    range_pipe.value=range_no_;
    range_no.innerText=range_no_;
    const min = range_pipe.min;
    const max = range_pipe.max;
    range_pipe.style.backgroundSize = ( (range_no_- min)*100/(max - min)) + "% 100%"
   
}
range_pipe.addEventListener('input',function(e){
    range_no_=e.target.value;
    setSlider();
})



// strength hendle 


cheackboxcontainer.addEventListener('click' ,function(){
        let count=0;
       for(let i of mixpass)
       {
        if(i.checked)
        {
            count++;
        }
       }

       if(count===4  && range_no_>=6)
       {
        colorsetStrength('#0f0');
       }
       else if(count===3 || count===2 && range_no_>=6)
       {
        colorsetStrength('#ff0');
       }
       else if(count==0)
       {
        colorsetStrength('white');
       }
       else{
        colorsetStrength('#f00');
       }

})

// strenght color hendle 

function colorsetStrength(color){
    strength_color.style.backgroundColor=  `${color}`;
    strength_color.style.boxShadow=` 0 0 12px 1px ${color};`
}



// get random number 
function getRandomNumber(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
//password number
function getNumberForPassword()
{
    return getRandomNumber(0,9);
}
//password uppercase

function getUpperCaseForPassword(){
    return String.fromCharCode(getRandomNumber(65,90))
}
//password lowercase
function getLowerCaseForPassword(){
    return String.fromCharCode(getRandomNumber(97,122))
}
let a='.!~`@#$%^&*()_+={[}]"?/.>,<|\ /';
// password symbols
function getSymbolsForPassword(){
    return a.charAt(getRandomNumber(0,a.length));
}

// copy text 
async function copypassword(){
    try{
    await navigator.clipboard.writeText(password_field.value);
            copymessage.textContent='Copied'
            handlecopytextstyle();

    }
    catch{
        copymessage.textContent='Error';
        handlecopytextstyle();
    }
}

function handlecopytextstyle()
{

    copymessage.style.display='block';
    setTimeout(() => {
        copymessage.style.display='none';
    }, 2000);
    
}

copytext.addEventListener('click',function(){
    if(password_field.value)
    {
        copypassword();
    }
})


generate_btn.addEventListener('click',function(){
    password_field.value='';
    if(range_no_===0)return;
    let arr=[];
    let cheackcount=0;


    if(number.checked)
    {
        arr.push(getNumberForPassword);
        cheackcount++;
    }
    if(uppercase.checked)
    {
        arr.push(getUpperCaseForPassword);
        cheackcount++;
    }
    if(lowercase.checked)
    {
        arr.push(getLowerCaseForPassword);
        cheackcount++;
    }
    if(symbols.checked)
    {
        arr.push(getSymbolsForPassword);
        cheackcount++;
    }
   
    if(cheackcount==0)return;
    let final_password='';

    for(let i=0; i< range_no_; i++)
    {
        final_password+=arr[getRandomNumber(0,arr.length)]();
    }
    console.log(final_password)
    password_field.value=final_password;

})

