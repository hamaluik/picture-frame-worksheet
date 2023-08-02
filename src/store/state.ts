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
};

function createDimState(baseDim: string): DimState {
    const dim = signal(new Dimension(baseDim));
    const revealPre = signal(new Dimension("0"));
    const revealPost = signal(new Dimension("0"));
    const mountDim = computed(() => {
        return dim.value.add(revealPre.value).add(revealPost.value);
    });
    const innerDim = computed(() => {
        const result = mountDim.value.sub(new Dimension("1/8"));
        if(result.decimal < 0.0) {
            return new Dimension(0.0);
        }
        return result;
    })

    return { dim, revealPre, revealPost, mountDim, innerDim };
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

    profile: Signal<ProfileType>;

    db: Signal<Database | undefined>;
};

export function createAppState(): AppState {
    const worksheetID = signal(undefined);
    const worksheetLabel = signal("");
    const title = signal("");
    const artist = signal("");
    const mountType = signal(MountType.Flush);
    const width = createDimState("6");
    const height = createDimState("4");
    const frameWidth = signal(new Dimension("1"));
    const frameDepth = signal(new Dimension("3/4"));
    const lengthBuffer = signal(new Dimension(1.0));

    const horizontalLength = computed(() => {
        return width.innerDim.value.add(frameWidth.value.mul(2).add(lengthBuffer.value));
    });
    const verticalLength = computed(() => {
        return height.innerDim.value.add(frameWidth.value.mul(2).add(lengthBuffer.value));
    });

    const material = signal("");
    const finish = signal("");

    const profile = signal(MakeBasicProfile());

    const db = signal<Database | undefined>(undefined);
    Database.openDB()
        .then((d) => db.value = d)
        .catch((err) => console.error(`Failed to open DB: ${err}`));

    return { worksheetID, worksheetLabel, title, artist, mountType, width, height, frameWidth, frameDepth, lengthBuffer, horizontalLength, verticalLength, material, finish, profile, db};
};

export const AppStateContext = createContext(createAppState());
