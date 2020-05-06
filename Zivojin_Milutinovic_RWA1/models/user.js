import Igra from "./igra";

export default class User{
    constructor(godinaRodjenja,ime,prezime,sifra,korisnickoIme,pol,email,grad)
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
