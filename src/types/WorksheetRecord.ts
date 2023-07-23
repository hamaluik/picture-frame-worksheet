import { AppState } from "../store/state";
import Dimension from "./Dimension";
import { WorksheetData, validate as validateWorksheetData } from "./WorksheetData";

export type WorksheetRecord = {
    id?: number;
    label: string;
    modified: number;
    data: WorksheetData;
};

export function validate(record: WorksheetRecord) {
    if(!record) throw "Worksheet record is null or empty";
    let dataObj = record as any;
    if(!("label" in dataObj) || typeof(dataObj["label"]) !== "string" || dataObj["label"] === null) {
        throw `Property 'label' missing or invalid: '${dataObj["label"]}'`;
    }
    if(!("modified" in dataObj) || typeof(dataObj["modified"]) !== "number" || dataObj["modified"] === null) {
        throw `Property 'modified' missing or invalid: '${dataObj["modified"]}'`;
    }
    if(!("data" in dataObj) || dataObj["data"] === null) {
        throw `Property 'data' missing or invalid: '${dataObj["data"]}'`;
    }
    validateWorksheetData(record.data);
}

export function buildWorksheetRecord(state: AppState): WorksheetRecord {
    return {
        id: state.worksheetID.value,
        label: state.worksheetLabel.value,
        modified: Date.now(),
        data: {
            title: state.title.value,
            artist: state.artist.value,
            mountType: state.mountType.value,
            width: state.width.dim.value.input,
            revealLeft: state.width.revealPre.value.input,
            revealRight: state.width.revealPost.value.input,
            height: state.height.dim.value.input,
            revealTop: state.height.revealPre.value.input,
            revealBottom: state.height.revealPost.value.input,
            frameWidth: state.frameWidth.value.input,
            frameDepth: state.frameDepth.value.input,
        }
    };
};

export function applyWorksheetRecord(worksheet: WorksheetRecord, state: AppState) {
    state.worksheetID.value = worksheet.id;
    state.worksheetLabel.value = worksheet.label;
    state.title.value = worksheet.data.title;
    state.artist.value = worksheet.data.artist;
    state.mountType.value = worksheet.data.mountType;
    state.width.dim.value = new Dimension(worksheet.data.width);
    state.width.revealPre.value = new Dimension(worksheet.data.revealLeft);
    state.width.revealPost.value = new Dimension(worksheet.data.revealRight);
    state.height.dim.value = new Dimension(worksheet.data.height);
    state.height.revealPre.value = new Dimension(worksheet.data.revealTop);
    state.height.revealPost.value = new Dimension(worksheet.data.revealBottom);
    state.frameWidth.value = new Dimension(worksheet.data.frameWidth);
    state.frameDepth.value = new Dimension(worksheet.data.frameDepth);

};

