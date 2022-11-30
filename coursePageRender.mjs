import { navbar } from "./Components/navbar.mjs";
import { overlayPanel } from "./Components/overlayPanel.mjs";
import { leftPanel } from "./Components/leftPanel.mjs";
import { coursePage } from "./Components/coursePage.mjs";
import { rightPanel } from "./Components/rightPanel.mjs";
import { footer } from "./Components/footer.mjs";
export const coursePageLayout =
    `
    ${navbar}
    ${overlayPanel}

    <div class="container">
    ${leftPanel}

    <div id="middle-panel" class="middle-panel">
        ${coursePage}
    </div>;

    ${rightPanel}
    </div>

    ${footer} 
    `
document.body.innerHTML = coursePageLayout;