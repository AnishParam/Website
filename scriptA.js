const clicksound = new Audio("sounds/button-click.mp3");
clicksound.preload = 'auto';
clicksound.play();
clicksound.pause();

function openPDF(filePath) {
    const pdfOverlay = document.getElementById("pdfOverlay");

    // clear and rebuild the PDF viewer
    const oldViewer = document.getElementById("pdfViewer");
    const newViewer = document.createElement("object");
    newViewer.id = "pdfViewer";
    newViewer.type = "application/pdf";
    newViewer.data = filePath;

    oldViewer.replaceWith(newViewer);
    pdfOverlay.style.display = "block";
}

function pageclick() {
    const link = document.getElementById("index");
    const linkP = document.getElementById("project");
    const linkR = document.getElementById("resume");

    if (link) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            link.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            setTimeout (() => {
                const content = document.querySelector(".content-container");

                content.classList.add("delete-animation");

                document.body.style.pointerEvents = 'none';
                setTimeout(() => {
                    window.location.href = link.href; 
                }, 3000);
            }, 300);
        });
    }

    if(linkP) {
        linkP.addEventListener("click", (e) => {
            e.preventDefault();
            linkP.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            setTimeout (() => {
                const content = document.querySelector(".content-container");

                content.classList.add("delete-animation");

                document.body.style.pointerEvents = 'none';
                setTimeout(() => {
                    window.location.href = linkP.href; 
                }, 3000);
            }, 300);
        });
    }

    if(linkR) {
        linkR.addEventListener("click", (e) => {
            e.preventDefault();
            linkR.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openPDF("PDFs/Anish-Paramsothy-Resume.pdf");

            setTimeout(() => {
                linkR.classList.remove("clicked");
            }, 500);
        });
    }
}

function scrollfade() {
    const section = document.querySelectorAll('.fade-in');
    section.forEach(element => {
        const rect = element.getBoundingClientRect().top;
        const height = window.innerHeight;

        if (rect < height * 0.8 && rect > -element.offsetHeight) {
            element.classList.add('is-visible');
            element.classList.remove('is-not-visible');
        }
        else {
            element.classList.remove('is-visible');
            element.classList.add('is-not-visible');            
        }

    })
}

window.onload = () => {
    pageclick();
    scrollfade();
    window.addEventListener('scroll', scrollfade);
    window.addEventListener('resize', scrollfade);
    
    pdfOverlay.addEventListener("click", () => {
        pdfOverlay.style.display = "none";
        document.getElementById("pdfViewer").src = "";
    });
};