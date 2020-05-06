export default class UserManagement{

        constructor(userArray){
            this.userArray=userArray;
           
        }
        filtrirajKorisnikePoBrojuPoena(brojPoena){
            let niz=[]
        return  this.userArray.filter(user=>user.najboljiRezultat>brojPoena)
        }
        pronadjiKorisnikaPoImenu(korisnickoIme){
                return this.userArray.find(user=>user.korisnickoIme==korisnickoIme)
        }
        vratiNizRezultataKorisnika(){
            return this.userArray.map(user=>user.najboljiRezultat);
        }
        ukupanRezultatSvihKorisnika(){
            let ukupanBrojPoena=this.userArray.reduce((acc,currentValue)=>acc+currentValue)
            return  ukupanBrojPoena;
        }
        odstamajSveKorisnike(){
            this.userArray.forEach(user=>console.log(user))
        }

        
}