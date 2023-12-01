const urlParams = new URLSearchParams(window.location.search);

window.onload = function(){
    console.log(urlParams.get("name"));
}