import Dimension from "./Dimension";

export const enum ProfileTypeEnum {
    Blank = "blank",
    Basic = "basic",
    Bevelled = "bevelled",
};

export type BlankProfile = {
    id: ProfileTypeEnum.Blank,
};

export function MakeBlankProfile(): BlankProfile {
    return { id: ProfileTypeEnum.Blank };
};

export type BasicProfile = {
    id: ProfileTypeEnum.Basic,
};

export function MakeBasicProfile(): BasicProfile {
    return { id: ProfileTypeEnum.Basic };
};

export type BevelledProfile = {
    id: ProfileTypeEnum.Bevelled,
    bevelDepth: Dimension,
};

export function MakeBevelledProfile(bevelDepth: Dimension): BevelledProfile {
    return { id: ProfileTypeEnum.Bevelled, bevelDepth: bevelDepth };
};

export type ProfileType = BlankProfile | BasicProfile | BevelledProfile;

export function serializeProfile(profile: ProfileType): any {
    switch(profile.id) {
        case ProfileTypeEnum.Blank:
        case ProfileTypeEnum.Basic:
            return { id: profile.id };
        case ProfileTypeEnum.Bevelled:
            return { id: profile.id, bevelWidth: profile.bevelDepth.display };
    }
};

export function deserializeProfile(profile: any): ProfileType {
    switch(profile.id) {
        case ProfileTypeEnum.Blank:
            return { id: ProfileTypeEnum.Blank };
        case ProfileTypeEnum.Basic:
            return { id: ProfileTypeEnum.Basic };
        case ProfileTypeEnum.Bevelled:
            if(profile.bevelWidth === null || profile.bevelWidth === undefined || typeof(profile.bevelWidth) !== "string") {
                throw `Invalid bevel profile, bevelWidth is not set: ${JSON.stringify(profile)}`;
            }
            return { id: ProfileTypeEnum.Bevelled, bevelDepth: new Dimension(profile.bevelWidth) };
    }

    throw `Invalid profile: ${JSON.stringify(profile)}`;
};

