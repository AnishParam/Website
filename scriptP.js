const clicksound = new Audio("sounds/button-click.mp3");
clicksound.preload = 'auto';
clicksound.play();
clicksound.pause();

function openPDF(filePath) {
    const pdfOverlay = document.getElementById("pdfOverlay");

    const oldViewer = document.getElementById("pdfViewer");
    const newViewer = document.createElement("object");
    newViewer.id = "pdfViewer";
    newViewer.type = "application/pdf";
    newViewer.data = filePath;

    oldViewer.replaceWith(newViewer);
    pdfOverlay.style.display = "block";
}

function openImage(imgPath) {
    const pdfOverlay = document.getElementById("pdfOverlay");

    const oldViewer = document.getElementById("pdfViewer");
    const newViewer = document.createElement("div");
    newViewer.id = "pdfViewer"; 

    const image = document.createElement("img");
    image.src = imgPath;

    newViewer.appendChild(image);
    oldViewer.replaceWith(newViewer);
    pdfOverlay.style.display = "block";
}

function pageclick() {
    const link = document.getElementById("index");
    const linkP = document.getElementById("about");
    const linkproject1 = document.getElementById("REMOTEVEHICLEREPORT");
    const linkproject1a = document.getElementById("REMOTEVEHICLEDRAWINGPACKAGE");
    const linkproject2 = document.getElementById("SDRAM");
    const linkproject3 = document.getElementById("SIGNALPROCESSOR");
    const art1 = document.getElementById("ART1");
    const art2 = document.getElementById("ART2");
    const art3 = document.getElementById("ART3");
    const art4 = document.getElementById("ART4");
    const art5 = document.getElementById("ART5");

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
    
    if(linkproject1) {
        linkproject1.addEventListener("click", (e) => {
            e.preventDefault();
            linkproject1.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openPDF("PDFs/AnishParamsothy_DesignReport.pdf");
            
            setTimeout(() => {
                linkproject1.classList.remove("clicked");
            }, 500);
        });
    }

    if(linkproject1a) {
        linkproject1a.addEventListener("click", (e) => {
            e.preventDefault();
            linkproject1a.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openPDF("PDFs/DP-Drawing_Package.pdf");

            setTimeout(() => {
                linkproject1a.classList.remove("clicked");
            }, 500);
        });
    }

    if(linkproject2) {
        linkproject2.addEventListener("click", (e) => {
            e.preventDefault();
            linkproject2.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openPDF("PDFs/Group11_3TB4_Lab4_POSTLABReport.pdf");
            
            setTimeout(() => {
                linkproject2.classList.remove("clicked");
            }, 500);
        });
    }

    if(linkproject3) {
        linkproject3.addEventListener("click", (e) => {
            e.preventDefault();
            linkproject3.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openPDF("PDFs/Group11_3TB4_Lab3_POSTLABReport.pdf");
            
            setTimeout(() => {
                linkproject3.classList.remove("clicked");
            }, 500);
        });
    }

    if(art1) {
        art1.addEventListener("click", (e) => {
            e.preventDefault();
            art1.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openImage("images/anish_orig.jpg");
            
            setTimeout(() => {
                art1.classList.remove("clicked");
            }, 500);
        });
    }

    if(art2) {
        art2.addEventListener("click", (e) => {
            e.preventDefault();
            art2.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openImage("images/anish2_orig.jpg");
            
            setTimeout(() => {
                art2.classList.remove("clicked");
            }, 500);
        });
    }

    if(art3) {
        art3.addEventListener("click", (e) => {
            e.preventDefault();
            art3.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openImage("images/poster4.jpg");
            
            setTimeout(() => {
                art3.classList.remove("clicked");
            }, 500);
        });
    }

    if(art4) {
        art4.addEventListener("click", (e) => {
            e.preventDefault();
            art4.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openImage("images/poster3.jpg");
            
            setTimeout(() => {
                art4.classList.remove("clicked");
            }, 500);
        });
    }

    if(art5) {
        art5.addEventListener("click", (e) => {
            e.preventDefault();
            art5.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openImage("images/poster2.jpg");
            
            setTimeout(() => {
                art5.classList.remove("clicked");
            }, 500);
        });
    }

}

function scrollfade() {
    const section = document.querySelectorAll('.fade-in');

    section.forEach (element => {
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
        document.getElementById("pdfViewer").data = "";
    });
}