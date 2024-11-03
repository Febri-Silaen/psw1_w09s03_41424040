let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {slideIndex = 1}    
  
    slides[slideIndex - 1].style.display = "block";  
   
    setTimeout(showSlides, 10000); 
}


function plusSlides(n) {
   showSlides(slideIndex += n);
}


showSlides();

const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')
btn.addEventListener('click', () =>
    boxesContainer.classList.toggle('big'))
    function createBoxes() {
    for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
    const box = document.createElement('div')
    box.classList.add('box')
    box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
    boxesContainer.appendChild(box)
    }
    }
    }
    createBoxes()

    const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')
let load = 0
let int = setInterval(blurring, 30)
function blurring() {
load++
if (load > 99) {
clearInterval(int)
}
loadText.innerText = `${load}%`
loadText.style.opacity = scale(load, 0, 100, 1, 0)
bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}
const scale = (num, in_min, in_max, out_min, out_max) => {
return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) +
out_min
}

    