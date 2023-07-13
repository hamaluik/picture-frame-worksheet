import { render } from "preact";
import { AppStateContext, createAppState } from "./app-state";
import { App } from './app.tsx'
import './index.css'
import { registerSW} from "virtual:pwa-register";

if('serviceWorker' in navigator) {
    const updateSW = registerSW({
    	onNeedRefresh: () => {
            updateSW(true);
    	}
    });
}

render(
    <AppStateContext.Provider value={createAppState()}>
        <App/>
    </AppStateContext.Provider>
, document.getElementById('app')!)
