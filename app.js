//navLinks highlight with cursor moving
(function () {

    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('header .navLink');
    const cursor = document.querySelector('.cursor');
    const animation = function (e) {
        const text = this.querySelector('span');
        const active = document.querySelector('header #active span');
        const { offsetX: x, offsetY: y } = e,
            { offsetWidth: width, offsetHeight: height } = this,
            move = 10,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;
        text.style.transform = `translate(${xMove}px, ${yMove}px)`;
        text.style.textShadow = `${xMove}px ${yMove}px 2px rgb(34, 34, 34)`;
        active.style.textShadow = '';
        if (e.type === 'mouseleave') {
            text.style.transform = '';
            text.style.textShadow = '';
        }
    };

    const cursorMove = e => {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    };

    navLinks.forEach(b => b.addEventListener('mousemove', animation));
    navLinks.forEach(b => b.addEventListener('mouseleave', animation));
    nav.addEventListener('mousemove', cursorMove);

})();
//card effect
const cards = document.querySelectorAll("main .sectiondiv");
const cardeffect = function (e) {
    const card = this.querySelector('section');
    const xVal = e.layerX
    const yVal = e.layerY
    const height = card.clientHeight
    const width = card.clientWidth
    let x = 15 * ((xVal - width / 2) / width);
    let y = -15 * ((yVal - height / 2) / height);
    card.style.transform = `perspective(500px) rotateY(${x}deg) rotateX(${y}deg)`;
    card.style.transition = "";
    if (e.type == "mouseleave") {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        card.style.transition = "all 1s ease";
    }
}
cards.forEach(a => a.addEventListener("mousemove", cardeffect));
cards.forEach(a => a.addEventListener("mouseleave", cardeffect));
//intro
const intro = document.querySelector(".intro");
const content = document.querySelector(".intro .content");
if (!sessionStorage.getItem("visited")) {
    window.addEventListener("load", () => {
        setTimeout(function () {
            content.style.top = "50%";
            content.style.opacity = "1";
        }, 500)
        setTimeout(function () {
            intro.style.height = "0vh";
        }, 1500)
    })
    sessionStorage.setItem("visited", true);
}
else {
    intro.style.display = "none";
}
//hide header with scrolling
var prevScrollpos = window.pageYOffset;
const header = document.querySelector("header");
const topBtn = document.querySelector(".toTopBtn");
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos) {
        header.style.transform = "translateY(-3rem)";
        topBtn.style.top = "0";
    } else {
        header.style.transform = "";
        topBtn.style.top = "3rem";
    }
    if (currentScrollPos < 5) {
        topBtn.style.top = "0";
    }
    prevScrollpos = currentScrollPos;
}
//side menu
const sidemenu = document.querySelector(".sideMenu");
const moreBtn = document.querySelector("#moreBtn");
const closeBtn = document.querySelector("#closeBtn");
moreBtn.addEventListener("click", ()=>{
    sidemenu.style.height="50%";
});
closeBtn.addEventListener("click", ()=>{
    sidemenu.style.height="0%";
});


