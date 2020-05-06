import User from "./user"

export default class UserManagement{
                userArray:User[]
        constructor(userArray:User[]){
            this.userArray=userArray;
           
        }
        filtrirajKorisnikePoBrojuPoena(brojPoena:number){
            let niz=[]
        return  this.userArray.filter(user=>user.najboljiRezultat>brojPoena)
        }
        pronadjiKorisnikaPoImenu(korisnickoIme:string){
                return this.userArray.find(user=>user.korisnickoIme==korisnickoIme)
        }
        vratiNizRezultataKorisnika(){
            return this.userArray.map(user=>user.najboljiRezultat);
        }
        ukupanRezultatSvihKorisnika(){
            let ukupanBrojPoena=this.vratiNizRezultataKorisnika().reduce((acc:number,currentValue:number)=>acc+currentValue)
            return  ukupanBrojPoena;
        }
        odstamajSveKorisnike(){
            this.userArray.forEach(user=>console.log(user))
        }

        
}