// Get Current Location
let locationButton = document.querySelector('button');
let locationDiv = document.querySelector('.location-text');

locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, checkError);
    } else {
        console.log('The browser does not support geolocation')
    }
});

const checkError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('Please allow access to location');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('Location Information Unavailable');
            break;
        case error.TIMEOUT:
            console.log('The request to get location timed out')
    }
};

const showLocation = async (position) => {
    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=
    ${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
    
    let data = await response.json();
    locationDiv.innerText = `${data.address.city} ${data.address.postcode}`;
};

// Get Languages from Value
let languageValue = document.querySelector('.language-value');
let languageInput = document.querySelector('.language-input');

if (localStorage.getItem('language')) {
    languageValue.innerHTML = localStorage.getItem('language');
}

function changeLangValue (value) {
    languageValue.innerHTML = localStorage.getItem('language');
    
    localStorage.setItem('language', value);        
};

// Hero Section Slider
var count = 0;
var images = [
    'Images/hero-banner1.jpg',
    'Images/hero-banner2.jpg',
    'Images/hero-banner3.jpg',
    'Images/hero-banner4.jpg',
    'Images/hero-banner5.jpg',
    'Images/hero-banner6.jpg',
    'Images/hero-banner7.jpg',
    'Images/hero-banner8.jpg'
 ];

function slideShow() {
    document.querySelector('.slider-image').src = images[count];

    if (count >= images.length-1) {
        count = 0;
    } else {
        count++;
    }   
}   

var mySlideShowFunction = setInterval(slideShow,4000);
slideShow();

function stopSlideShow () {
    setInterval(slideShow,4000);
}

function moveNext(){
 clearInterval(mySlideShowFunction);
 document.querySelector('.slider-image').src = images[count];
 if(count == images.length-1){
         count = 0;
 }else{
     count++;
 }
 
}

function movePrevious(){
 clearInterval(mySlideShowFunction);
 document.querySelector('.slider-image').src = images[count];
 if(count == 0){
     count = images.length-1;
 }else{
     count--;
 }
}


// Main Opacity Function
var opacityBox = document.querySelector('.opacity-box');
var headerOpacityBox = document.querySelector('.header-opacity-box');
var navSearch = document.querySelector('.nav-search');
var bodyScroll = document.querySelector('body');
var SelectLocationDiv = document.querySelector('.select-location ');

function showMainOpacity() {
    opacityBox.style.display = 'block';
    bodyScroll.style.overflowY = 'hidden';
}

function removeOpacity() {
    opacityBox.style.display = 'none';
    bodyScroll.style.overflowY = 'visible';
    headerOpacityBox.style.display = 'none';
    navSearch.style.outline = 'none';
    SelectLocationDiv.style.display = 'none';
}

function showHeaderOpacity() {
    headerOpacityBox.style.display = 'block';
}

function showLocationDiv() {
    SelectLocationDiv.style.display = 'block';
}


// Product Slider Functions 1
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);