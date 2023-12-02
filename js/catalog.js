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
document.querySelector("#clear_btn").addEventListener("click", function(){
    document.querySelector("#search input").value = "";
});

window.onload = function(){
    let categorized = false;
    let price = (urlParams.get("price") == null || urlParams.get("price") == "") ? 0 : Number(urlParams.get("price"));
    let name = (urlParams.get("name") ?? "").trim();
    let cards = document.querySelectorAll("main > div")[3];
    for(let category in goods){
        if(urlParams.get(category) != null){
            categorized = true;
            for(let good of goods[category]){
                if(good["prices"]["new"] >= price && good["name"].includes(name)){
                    let a = document.createElement("a");
                    a.href = "good.html?id="+good["id"];
                    let img = document.createElement("img");
                    img.setAttribute("src", good["image"]);
                    let price = document.createElement("div");
                    price.className = "price";
                    let span1 = document.createElement("span");
                    let span2 = document.createElement("span");
                    let span3 = document.createElement("span");
                    if(good["discount"] > 0){
                        span1.textContent = "-"+good["discount"]+"%";
                        span2.textContent = good["prices"]["new"]+" ₽";
                        span3.textContent = good["prices"]["old"]+" ₽";
                    }else{
                        span1.style.display = "none";
                        span2.textContent = good["prices"]["old"]+" ₽";
                    }
                    price.appendChild(span1);
                    price.appendChild(span2);
                    price.appendChild(span3);
                    let p = document.createElement("p");
                    p.textContent = good["name"];
                    let btns = document.createElement("div");
                    btns.className = "cartnlike";
                    let cart = document.createElement("button");
                    let cartimg = document.createElement("img");
                    cartimg.setAttribute("src", "images/cart.svg");
                    let in_cart = localStorage.getItem("cart").indexOf(good["id"]);
                    if(in_cart >= 0){
                        cart.className = "selected";
                    }
                    cart.appendChild(cartimg);
                    let like = document.createElement("button");
                    let likeimg = document.createElement("img");
                    likeimg.setAttribute("src", "images/heart.svg")
                    let is_liked = localStorage.getItem("liked").indexOf(good["id"]);
                    if(is_liked >= 0){
                        like.className = "selected";
                    }
                    
                    like.appendChild(likeimg);
                    btns.appendChild(cart);
                    btns.appendChild(like);

                    a.appendChild(img);
                    a.appendChild(price);
                    a.appendChild(p);
                    a.appendChild(btns); 
                    cards.appendChild(a);
                }
            }
        }
    }
}