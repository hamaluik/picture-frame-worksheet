import { useContext, useId } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { Label } from "../components/label";
import { AppStateContext } from "../store/state";
import { MakeBasicProfile, MakeBevelledProfile, MakeBlankProfile, ProfileTypeEnum } from "../types/ProfileType";
import Dimension from "../types/Dimension";

export function ProfileTypeSelector() {
    const appState = useContext(AppStateContext);

    const onChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const target = evt.target as HTMLSelectElement;
        const newProfileType = target!.value as unknown as ProfileTypeEnum;
        if(newProfileType !== appState.profile.value.id) {
            switch(newProfileType) {
                case ProfileTypeEnum.Blank:
                    appState.profile.value = MakeBlankProfile();
                    break;
                case ProfileTypeEnum.Basic:
                    appState.profile.value = MakeBasicProfile();
                    break;
                case ProfileTypeEnum.Bevelled:
                    appState.profile.value = MakeBevelledProfile(new Dimension("1/4"));
                    break;
            };
        }
    };

    const selectId = useId();
    return (
        <div class="mb-4 print:hidden">
            <Label id={selectId}>Profile Type</Label>
            <select id={selectId} value={appState.profile.value.id} onChange={onChange} class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline print:appearance-none print:text-black print:bg-white print:shadow-none print:outline-none print:border-2">
                <option value={ProfileTypeEnum.Blank}>Blank</option>
                <option value={ProfileTypeEnum.Basic}>Basic</option>
                <option value={ProfileTypeEnum.Bevelled}>Bevelled</option>
            </select>
        </div>
    )
}
