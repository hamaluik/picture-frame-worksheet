import { signal, computed, Signal } from '@preact/signals';
import Fraction from 'fraction.js';
import { createContext } from 'preact';

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
    dim: Signal<Fraction>,
    revealPre: Signal<Fraction>,
    revealPost: Signal<Fraction>,
    mountDim: Signal<Fraction>,
    innerDim: Signal<Fraction>,
};

export function createDimState(baseDim: number): DimState {
    const dim = signal(new Fraction(baseDim));
    const revealPre = signal(new Fraction(0.0));
    const revealPost = signal(new Fraction(0.0));
    const mountDim = computed(() => {
        return dim.value.add(revealPre.value).add(revealPost.value);
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
    mountType: Signal<MountType>;
    width: DimState;
    height: DimState;
    frameWidth: Signal<Fraction>;
    frameDepth: Signal<Fraction>;
    lengthBuffer: Signal<Fraction>;
    horizontalLength: Signal<Fraction>;
    verticalLength: Signal<Fraction>;
};

export function createAppState(): AppState {
    const mountType = signal(MountType.Flush);
    const width = createDimState(6);
    const height = createDimState(4);
    const frameWidth = signal(new Fraction(1.0));
    const frameDepth = signal(new Fraction(3, 4));
    const lengthBuffer = signal(new Fraction(1.0));
    const horizontalLength = computed(() => {
        return width.innerDim.value.add(frameWidth.value.mul(2).add(lengthBuffer.value));
    });
    const verticalLength = computed(() => {
        return height.innerDim.value.add(frameWidth.value.mul(2).add(lengthBuffer.value));
    });

    return { mountType, width, height, frameWidth, frameDepth, lengthBuffer, horizontalLength, verticalLength };
};

export const AppStateContext = createContext(createAppState());
