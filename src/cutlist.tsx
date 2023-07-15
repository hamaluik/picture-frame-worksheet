import { useContext } from "preact/hooks";
import { AppStateContext } from "./app-state";
import { parseVulgars } from "vulgar-fractions";
import Fraction from "fraction.js";

export function Cutlist() {
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

    return (
        <div class="flex flex-col justify-start items-start">
            <h3 class="font-semibold text-l text-gray-800 dark:text-gray-100 print:text-black">Stock</h3>
            <table class="table-auto self-center border-collapse border-spacing-0 text-gray-800 dark:text-gray-100 print:text-black">
                <thead>
                    <tr class="border-b-2 border-gray-800 dark:border-gray-100 print:border-black">
                        <th class="text-right p-2">Count</th>
                        <th class="text-right p-2">Length</th>
                        <th class="text-right p-2">Width</th>
                        <th class="text-right p-2">Depth</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-right p-2">2×</td>
                        <td class="text-right p-2">{parseVulgars(appState.horizontalLength.value.toFraction(true))}</td>
                        <td class="text-right p-2">{parseVulgars(frameWidth.toFraction(true))}</td>
                        <td class="text-right p-2">{parseVulgars(frameDepth.toFraction(true))}</td>
                    </tr>
                    <tr>
                        <td class="text-right p-2">2×</td>
                        <td class="text-right p-2">{parseVulgars(appState.verticalLength.value.toFraction(true))}</td>
                        <td class="text-right p-2">{parseVulgars(frameWidth.toFraction(true))}</td>
                        <td class="text-right p-2">{parseVulgars(frameDepth.toFraction(true))}</td>
                    </tr>
                </tbody>
            </table>
            <h3 class="font-semibold text-l text-gray-800 dark:text-gray-100 print:text-black">Frame</h3>
            <table class="table-auto self-center border-collapse border-spacing-0 text-gray-800 dark:text-gray-100 print:text-black">
                <thead>
                    <tr class="border-b-2 border-gray-800 dark:border-gray-100 print:border-black">
                        <th class="text-right p-2">Count</th>
                        <th class="text-right p-2">Inner Length</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-right p-2">2×</td>
                        <td class="text-right p-2">{parseVulgars(appState.width.innerDim.value.toFraction(true))}</td>
                    </tr>
                    <tr>
                        <td class="text-right p-2">2×</td>
                        <td class="text-right p-2">{parseVulgars(appState.height.innerDim.value.toFraction(true))}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
