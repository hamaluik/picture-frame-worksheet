import { useContext } from "preact/hooks";
import { Modal } from "../components/modal";
import { AppStateContext } from "../store/state";
import { Button } from "../components/button";
import { buildWorksheetRecord } from "../types/WorksheetRecord";
import { TextEntry } from "../components/text-entry";

export type SaveModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
};

export function SaveModal(props: SaveModalProps) {
    const appState = useContext(AppStateContext);

    const onSave = () => {
        const worksheet = buildWorksheetRecord(appState);
        
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
                        <Button onClick={onSave} hoverLabel="Save">Save</Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
