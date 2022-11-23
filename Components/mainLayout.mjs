import { leftPanel } from "./leftPanel.mjs";
import { middlePanel } from "./middlePanel.mjs";
import { rightPanel } from "./rightPanel.mjs";
import { navbar } from "./navbar.mjs";
import { footer } from "./footer.mjs";

export const mainLayout =
    `
    ${navbar}

    <div class="container">
    ${leftPanel}

    ${middlePanel}

    ${rightPanel}
    </div>

    ${footer}
    ` 