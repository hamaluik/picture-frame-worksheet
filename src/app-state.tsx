import { signal, computed, Signal } from '@preact/signals';
import Fraction from 'fraction.js';
import { createContext } from 'preact';
import { Database } from './db';

export enum DimDirection {
    Horizontal = "horizontal",
    Vertical = "vertical",
};

export enum MountType {
    Flush = "flush",
    Matted = "matted",
    Float = "float",
};

export type DimState = {
    dim: Signal<string>,
    revealPre: Signal<string>,
    revealPost: Signal<string>,
    mountDim: Signal<Fraction>,
    innerDim: Signal<Fraction>,
};

export function createDimState(baseDim: string): DimState {
    const dim = signal(baseDim);
    const revealPre = signal("0");
    const revealPost = signal("0");
    const mountDim = computed(() => {
        return new Fraction(dim.value).add(new Fraction(revealPre.value)).add(new Fraction(revealPost.value));
    });
    const innerDim = computed(() => {
        const result = mountDim.value.sub(new Fraction(1, 8));
        if(result < new Fraction(0)) {
            return new Fraction(0);
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
    frameWidth: Signal<string>;
    frameDepth: Signal<string>;
    lengthBuffer: Signal<Fraction>;
    horizontalLength: Signal<Fraction>;
    verticalLength: Signal<Fraction>;

    installPrompt: Signal<Event | undefined>;

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
    const frameWidth = signal("1");
    const frameDepth = signal("3/4");
    const lengthBuffer = signal(new Fraction(1.0));
    const horizontalLength = computed(() => {
        return width.innerDim.value.add(new Fraction(frameWidth.value).mul(2).add(lengthBuffer.value));
    });
    const verticalLength = computed(() => {
        return height.innerDim.value.add(new Fraction(frameWidth.value).mul(2).add(lengthBuffer.value));
    });

    const installPrompt = signal(undefined);

    const db = signal<Database | undefined>(undefined);
    Database.openDB()
        .then((d) => db.value = d)
        .catch((err) => console.error(`Failed to open DB: ${err}`));

    return { worksheetID, worksheetLabel, title, artist, mountType, width, height, frameWidth, frameDepth, lengthBuffer, horizontalLength, verticalLength, installPrompt, db};
};

export const AppStateContext = createContext(createAppState());
