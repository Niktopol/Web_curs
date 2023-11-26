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
    let categories = [armchairs, beds, blankets, carpets, curtains, mattresses, pillows, poufs, sofas, toys];
    let popular = [];
    let popItems = document.querySelectorAll("#popular > div")[0];
    for (let category of categories){
        for (let item of category){
            if(item.rating == 5 && item.discount > 0){
                popular.push(item);
            }
            if(popular.length == 20){
                break;
            }
        }
        if(popular.length == 20){
            break;
        }
    }
    console.log(popular);
    for(let i = 0; i < (Math.ceil(popular.length/4)); i++){
        let div = document.createElement("div");
        for(let j = 0; j < ((popular.length - 4*i) >= 4? 4:(popular.length - 4*i));j++){
            let a = document.createElement("a");
            a.setAttribute("href", "todo");
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
            cartimg.setAttribute("src", "images/cart.svg")
            cart.appendChild(cartimg);
            let like = document.createElement("button");
            let likeimg = document.createElement("img");
            likeimg.setAttribute("src", "images/heart.svg")
            like.appendChild(likeimg);
            btns.appendChild(cart);
            btns.appendChild(like);

            a.appendChild(img);
            a.appendChild(price);
            a.appendChild(p);
            a.appendChild(btns);

            div.appendChild(a);
        }
        popItems.appendChild(div);
    }
    document.querySelectorAll(".cartnlike > button").forEach(function(elem){
        elem.addEventListener("click", function(event){
            if (event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            }
            if(elem.classList.length == 0){
                elem.className = "selected";
            }else{
                elem.className = "";
            }
            
        });
    });
    initScroller();
}