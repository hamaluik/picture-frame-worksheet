import { useContext, useId } from "preact/hooks";
import { AppStateContext, MountType } from "./app-state"
import { ChangeEvent } from "preact/compat";
import Fraction from "fraction.js";
import { Label } from "./label";

export function MountTypeSelector() {
    const appState = useContext(AppStateContext);

    const onChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const target = evt.target as HTMLSelectElement;
        const newMountType = target!.value as unknown as MountType;
        if(appState.mountType.value !== MountType.Flush && newMountType === MountType.Flush) {
            appState.width.revealPre.value = new Fraction(0.0);
            appState.width.revealPost.value = new Fraction(0.0);
            appState.height.revealPre.value = new Fraction(0.0);
            appState.height.revealPost.value = new Fraction(0.0);
        }
        appState.mountType.value = newMountType;
    };

    const selectId = useId();
    return (
        <div class="mb-4">
            <Label forId={selectId} isError={false}>Mounting Type</Label>
            <select id={selectId} value={appState.mountType} onChange={onChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline print:appearance-none print:text-black print:bg-white print:shadow-none print:outline-none print:rounded-none print:border-2">
                <option value={MountType.Flush}>Flush</option>
                <option value={MountType.Matted}>Matted</option>
                <option value={MountType.Float}>Float</option>
            </select>
        </div>
    )
}
