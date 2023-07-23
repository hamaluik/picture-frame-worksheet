import { WorksheetData } from "./WorksheetData";

export type WorksheetRecord = {
    id?: number;
    label: string;
    modified: number;
    data: WorksheetData;
};

