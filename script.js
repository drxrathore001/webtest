// Responsive hamburger menu and gallery lightbox

document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    hamburger.addEventListener('click', function () {
        navUl.classList.toggle('active');
    });

    // Lightbox for gallery
    const galleryImgs = document.querySelectorAll('.gallery-container img');
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        document.body.appendChild(lightbox);
    }

    galleryImgs.forEach(img => {
        img.addEventListener('click', function () {
            lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', function () {
        lightbox.classList.remove('active');
    });
});