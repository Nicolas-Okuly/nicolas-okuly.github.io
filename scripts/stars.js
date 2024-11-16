for (let i = 0; i < 40; i++) {
    let stars = document.createElement('div');
    stars.classList.add("stars");
    stars.style.top = Math.random() * window.innerHeight - 5 + 'px';
    stars.style.left = Math.random() * window.innerWidth - 5 + 'px';
 
    document.querySelector('header').appendChild(stars);
}