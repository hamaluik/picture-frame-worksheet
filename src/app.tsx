import { useContext, useState } from "preact/hooks";
import { AppStateContext, Dimension, MountType } from "./app-state";
import { MountTypeSelector } from "./mount-type-selector";
import { InputEntry } from "./input-entry";
import { CalculationDisplay } from "./calculation-display";
import { TextEntry } from "./text-entry";
import { Heading } from "./heading";
import { Profile } from "./profile";
import { Cutlist } from "./cutlist";
import { Logo } from "./logo";
import { Button } from "./button";
import { Icon, IconType } from "./icon";
import { LoadModal } from "./load-modal";
import { SaveModal } from "./save-modal";

export function App() {
    const appState = useContext(AppStateContext);
    const version = import.meta.env.VITE_VERSION_STR;

    const [ showLoadModal, setShowLoadModal ] = useState(false);
    const [ showSaveModal, setShowSaveModal ] = useState(false);

    const newWorksheet = () => {
        appState.worksheetID.value = undefined;
        appState.title.value = "";
        appState.artist.value = "";
        appState.mountType.value = MountType.Flush;
        appState.width.dim.value = new Dimension("6");
        appState.width.revealPre.value = new Dimension("0");
        appState.width.revealPost.value = new Dimension("0");
        appState.height.dim.value = new Dimension("4");
        appState.height.revealPre.value = new Dimension("0");
        appState.height.revealPost.value = new Dimension("0");
        appState.frameWidth.value = new Dimension("1");
        appState.frameDepth.value = new Dimension("3/4");
    };

    return (
        <>
            <div class="flex flex-col w-screen items-center print:max-w-full">
                <div class="max-w-lg grid grid-cols-2 print:grid-cols-6 gap-2 p-2 print:max-w-full items-end">
                    <div class="col-span-2 print:col-span-6">
                        <h1 class="font-bold text-2xl text-gray-800 dark:text-gray-100 print:text-black inline-flex flex-row gap-2 items-center">
                            <Logo />
                            Picture Frame Worksheet
                        </h1>
                    </div>
                    <div class="col-span-2 print:hidden flex flex-row justify-stretch gap-2 items-center">
                        <Button onClick={newWorksheet}><Icon type={IconType.New}/> New</Button>
                        <Button onClick={() => setShowLoadModal(true)}><Icon type={IconType.Load}/> Load</Button>
                        <Button onClick={() => setShowSaveModal(true)}><Icon type={IconType.Save}/> Save</Button>
                        <Button onClick={() => window.print()}><Icon type={IconType.Print}/> Print</Button>
                    </div>
                    <div class="col-span-2 print:col-span-6">
                        <Heading>Art Piece</Heading>
                    </div>
                    <div class="print:col-span-2"><TextEntry label="Title" value={appState.title.value} onInput={(v) => appState.title.value = v} /></div>
                    <div class="print:col-span-2"><TextEntry label="Artist" value={appState.artist.value} onInput={(v) => appState.artist.value = v} /></div>
                    <div class="col-span-2 print:col-span-2"><MountTypeSelector /></div>
                    <div class="col-span-2 print:col-span-6"><Heading>Size</Heading></div>
                    <InputEntry label="Width" dim={appState.width.dim} />
                    <InputEntry label="Height" dim={appState.height.dim} />
                    {appState.mountType.value != MountType.Flush ? <InputEntry label="Reveal Left" dim={appState.width.revealPre} /> : null}
                    {appState.mountType.value != MountType.Flush ? <InputEntry label="Reveal Top" dim={appState.height.revealPre} /> : null}
                    {appState.mountType.value != MountType.Flush ? <InputEntry label="Reveal Right" dim={appState.width.revealPost} /> : null}
                    {appState.mountType.value != MountType.Flush ? <InputEntry label="Reveal Bottom" dim={appState.height.revealPost} /> : null}
                    {appState.mountType.value != MountType.Flush ? <CalculationDisplay label="Mount Width" dim={appState.width.mountDim} /> : null}
                    {appState.mountType.value != MountType.Flush ? <CalculationDisplay label="Mount Height" dim={appState.height.mountDim} /> : null}
                    <CalculationDisplay label="Inner Width" dim={appState.width.innerDim} />
                    <CalculationDisplay label="Inner Height" dim={appState.height.innerDim} />
                    <div class="col-span-2 print:col-span-6">
                        <Heading>Stock</Heading>
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
            <footer class="p-2 text-gray-500 dark:text-gray-400 text-sm flex flex-row justify-between print:hidden">
                <div>Based off of <a class="underline hover:decoration-dashed" href="https://www.almfab.com/store/p/free-picture-frame-worksheet">Michael Alm's worksheet</a>. Report issues and view the source <a class="underline hover:decoration-dashed" href="https://github.com/hamaluik/picture-frame-worksheet">on GitHub</a>.</div>
                <div>(version {version})</div>
            </footer>
            <LoadModal show={showLoadModal} setShow={setShowLoadModal} />
            <SaveModal show={showSaveModal} setShow={setShowSaveModal} />
        </>
    );
}
