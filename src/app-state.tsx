import { signal, computed, Signal } from '@preact/signals';
import Fraction from 'fraction.js';
import { createContext } from 'preact';
import { Database } from './db';
import { parseVulgars } from 'vulgar-fractions';

export enum DimDirection {
    Horizontal = "horizontal",
    Vertical = "vertical",
};

export enum MountType {
    Flush = "flush",
    Matted = "matted",
    Float = "float",
};

export class Dimension {
    #input: string = "0";
    #isError: boolean = false;
    #value: Fraction = new Fraction(0);

    constructor(val: string | number | Fraction) {
        if(val === null || val === undefined) return;

        const set = (inp: string) => {
                this.#input = inp;
                try {
                    this.#value = new Fraction(inp.trim());
                    this.#isError = false;
                }
                catch {
                    this.#value = new Fraction(0);
                    this.#isError = true;
                }
        };

        switch(typeof val) {
            case "string": {
                set(val);
            };
            break;
            case "number": {
                set(val.toString());
            };
            break;
            case "object": {
                if(val instanceof Fraction) {
                    this.#value = val;
                    this.#isError = false;
                    this.#input = val.toFraction(true);
                }
                else {
                    console.error("Invalid type to set Dimension value with", val);
                }
            };
            break;
            default: {
                console.error("Invalid type to set Dimension value with", val);
            };
        };
    }

    get input(): string {
        return this.#input;
    }

    get isError(): boolean {
        return this.#isError;
    }

    get display(): string {
        if(this.#isError) {
            return this.#input;
        }
        else {
            return parseVulgars(this.#value.toFraction(true));
        }
    }

    get decimal(): number {
        if(this.#isError) return 0.0;
        return this.#value.valueOf();
    }

    public add(other: Dimension): Dimension {
        const newDim =  new Dimension(this.#value.add(other.#value));
        newDim.#isError = this.isError || other.isError;
        return newDim;
    }

    public sub(other: Dimension): Dimension {
        const newDim = new Dimension(this.#value.sub(other.#value));
        newDim.#isError = this.isError || other.isError;
        return newDim;
    }

    public mul(multiplier: number): Dimension {
        const newDim = new Dimension(this.#value.mul(multiplier));
        newDim.#isError = this.isError;
        return newDim;
    }
};

export type DimState = {
    dim: Signal<Dimension>,
    revealPre: Signal<Dimension>,
    revealPost: Signal<Dimension>,
    mountDim: Signal<Dimension>,
    innerDim: Signal<Dimension>,
};

export function createDimState(baseDim: string): DimState {
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
    const frameWidth = signal(new Dimension("1"));
    const frameDepth = signal(new Dimension("3/4"));
    const lengthBuffer = signal(new Dimension(1.0));
    const horizontalLength = computed(() => {
        return width.innerDim.value.add(frameWidth.value.mul(2).add(lengthBuffer.value));
    });
    const verticalLength = computed(() => {
        return height.innerDim.value.add(frameWidth.value.mul(2).add(lengthBuffer.value));
    });

    const installPrompt = signal(undefined);

    const db = signal<Database | undefined>(undefined);
    Database.openDB()
        .then((d) => db.value = d)
        .catch((err) => console.error(`Failed to open DB: ${err}`));

    return { worksheetID, worksheetLabel, title, artist, mountType, width, height, frameWidth, frameDepth, lengthBuffer, horizontalLength, verticalLength, installPrompt, db};
};

export const AppStateContext = createContext(createAppState());
