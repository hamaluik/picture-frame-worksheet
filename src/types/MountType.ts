export const enum MountType {
    Flush = "flush",
    Matted = "matted",
    Float = "float",
};

export function validate(type: MountType) {
    switch(type) {
        case MountType.Flush:
        case MountType.Matted:
        case MountType.Float:
                return;
        default:
            throw `Invalid mount type "${type}"`;
    }
};

