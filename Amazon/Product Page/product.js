// Show Image on Hover
var productImage = document.getElementById("product-image");

function changeImageSrc(myimage){
    productImage.src=myimage;
}

// Show Image Color on Hover
var productImage = document.getElementById("product-image");
var colorName = document.querySelector(".color-name");
var colorValue = document.querySelector(".color-value");

function changeImageColor(imageColor){
    productImage.src = imageColor;
    colorName.innerHTML = colorValue.value;
}

// Offer Dropdown
var dropdownIconDown = document.querySelector('.fa-angle-down');
var dropdownIconUp = document.querySelector('.fa-angle-up');
var offerDropdown = document.querySelector('.offer-dropdown');

function showOfferDropdown() {
    dropdownIconDown.style.display = 'none';
    dropdownIconUp.style.display = 'block';
    offerDropdown.style.display = 'block';
}

function hideOfferDropdown() {
    dropdownIconDown.style.display = 'block';
    dropdownIconUp.style.display = 'none';
    offerDropdown.style.display = 'none';
}

// See more And See less Function
var aboutThisItem = document.querySelector('.about-this-item');
var seeMore = document.querySelector('.see-more');
var seeless = document.querySelector('.see-less');

function seeMoreFucntion() {
    aboutThisItem.style.height = 'fit-content';
    seeMore.style.display = 'none';
}

function seeLessFucntion() {
    aboutThisItem.style.height = '180px';
    seeMore.style.display = 'block';
}
