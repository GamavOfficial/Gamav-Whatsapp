import {topbar,btn} from "../core/utils.js";
export function renderHelp(){return topbar("Help Center","GAMAV WhatsApp documentation and setup",btn("Open Docs","btn primary"))+
`<div class="content"><div class="grid two-col">
<div class="card"><h2 style="font-size:14px">Quick start</h2><div class="kv">
<div>1. Connect</div><div>Connect your WhatsApp Business Platform account.</div>
<div>2. Build</div><div>Create a bot flow with triggers, messages, conditions and actions.</div>
<div>3. Test</div><div>Use mock mode before live API integration.</div>
<div>4. Publish</div><div>Send production flow definitions to the backend.</div></div></div>
<div class="card"><h2 style="font-size:14px">Production</h2><p class="muted">GitHub Pages hosts the frontend. A backend is required for Meta tokens, webhooks, flow execution and real message delivery.</p></div>
</div></div>`}
