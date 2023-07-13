import { useContext } from "preact/hooks";
import { AppStateContext } from "./app-state";
import Fraction from "fraction.js";
import { parseVulgars } from "vulgar-fractions";

export function Profile() {
    const appState = useContext(AppStateContext);

    const w = appState.frameWidth.value.valueOf();
    const d = appState.frameDepth.value.valueOf();
    const scale = 100 / Math.max(w, d);

    const marginH = 0.25 * Math.max(w, d);
    const marginV = 0.25 * Math.max(w, d);

    const viewWidth = (appState.frameWidth.value.valueOf() + (marginH * 2)) * scale;
    const viewHeight = (appState.frameDepth.value.valueOf() + (marginV * 2)) * scale;

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
            <path class="stroke-gray-800 dark:stroke-gray-100 print:stroke-black stroke-1 fill-none" d={commands} />
            <text
                x={(marginH + (w / 2)) * scale}
                y={(marginV) * scale - 6}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(appState.frameWidth.value.toFraction(true))}
            </text>
            <text
                x={((viewWidth / scale) - marginH) * scale + 4}
                y={(marginV + (d / 2)) * scale + 4}
                text-anchor="start"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(appState.frameDepth.value.toFraction(true))}
            </text>
            <text
                x={(marginH + ((w - lt) / 2) + lt) * scale}
                y={((viewHeight / scale) - marginV) * scale + 12}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(appState.frameWidth.value.sub(1, 4).toFraction(true))}
            </text>
            <text
                x={(marginH + lt) * scale - 4}
                y={(marginV + ld + ((d - ld) / 2)) * scale + 4}
                text-anchor="end"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {parseVulgars(appState.frameDepth.value.sub(lipDepth).toFraction(true))}
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
