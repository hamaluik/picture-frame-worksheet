import { useContext, useId } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { Label } from "../components/label";
import { MountType } from "../types/MountType";
import Dimension from "../types/Dimension";
import { AppStateContext } from "../store/state";

export function MountTypeSelector() {
    const appState = useContext(AppStateContext);

    const onChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const target = evt.target as HTMLSelectElement;
        const newMountType = target!.value as unknown as MountType;
        if(appState.mountType.value !== MountType.Flush && newMountType === MountType.Flush) {
            appState.width.revealPre.value = new Dimension("0");
            appState.width.revealPost.value = new Dimension("0");
            appState.height.revealPre.value = new Dimension("0");
            appState.height.revealPost.value = new Dimension("0");
        }
        appState.mountType.value = newMountType;
    };

    const selectId = useId();
    return (
        <div class="mb-4">
            <Label id={selectId}>Mounting Type</Label>
            <select id={selectId} value={appState.mountType} onChange={onChange} class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline print:appearance-none print:text-black print:bg-white print:shadow-none print:outline-none print:border-2">
                <option value={MountType.Flush}>Flush</option>
                <option value={MountType.Matted}>Matted</option>
                <option value={MountType.Float}>Float</option>
            </select>
        </div>
    )
}
