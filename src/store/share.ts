import { WorksheetRecord, validate as validateWorksheetRecord } from "../types/WorksheetRecord";

export type ShareLoadResult = {
    record?: WorksheetRecord,
    error?: any,
};

export function tryLoadShare(): ShareLoadResult | null {
    const params = new URLSearchParams(document.location.search);
    const sheet = params.get("sheet");
    if(!sheet) return null;

    let sharedRecord: WorksheetRecord;
    try {
        sharedRecord = parse(sheet);
    }
    catch(e) {
        console.warn("Failed to parsed shared record", {
            record: sheet,
            error: e,
        });
        return null;
    }
    try {
        validateWorksheetRecord(sharedRecord);
        return {
            record: sharedRecord,
        };
    }
    catch(e) {
        console.warn("Failed to run shared record validation", {
            record: sharedRecord,
            error: e,
        });
        return {
            error: e,
        };
    }
}

export async function shareCurrentWorksheet(worksheet: WorksheetRecord): Promise<string | null> {
    delete worksheet.id;
    const share = stringify(worksheet);
    const l = document.location;
    const location = `${l.origin}${l.pathname}?sheet=${share}`;

    const shareData = {
        title: "Picture Frame Worksheet",
        text: `Picture frame dimensions for ${worksheet.data.title} by ${worksheet.data.artist}`,
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
    }

    return location;
};

function parse(str: string): WorksheetRecord {
    return JSON.parse(atob(decodeURIComponent(str)));
}

function stringify(record: WorksheetRecord): string {
    return encodeURIComponent(btoa(JSON.stringify(record)));
}

