import { useContext } from "preact/hooks";
import { AppStateContext } from "../../store/state";
import { ProfileTypeEnum } from "../../types/ProfileType";
import Dimension from "../../types/Dimension";

export function BevelledProfile() {
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

    const lipDepth = appState.lipDepth.value;
    const lipThickness = appState.lip.value.add(appState.slop.value);
    const bevelDepth = appState.profile.value.id === ProfileTypeEnum.Bevelled
        ? appState.profile.value.bevelDepth
        : new Dimension(0.0);
    const cutDepth = frameDepth.sub(lipDepth).sub(bevelDepth);

    const ld = lipDepth.decimal;
    const lt = lipThickness.decimal;
    const bd = bevelDepth.decimal;
    const cd = cutDepth.decimal;

    const commands = 
        `M${marginH * scale},${(marginV + bd)* scale}`
        + `l${w * scale},${-bd * scale}`
        + `v${d * scale}`
        + `h${(lt - w) * scale}`
        + `v${-cd * scale}`
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
                y={(marginV + bd + ld + (cd / 2)) * scale + 4}
                text-anchor="end"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {cutDepth.display}
            </text>
            <text
                x={(marginH + (lt / 2)) * scale}
                y={(marginV + bd + ld) * scale + 12}
                text-anchor="middle"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {lipThickness.display}
            </text>
            <text
                x={(marginH) * scale - 4}
                y={(marginV + bd + (lt / 2)) * scale + 4}
                text-anchor="end"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {lipDepth.display}
            </text>
            <text
                x={(marginH) * scale - 4}
                y={(marginV + (bd / 2)) * scale + 4}
                text-anchor="end"
                class="fill-gray-800 dark:fill-gray-100 print:fill-black text-[8px]">
                    {bevelDepth.display}
            </text>
        </svg>
    );
}

