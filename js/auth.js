function toggleForm(to){
    let divs = document.querySelectorAll("body > div");
    divs[to].style.display = "flex";
    divs[Math.abs(to-1)].style.display = "none";
}
let as = document.querySelectorAll("body > div > span > a");
as[0].addEventListener("click", function(){
    toggleForm(1);
});
as[1].addEventListener("click", function(){
    toggleForm(0);
});