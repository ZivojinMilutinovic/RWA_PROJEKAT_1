


export default class Igra{

    constructor(brojOsvojenihPoena,nivoTezine){
        this.id=Igra.incrementId();//jedinstveni identifikator za svaku igru
        this.brojOsvojenihPoena=brojOsvojenihPoena;
        this.nivoTezine=nivoTezine;
    }
      static incrementId(){
          if(!this.latestId) 
          this.latestId=0;
          else this.latestId++;
          return this.latestId;
      }

}