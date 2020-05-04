
import {pokaziLogin,nazadNaPocetnu} from "../models/funkcije";
let listItemsIzborNivoa=document.querySelectorAll(".kontejner ul li");
listItemsIzborNivoa.forEach(listItem=>{
    listItem.addEventListener("click",pokaziLogin);
});
nazadNaPocetnu();

