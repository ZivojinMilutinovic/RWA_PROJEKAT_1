import User from  "../models/user"
import {pokaziLogin} from "../models/funkcije";
let listItemsIzborNivoa=document.querySelectorAll(".kontejner ul li");
listItemsIzborNivoa.forEach(listItem=>{
    listItem.addEventListener("click",pokaziLogin);
});

