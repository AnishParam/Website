const clicksound = new Audio("sounds/button-click.mp3");
clicksound.preload = 'auto';
clicksound.play();
clicksound.pause();

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function openPDF(filePath) {
    const pdfOverlay = document.getElementById("pdfOverlay");
    const oldViewer = document.getElementById("pdfViewer");

    if (isIOS()) {
        const container = document.createElement("div");
        container.id = "pdfViewer";
        container.style.cssText = [
            "width: 90%; height: 90%; margin: 2% auto;",
            "background: white; border: 4px solid #c29d9d;",
            "overflow-y: auto; -webkit-overflow-scrolling: touch;",
            "padding: 10px; box-sizing: border-box;"
        ].join(" ");
        oldViewer.replaceWith(container);
        pdfOverlay.style.display = "block";

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        pdfjsLib.getDocument(filePath).promise.then(async (pdf) => {
            await new Promise(r => requestAnimationFrame(r));
            const displayWidth = container.clientWidth - 20;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1 });
                const scale = displayWidth / viewport.width;
                const scaled = page.getViewport({ scale });

                const canvas = document.createElement("canvas");
                canvas.width = scaled.width;
                canvas.height = scaled.height;

                const ctx = canvas.getContext("2d");
                await page.render({ canvasContext: ctx, viewport: scaled }).promise;
                container.appendChild(canvas);
            }
        }).catch(() => {
            container.innerHTML =
                "<p style='color:#333;padding:20px;text-align:center;'>Failed to load PDF.</p>";
        });
    } else {
        const newViewer = document.createElement("object");
        newViewer.id = "pdfViewer";
        newViewer.type = "application/pdf";
        newViewer.data = filePath;
        oldViewer.replaceWith(newViewer);
        pdfOverlay.style.display = "block";
    }
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
        const viewer = document.getElementById("pdfViewer");
        if (viewer.tagName === "OBJECT") {
            viewer.data = "";
        } else if (viewer.tagName === "DIV") {
            viewer.innerHTML = "";
        }
    });
};