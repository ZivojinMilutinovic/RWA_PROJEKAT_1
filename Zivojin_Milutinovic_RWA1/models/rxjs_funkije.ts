import {interval,timer,fromEvent, Observable,zip, Subscription,concat,empty,merge} from "rxjs";
import {take,takeUntil,map,switchMap,scan,filter,startWith,delay, tap,repeat,finalize} from "rxjs/operators";


let izabraniNivoIgrice:number=0;
let zadnjeZapamcenBroj:number;
function izaberiNasumicnoPolje() {
    let random=()=>Math.floor(Math.random()*8);
    let brojKolone:number=random();
    let slucajnaKolona:Element=document.querySelectorAll(".kolona")[brojKolone];
    
    let brojReda:number=random();
    
    let slucajnoPolje:Element=slucajnaKolona.querySelectorAll(".polje")[brojReda];
    slucajnoPolje.classList.add('crvenoPolje');
    slucajnoPolje.addEventListener("mousedown",()=>
    {
        if(slucajnoPolje.classList.contains('crvenoPolje'))
        slucajnoPolje.classList.add("kliknutoPolje");

    })
    slucajnoPolje.addEventListener("mouseup",()=>
    {
        if(slucajnoPolje.classList.contains('kliknutoPolje'))
        slucajnoPolje.classList.remove("kliknutoPolje");

    })
    
    return slucajnoPolje;
    
    }


    function izaberiTrajenjeIgre(izabraniNivoIgriceMoj:number){
        izabraniNivoIgrice=izabraniNivoIgriceMoj;
        if(izabraniNivoIgrice==0)
        return 10;
        else if(izabraniNivoIgrice==1)
        return 15;
        else if(izabraniNivoIgrice==2)
        return 20;

    }

  export  function RxZasvetliPojaNatabli(izabraniNivo:number){
         //polja se emituju dok tajmer ne istekne tj. dok tajmer ne emituje vrednost
          
        const source:Observable<number>=interval(1000);
        const timer$:Observable<number>=timer((izaberiTrajenjeIgre(izabraniNivo)!+1)*1000);
        const polja$:Subscription=source.pipe(map(izaberiNasumicnoPolje),takeUntil(timer$))
        .subscribe((slucajnoPolje)=>setTimeout(()=>slucajnoPolje.classList.remove('crvenoPolje'),999));
        prosecnoVremeZaKlik();
        vremeJednogKlikaremeKlika();
        poeniPrvaIgra();
    }

    function vremeJednogKlikaremeKlika(){
        let divEl:HTMLElement|null=document.getElementById("vremePoslednjegKlika");
            fromEvent(document,'click').pipe(switchMap(mouseClickDuration)).
            subscribe((val)=>divEl!.innerHTML="Vreme poslednjeg klika: "+val+"ms");
    }
    function prosecnoVremeZaKlik(){
        
        let divEl:HTMLElement|null=document.getElementById("vremeProsecnogKlika");
        fromEvent(document,'click').pipe(switchMap(mouseClickDuration)
        ,scan((acc:number,curr:number)=>acc+curr,0)).
        subscribe((val)=>divEl!.innerHTML="Vreme prosecnog klika: "+val/1000+"s");
    }

    function poeniPrvaIgra(){
        let divEl:HTMLElement|null=document.getElementById("osvojeniPoeniPrvaIgra");
        fromEvent(document,'click').pipe(map(ev=>(ev.target as HTMLElement))
        ,filter(el=>el.classList.contains("crvenoPolje")),map(val=>1),
        scan((acc:number,curr:number)=>acc+curr,0))
        .subscribe((vrednost)=>divEl!.innerHTML="Ostvereni broj poena:"+vrednost);
    }


    function mouseClickDuration(){
                
               const vremePoc$:Observable<Date>=fromEvent(document,'mousedown').pipe(map(()=>new Date()));
               const vremeKraj$:Observable<Date>=fromEvent(document,'mouseup').pipe(map(()=>new Date()));
               

                const mouseClickDuration:Observable<number>=zip(vremePoc$,vremeKraj$).pipe(
                    map((arr)=>Math.abs(arr[0].getTime()-arr[1].getTime()))
                );
                return mouseClickDuration;
               
    }
    function takeOneClickLocation(){
        const oneClickEvent:Subscription=fromEvent(document,'click').pipe(
            take(1),
            
        ).subscribe(console.log)
    }
