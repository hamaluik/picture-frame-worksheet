import { useContext } from "preact/hooks";
import { AppStateContext, DimDirection, MountType } from "./app-state";
import { MountTypeSelector } from "./mount-type-selector";
import { InputEntry } from "./input-entry";
import { CalculationDisplay } from "./calculation-display";
import { TextEntry } from "./text-entry";
import { Heading } from "./heading";
import { Title } from "./title";
import { Profile } from "./profile";
import { Cutlist } from "./cutlist";

export function App() {
    const appState = useContext(AppStateContext);

    return (
        <div class="flex flex-col w-screen items-center print:max-w-full">
            <div class="max-w-lg grid grid-cols-2 print:grid-cols-6 gap-2 p-2 print:max-w-full items-end">
                <div class="col-span-2 print:col-span-6">
                    <Title>Picture Frame Worksheet</Title>
                </div>
                <div class="col-span-2 print:col-span-6">
                    <Heading>Art Piece</Heading>
                </div>
                <div class="print:col-span-2"><TextEntry label="Title" /></div>
                <div class="print:col-span-2"><TextEntry label="Artist" /></div>
                <div class="col-span-2 print:col-span-2"><MountTypeSelector /></div>
                <div class="col-span-2 print:col-span-6"><Heading>Size</Heading></div>
                <InputEntry label="Width" dim={appState.width.dim} />
                <InputEntry label="Height" dim={appState.height.dim} />
                {appState.mountType.value != MountType.Flush ? <InputEntry label="Reveal Left" dim={appState.width.revealPre} /> : null}
                {appState.mountType.value != MountType.Flush ? <InputEntry label="Reveal Top" dim={appState.height.revealPre} /> : null}
                {appState.mountType.value != MountType.Flush ? <InputEntry label="Reveal Right" dim={appState.width.revealPost} /> : null}
                {appState.mountType.value != MountType.Flush ? <InputEntry label="Reveal Bottom" dim={appState.height.revealPost} /> : null}
                <CalculationDisplay label="Mount Width" dim={appState.width.mountDim} />
                <CalculationDisplay label="Mount Height" dim={appState.height.mountDim} />
                <CalculationDisplay label="Inner Width" dim={appState.width.innerDim} />
                <CalculationDisplay label="Inner Height" dim={appState.height.innerDim} />
                <div class="col-span-2 print:col-span-6">
                    <Heading>Stock Size</Heading>
                </div>
                <InputEntry label="Frame Width" dim={appState.frameWidth} />
                <InputEntry label="Frame Depth" dim={appState.frameDepth} />
                <CalculationDisplay label="Min. Horizontal Length (×2)" dim={appState.horizontalLength} />
                <CalculationDisplay label="Min. Vertical Length (×2)" dim={appState.verticalLength} />
                <div class="col-span-2 print:col-span-6"><Heading>Cutlist</Heading></div>
                <div class="col-span-2 print:col-span-3 self-start"><Cutlist /></div>
                <div class="col-span-2 print:col-span-3 self-start"><Profile /></div>
            </div>
        </div>
    );
}
