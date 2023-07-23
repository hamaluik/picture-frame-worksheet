import { IErrorDetail, createCheckers } from "ts-interface-checker";
import { WorksheetRecord } from "../types/WorksheetRecord";
import MountTypeTI from "../types/MountType-ti";
import WorksheetDataTI from "../types/WorksheetData-ti";
import WorksheetRecordTI from "../types/WorksheetRecord-ti";
import { parse, stringify } from "jsurl2";

const { WorksheetRecordChecker } = createCheckers(WorksheetRecordTI, WorksheetDataTI, MountTypeTI);

export type ShareLoadResult = {
    record?: WorksheetRecord,
    errors?: IErrorDetail[],
};

export function tryLoadShare(): ShareLoadResult | null {
    if(!document.location.hash) return null;

    try {
        const sharedRecord: WorksheetRecord = parse(document.location.hash, { deURI: true });
        const validationErrors = WorksheetRecordChecker.validate(sharedRecord);
        if(validationErrors === null) return { record: sharedRecord };
        return { errors: validationErrors };
    }
    catch(e) {
        console.warn("Failed to load shared record", {
            record: document.location.hash,
            error: e,
        });
    }
    return null
}

export async function shareCurrentWorksheet(worksheet: WorksheetRecord): Promise<string | null> {
    delete worksheet.id;
    const share = stringify(worksheet, { rich: true, short: true });
    const l = document.location;
    const location = `${l.origin}${l.pathname}${l.search}#${share}`;

    const shareData = {
        title: "Picture Frame Worksheet",
        text: "Share a picture frame worksheet",
        url: location,
    };

    
    try {
        if(!navigator.canShare(shareData)) {
            return location;
        }
        await navigator.share(shareData);
        return null;
    }
    catch(e) {
        console.error("Failed to share current worksheet", e);
        // document.location.replace(location);
    }

    return location;
};
