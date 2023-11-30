"use strict"
const urlParams = new URLSearchParams(window.location.search);

function toggleMenuFold(){
    let catalogBtn = document.querySelector("#catalog");
    if(catalogBtn.className == "folded"){
        catalogBtn.className = "unfolded";
        catalogBtn.querySelector("#burger").className = "unfolded";
        document.querySelector("#menu").className = "unfolded";
        document.body.className = "unfolded";
    }else{
        catalogBtn.className = "folded";
        catalogBtn.querySelector("#burger").className = "folded";
        document.querySelector("#menu").className = "folded";
        document.body.className = "folded";
    }
}
document.querySelector("#catalog").addEventListener("click", toggleMenuFold);
document.querySelector("#clear_btn").addEventListener("click", function(){
    document.querySelector("#search input").value = "";
});
window.onload = function(){
    if(localStorage.getItem("liked") == null){
        localStorage.setItem("liked", "");
    }
    if(localStorage.getItem("cart") == null){
        localStorage.setItem("cart", "");
    }
    let good = key_goods?.[urlParams.get("id")];
    if(good != undefined){
        document.querySelector("#name").textContent = good["name"];
        document.querySelector("#rating span").textContent = Math.floor(good["rating"]) == good["rating"] ? good["rating"]+".0" :  good["rating"];
        document.querySelector("main img").src = good["image"];
        let spans = document.querySelectorAll("#price span");
        if(good["discount"] > 0){
            spans[0].textContent = "-"+good["discount"]+"%";
            spans[1].textContent = good["prices"]["new"]+" ₽";
            spans[2].textContent = good["prices"]["old"]+" ₽";
        }else{
            spans[0].style.display = "none";
            spans[1].textContent = good["prices"]["old"]+" ₽";
        }
        let in_cart = localStorage.getItem("cart").indexOf(urlParams.get("id"));
        let is_liked = localStorage.getItem("liked").indexOf(urlParams.get("id"));
        let buttons = document.querySelectorAll("#buttons button");
        if(in_cart >= 0){
            buttons[0].className = "selected";
            buttons[0].querySelector("span").textContent = "В корзине";
        }
        if(is_liked >= 0){
            buttons[1].className = "selected";
        }
        buttons[0].addEventListener("click", function(){
            in_cart = localStorage.getItem("cart").indexOf(urlParams.get("id"));
            if(in_cart < 0){
                buttons[0].className = "selected";
                buttons[0].querySelector("span").textContent = "В корзине";
                localStorage.setItem("cart", localStorage.getItem("cart")+urlParams.get("id")+",");
            }else{
                location.href = "cart.html";
            }
        });
        buttons[1].addEventListener("click", function(){
            is_liked = localStorage.getItem("liked").indexOf(urlParams.get("id"));
            if(is_liked < 0){
                buttons[1].className = "selected";
                localStorage.setItem("liked", localStorage.getItem("liked")+urlParams.get("id")+",");
            }else{
                localStorage.setItem("liked", localStorage.getItem("liked").replace(urlParams.get("id")+",", ""));
                buttons[1].classList.remove("selected");
            }
        });
    }else{
        location.href = "index.html";
    }
}