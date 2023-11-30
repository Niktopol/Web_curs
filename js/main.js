"use strict";
//REMOVE
function clearMem(){
    localStorage.clear();
}
//
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
document.querySelector("#welcome button").addEventListener("click", toggleMenuFold);
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

let scroll_panel = 0;
let panels;
let pos = document.querySelector("#scroll_control span");
function initScroller(){
    let scroll = document.querySelectorAll("#popular .scroll_btn");
    panels = document.querySelectorAll("#popular > div > div");
    pos.textContent = (panels.length > 0? 1 : 0)+"/"+panels.length;
    scroll[0].addEventListener("click", function(){
        if(panels.length > 1){
            scroll[0].disabled = true;
            setTimeout(function(){scroll[0].disabled = false}, 300)
            panels[scroll_panel].className = "hidden_r";
            scroll_panel = scroll_panel-1 < 0 ? panels.length-1 : scroll_panel-1;
            panels[scroll_panel].className = "visible_r";
            pos.textContent = scroll_panel+1+"/"+panels.length;
        }
    });
    scroll[1].addEventListener("click", function(){
        if(panels.length > 1){
            scroll[1].disabled = true;
            setTimeout(function(){scroll[1].disabled = false}, 300)
            panels[scroll_panel].className = "hidden_l";
            scroll_panel = scroll_panel+1 == panels.length ? 0 : scroll_panel+1;
            panels[scroll_panel].className = "visible_l";
            pos.textContent = scroll_panel+1+"/"+panels.length;
        }
    });

}
window.onload = function(){
    if(localStorage.getItem("liked") == null){
        localStorage.setItem("liked", "");
    }
    if(localStorage.getItem("cart") == null){
        localStorage.setItem("cart", "");
    }
    let popular = [];
    let popItems = document.querySelectorAll("#popular > div")[0];
    for (let category in goods){
        for (let item of goods[category]){
            if(item.rating == 5 && item.discount > 0){
                popular.push(item);
            }
        }
    }
    for(let i = 0; i < (Math.ceil(popular.length/4)); i++){
        let div = document.createElement("div");
        for(let j = 0; j < ((popular.length - 4*i) >= 4? 4:(popular.length - 4*i));j++){
            let a = document.createElement("a");
            a.href = "good.html?id="+popular[i*4+j]["id"];
            let img = document.createElement("img");
            img.setAttribute("src", popular[i*4+j]["image"]);
            let price = document.createElement("div");
            price.className = "price";
            let span1 = document.createElement("span");
            let span2 = document.createElement("span");
            let span3 = document.createElement("span");
            if(popular[i*4+j]["discount"] > 0){
                span1.textContent = "-"+popular[i*4+j]["discount"]+"%";
                span2.textContent = popular[i*4+j]["prices"]["new"]+" ₽";
                span3.textContent = popular[i*4+j]["prices"]["old"]+" ₽";
            }else{
                span1.style.display = "none";
                span2.textContent = popular[i*4+j]["prices"]["old"]+" ₽";
            }
            price.appendChild(span1);
            price.appendChild(span2);
            price.appendChild(span3);
            let p = document.createElement("p");
            p.textContent = popular[i*4+j]["name"];
            let btns = document.createElement("div");
            btns.className = "cartnlike";
            let cart = document.createElement("button");
            let cartimg = document.createElement("img");
            cartimg.setAttribute("src", "images/cart.svg");
            let in_cart = localStorage.getItem("cart").indexOf(popular[i*4+j]["id"]);
            if(in_cart >= 0){
                cart.className = "selected";
            }
            cart.appendChild(cartimg);
            let like = document.createElement("button");
            let likeimg = document.createElement("img");
            likeimg.setAttribute("src", "images/heart.svg")
            let is_liked = localStorage.getItem("liked").indexOf(popular[i*4+j]["id"]);
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

            cart.addEventListener("click", function(event){
                if (event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                in_cart = localStorage.getItem("cart").indexOf(popular[i*4+j]["id"]);
                if(in_cart < 0){
                    cart.className = "selected";
                    localStorage.setItem("cart", localStorage.getItem("cart")+popular[i*4+j]["id"]+"-1,");
                }else{
                    location.href = "cart.html";
                }
            });

            like.addEventListener("click", function(event){
                if (event.stopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                is_liked = localStorage.getItem("liked").indexOf(popular[i*4+j]["id"]);
                if(is_liked < 0){
                    like.className = "selected";
                    localStorage.setItem("liked", localStorage.getItem("liked")+popular[i*4+j]["id"]+",");
                }else{
                    localStorage.setItem("liked", localStorage.getItem("liked").replace(popular[i*4+j]["id"]+",", ""));
                    like.classList.remove("selected");
                }
            });
            div.appendChild(a);
        }
        popItems.appendChild(div);
    }
    initScroller();
}