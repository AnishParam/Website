/*****************************************
 * HOMEPAGE SETUP
 * Anish Paramsothy, 2025
 ******************************************/

var i = 0;
var j = 0;
var k = 0;
var homepage = 'Anish Paramsothy';
var homepage2 = 'Portfolio';
var aboutme = 'About Me';
var speed = 50;

const clicksound = new Audio("sounds/button-click.mp3");
clicksound.preload = 'auto';
clicksound.play();
clicksound.pause();


function typeWriter() {
    // type contents of the title
    if (i < homepage.length) {
        // iterate through the homepage var, and playing each element of the var onto the page
        document.getElementById("homepage").innerHTML += homepage.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    // allow the subtitle to be typed only after the title has been typed
    else {
        setTimeout(typeWriter2, speed);
    }
}

// same process as typewriter 1 but will print the sub title text 
function typeWriter2() {
    if (j < homepage2.length) {
        document.getElementById("homepage2").innerHTML += homepage2.charAt(j);
        j++;
        setTimeout(typeWriter2, speed);
    }
    // bring links into visibility once the sub title has been typed 
    else {
        setTimeout( () => {
                document.getElementById("about").style.visibility = "visible";
                document.getElementById("project").style.visibility = "visible";
            }, 400);
    }
}

function linkclick() {
    const link = document.getElementById("about");
    const linkP = document.getElementById("project");
    if (link) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            link.classList.add("clicked");
            
            clicksound.currentTime = 0;
            clicksound.play();

            setTimeout ( () => {

                const homepage = document.getElementById("homepage");
                const homepage2 = document.getElementById("homepage2");
                const linkContainer = document.querySelector(".link-container");
                const content = document.querySelector(".content-container");

                content.classList.add("delete-animation");
                
                document.body.style.pointerEvents = 'none';

                setTimeout(() => {
                    window.location.href = link.href; 
                }, 2000);
            }, 300);
        });
    }
    if (linkP) {
        linkP.addEventListener("click", (e) => {
            e.preventDefault();
            linkP.classList.add("clicked");
            
            clicksound.currentTime = 0;
            clicksound.play();

            setTimeout ( () => {

                const homepage = document.getElementById("homepage");
                const homepage2 = document.getElementById("homepage2");
                const linkContainer = document.querySelector(".link-container");
                const content = document.querySelector(".content-container");

                content.classList.add("delete-animation");
                
                document.body.style.pointerEvents = 'none';

                setTimeout(() => {
                    window.location.href = linkP.href; 
                }, 2000);
            }, 300);
        });
    }
}

window.onload = () => {
    linkclick();
    typeWriter();
};
