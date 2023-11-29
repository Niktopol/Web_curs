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
window.onload = function (){
    if(localStorage.getItem("liked") == null){
        localStorage.setItem("liked", "");
    }
    if(localStorage.getItem("cart") == null){
        localStorage.setItem("cart", "");
    }
    let tabs = document.querySelectorAll("main > div > div");
    /*
    for(let category in goods){
        if(exists){
            break;
        }
        for(let item of goods[category]){
            if(item.id == Number(urlParams.get("id"))){
                exists = true;
                good = item;
                break;
            }
        }
    }
    for(let i of localStorage.getItem("liked").split(",")){
        if(i != ""){
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
                    localStorage.setItem("cart", localStorage.getItem("cart")+popular[i*4+j]["id"]+",");
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
    }*/
    if(urlParams.get("liked") == null){
        toggleCart(0);
    }else{
        toggleCart(1);
    }
};