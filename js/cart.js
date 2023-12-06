"use strict";
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
document.querySelector("#search_btn").addEventListener("click", function(){
    let search = document.querySelector("#search input").value;
    if(search != ""){
        location.href = "catalog.html?name="+encodeURIComponent(search);
    }
});
document.querySelector("#clear_btn").addEventListener("click", function(){
    document.querySelector("#search input").value = "";
});
let buttons = document.querySelectorAll("main > button");
function toggleCart(to){
    let divs = document.querySelectorAll("main > div > div");
    divs[to].className = "selected";
    divs[Math.abs(to-1)].classList.remove("selected");
    buttons[to].className = "selected";
    buttons[Math.abs(to-1)].classList.remove("selected");
}
buttons[0].addEventListener("click", function(){
    toggleCart(0);
});
buttons[1].addEventListener("click", function(){
    toggleCart(1);
});
let goodsPrice = 0;
function updateCart(){
    let tabs = document.querySelectorAll("main > div > div");
    for(let child of tabs[0].querySelectorAll("a")){
        tabs[0].removeChild(child);
    }
    goodsPrice = 0;
    for(let i of localStorage.getItem("cart").split(",")){
        if(i != ""){
            tabs[0].querySelector("span").style.display = "none";
            tabs[0].querySelector("div").style.display = "block";
            let splitted = i.split("-");
            let a = document.createElement("a");
            a.href = "good.html?id="+splitted[0];
            let img = document.createElement("img");
            img.setAttribute("src", key_goods[splitted[0]]["image"]);
            let priceNdesc = document.createElement("div");
            let price = document.createElement("span");
            price.textContent = key_goods[splitted[0]]["prices"]["new"]+" ₽";
            let desc = document.createElement("p");
            desc.textContent = key_goods[splitted[0]]["name"];
            priceNdesc.appendChild(price);
            priceNdesc.appendChild(desc);
            let buttons = document.createElement("div");
            let minus = document.createElement("button");
            let amount = document.createElement("span");
            let plus = document.createElement("button");
            let remove = document.createElement("button");
            let bin = document.createElement("img");
            bin.setAttribute("src", "images/bin.svg");
            remove.appendChild(bin);
            buttons.appendChild(minus);
            buttons.appendChild(amount);
            amount.textContent = splitted[1];
            buttons.appendChild(plus);
            buttons.appendChild(remove);

            a.appendChild(img);
            a.appendChild(priceNdesc);
            a.appendChild(buttons);
            tabs[0].appendChild(a);

            goodsPrice += Number(splitted[1])*key_goods[splitted[0]]["prices"]["new"];

            minus.addEventListener("click", function(event){
                if (event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if(localStorage.getItem("cart").indexOf(splitted[0]) >= 0){
                    let count = "";
                    for(let i = localStorage.getItem("cart").indexOf(splitted[0]) + splitted[0].length + 1; i < localStorage.getItem("cart").length; i++){
                        if(localStorage.getItem("cart")[i] === ","){
                            break;
                        }
                        count += localStorage.getItem("cart")[i];
                    }
                    let nextCount = Number(count) - 1;
                    if(nextCount <= 0){
                        localStorage.setItem("cart", localStorage.getItem("cart").replace(splitted[0]+"-"+count+",", ""));
                        tabs[0].removeChild(a);
                        updateLiked();
                        if(tabs[0].querySelector("a") == null){
                            tabs[0].querySelector("span").style.display = "block";
                            tabs[0].querySelector("div").style.display = "none";
                        }
                    }else{
                        localStorage.setItem("cart", localStorage.getItem("cart").replace(splitted[0]+"-"+count+",", splitted[0]+"-"+nextCount+","));
                        amount.textContent = (nextCount  <= 99? nextCount :"99+");
                    }
                    goodsPrice -= key_goods[splitted[0]]["prices"]["new"];
                    tabs[0].querySelector("div").textContent = "Итого: "+goodsPrice+" ₽";
                }else{
                    updateCart();
                    updateLiked();
                }
            });
            plus.addEventListener("click", function(event){
                if (event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if(localStorage.getItem("cart").indexOf(splitted[0]) >= 0){
                    let count = "";
                    for(let i = localStorage.getItem("cart").indexOf(splitted[0]) + splitted[0].length + 1; i < localStorage.getItem("cart").length; i++){
                        if(localStorage.getItem("cart")[i] === ","){
                            break;
                        }
                        count += localStorage.getItem("cart")[i];
                    }
                    let nextCount = Number(count) + 1;
                    localStorage.setItem("cart", localStorage.getItem("cart").replace(splitted[0]+"-"+count+",", splitted[0]+"-"+nextCount+","));
                    amount.textContent = (nextCount  <= 99? nextCount :"99+");
                    goodsPrice += key_goods[splitted[0]]["prices"]["new"];
                    tabs[0].querySelector("div").textContent = "Итого: "+goodsPrice+" ₽";
                }else{
                    updateCart();
                    updateLiked();
                }
            });
            remove.addEventListener("click", function(event){
                if (event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if(localStorage.getItem("cart").indexOf(splitted[0]) >= 0){
                    let count = "";
                    for(let i = localStorage.getItem("cart").indexOf(splitted[0]) + splitted[0].length + 1; i < localStorage.getItem("cart").length; i++){
                        if(localStorage.getItem("cart")[i] === ","){
                            break;
                        }
                        count += localStorage.getItem("cart")[i];
                    }
                    localStorage.setItem("cart", localStorage.getItem("cart").replace(splitted[0]+"-"+count+",", ""));
                    tabs[0].removeChild(a);
                    updateLiked();
                    if(tabs[0].querySelector("a") == null){
                        tabs[0].querySelector("span").style.display = "block";
                        tabs[0].querySelector("div").style.display = "none";
                    }
                    goodsPrice -= key_goods[splitted[0]]["prices"]["new"]*Number(count);
                    tabs[0].querySelector("div").textContent = "Итого: "+goodsPrice+" ₽";
                }else{
                    updateCart();
                    updateLiked();
                }
            });
        }
    }
    tabs[0].querySelector("div").textContent = "Итого: "+goodsPrice+" ₽";
}
function updateLiked(){
    let tabs = document.querySelectorAll("main > div > div");
    for(let child of tabs[1].querySelectorAll("a")){
        tabs[1].removeChild(child);
    }
    
    for(let i of localStorage.getItem("liked").split(",")){
        if(i != ""){
            tabs[1].querySelector("span").style.display = "none";
            
            let a = document.createElement("a");
            a.href = "good.html?id="+i;
            let img = document.createElement("img");
            img.setAttribute("src", key_goods[i]["image"]);
            let price = document.createElement("div");
            price.className = "price";
            let span1 = document.createElement("span");
            let span2 = document.createElement("span");
            let span3 = document.createElement("span");
            if(key_goods[i]["discount"] > 0){
                span1.textContent = "-"+key_goods[i]["discount"]+"%";
                span2.textContent = key_goods[i]["prices"]["new"]+" ₽";
                span3.textContent = key_goods[i]["prices"]["old"]+" ₽";
            }else{
                span1.style.display = "none";
                span2.textContent = key_goods[i]["prices"]["old"]+" ₽";
            }
            price.appendChild(span1);
            price.appendChild(span2);
            price.appendChild(span3);
            let p = document.createElement("p");
            p.textContent = key_goods[i]["name"];
            let btns = document.createElement("div");
            btns.className = "cartnlike";
            let cart = document.createElement("button");
            let cartimg = document.createElement("img");
            cartimg.setAttribute("src", "images/cart.svg");
            let in_cart = localStorage.getItem("cart").indexOf(i);
            if(in_cart >= 0){
                cart.className = "selected";
            }
            cart.appendChild(cartimg);
            let like = document.createElement("button");
            let likeimg = document.createElement("img");
            likeimg.setAttribute("src", "images/heart.svg")
            like.className = "selected";
            
            like.appendChild(likeimg);
            btns.appendChild(cart);
            btns.appendChild(like);

            a.appendChild(img);
            a.appendChild(price);
            a.appendChild(p);
            a.appendChild(btns); 
              
            cart.addEventListener("click", function(event){
                if (event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                in_cart = localStorage.getItem("cart").indexOf(i);
                cart.className = "selected";
                if(in_cart < 0){
                    localStorage.setItem("cart", localStorage.getItem("cart")+i+"-1,");
                    updateCart();
                }else{
                    toggleCart(0);
                }
            });

            like.addEventListener("click", function(event){
                if (event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if(localStorage.getItem("liked").indexOf(i) >= 0){
                    localStorage.setItem("liked", localStorage.getItem("liked").replace(i+",", ""));
                    tabs[1].removeChild(a);
                    if(tabs[1].querySelector("a") == null){
                        tabs[1].querySelector("& > span").style.display = "block";
                    }
                }else{
                    updateLiked();
                }
            });
            tabs[1].appendChild(a); 
        }
    }
}
window.onload = function (){
    if(localStorage.getItem("liked") == null){
        localStorage.setItem("liked", "");
    }
    if(localStorage.getItem("cart") == null){
        localStorage.setItem("cart", "");
    }
    updateCart();
    updateLiked();
    if(urlParams.get("liked") == null){
        toggleCart(0);
    }else{
        toggleCart(1);
    }
};