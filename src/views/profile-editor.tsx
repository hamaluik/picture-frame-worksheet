import { useContext} from "preact/hooks";
import { AppStateContext } from "../store/state";
import { MakeBevelledProfile, ProfileTypeEnum } from "../types/ProfileType";
import { InputEntry } from "../components/input-entry";
import Dimension from "../types/Dimension";

export function ProfileEditor() {
    const appState = useContext(AppStateContext);
    const profile = appState.profile.value;

    switch(profile.id) {
        case ProfileTypeEnum.Bevelled:
            const bevelDepth = profile.bevelDepth;

            return (
                <div class="mb-4 print:hidden">
                    <InputEntry
                        label="Bevel Depth"
                        valueProvider={() => bevelDepth.input}
                        valueSetter={(val) => {
                            const dim = new Dimension(val);
                            appState.profile.value = MakeBevelledProfile(dim);
                            return dim.isError;
                        }}
                    />
                </div>
            );
        default:
            return (<></>);
    }
}

