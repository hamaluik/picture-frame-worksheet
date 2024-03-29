import { useContext } from "preact/hooks";
import { parseVulgars } from "vulgar-fractions";
import { AppStateContext } from "../store/state";

export function Cutlist() {
    const appState = useContext(AppStateContext);

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
                        <td class="text-right p-2">{parseVulgars(appState.horizontalLength.value.display)}</td>
                        <td class="text-right p-2">{parseVulgars(appState.frameWidth.value.display)}</td>
                        <td class="text-right p-2">{parseVulgars(appState.frameDepth.value.display)}</td>
                    </tr>
                    <tr>
                        <td class="text-right p-2">2×</td>
                        <td class="text-right p-2">{parseVulgars(appState.verticalLength.value.display)}</td>
                        <td class="text-right p-2">{parseVulgars(appState.frameWidth.value.display)}</td>
                        <td class="text-right p-2">{parseVulgars(appState.frameDepth.value.display)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="border-t-2 border-gray-800 dark:border-gray-100 print:border-black">
                        <td class="text-right p2 font-bold">Total</td>
                        <td class="text-right p-2">{parseVulgars(appState.verticalLength.value.add(appState.horizontalLength.value).mul(2).display)}</td>
                        <td class="text-right p-2">{parseVulgars(appState.frameWidth.value.display)}</td>
                        <td class="text-right p-2">{parseVulgars(appState.frameDepth.value.display)}</td>
                    </tr>
                </tfoot>
            </table>
            <h3 class="font-semibold text-l text-gray-800 dark:text-gray-100 print:text-black">Frame</h3>
            <table class="table-auto self-center border-collapse border-spacing-0 text-gray-800 dark:text-gray-100 print:text-black">
                <thead>
                    <tr class="border-b-2 border-gray-800 dark:border-gray-100 print:border-black">
                        <th class="text-right p-2">Count</th>
                        <th class="text-right p-2">Inner Length</th>
                        <th class="text-right p-2">Cut Length</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-right p-2">2×</td>
                        <td class="text-right p-2">{parseVulgars(appState.width.innerDim.value.display)}</td>
                        <td class="text-right p-2">{parseVulgars(appState.width.cutDim.value.display)}</td>
                    </tr>
                    <tr>
                        <td class="text-right p-2">2×</td>
                        <td class="text-right p-2">{parseVulgars(appState.height.innerDim.value.display)}</td>
                        <td class="text-right p-2">{parseVulgars(appState.height.cutDim.value.display)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
