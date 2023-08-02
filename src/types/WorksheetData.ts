import { MountType, validate as validateMountType } from "./MountType";
import { deserializeProfile } from "./ProfileType";

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
    material: string;
    finish: string;
    profile: any;
};

export function validate(data: WorksheetData) {
    if(!data) throw "Worksheet data is null or empty";
    const properties = ['title', 'artist', 'width', 'revealLeft', 'revealRight', 'height', 'revealTop', 'revealBottom', 'frameWidth', 'frameDepth', 'material', 'finish'];
    let dataObj = data as any;
    for(const property of properties) {
        if(!(property in dataObj) || typeof(dataObj[property]) !== "string" || dataObj[property] === null) {
            throw `Property ${property} missing or invalid: '${dataObj[property]}'`;
        }
    }

    if(!('mountType' in data)) {
        throw "mountType missing";
    }
    validateMountType(data.mountType);

    if(!('profile' in data)) {
        throw "profile missing";
    }
    deserializeProfile(data.profile);
};
