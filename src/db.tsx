import { del, keys, set, values } from "idb-keyval";
import { MountType } from "./app-state";

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

// const DB_NAME = "picture-frame-worksheet";
// const DB_VERSION = 1;
// const DB_STORE_NAME = "worksheets";

// export class Database {
//     private db: IDBDatabase;
//
//     constructor(db: IDBDatabase) {
//         this.db = db;
//     }
//
//     public static openDB(): Promise<Database> {
//         return new Promise<Database>((resolve, reject) => {
//             const request = window.indexedDB.open(DB_NAME, DB_VERSION);
//             request.onsuccess = () => {
//                 console.debug(`successfully opened db ${DB_NAME}:${DB_VERSION}`);
//                 resolve(new Database(request.result));
//             };
//             request.onerror = () => {
//                 console.error(`failed to open db: ${request.error}`);
//                 reject(request.error);
//             };
//             request.onupgradeneeded = () => {
//                 const db = request.result;
//                 const store = db.createObjectStore(DB_STORE_NAME, {
//                     keyPath: "id",
//                     autoIncrement: true,
//                 });
//                 console.debug(`created object store due to upgrade`, store);
//                 // store.createIndex("title", "title", { unique: false });
//                 // store.createIndex("author", "author", { unique: false });
//                 // store.createIndex("modified", "modified", { unique: false });
//             };
//         });
//     }
//
//     public getWorksheets(): Promise<Array<WorksheetRecord>> {
//         return new Promise<Array<WorksheetRecord>>((resolve, reject) => {
//             const tx = this.db.transaction(DB_STORE_NAME, "readonly");
//             tx.onerror = reject;
//             const store = tx.objectStore(DB_STORE_NAME);
//             const results: IDBRequest<WorksheetRecord[]> = store.getAll();
//
//             results.onsuccess = () => resolve(results.result);
//             results.onerror = reject;
//         });
//     }
//
//     public createWorksheet(worksheet: WorksheetRecord): Promise<void> {
//         if('id' in worksheet) delete worksheet.id;
//
//         return new Promise<void>((resolve, reject) => {
//             const tx = this.db.transaction(DB_STORE_NAME, "readwrite");
//             tx.onerror = reject;
//             const store = tx.objectStore(DB_STORE_NAME);
//
//             const request = store.add(worksheet);
//             request.onsuccess = () => resolve();
//             request.onerror = reject;
//             tx.commit();
//         });
//     }
//
//     public updateWorksheet(id: number, worksheet: WorksheetRecord): Promise<void> {
//         worksheet.id = id;
//         return new Promise<void>((resolve, reject) => {
//             const tx = this.db.transaction(DB_STORE_NAME, "readwrite");
//             tx.onerror = reject;
//             const store = tx.objectStore(DB_STORE_NAME);
//            
//             const request = store.put(worksheet, id);
//             request.onsuccess = () => resolve();
//             request.onerror = reject;
//             tx.commit();
//         });
//     }
//
//     public deleteWorksheet(id: number): Promise<void> {
//         return new Promise<void>((resolve, reject) => {
//             const tx = this.db.transaction(DB_STORE_NAME, "readwrite");
//             tx.onerror = reject;
//             const store = tx.objectStore(DB_STORE_NAME);
//            
//             const request = store.delete(id);
//             request.onsuccess = () => resolve();
//             request.onerror = reject;
//             tx.commit();
//         });
//     }
// }
