import { useContext } from "preact/hooks";
import { AppStateContext } from "./app-state";
import Fraction from "fraction.js";
import { parseVulgars } from "vulgar-fractions";

export function Profile() {
    const appState = useContext(AppStateContext);

    let frameWidth: Fraction = new Fraction(0);
    try {
        frameWidth = new Fraction(appState.frameWidth.value);
    }
    catch(_){}
    let frameDepth: Fraction = new Fraction(0);
    try {
        frameDepth = new Fraction(appState.frameDepth.value);
    }
    catch(_){}

    const w = frameWidth.valueOf();
    const d = frameDepth.valueOf();
    const scale = 100 / Math.max(w, d);

    const marginH = 0.25 * Math.max(w, d);
    const marginV = 0.25 * Math.max(w, d);

    const viewWidth = (new Fraction(appState.frameWidth.value).valueOf() + (marginH * 2)) * scale;
    const viewHeight = (d + (marginV * 2)) * scale;

    const lipDepth = new Fraction(1, 4);
    const lipThickness = new Fraction(1, 4);

    const ld = lipDepth.valueOf();
    const lt = lipThickness.valueOf();

    const commands = 
        `M${marginH * scale},${marginV * scale}`
        + `h${w * scale}`
        + `v${d * scale}`
        + `h${(lt - w) * scale}`
        + `v${(ld - d) * scale}`
        + `h${(-lt) * scale}`
        + 'z';
    
    return (
        <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
            <path class="stroke-gray-800 dark:stroke-gray-100 print:stroke-black stroke-2 fill-none" d={commands} vector-effect="non-scaling-stroke" />
            <text
                x={(marginH + (w / 2)) * scale}
                y={(marginV) * scale - 6}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(frameWidth.toFraction(true))}
            </text>
            <text
                x={((viewWidth / scale) - marginH) * scale + 4}
                y={(marginV + (d / 2)) * scale + 4}
                text-anchor="start"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(frameDepth.toFraction(true))}
            </text>
            <text
                x={(marginH + ((w - lt) / 2) + lt) * scale}
                y={((viewHeight / scale) - marginV) * scale + 12}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(frameWidth.sub(1, 4).toFraction(true))}
            </text>
            <text
                x={(marginH + lt) * scale - 4}
                y={(marginV + ld + ((d - ld) / 2)) * scale + 4}
                text-anchor="end"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(frameDepth.sub(lipDepth).toFraction(true))}
            </text>
            <text
                x={(marginH + (lt / 2)) * scale}
                y={(marginV + ld) * scale + 12}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(lipThickness.toFraction(true))}
            </text>
            <text
                x={(marginH) * scale - 4}
                y={(marginV + (lt / 2)) * scale + 4}
                text-anchor="end"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(lipDepth.toFraction(true))}
            </text>
        </svg>
    );
}
