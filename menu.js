let dropdownMenu = document.querySelector('.menu-dropdown');
console.log(dropdownMenu);
document.querySelector('.menu-option').onclick=function(){
    this.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
    console.log("active");
}