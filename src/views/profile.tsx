import { useContext } from "preact/hooks";
import { AppStateContext } from "../store/state";
import { ProfileTypeEnum } from "../types/ProfileType";
import { BasicProfile } from "./profiles/basic-profile";
import { BlankProfile } from "./profiles/blank-profile";
import { BevelledProfile } from "./profiles/bevelled-profile";
import { ProfileTypeSelector } from "./profile-type-selector";
import { ProfileEditor } from "./profile-editor";

export function Profile() {
    const appState = useContext(AppStateContext);

    let profileDisplay;
    switch(appState.profile.value.id) {
        case ProfileTypeEnum.Blank:
            profileDisplay = (<BlankProfile />);
            break;
        case ProfileTypeEnum.Basic:
            profileDisplay = (<BasicProfile />);
            break;
        case ProfileTypeEnum.Bevelled:
            profileDisplay = (<BevelledProfile />);
            break;
    };

    return (
        <div class="flex flex-col items-stretch justify-start">
            <ProfileTypeSelector />
            <ProfileEditor />
            {profileDisplay}
        </div>
    );
}
