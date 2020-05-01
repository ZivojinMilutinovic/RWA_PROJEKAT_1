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
    let loginDivGreska=document.getElementById("loginGreska");
    if(nadjeniUser==undefined){
        //Korisnik nije pronadjen
        loginDivGreska.innerHTML="Nazalost,pogresili ste sifru ili email.";
    }
    else{
        //korisnik je pronadjen
        otvoriProfilnuStranicu();
    }
         });
}

function registrujSe(){
    let login=document.getElementById('login');
    let register=document.getElementById('register');
    login.style.display='none';
    document.body.classList.remove("leafsPozadina");
    document.body.classList.add("seaPozadina");
    register.style.display='block';
    let buttonRegistrujSe=document.getElementById("btnRegistrujSe");
    buttonRegistrujSe.addEventListener("click",obradiRegistarFormu);
    
}

function obradiRegistarFormu() {
    
}

 function nazadNaPocetnu(){
    let pocetnaDugmici=document.getElementsByClassName('pocetna');
    for(let i=0;i<pocetnaDugmici.length;i++){
        pocetnaDugmici[i].addEventListener('click',podesiPocetnuStranicu);
    }
}

function podesiPocetnuStranicu(){
    document.body.classList.remove(...document.body.classList);
    document.body.querySelector(".bg").style.display="block";
    document.body.querySelector(".bg2").style.display="block";
    document.getElementById("login").style.display="none";
    document.getElementById("register").style.display="none";
    document.body.querySelector(".kontejner").style.display="flex";
    document.body.style.display="flex";
    
}

//Ova funkcija mi je ostala kako se ponasaju elementi

function otvoriProfilnuStranicu(){

}


export {pokaziLogin,nazadNaPocetnu};