import User from "./user"
import UserManagement from "./usermanagment";
import {RxZasvetliPojaNatabli,postaviObavestenjeZaDruguIgru, pogodiBrojNaKocki} from './rxjs_funkije';
import Igra from "./igra";

let izabraniNivoIgrice:number;
let igra:Igra;

const URL="http://localhost:3000/";



 async function fetchLoginUsers(){
    return fetch(URL+"users").then(res=>res.json()).catch(err=>console.log(err));
    }

function pokaziLogin(ev:Event)
{
    
    let klinutiElement:(Node & ParentNode) | null=(ev.target as HTMLElement).parentNode ;
    izabraniNivoIgrice=(klinutiElement! as any).id;
    igra=new Igra(0,izabraniNivoIgrice);
    
    let login:HTMLElement|null=document.getElementById('login');
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
    let ulogujSeDugme:HTMLElement|null=document.querySelector("#login button");
    ulogujSeDugme!.addEventListener('click',ulogujSe);
    
}

function dodajEventRegistrujSe(){
let linkRegistrujSe:HTMLElement|null=document.querySelector("#login a:nth-child(1)");
linkRegistrujSe!.addEventListener('click',registrujSe);
}

function ulogujSe(){
let korisnickoIme:string=(document.getElementById("korisnickoImeLogin") as HTMLInputElement).value;
let sifra:string=(document.getElementById("passwordLogin") as HTMLInputElement).value;


fetchLoginUsers().then(users=>{
    
    let nadjeniUser:User= users.find((user:User)=>user.korisnickoIme==korisnickoIme && user.sifra==sifra);
    
    let loginDivGreska:HTMLElement|null=document.getElementById("loginGreska");
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
    let login:HTMLElement|null=document.getElementById('login');
    let register:HTMLElement|null=document.getElementById('register');
    login!.style.display='none';
    document.body.classList.remove("leafsPozadina");
    document.body.classList.add("seaPozadina");
    register!.style.display='block';
    let buttonRegistrujSe:HTMLElement|null=document.getElementById("btnRegistrujSe");
   
    buttonRegistrujSe!.addEventListener('click',obradiRegistarFormu);
    
}

function obradiRegistarFormu() {
    let inputIme:string=(document.getElementById("imeRegister") as HTMLInputElement).value;
    let inputPrezime:string=(document.getElementById("prezimeRegister") as HTMLInputElement).value;
    let inputDatumRodjenja:string=(document.getElementById("datumRodjenja") as HTMLInputElement).value;
    let inputGrad:string=(document.getElementById("gradRegister") as HTMLInputElement).value;
    let inputEmail:string=(document.getElementById("emailRegister") as HTMLInputElement).value;
    let inputKorisnckoIme:string=(document.getElementById("korisnickoImeRegister") as HTMLInputElement).value;
    let inputPassword:string=(document.getElementById("passwordRegister") as HTMLInputElement).value;
    let inputConfirmPassword:string=(document.getElementById("confirmPasswordRegister") as HTMLInputElement).value;
    let pol:string|undefined=vratiIzabraniPol();
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
  
    let user:User=new User(inputDatumRodjenja,inputIme,inputPrezime,inputPassword
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
    let polRadioButtons:NodeListOf<HTMLElement>=document.getElementsByName("gender");
    for(let i=0;i<polRadioButtons.length;i++){
        if((polRadioButtons[i] as HTMLInputElement).checked){
            return (polRadioButtons[i] as HTMLInputElement).value;
        }

    }
}

function obavestiGreskuRegister(nazivGreske :string) {
    let spanGreska:HTMLElement|null=document.getElementById("registarGreska");
    spanGreska!.innerHTML=nazivGreske;
    
    
}

 function nazadNaPocetnu(){
    let pocetnaDugmici:HTMLCollectionOf<Element>=document.getElementsByClassName('pocetna');
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
        let userManagment:UserManagement=new UserManagement(myusers);//klasa koja kao interaguje sa bazom
        let ulogovaniKorisnik:User|undefined=userManagment.pronadjiKorisnikaPoImenu(korisnickoIme);
        nacrtajProfilnuStranu(ulogovaniKorisnik!)
        
    });
   
   
}
export function dodajEventNaPrvuIgru(){
   let el:HTMLElement|null= document.getElementById("zapocniIgruDugme");
   
   el!.addEventListener("click",()=>
    {
        
        document.getElementById('profil')!.style.display='none';
        document.body.classList.remove('profilPozadina');
        document.body.style.display="block";
        document.body.classList.add('igraPrva');
        document.getElementById('igra1')!.style.display='block';
        generisiTablu();
    });
   document.getElementById("btn1Igra1")?.addEventListener("click",prvaIgraZapoceta);
   document.getElementById("btnIgra1")?.addEventListener("click",predjiNaSledecuIgru);
}



function prvaIgraZapoceta(){
    
RxZasvetliPojaNatabli(izabraniNivoIgrice);



}

function predjiNaSledecuIgru() {
    let divEl:HTMLElement|null=document.getElementById("osvojeniPoeniPrvaIgra");
let elm:string|undefined=divEl?.innerHTML.split(":")[1];
let parsovanInt:number|undefined=Number.parseInt(elm!);
if(parsovanInt==NaN)
parsovanInt=0;
igra.brojOsvojenihPoena+=Number.parseInt(elm!);
document.getElementById('igra1')!.style.display='none';
document.getElementById('igra2')!.style.display='block';

postaviObavestenjeZaDruguIgru();
pogodiBrojNaKocki();

}



function generisiTablu(){
    let beloSledecePolje:boolean=true;
    let tablaDiv:Element|null=document.getElementsByClassName("board")[0];
    for(let i=0;i<8;i++){
        let divKolona:HTMLElement|null=document.createElement("div");
        divKolona.classList.add("kolona");
        tablaDiv.appendChild(divKolona);
        for(let j=0;j<8;j++){
                let divPolje=document.createElement("div");
                divPolje.classList.add("polje");
                if(beloSledecePolje)
                divPolje.classList.add("belaBoja");
                else
                divPolje.classList.add("crnaBoja");
                beloSledecePolje=beloSledecePolje==true ? false : true ;
                divKolona.appendChild(divPolje);

        }
        beloSledecePolje=beloSledecePolje==true ? false : true ;
    }
}





function nacrtajProfilnuStranu(ulogovaniKorisnik:User) {
    
    let login:HTMLElement|null=document.getElementById('login');
    login!.style.display='none';
    let profil:HTMLElement|null=document.getElementById('profil')
    profil!.style.display='block';
    document.body.style.display="flex";
    document.body.classList.remove("leafsPozadina");
    document.body.classList.add("profilPozadina");
    let spanEl:HTMLCollectionOf<Element>=document.body.getElementsByClassName("marquee");
    for(let i=0;i<spanEl.length;i++){
        spanEl[i].innerHTML="Zdravo "+ ulogovaniKorisnik.korisnickoIme;
    }
    
}


export {pokaziLogin,nazadNaPocetnu};