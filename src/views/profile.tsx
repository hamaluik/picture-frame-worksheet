import { useContext } from "preact/hooks";
import { AppStateContext } from "../store/state";
import Dimension from "../types/Dimension";

export function Profile() {
    const appState = useContext(AppStateContext);

    const frameWidth = appState.frameWidth.value;
    const frameDepth = appState.frameDepth.value;

    const w = frameWidth.decimal;
    const d = frameDepth.decimal;
    const scale = 100 / Math.max(w, d);

    const marginH = 0.125 * Math.max(w, d);
    const marginV = 0.125 * Math.max(w, d);

    const viewWidth = (w + (marginH * 2)) * scale;
    const viewHeight = (d + (marginV * 2)) * scale;

    const lipDepth = new Dimension("1/4");
    const lipThickness = new Dimension("1/4");

    const ld = lipDepth.decimal;
    const lt = lipThickness.decimal;

    const commands = 
        `M${marginH * scale},${marginV * scale}`
        + `h${w * scale}`
        + `v${d * scale}`
        + `h${(lt - w) * scale}`
        + `v${(ld - d) * scale}`
        + `h${(-lt) * scale}`
        + 'z';
    
    return (
        <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} aria-label="Drawing of picture frame profile">
            <path class="stroke-gray-800 dark:stroke-gray-100 print:stroke-black stroke-2 fill-none" d={commands} vector-effect="non-scaling-stroke" />
            <text
                x={(marginH + (w / 2)) * scale}
                y={(marginV) * scale - 6}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {frameWidth.display}
            </text>
            <text
                x={((viewWidth / scale) - marginH) * scale + 4}
                y={(marginV + (d / 2)) * scale + 4}
                text-anchor="start"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {frameDepth.display}
            </text>
            <text
                x={(marginH + ((w - lt) / 2) + lt) * scale}
                y={((viewHeight / scale) - marginV) * scale + 12}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {frameWidth.sub(lipThickness).display}
            </text>
            <text
                x={(marginH + lt) * scale - 4}
                y={(marginV + ld + ((d - ld) / 2)) * scale + 4}
                text-anchor="end"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {frameDepth.sub(lipDepth).display}
            </text>
            <text
                x={(marginH + (lt / 2)) * scale}
                y={(marginV + ld) * scale + 12}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {lipThickness.display}
            </text>
            <text
                x={(marginH) * scale - 4}
                y={(marginV + (lt / 2)) * scale + 4}
                text-anchor="end"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {lipDepth.display}
            </text>
        </svg>
    );
}
