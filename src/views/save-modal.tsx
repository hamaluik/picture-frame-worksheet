import { useContext } from "preact/hooks";
import { Modal } from "../components/modal";
import { AppStateContext } from "../store/state";
import { Button } from "../components/button";
import { WorksheetRecord } from "../types/WorksheetRecord";
import { TextEntry } from "../components/text-entry";

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
                width: appState.width.dim.value.input,
                revealLeft: appState.width.revealPre.value.input,
                revealRight: appState.width.revealPost.value.input,
                height: appState.height.dim.value.input,
                revealTop: appState.height.revealPre.value.input,
                revealBottom: appState.height.revealPost.value.input,
                frameWidth: appState.frameWidth.value.input,
                frameDepth: appState.frameDepth.value.input,
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
