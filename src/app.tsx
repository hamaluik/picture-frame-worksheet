import { useContext, useEffect, useState } from "preact/hooks";
import { AppStateContext } from "./store/state";
import { MountTypeSelector } from "./views/mount-type-selector";
import { InputEntry } from "./components/input-entry";
import { CalculationDisplay } from "./views/calculation-display";
import { TextEntry } from "./components/text-entry";
import { Heading } from "./components/heading";
import { Profile } from "./views/profile";
import { Cutlist } from "./views/cutlist";
import { Logo } from "./components/logo";
import { Button } from "./components/button";
import { Icon, IconType } from "./components/icon";
import { LoadModal } from "./views/load-modal";
import { SaveModal } from "./views/save-modal";
import { MountType } from "./types/MountType";
import Dimension from "./types/Dimension";
import { shareCurrentWorksheet, tryLoadShare } from "./store/share";
import { applyWorksheetRecord, buildWorksheetRecord } from "./types/WorksheetRecord";
import { ShareModal } from "./views/share-modal";
import { AutoComplete } from "./components/AutoComplete";
import Materials from "./store/Materials";
import Finishes from "./store/Finishes";
import { MakeBasicProfile } from "./types/ProfileType";

export function App() {
    const appState = useContext(AppStateContext);
    const version = import.meta.env.VITE_VERSION_STR;

    const [ showLoadModal, setShowLoadModal ] = useState(false);
    const [ showSaveModal, setShowSaveModal ] = useState(false);
    const [ showShareModal, setShowShareModal ] = useState(false);
    const [ shareURL, setShareURL ] = useState("");

    useEffect(() => {
        const share = tryLoadShare();
        if(share) {
            if(share.error || !share.record) {
                console.warn("Failed to validate share", share.error);
            }
            else if(share.record) {
                console.info("Loaded shared worksheet", share.record);
                applyWorksheetRecord(share.record, appState);
                setShowLoadModal(false);
                setShowSaveModal(false);
                setShowShareModal(false);
            }
        }

    });

    const shareWorksheet = () => {
        shareCurrentWorksheet(buildWorksheetRecord(appState))
            .then((url) => {
                if(url !== null) {
                    setShareURL(url);
                    setShowShareModal(true);
                }
            })
    };

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
        appState.material.value = "";
        appState.finish.value = "";
        appState.lip.value = new Dimension("1/8");
        appState.slop.value = new Dimension("1/8");
        appState.profile.value = MakeBasicProfile();
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
                        <Button onClick={newWorksheet} hoverLabel="New"><Icon type={IconType.New}/> <span class="hidden md:inline">New</span></Button>
                        <Button onClick={() => setShowLoadModal(true)} hoverLabel="Load"><Icon type={IconType.Load}/> <span class="hidden md:inline">Load</span></Button>
                        <Button onClick={() => setShowSaveModal(true)} hoverLabel="Save"><Icon type={IconType.Save}/> <span class="hidden md:inline">Save</span></Button>
                        <Button onClick={shareWorksheet} hoverLabel="Share"><Icon type={IconType.Share}/> <span class="hidden md:inline">Share</span></Button>
                        <Button onClick={() => window.print()} hoverLabel="Print"><Icon type={IconType.Print}/> <span class="hidden md:inline">Print</span></Button>
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
                    <InputEntry label="Lip" dim={appState.lip} />
                    <InputEntry label="Slop" dim={appState.slop} />
                    <CalculationDisplay label="Inner Width" dim={appState.width.innerDim} />
                    <CalculationDisplay label="Inner Height" dim={appState.height.innerDim} />
                    <div class="col-span-2 print:col-span-6">
                        <Heading>Stock</Heading>
                    </div>
                    <InputEntry label="Frame Width" dim={appState.frameWidth} />
                    <InputEntry label="Frame Depth" dim={appState.frameDepth} />
                    <CalculationDisplay label="Min. Horizontal Length (×2)" dim={appState.horizontalLength} />
                    <CalculationDisplay label="Min. Vertical Length (×2)" dim={appState.verticalLength} />
                    <AutoComplete label="Material" value={appState.material.value} onInput={(v) => appState.material.value = v} options={Materials} />
                    <AutoComplete label="Finish" value={appState.finish.value} onInput={(v) => appState.finish.value = v} options={Finishes} />
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
            <ShareModal show={showShareModal} setShow={setShowShareModal} shareURL={shareURL} />
        </>
    );
}
