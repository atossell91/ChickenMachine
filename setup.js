let installPrompt = null;
let installButton = null;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

function onLoadDOM() {
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;
        console.log("This PWA is installable!")
        alert("Installable!"); // will now show
      }
    );

    installButton = document.getElementById("pwa-install-button")
    if (installButton) {
        installButton.addEventListener("click", async () => {
            if (!installPrompt) return;
            installPrompt.prompt();
            const result = await installPrompt.userChoice;
            console.log("User response:", result.outcome);
            installPrompt = null;
        }
        );
    }
}

document.addEventListener("DOMContentLoaded", ()=>{ onLoadDOM(); });