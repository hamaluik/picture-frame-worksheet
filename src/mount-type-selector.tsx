import { useContext } from "preact/hooks";
import { AppStateContext, MountType } from "./app-state"
import { ChangeEvent } from "preact/compat";
import Fraction from "fraction.js";

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

    return (
        <select value={appState.mountType} onChange={onChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value={MountType.Flush}>Flush</option>
            <option value={MountType.Matted}>Matted</option>
            <option value={MountType.Float}>Float</option>
        </select>
    )
}
