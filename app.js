//navLinks highlight with cursor moving
(function () {
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('.navLink');
    const cursor = document.querySelector('.cursor');
    const button = document.querySelectorAll('.navBtn');
    const animation = function (e, a) {
        const text = a;
        const active = a;
        const { offsetX: x, offsetY: y } = e,
            { offsetWidth: width, offsetHeight: height } = a,
            move = 20,
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
    navLinks.forEach(a => a.addEventListener('mousemove', e => animation(e, a)));
    navLinks.forEach(a => a.addEventListener('mouseleave', e => animation(e, a)));
    nav.addEventListener('mousemove', cursorMove);

})();
//hoverEffect
const cards = document.querySelectorAll(".hoverE");
const HoverEffect = function (e, a) {
    if (window.innerWidth > 600 && !window.matchMedia('(pointer: coarse)').matches) {
        const card = a;
        const xMove = e.layerX
        const yMove = e.layerY
        const height = card.clientHeight
        const width = card.clientWidth
        let x = 10 * ((xMove - width / 2) / width);
        let y = -10 * ((yMove - height / 2) / height);
        if (a.id == "hoverB") {
            card.style.transform = ` perspective(30px) rotateY(${x}deg) rotateX(${y}deg) scale(1.1)`;
        }
        if (a.id != "hoverB") {
            card.style.transform = ` perspective(500px) rotateY(${x}deg) rotateX(${y}deg) scale(1.1)`;
        }
        card.style.transition = "";
        if (e.type == "mouseleave") {
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            card.style.transition = "all 1s ease";
        }
    }
}
cards.forEach(a => a.addEventListener("mousemove", e => HoverEffect(e, a)));
cards.forEach(a => a.addEventListener("mouseleave", e => HoverEffect(e, a)));
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
window.addEventListener("scroll", e => CheckHeader());
window.addEventListener("resize", e => CheckHeader());
function CheckHeader() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > 0 && prevScrollpos < currentScrollPos) {
        if (window.innerWidth < 600) header.style.top = "-3rem";
    } else {
        if (window.innerWidth < 600) header.style.top = "0";
    }
    prevScrollpos = currentScrollPos;
}
//check currentscrollPos for topBtn position
window.addEventListener("scroll", e => CheckCurrentSP());
function CheckCurrentSP() {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos < 1000) {
        topBtn.style.top = "-2rem";
    }
    else {
        if (window.innerWidth < 600) {
            topBtn.style.top = "0.5rem"
        }
        else if (window.innerWidth < 750) {
            topBtn.style.top = "3.5rem";
        }
        else {
            topBtn.style.top = "0.5rem";
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

const popupWindow = document.createElement("div");
popupWindow.tabIndex = "-1";
popupWindow.id = "popup-window";
const popupHeader = document.createElement("span");
popupHeader.id = "popup-header";
const popupCloseBtn = document.createElement("span");
popupCloseBtn.id = "close-button";
const closeBtnSpan = document.createElement("span");
const popupTitle = document.createElement("h1");
popupTitle.id = "popup-title";
const popupText = document.createElement("p");
popupText.id = "popup-text";
const popupImg = document.createElement("img");
popupImg.id = "popup-img";
popupImg.classList.add("sample");
const popupContent = document.createElement("span");
popupContent.id = "popup-content";
const popupBGfade = document.createElement("div");
popupBGfade.id = "popup-bgfade";

function BuildPopup(a) {
    body.appendChild(popupWindow).appendChild(popupHeader).appendChild(popupCloseBtn).appendChild(closeBtnSpan);
    popupHeader.appendChild(popupTitle);
    popupWindow.appendChild(popupText);
    popupWindow.appendChild(popupImg);
    popupWindow.appendChild(popupContent);
    body.appendChild(popupBGfade);
    setTimeout(function () {
        popupTitle.textContent = a.querySelector("h3").textContent;
        popupText.textContent = a.querySelector("p").textContent;
        closeBtnSpan.innerHTML = "&times;";
        popupImg.src = a.querySelector("img").src;
        popupContent.innerHTML = ReadFile(`text/${a.id}.html`);
        popupBGfade.style.display = "block";
        popupWindow.style.height = "90%";
        popupWindow.focus();
        currentSP = window.pageYOffset;
        body.style.position = "fixed";
        body.style.top = `-${currentSP}px`;
        popupBGfade.style.opacity = "0.7";
        html.style.scrollBehavior = "unset";
    }, 100)
}
function RemovePopup() {
    popupWindow.style.height = "0";
    popupBGfade.style.opacity = "0";
    setTimeout(function () {
        body.removeChild(popupBGfade);
        body.removeChild(popupWindow);
    }, 500)
    body.style.position = "unset";
    window.scrollTo(0, currentSP);
    html.style.scrollBehavior = "smooth";
}
popups.forEach(a => a.addEventListener("click", e => BuildPopup(a)));
popupCloseBtn.addEventListener("click", () => RemovePopup());
popupBGfade.addEventListener("click", () => RemovePopup());
//file reader
function ReadFile(fileName) {
    var fileText = "";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileName, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                fileText = rawFile.response;
            }
        }
    }
    rawFile.send(null);
    return fileText;
}