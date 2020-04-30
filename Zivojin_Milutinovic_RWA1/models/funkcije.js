const URL="http://localhost:3000/";

async function fetchLoginUsers(){
    return fetch(URL+"users").then(res=>res.json()).catch(err=>console.log(err));
    }
function pokaziLogin()
{
    let login=document.getElementById('login');
    document.body.style.display="block";
    document.getElementsByClassName("bg")[0].style.display="none";
    document.getElementsByClassName("bg2")[0].style.display="none";
    document.getElementsByClassName("kontejner")[0].style.display="none";
    document.body.classList.add("leafsPozadina");
    login.style.display="block";
    dodajEventUlogujSe();
    dodajEventRegistrujSe();
    
     
}
function dodajEventUlogujSe(){
    let ulogujSeDugme=document.querySelector("#login button");
    ulogujSeDugme.addEventListener('click',ulogujSe);
    
}
function dodajEventRegistrujSe(){
let linkRegistrujSe=document.querySelector("#login a:nth-child(1)");
linkRegistrujSe.addEventListener('click',registrujSe);
}
function ulogujSe(){
let korisnickoIme=document.getElementById("korisnickoImeLogin").value;
let sifra=document.getElementById("passwordLogin").value;


fetchLoginUsers().then(users=>{
    let nadjeniUser= users.find(user=>user.korisnickoIme==korisnickoIme && user.sifra==sifra);
    if(nadjeniUser==undefined){
        //Korisnik nije pronadjen
         
    }
    else{
        //korisnik je pronadjen
        
    }
         });
}
function registrujSe(){
    let login=document.getElementById('login');
    let register=document.getElementById('register');
    login.style.display='none';
    console.log(register)
    register.style.display='block';
    
}

export {pokaziLogin};