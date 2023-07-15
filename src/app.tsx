import { useContext, useState } from "preact/hooks";
import { AppStateContext, MountType } from "./app-state";
import { MountTypeSelector } from "./mount-type-selector";
import { InputEntry } from "./input-entry";
import { CalculationDisplay } from "./calculation-display";
import { TextEntry } from "./text-entry";
import { Heading } from "./heading";
import { Title } from "./title";
import { Profile } from "./profile";
import { Cutlist } from "./cutlist";
import { Logo } from "./logo";
import { Button } from "./button";
import { Icon, IconType } from "./icon";
import { LoadModal } from "./load-modal";
import { SaveModal } from "./save-modal";
import Fraction from "fraction.js";

export function App() {
    const appState = useContext(AppStateContext);

    const [ showLoadModal, setShowLoadModal ] = useState(false);
    const [ showSaveModal, setShowSaveModal ] = useState(false);

    const newWorksheet = () => {
        appState.worksheetID.value = undefined;
        appState.title.value = "";
        appState.artist.value = "";
        appState.mountType.value = MountType.Flush;
        appState.width.dim.value = new Fraction(6);
        appState.width.revealPre.value = new Fraction(0);
        appState.width.revealPost.value = new Fraction(0);
        appState.height.dim.value = new Fraction(4);
        appState.height.revealPre.value = new Fraction(0);
        appState.height.revealPost.value = new Fraction(0);
        appState.frameWidth.value = new Fraction(1);
        appState.frameDepth.value = new Fraction(3, 4);
    };

    return (
        <>
            <div class="flex flex-col w-screen items-center print:max-w-full">
                <div class="max-w-lg grid grid-cols-2 print:grid-cols-6 gap-2 p-2 print:max-w-full items-end">
                    <div class="col-span-2 print:col-span-6">
                        <Title>
                            <Logo />
                            <span>Picture Frame Worksheet</span>
                            <div class="text-grey-500 text-sm flex-1 print:hidden">({ __COMMIT_HASH__ })</div>
                        </Title>
                    </div>
                        { appState.installPrompt.value !== undefined
                            ?
                                <div class="col-span-2 print:hidden flex flex-row justify-stretch gap-2 items-center">
                                    <Button><Icon type={IconType.Load}/> Install</Button>
                                </div>
                            : null
                        }
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
                    <CalculationDisplay label="Mount Width" dim={appState.width.mountDim} />
                    <CalculationDisplay label="Mount Height" dim={appState.height.mountDim} />
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
            <LoadModal show={showLoadModal} setShow={setShowLoadModal} />
            <SaveModal show={showSaveModal} setShow={setShowSaveModal} />
        </>
    );
}
