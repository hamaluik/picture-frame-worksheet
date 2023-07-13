import { render } from "preact";
import { AppStateContext, createAppState } from "./app-state";
import { App } from './app.tsx'
import './index.css'


render(
    <AppStateContext.Provider value={createAppState()}>
        <App/>
    </AppStateContext.Provider>
, document.getElementById('app')!)
