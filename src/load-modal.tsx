import { useContext, useEffect, useState } from "preact/hooks";
import { Modal } from "./modal";
import { AppStateContext } from "./app-state";
import { WorksheetRecord } from "./db";
import { Icon, IconType } from "./icon";
import Fraction from "fraction.js";

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
        appState.worksheetID.value = worksheet.id;
        appState.worksheetLabel.value = worksheet.label;
        appState.title.value = worksheet.data.title;
        appState.artist.value = worksheet.data.artist;
        appState.mountType.value = worksheet.data.mountType;
        appState.width.dim.value = new Fraction(worksheet.data.width);
        appState.width.revealPre.value = new Fraction(worksheet.data.revealLeft);
        appState.width.revealPost.value = new Fraction(worksheet.data.revealRight);
        appState.height.dim.value = new Fraction(worksheet.data.height);
        appState.height.revealPre.value = new Fraction(worksheet.data.revealTop);
        appState.height.revealPost.value = new Fraction(worksheet.data.revealBottom);
        appState.frameWidth.value = new Fraction(worksheet.data.frameWidth);
        appState.frameDepth.value = new Fraction(worksheet.data.frameDepth);
        
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
                            <td class="p-2"><button class="hover:scale-110" onClick={()=>loadWorksheet(worksheet)}><Icon type={IconType.Load} /></button></td>
                            <td class="p-2 text-left">{worksheet.label}</td>
                            <td class="p-2 text-left">{worksheet.data.title}</td>
                            <td class="p-2 text-left">{worksheet.data.artist}</td>
                            <td class="p-2 text-left">{new Date(worksheet.modified).toLocaleString()}</td>
                            <td class="p-2 text-red-500"><button class="hover:scale-110" onClick={()=>deleteWorksheet(worksheet.id!)}><Icon type={IconType.Delete} /></button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </Modal>
    );
}
