import Igra from "./igra";

export default class User{

    godinaRodjenja:string
    ime:string
    prezime:string
    sifra:string
    korisnickoIme:string
    pol:string
    email:string
    grad:string
    najboljiRezultat:number
    odigraneIgre: Igra[]
    constructor(godinaRodjenja:string,ime:string,prezime:string,
        sifra:string,korisnickoIme:string,pol:string,email:string,grad:string)
    {
            
            this.godinaRodjenja=godinaRodjenja;
            this.ime=ime;
            this.prezime=prezime;
            this.sifra=sifra;
            this.korisnickoIme=korisnickoIme;
            this.pol=pol;
            this.email=email;
            this.grad=grad;
            this.najboljiRezultat=0;
            this.odigraneIgre=[];
    } 
}
