"use strict";
document.querySelector("#clear_btn").addEventListener("click", function(){
    document.querySelector("#search input").value = "";
});
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
let scroll = document.querySelectorAll("#popular button");
let scroll_panel = 0;
let panels = document.querySelectorAll("#popular > div > div");
scroll[0].addEventListener("click", function(){
    panels[scroll_panel].className = "hidden_r";
    scroll_panel = scroll_panel-1 < 0 ? panels.length-1 : scroll_panel-1;
    panels[scroll_panel].className = "visible_r";
});
scroll[1].addEventListener("click", function(){
    panels[scroll_panel].className = "hidden_l";
    scroll_panel = scroll_panel+1 == panels.length ? 0 : scroll_panel+1;
    panels[scroll_panel].className = "visible_l";
});