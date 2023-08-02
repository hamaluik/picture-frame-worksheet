import { useContext } from "preact/hooks";
import { AppStateContext } from "../../store/state";

export function BlankProfile() {
    const appState = useContext(AppStateContext);

    const frameWidth = appState.frameWidth.value;
    const frameDepth = appState.frameDepth.value;

    const w = frameWidth.decimal;
    const d = frameDepth.decimal;
    const scale = 100 / Math.max(w, d);

    const marginH = 0;
    const marginV = 0;

    const viewWidth = (w + (marginH * 2)) * scale;
    const viewHeight = (d + (marginV * 2)) * scale;

    const commands = 
        `M${marginH * scale},${marginV * scale}`
        + `h${w * scale}`
        + `v${d * scale}`
        + `h${-w * scale}`
        + 'z';

    return (
        <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} aria-label="Drawing of picture frame profile (blank)">
            <path class="stroke-gray-800 dark:stroke-gray-100 print:stroke-black stroke-2 fill-none" d={commands} vector-effect="non-scaling-stroke" />
        </svg>
    );
}
