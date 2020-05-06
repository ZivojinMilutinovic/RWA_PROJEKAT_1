


export default class Igra{
           id:any
           brojOsvojenihPoena:number
           nivoTezine:number
           static generator:number=-1
    constructor(brojOsvojenihPoena:number,nivoTezine:number){
    
        this.id=Igra.generisiId();//jedinstveni identifikator za svaku igru
        this.brojOsvojenihPoena=brojOsvojenihPoena;
        this.nivoTezine=nivoTezine;
    }
      static generisiId(){
         this.generator++;
         return this.generator;
      }

}