//Druga igra
export  function postaviObavestenjeZaDruguIgru(){

    const userMessage:HTMLElement | null = document.getElementById('message');
//empty pravi Observer koji se odmah zavrsi

const delayedMessage = (message:any, delayedTime:number = 1000) => {
  return empty().pipe(startWith(message), delay(delayedTime));
};
document.body.classList.add("crnaPozadina");
document.body.classList.remove("igraPrva");
//Ovo da bi brze proveravao kod
document.body.addEventListener("dblclick",prikaziRotirajucuKocku);
concat(
  delayedMessage('Spremite se brzo za drugu igru!',2000),
  delayedMessage('Pojavice vam se rotirajuca kocka i kad zavrsi rotiranje upisite sto brze mozete broj sa kocke u input polje',3000),
  delayedMessage('Pazite!Bilo koj broj moze da vam se padne :)',5000),
  delayedMessage(3,2000),
  delayedMessage(2),
  delayedMessage(1),
  delayedMessage('Napred!'),
  delayedMessage('', 500)
).subscribe((message: any) => (userMessage!.innerHTML = message),()=>{},prikaziRotirajucuKocku);

//zovemo funkciju koliko se kocka vrti puta


}


function prikaziRotirajucuKocku(){
    
    (document.querySelector("#igra2 .app")! as HTMLElement).style.display="none"
    document.body.classList.add("igraPrva");
   document.body.classList.remove("crnaPozadina");
   document.getElementById("rotirajucaKocka")!.style.display="block";
   document.getElementById("sakrijDivKocka")!.style.display="block";
   pogodiBrojNaKocki();
}

function vratiBrojRotiranjaKocke(izabraniNivo:number)
{
    if(izabraniNivo==0)
    return 4;
    else if(izabraniNivo==1)
    return 6;
    else return 9;
}

//dok ne emituje timer prikazuju se polja
function spojiIntervaleUJedan(brojRotiranja:number){

    let inputKocka:HTMLInputElement | null=document.getElementById("inputKocka") as HTMLInputElement;
    let randomTime=Math.floor(Math.random()*7+4)*1000;//moze minimum 4s da traje 
   
    let front:HTMLElement=document.querySelector(".front") as HTMLElement;
    let stage:HTMLElement=document.querySelector(".stage") as HTMLElement;
    const first = interval(900);
    inputKocka!.focus();
const second = interval(300);

const third = interval(500);

const fourth = interval(700);
const timer$=timer(randomTime);

const randomSequence$ =concat(merge(
    first,
    second,
    third,
    fourth
  ).pipe(tap(()=>{stage.style.animation="rotate 0.1s ease-in infinite";})
  ,takeUntil(timer$)),empty().pipe(finalize(()=>stage.style.animation="none")),
  empty().pipe(delay(3000)))
  .pipe(finalize(focusNaInputfield),repeat(brojRotiranja));
  randomSequence$.subscribe((val)=>front.innerHTML=(val+Math.floor(Math.random()*500+1)).toString(),
  ()=>{},sakrijKockineElemente);

}

function sakrijKockineElemente(){
    document.getElementById("rotirajucaKocka")!.style.display='none';
    document.getElementById("inputDrugaIgra")!.style.display='none';
}

function focusNaInputfield(){
    let stage:HTMLElement=document.querySelector(".stage") as HTMLElement;
    let front:HTMLElement=document.querySelector(".front") as HTMLElement;
    let drugaIgraPoeni: HTMLElement | null=document.getElementById("drugaIgraPoeni");
    let inputKocka:HTMLInputElement | null=document.getElementById("inputKocka") as HTMLInputElement;
    stage.style.animation="none";
    console.log(inputKocka.value);
    console.log(front.innerHTML);
    let trPoeni=Number.parseInt(drugaIgraPoeni!.innerHTML.split(":")[1]);
    if(inputKocka.value==front.innerHTML)
    {
        
        drugaIgraPoeni!.innerHTML="Broj pogodjenih brojeva:"+(trPoeni+1);
    }
    
    inputKocka!.value="";
    
    inputKocka!.focus();
    
}


// rotate 0.1s ease-in  infinite
export function pogodiBrojNaKocki(){
    
    let brojRotiranja:number=vratiBrojRotiranjaKocke(izabraniNivoIgrice);
    
  spojiIntervaleUJedan(brojRotiranja);
  

}

