import User from "./user"
import UserManagement from "./usermanagment";



const URL="http://localhost:3000/";



 async function fetchLoginUsers(){
    return fetch(URL+"users").then(res=>res.json()).catch(err=>console.log(err));
    }

function pokaziLogin()
{
    let login=document.getElementById('login');
    document.body.style.display="block";
    (document.getElementsByClassName("bg") as HTMLCollectionOf<HTMLElement>)[0].style.display="none";
    (document.getElementsByClassName("bg2") as HTMLCollectionOf<HTMLElement>)[0].style.display="none";
    (document.getElementsByClassName("kontejner") as HTMLCollectionOf<HTMLElement>)[0].style.display="none";
    document.body.classList.add("leafsPozadina");
    login!.style.display="block";
    dodajEventUlogujSe();
    dodajEventRegistrujSe();  
}

function dodajEventUlogujSe(){
    let ulogujSeDugme=document.querySelector("#login button");
    ulogujSeDugme!.addEventListener('click',ulogujSe);
    
}

function dodajEventRegistrujSe(){
let linkRegistrujSe=document.querySelector("#login a:nth-child(1)");
linkRegistrujSe!.addEventListener('click',registrujSe);
}

function ulogujSe(){
let korisnickoIme=(document.getElementById("korisnickoImeLogin") as HTMLInputElement).value;
let sifra=(document.getElementById("passwordLogin") as HTMLInputElement).value;


fetchLoginUsers().then(users=>{
    
    let nadjeniUser= users.find((user:User)=>user.korisnickoIme==korisnickoIme && user.sifra==sifra);
    
    let loginDivGreska=document.getElementById("loginGreska");
    if(nadjeniUser==undefined){
        //Korisnik nije pronadjen
        loginDivGreska!.innerHTML="Nazalost,pogresili ste sifru ili email.";
    }
    else{
        //korisnik je pronadjen
        otvoriProfilnuStranicu(korisnickoIme);
    }
         });
}

function registrujSe(){
    let login=document.getElementById('login');
    let register=document.getElementById('register');
    login!.style.display='none';
    document.body.classList.remove("leafsPozadina");
    document.body.classList.add("seaPozadina");
    register!.style.display='block';
    let buttonRegistrujSe=document.getElementById("btnRegistrujSe");
   
    buttonRegistrujSe!.addEventListener('click',obradiRegistarFormu);
    
}

function obradiRegistarFormu() {
    let inputIme=(document.getElementById("imeRegister") as HTMLInputElement).value;
    let inputPrezime=(document.getElementById("prezimeRegister") as HTMLInputElement).value;
    let inputDatumRodjenja=(document.getElementById("datumRodjenja") as HTMLInputElement).value;
    let inputGrad=(document.getElementById("gradRegister") as HTMLInputElement).value;
    let inputEmail=(document.getElementById("emailRegister") as HTMLInputElement).value;
    let inputKorisnckoIme=(document.getElementById("korisnickoImeRegister") as HTMLInputElement).value;
    let inputPassword=(document.getElementById("passwordRegister") as HTMLInputElement).value;
    let inputConfirmPassword=(document.getElementById("confirmPasswordRegister") as HTMLInputElement).value;
    let pol=vratiIzabraniPol();
    if(inputIme=="")
    {
        obavestiGreskuRegister("Ime ne moze biti prazno");
        return;
    }
    if(inputPrezime=="")
    {
        obavestiGreskuRegister("Prezime ne moze biti prazno");
        return;
    }
    if(inputEmail=="")
    {
        obavestiGreskuRegister("Email ne moze biti prazno");
        return;
    }
    if(inputKorisnckoIme=="")
    {
        obavestiGreskuRegister("korisnicko Ime ne moze biti prazno");
        return;
    }
    if(inputPassword=="")
    {
        obavestiGreskuRegister("Niste uneli sifru");
        return;
    }
    if(inputPassword!==inputConfirmPassword){
        obavestiGreskuRegister("Sifre se ne poklapaju");
        return;
    }
  
    let user=new User(inputDatumRodjenja,inputIme,inputPrezime,inputPassword
        ,inputKorisnckoIme,pol!,inputEmail,inputGrad);
        ubaciUseraUBazu(user).then(()=>podesiPocetnuStranicu()).catch(er=>console.log(er));
      
}

async function ubaciUseraUBazu(user : User){
    return fetch(URL+"users",{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    });
}

function vratiIzabraniPol(){
    let polRadioButtons=document.getElementsByName("gender");
    for(let i=0;i<polRadioButtons.length;i++){
        if((polRadioButtons[i] as HTMLInputElement).checked){
            return (polRadioButtons[i] as HTMLInputElement).value;
        }

    }
}

function obavestiGreskuRegister(nazivGreske :string) {
    let spanGreska=document.getElementById("registarGreska");
    spanGreska!.innerHTML=nazivGreske;
    
    
}

 function nazadNaPocetnu(){
    let pocetnaDugmici=document.getElementsByClassName('pocetna');
    for(let i=0;i<pocetnaDugmici.length;i++){
        pocetnaDugmici[i].addEventListener('click',podesiPocetnuStranicu);
    }
}

function podesiPocetnuStranicu(){
    document.body.classList.remove(...(document.body.classList as any));
    (document.body.querySelector(".bg") as HTMLElement).style.display="block";
    (document.body.querySelector(".bg2") as HTMLElement).style.display="block";
    document.getElementById("login")!.style.display="none";
    document.getElementById("register")!.style.display="none";
    document.getElementById("profil")!.style.display="none";
    (document.body.querySelector(".kontejner") as HTMLElement).style.display="flex";
    document.body.style.display="flex";
    
}

//Ova funkcija mi je ostala kako se ponasaju elementi
//prosledicemo zapamti broj poena
function otvoriProfilnuStranicu(korisnickoIme:string){
    fetchLoginUsers().then(myusers=>{
        let userManagment=new UserManagement(myusers);//klasa koja kao interaguje sa bazom
        let ulogovaniKorisnik=userManagment.pronadjiKorisnikaPoImenu(korisnickoIme);
        nacrtajProfilnuStranu(ulogovaniKorisnik!)
        
    });
   
}

function nacrtajProfilnuStranu(ulogovaniKorisnik:User) {
    
    let login=document.getElementById('login');
    login!.style.display='none';
    let profil=document.getElementById('profil')
    profil!.style.display='block';
    document.body.style.display="flex";
    document.body.classList.remove("leafsPozadina");
    document.body.classList.add("profilPozadina");
    let spanEl=document.body.getElementsByClassName("marquee");
    for(let i=0;i<spanEl.length;i++){
        spanEl[i].innerHTML="Zdravo "+ ulogovaniKorisnik.korisnickoIme;
    }
    
}


export {pokaziLogin,nazadNaPocetnu};