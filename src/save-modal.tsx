import { useContext } from "preact/hooks";
import { Modal } from "./modal";
import { AppStateContext } from "./app-state";
import { Button } from "./button";
import { WorksheetRecord } from "./db";
import { TextEntry } from "./text-entry";

export type SaveModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
};

export function SaveModal(props: SaveModalProps) {
    const appState = useContext(AppStateContext);

    const onSave = () => {
        const worksheet: WorksheetRecord = {
            id: appState.worksheetID.value,
            label: appState.worksheetLabel.value,
            modified: Date.now(),
            data: {
                title: appState.title.value,
                artist: appState.artist.value,
                mountType: appState.mountType.value,
                width: appState.width.dim.value,
                revealLeft: appState.width.revealPre.value,
                revealRight: appState.width.revealPost.value,
                height: appState.height.dim.value,
                revealTop: appState.height.revealPre.value,
                revealBottom: appState.height.revealPost.value,
                frameWidth: appState.frameWidth.value,
                frameDepth: appState.frameDepth.value,
            }
        };
        
        if(appState.worksheetID.value === undefined) {
            appState.db.value!.createWorksheet(worksheet)
                .then((newId) => {
                    appState.worksheetID.value = newId;
                    props.setShow(false);
                })
                .catch((err) => {
                    console.error("failed to create worksheet", err);
                    props.setShow(false);
                });
        }
        else {
            appState.db.value!.updateWorksheet(worksheet.id!, worksheet)
                .then(() => {
                    props.setShow(false);
                })
                .catch((err) => {
                    console.error("failed to save worksheet", err);
                    props.setShow(false);
                });
        }
    };

    return (
        <Modal title="Save" show={props.show} onClose={() => props.setShow(false)}>
            <form method="dialog" onSubmit={onSave}>
                <div class="flex flex-col gap-2 justify-start items-stretch">
                    <TextEntry label="Label" value={appState.worksheetLabel.value} onInput={(v) => appState.worksheetLabel.value = v} />
                    <div class="flex flex-row gap-2 justify-end items-stretch">
                        <Button onClick={onSave}>Save</Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
