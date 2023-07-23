import { useContext, useEffect, useState } from "preact/hooks";
import { Modal } from "../components/modal";
import { AppStateContext } from "../store/state";
import { WorksheetRecord, applyWorksheetRecord } from "../types/WorksheetRecord";
import { Icon, IconType } from "../components/icon";
import { ButtonInline } from "../components/ButtonInline";

export type LoadModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
};

export function LoadModal(props: LoadModalProps) {
    const appState = useContext(AppStateContext);
    const [ worksheets, setWorksheets ] = useState(Array<WorksheetRecord>);

    useEffect(() => {
        if(appState.db.value) {
            appState.db.value.getWorksheets()
                .then((wks) => setWorksheets(wks.filter((w) => !!w)))
                .catch((err) => {
                    console.error("Failed to get worksheets", err);
                    setWorksheets([]);
                });
        }
    });

    const loadWorksheet = (worksheet: WorksheetRecord) => {
        applyWorksheetRecord(worksheet, appState);
        props.setShow(false);
    };

    const deleteWorksheet = (id: number) => {
        if(appState.db.value) {
            appState.db.value.deleteWorksheet(id)
                .then(() => setWorksheets(worksheets.filter((w) => w.id !== id)))
                .catch((err) => {
                    console.error("Failed to get worksheets", err);
                    setWorksheets([]);
                });
        }
    };

    return (
        <Modal title="Load" show={props.show} onClose={() => props.setShow(false)}>
            { worksheets.length == 0
                ? <p>No worksheets saved yet!</p>
                : <table class="table-auto self-center border-collapse border-spacing-0 text-gray-800 dark:text-gray-100 print:text-black">
                    <thead>
                        <tr class="border-b-2 border-gray-800 dark:border-gray-100 print:border-black">
                            <th></th>
                            <th class="p-2 text-left">Label</th>
                            <th class="p-2 text-left">Title</th>
                            <th class="p-2 text-left">Artist</th>
                            <th class="p-2 text-left">Modified</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { worksheets.filter((w) => !!w).map((worksheet) => (
                        <tr>
                            <td class="p-2"><ButtonInline onClick={()=>loadWorksheet(worksheet)} hoverLabel="Load worksheet"><Icon type={IconType.Load} /></ButtonInline></td>
                            <td class="p-2 text-left">{worksheet.label}</td>
                            <td class="p-2 text-left">{worksheet.data.title}</td>
                            <td class="p-2 text-left">{worksheet.data.artist}</td>
                            <td class="p-2 text-left">{new Date(worksheet.modified).toLocaleString()}</td>
                            <td class="p-2 text-red-500"><ButtonInline onClick={()=>deleteWorksheet(worksheet.id!)} hoverLabel="Delete worksheet"><Icon type={IconType.Delete} /></ButtonInline></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </Modal>
    );
}
