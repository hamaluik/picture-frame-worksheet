import { useContext } from "preact/hooks";
import { AppStateContext } from "../store/state";
import { ProfileTypeEnum } from "../types/ProfileType";
import { BasicProfile } from "./profiles/basic-profile";
import { BlankProfile } from "./profiles/blank-profile";
import { ProfileTypeSelector } from "./profile-type-selector";

export function Profile() {
    const appState = useContext(AppStateContext);

    let profileDisplay;
    switch(appState.profile.value.id) {
        case ProfileTypeEnum.Blank:
            profileDisplay = (<BlankProfile />);
            break;
        case ProfileTypeEnum.Basic:
        case ProfileTypeEnum.Bevelled:
            profileDisplay = (<BasicProfile />);
            break;
    };

    return (
        <div class="flex flex-col items-stretch justify-start">
            <ProfileTypeSelector />
            {profileDisplay}
        </div>
    );
}
