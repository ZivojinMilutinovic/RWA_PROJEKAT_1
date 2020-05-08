import {interval,timer,fromEvent, Observable,zip, Subscription,concat,empty,merge,generate} from "rxjs";
import {take,takeUntil,map,switchMap,scan,filter,startWith,delay, takeLast} from "rxjs/operators";


let izabraniNivoIgrice:number;
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

  export  function RxZasvetliPojaNatabli(izabraniNivoIgrice:number){
         //polja se emituju dok tajmer ne istekne tj. dok tajmer ne emituje vrednost
        const source:Observable<number>=interval(1000);
        const timer$:Observable<number>=timer((izaberiTrajenjeIgre(izabraniNivoIgrice)!+1)*1000);
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
}

function vratiBrojRotiranjaKocke(izabraniNivoIgrice:number)
{
    if(izabraniNivoIgrice==0)
    return 4;
    else if(izabraniNivoIgrice==1)
    return 6;
    else return 9;
}
// rotate 0.1s ease-in  infinite
export function pogodiBrojNaKocki(){
    let brojRotiranja:number=vratiBrojRotiranjaKocke(izabraniNivoIgrice);
    let front:HTMLElement=document.querySelector(".front") as HTMLElement;
    for(let i:number=0;i<brojRotiranja;i++){
        let randomTime:number=Math.floor(Math.random()*10+1);
        let randomNumber:number=Math.floor(Math.random()*1000+1);


    }

}

