import { render } from "preact";
import { AppStateContext, createAppState } from "./app-state";
import { App } from './app.tsx'
import './index.css'
import { registerSW} from "virtual:pwa-register";

registerSW({immediate: true});

const initialState = createAppState();
window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    initialState.installPrompt.value = e;
    console.debug('before install prompt fired');
});

render(
    <AppStateContext.Provider value={initialState}>
        <App/>
    </AppStateContext.Provider>
, document.getElementById('app')!)
