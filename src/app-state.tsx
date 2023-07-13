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
};

export function createDimState(): DimState {
    const dim = signal(new Fraction(0.0));
    const revealPre = signal(new Fraction(0.0));
    const revealPost = signal(new Fraction(0.0));
    const mountDim = computed(() => {
        return dim.value.add(revealPre.value).add(revealPost.value);
    });

    return { dim, revealPre, revealPost, mountDim };
}

export type AppState = {
    mountType: Signal<MountType>;
    width: DimState;
    height: DimState;
};

export function createAppState(): AppState {
    const mountType = signal(MountType.Flush);
    const width = createDimState();
    const height = createDimState();

    return { mountType, width, height };
};

export const AppStateContext = createContext(createAppState());
