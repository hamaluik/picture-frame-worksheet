import { signal, computed, Signal } from '@preact/signals';
import { createContext } from 'preact';
import { Database } from './db';
import Dimension from '../types/Dimension';
import { MountType } from '../types/MountType';
import { MakeBasicProfile, ProfileType } from '../types/ProfileType';

export type DimState = {
    dim: Signal<Dimension>,
    revealPre: Signal<Dimension>,
    revealPost: Signal<Dimension>,
    mountDim: Signal<Dimension>,
    innerDim: Signal<Dimension>,
    cutDim: Signal<Dimension>,
};

function createDimState(baseDim: string, lip: Signal<Dimension>, slop: Signal<Dimension>): DimState {
    const dim = signal(new Dimension(baseDim));
    const revealPre = signal(new Dimension("0"));
    const revealPost = signal(new Dimension("0"));
    const mountDim = computed(() => {
        return dim.value.add(revealPre.value).add(revealPost.value);
    });
    const innerDim = computed(() => {
        const result = mountDim.value.sub(lip.value);
        if (result.decimal < 0.0) {
            return new Dimension(0.0);
        }
        return result;
    });
    const cutDim = computed(() => {
        const result = mountDim.value.add(slop.value);
        if (result.decimal < 0.0) {
            return new Dimension(0.0);
        }
        return result;
    });

    return { dim, revealPre, revealPost, mountDim, innerDim, cutDim };
}

export type AppState = {
    worksheetID: Signal<number | undefined>;
    worksheetLabel: Signal<string>;
    title: Signal<string>;
    artist: Signal<string>;
    mountType: Signal<MountType>;

    width: DimState;
    height: DimState;

    frameWidth: Signal<Dimension>;
    frameDepth: Signal<Dimension>;
    lengthBuffer: Signal<Dimension>;
    horizontalLength: Signal<Dimension>;
    verticalLength: Signal<Dimension>;

    material: Signal<string>;
    finish: Signal<string>;

    lip: Signal<Dimension>;
    lipDepth: Signal<Dimension>;
    slop: Signal<Dimension>;
    profile: Signal<ProfileType>;

    db: Signal<Database | undefined>;
};

export function createAppState(): AppState {
    const worksheetID = signal(undefined);
    const worksheetLabel = signal("");
    const title = signal("");
    const artist = signal("");
    const mountType = signal(MountType.Flush);
    const lip = signal(new Dimension("1/8"));
    const lipDepth = signal(new Dimension("1/4"));
    const slop = signal(new Dimension("1/8"));
    const width = createDimState("6", lip, slop);
    const height = createDimState("4", lip, slop);
    const frameWidth = signal(new Dimension("1"));
    const frameDepth = signal(new Dimension("1"));
    const lengthBuffer = signal(new Dimension("1/2"));

    const horizontalLength = computed(() => {
        return width.innerDim.value
            .add(slop.value)
            .add(frameWidth.value.mul(2).add(lengthBuffer.value));
    });
    const verticalLength = computed(() => {
        return height.innerDim.value
            .add(slop.value)
            .add(frameWidth.value.mul(2).add(lengthBuffer.value));
    });

    const material = signal("");
    const finish = signal("");

    const profile = signal(MakeBasicProfile());

    const db = signal<Database | undefined>(undefined);
    Database.openDB()
        .then((d) => db.value = d)
        .catch((err) => console.error(`Failed to open DB: ${err}`));

    return {
        worksheetID,
        worksheetLabel,
        title,
        artist,
        mountType,
        width,
        height,
        lip,
        lipDepth,
        slop,
        frameWidth,
        frameDepth,
        lengthBuffer,
        horizontalLength,
        verticalLength,
        material,
        finish,
        profile,
        db
    };
};

export const AppStateContext = createContext(createAppState());
