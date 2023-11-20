"use strict";
document.querySelectorAll(".serv_fr button").forEach(function(elem){
    elem.addEventListener("click", function(){
        let fr = elem.parentNode.parentNode.querySelector(".serv_fr");
        let back = elem.parentNode.parentNode.querySelector(".serv_back");
        fr.className = fr.className.split(" ")[0]+ " " + "hidden";
        back.className = back.className.split(" ")[0]+ " " + "shown";
    });
});
document.querySelectorAll(".serv_back").forEach(function(elem){
    elem.addEventListener("click", function(){
        let fr = elem.parentNode.querySelector(".serv_fr");
        let back = elem.parentNode.querySelector(".serv_back");
        fr.className = fr.className.split(" ")[0]+ " " + "shown";
        back.className = back.className.split(" ")[0]+ " " + "hidden";
    });
});