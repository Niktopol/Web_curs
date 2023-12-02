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

let sortState = 0
let cardsArr = [];
function comparator(a, b){
    return Number(a.querySelectorAll("span")[1].textContent.split(" ")[0]) - Number(b.querySelectorAll("span")[1].textContent.split(" ")[0]);
}
function revComparator(a, b){
    return Number(b.querySelectorAll("span")[1].textContent.split(" ")[0]) - Number(a.querySelectorAll("span")[1].textContent.split(" ")[0]);
}
document.getElementById("sort").addEventListener("click", function(){
    let cardsDiv = document.querySelectorAll("main > div")[3];
    let button = document.getElementById("sort");
    button.className = "selected";
    if(sortState == 0){
        cardsArr.sort(comparator);
        button.querySelector("img").setAttribute("src", "images/up.svg")
        sortState += 1
    }else if(sortState == 1){
        cardsArr.sort(revComparator);
        button.querySelector("img").setAttribute("src", "images/down.svg")
        sortState = 2
    }else{
        cardsArr.sort(comparator);
        button.querySelector("img").setAttribute("src", "images/up.svg")
        sortState = 1;
    }
    for(let i of cardsArr){
        cardsDiv.appendChild(i);
    }
});

window.onload = function(){
    let categorized = false;
    let price = (urlParams.get("price") == null || urlParams.get("price") == "") ? 0 : Number(urlParams.get("price"));
    let name = (urlParams.get("name") ?? "").trim().toLowerCase();
    let cards = document.querySelectorAll("main > div")[3];
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    for(let category in goods){
        if(urlParams.get(category) != null){
            document.getElementById(category).checked = true;
            categorized = true;
            for(let good of goods[category]){
                if(good["prices"]["new"] >= price && good["name"].toLowerCase().includes(name)){
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

                    cart.addEventListener("click", function(event){
                        if (event.stopPropagation) {
                            event.stopPropagation();
                            event.preventDefault();
                        }
                        in_cart = localStorage.getItem("cart").indexOf(good["id"]);
                        if(in_cart < 0){
                            cart.className = "selected";
                            localStorage.setItem("cart", localStorage.getItem("cart")+good["id"]+"-1,");
                        }else{
                            location.href = "cart.html";
                        }
                    });
        
                    like.addEventListener("click", function(event){
                        if (event.stopPropagation) {
                            event.stopPropagation();
                            event.preventDefault();
                        }
                        is_liked = localStorage.getItem("liked").indexOf(good["id"]);
                        if(is_liked < 0){
                            like.className = "selected";
                            localStorage.setItem("liked", localStorage.getItem("liked")+good["id"]+",");
                        }else{
                            localStorage.setItem("liked", localStorage.getItem("liked").replace(good["id"]+",", ""));
                            like.classList.remove("selected");
                        }
                    });

                    a.appendChild(img);
                    a.appendChild(price);
                    a.appendChild(p);
                    a.appendChild(btns); 
                    cards.appendChild(a);
                    cardsArr.push(a);
                }
            }
        }
    }
    if (!categorized){
        for(let id in key_goods){
            if(key_goods[id]["prices"]["new"] >= price && key_goods[id]["name"].toLowerCase().includes(name)){
                let a = document.createElement("a");
                a.href = "good.html?id="+id;
                let img = document.createElement("img");
                img.setAttribute("src", key_goods[id]["image"]);
                let price = document.createElement("div");
                price.className = "price";
                let span1 = document.createElement("span");
                let span2 = document.createElement("span");
                let span3 = document.createElement("span");
                if(key_goods[id]["discount"] > 0){
                    span1.textContent = "-"+key_goods[id]["discount"]+"%";
                    span2.textContent = key_goods[id]["prices"]["new"]+" ₽";
                    span3.textContent = key_goods[id]["prices"]["old"]+" ₽";
                }else{
                    span1.style.display = "none";
                    span2.textContent = key_goods[id]["prices"]["old"]+" ₽";
                }
                price.appendChild(span1);
                price.appendChild(span2);
                price.appendChild(span3);
                let p = document.createElement("p");
                p.textContent = key_goods[id]["name"];
                let btns = document.createElement("div");
                btns.className = "cartnlike";
                let cart = document.createElement("button");
                let cartimg = document.createElement("img");
                cartimg.setAttribute("src", "images/cart.svg");
                let in_cart = localStorage.getItem("cart").indexOf(id);
                if(in_cart >= 0){
                    cart.className = "selected";
                }
                cart.appendChild(cartimg);
                let like = document.createElement("button");
                let likeimg = document.createElement("img");
                likeimg.setAttribute("src", "images/heart.svg")
                let is_liked = localStorage.getItem("liked").indexOf(id);
                if(is_liked >= 0){
                    like.className = "selected";
                }
                
                like.appendChild(likeimg);
                btns.appendChild(cart);
                btns.appendChild(like);

                cart.addEventListener("click", function(event){
                    if (event.stopPropagation) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    in_cart = localStorage.getItem("cart").indexOf(id);
                    if(in_cart < 0){
                        cart.className = "selected";
                        localStorage.setItem("cart", localStorage.getItem("cart")+id+"-1,");
                    }else{
                        location.href = "cart.html";
                    }
                });
    
                like.addEventListener("click", function(event){
                    if (event.stopPropagation) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    is_liked = localStorage.getItem("liked").indexOf(id);
                    if(is_liked < 0){
                        like.className = "selected";
                        localStorage.setItem("liked", localStorage.getItem("liked")+id+",");
                    }else{
                        localStorage.setItem("liked", localStorage.getItem("liked").replace(id+",", ""));
                        like.classList.remove("selected");
                    }
                });

                a.appendChild(img);
                a.appendChild(price);
                a.appendChild(p);
                a.appendChild(btns); 
                cards.appendChild(a);
                cardsArr.push(a);
            }
        }
    }
}