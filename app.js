//navLinks highlight with cursor moving
(function () {

    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('.navLink');
    const cursor = document.querySelector('.cursor');
    const animation = function (e) {
        const text = this.querySelector('span');
        text.style.pointerEvents="none";
        const active = document.querySelector('header #active span');
        const { offsetX: x, offsetY: y } = e,
            { offsetWidth: width, offsetHeight: height } = this,
            move = 10,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;
        text.style.transform = `translate(${xMove}px, ${yMove}px)`;
        //text.style.textShadow = `${xMove}px ${yMove}px 2px rgb(34, 34, 34)`;
        active.style.textShadow = '';
        if (e.type === 'mouseleave') {
            text.style.transform = '';
            //text.style.textShadow = '';
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
//hoverEffect
const cards = document.querySelectorAll(".hoverE");
const cardeffect = function (e) {
    if (window.innerWidth>600) {
        const card = this.querySelector('#HE');
        const xVal = e.layerX
        const yVal = e.layerY
        const height = card.clientHeight
        const width = card.clientWidth
        let x = 10 * ((xVal - width / 2) / width);
        let y = -10 * ((yVal - height / 2) / height);
        card.style.transform = `perspective(500px) rotateY(${x}deg) rotateX(${y}deg)`;
        card.style.transition = "";
        if (e.type == "mouseleave") {
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            card.style.transition = "all 1s ease";
        }
    }
}
cards.forEach(a => a.addEventListener("mousemove", cardeffect));
cards.forEach(a => a.addEventListener("mouseleave", cardeffect));
//intro
const intro = document.querySelector(".intro");
const content = document.querySelector(".intro .content");
const body = document.querySelector("body");
if (!sessionStorage.getItem("visited")) {
    window.addEventListener("load", () => {
        setTimeout(function () {
            body.style.position = "fixed";
            content.style.top = "50%";
            content.style.opacity = "1";
        }, 500)
        setTimeout(function () {
            intro.style.height = "0vh";
            body.style.position = "unset";
        }, 1500)
    })
    sessionStorage.setItem("visited", true);
}
else {
    intro.style.display = "none";
    body.style.position = "unset";
}
//hide header with scrolling
var prevScrollpos = window.pageYOffset;
const header = document.querySelector("header");
const topBtn = document.querySelector(".toTopBtn");
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    CheckCurrentSP();
    if (prevScrollpos < currentScrollPos) {
        //header.style.transform = "translateY(-3rem)";
    } else {
        //header.style.transform = "";
    }
    prevScrollpos = currentScrollPos;
}
//check currentscrollPos for topBtn position
function CheckCurrentSP() {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos < 2000) {
        if (window.innerWidth < 600) topBtn.style.top = "110%";
        else topBtn.style.top = "-2rem";
    }
    else {
        if (window.innerWidth < 600) {
            topBtn.style.top = "95%";
            topBtn.style.left = "20%";
        }
        else if (window.innerWidth < 750) {
            topBtn.style.top = "3rem";
            topBtn.style.left = "";
        }
        else {
            topBtn.style.top = "0.7rem";
            topBtn.style.left = "";
        }
    }
}
//side menu
const sidemenu = document.querySelector(".sideMenu");
const sidemenuBackground = document.querySelector(".sideMenuBackground");
const moreBtn = document.querySelector("#moreBtn");
const closeBtn = document.querySelector("#closeBtn");
const html = document.querySelector("html");
let currentSP = 0;

moreBtn.addEventListener("click", () => {
    currentSP = window.pageYOffset;
    sidemenu.style.top = "-1rem";
    sidemenu.style.height = "20rem";
    sidemenuBackground.style.opacity = "0.5";
    sidemenuBackground.style.pointerEvents = "all";
    body.style.top = `-${currentSP}px`;
    html.style.scrollBehavior = "unset";
});

closeBtn.addEventListener("click", hideSideMenu);
sidemenuBackground.addEventListener("click", hideSideMenu);
window.addEventListener("resize", hideSideMenu);
function hideSideMenu(e) {
    sidemenu.style.height = "0%";
    sidemenu.style.top = "-1rem";
    sidemenuBackground.style.opacity = "0";
    sidemenuBackground.style.pointerEvents = "none";
    if (e.type == "click") {
        window.scrollTo(0, currentSP);
        html.style.scrollBehavior = "smooth";
    }
    CheckCurrentSP();
}
//popup
const popups = document.querySelectorAll(".popup");
const popupWindow = document.querySelector("#popup-window");
const popupCloseBtn = document.querySelector("#popup-close");
const popupBGfade = document.querySelector("#popup-bgfade");
function BuildPopup() {
    const h1 = this.querySelector("h2").textContent;
    const text = this.querySelector("p").textContent;
    const img = this.querySelector("img").src;
    const id = this.querySelector("section").parentElement.id;
    const popupTitle = document.querySelector("#popup-title");
    const popupText = document.querySelector("#popup-text");
    const popupImg = document.querySelector("#popup-img");
    const popupContent = document.querySelector("#popup-content");
    popupTitle.textContent = h1;
    popupText.textContent = text;
    popupContent.innerHTML=ReadFile(`text/${id}.html`);
    popupImg.src = img;

    popupWindow.style.height = "90%";
    popupBGfade.style.display = "block";
    setTimeout(function () {
        popupBGfade.style.backdropFilter = "blur(6px)";
        popupBGfade.style.WebkitBackdropFilter = "blur(6px)";
        currentSP = window.pageYOffset;
        body.style.position="fixed";
        body.style.top = `-${currentSP}px`;
        html.style.scrollBehavior = "unset";
    }, 500)
}
popups.forEach(a => a.addEventListener("click", BuildPopup));
popupCloseBtn.addEventListener("click", () => {
    popupWindow.style.height = "0";
    popupBGfade.style.display = "none";
    popupBGfade.style.backdropFilter = "";
    popupBGfade.style.WebkitBackdropFilter = "";
    body.style.position="unset";
    window.scrollTo(0, currentSP);
        html.style.scrollBehavior = "smooth";
});
popupBGfade.addEventListener("click", () => {
    popupWindow.style.height = "0";
    popupBGfade.style.display = "none";
    popupBGfade.style.backdropFilter = "";
    popupBGfade.style.WebkitBackdropFilter = "";
    body.style.position="unset";
    window.scrollTo(0, currentSP);
        html.style.scrollBehavior = "smooth";
});
//file reader
function ReadFile(fileName){
    var fileText="";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileName, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                fileText = rawFile.response;
            }
        }
    }
    rawFile.send(null);
    return fileText;
}
//img viewer
