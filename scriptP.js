const clicksound = new Audio("sounds/button-click.mp3");
clicksound.preload = 'auto';
clicksound.play();
clicksound.pause();

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function openPDForNewTab(filePath) {
    if (isIOS()) {
        window.open(filePath, "_blank");
    } else {
        openPDF(filePath);
    }
}

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
    const linkprojectVIDEO = document.getElementById("CAPSTONEVIDEO");
    const linkproject1 = document.getElementById("REMOTEVEHICLEREPORT");
    const linkproject1a = document.getElementById("REMOTEVEHICLEDRAWINGPACKAGE");
    const linkproject4 = document.getElementById("TOYENGINEREPORT");
    const linkproject4a = document.getElementById("TOYENGINEDRAWINGPACKAGE");
    const linkproject2 = document.getElementById("SDRAM");
    const linkproject3 = document.getElementById("SIGNALPROCESSOR");

    if (link) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            link.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            setTimeout (() => {
                const content = document.querySelector(".content-container");

                document.body.style.pointerEvents = 'none';
                setTimeout(() => {
                    window.location.href = link.href; 
                }, 500);
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

                document.body.style.pointerEvents = 'none';
                setTimeout(() => {
                    window.location.href = linkP.href; 
                }, 500);
            }, 300);
        });
    }
    
    if(linkprojectVIDEO) {
            linkprojectVIDEO.addEventListener("click", (e) => {
                e.preventDefault();
                linkprojectVIDEO.classList.add("clicked");
                clicksound.currentTime = 0;
                clicksound.play();
                
                // Opens the standard YouTube watch link in a new browser tab
                window.open("https://www.youtube.com/watch?v=hzakEC6zYgg", "_blank");
                
                setTimeout(() => {
                    linkprojectVIDEO.classList.remove("clicked");
                }, 500);
            });
        }

    if(linkproject1) {
        linkproject1.addEventListener("click", (e) => {
            e.preventDefault();
            linkproject1.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openPDForNewTab("AnishParamsothy_DesignReport.pdf");
            
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
            
            openPDForNewTab("PDFs/DP-Drawing_Package.pdf");

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
            
            openPDForNewTab("PDFs/Group11_3TB4_Lab4_POSTLABReport.pdf");
            
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
            
            openPDForNewTab("PDFs/Group11_3TB4_Lab3_POSTLABReport.pdf");
            
            setTimeout(() => {
                linkproject3.classList.remove("clicked");
            }, 500);
        });
    }

    if(linkproject4) {
        linkproject4.addEventListener("click", (e) => {
            e.preventDefault();
            linkproject4.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openPDForNewTab("PDFs/AnishParamsothy_ENGINE_DesignReport.pdf");
            
            setTimeout(() => {
                linkproject4.classList.remove("clicked");
            }, 500);
        });
    }

    if(linkproject4a) {
        linkproject4a.addEventListener("click", (e) => {
            e.preventDefault();
            linkproject4a.classList.add("clicked");
            clicksound.currentTime = 0;
            clicksound.play();
            
            openPDForNewTab("PDFs/ENG-DRAWING_PACKAGE.pdf");

            setTimeout(() => {
                linkproject4a.classList.remove("clicked");
            }, 500);
        });
    }
}

async function renderPDFInline(filePath, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    try {
        const pdf = await pdfjsLib.getDocument(filePath).promise;
        const containerWidth = container.clientWidth;

        if (containerWidth === 0) {
            container.innerHTML =
                "<p style='color:#333;padding:20px;text-align:center;'>Failed to load poster.</p>";
            return;
        }

        const dpr = window.devicePixelRatio || 1;

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1 });
            const displayScale = containerWidth / viewport.width;
            const renderScale = displayScale * dpr;
            const display = page.getViewport({ scale: displayScale });
            const render = page.getViewport({ scale: renderScale });

            const canvas = document.createElement("canvas");
            canvas.width = render.width;
            canvas.height = render.height;
            canvas.style.width = display.width + "px";
            canvas.style.height = display.height + "px";

            const ctx = canvas.getContext("2d");
            await page.render({ canvasContext: ctx, viewport: render }).promise;
            container.appendChild(canvas);
        }
    } catch (err) {
        container.innerHTML =
            "<p style='color:#333;padding:20px;text-align:center;'>Failed to load poster.</p>";
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

function openVideo(videoUrl) {
    const pdfOverlay = document.getElementById("pdfOverlay");
    const oldViewer = document.getElementById("pdfViewer");

    const newViewer = document.createElement("iframe");
    newViewer.id = "pdfViewer";
    newViewer.src = videoUrl;
    newViewer.setAttribute("frameborder", "0");
    newViewer.setAttribute("allow", "autoplay; encrypted-media");
    newViewer.setAttribute("allowfullscreen", "true");

    oldViewer.replaceWith(newViewer);
    pdfOverlay.style.display = "block";
}

window.onload = () => {
    pageclick();
    scrollfade();
    window.addEventListener('scroll', scrollfade);
    window.addEventListener('resize', scrollfade);

    renderPDFInline("PDFs/MT-Group-3.pdf", "posterViewer");

    pdfOverlay.addEventListener("click", () => {
        pdfOverlay.style.display = "none";
        const viewer = document.getElementById("pdfViewer");
        if (viewer && viewer.tagName === "OBJECT") {
            viewer.data = "";
        } else if (viewer && viewer.tagName === "DIV") {
            viewer.innerHTML = "";
        }
    });
};