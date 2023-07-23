import { del, keys, set, values } from "idb-keyval";
import { MountType } from "../types/MountType";

export type WorksheetData = {
    title: string;
    artist: string;
    mountType: MountType;
    width: string;
    revealLeft: string;
    revealRight: string;
    height: string;
    revealTop: string;
    revealBottom: string;
    frameWidth: string;
    frameDepth: string;
};

export type WorksheetRecord = {
    id?: number;
    label: string;
    modified: number;
    data: WorksheetData;
};

export class Database {
    constructor() {}

    public static openDB(): Promise<Database> {
        return new Promise<Database>((resolve, _reject) => {
            resolve(new Database());
        });
    }

    public async getWorksheets(): Promise<Array<WorksheetRecord>> {
        return values();
    }

    public async createWorksheet(worksheet: WorksheetRecord): Promise<number> {
        let _newId: number;
        return keys()
            .then((ids) => (ids.map((i) => i as number).reduce((a, b) => Math.max(a, b), 0) ?? 0) + 1)
            .then((newId) => {
                worksheet.id = newId;
                _newId = newId;
                return set(newId, worksheet);
            })
            .then(() => _newId);
    }

    public async updateWorksheet(id: number, worksheet: WorksheetRecord) {
        worksheet.id = id;
        worksheet.modified = Date.now();
        return set(id, worksheet);
    }

    public async deleteWorksheet(id: number) {
        return del(id);
    }
};
