let slideIndex = 0;
nshowSlides();

function nshowSlides() {
    let i;
    let slides = document.getElementsByClassName("cmySlides");
    let dots = document.getElementsByClassName("cdot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" cactive", "");
    }

    dots[slideIndex - 1].className += " cactive";
    slides[slideIndex - 1].style.display = "flex";
    setTimeout(nshowSlides, 3000);
}

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("cmySlides");
    let dots = document.getElementsByClassName("cdot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" cactive", "");
    }

    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " cactive";
}

// All credits goes to W3Schools - https://www.w3schools.com/howto/howto_js_slideshow.asp