import { useContext } from "preact/hooks";
import { AppStateContext, DimDirection, MountType } from "./app-state";
import { CalculationDisplay } from "./calculation-display";
import { InputEntry } from "./input-entry";

export type DimEntryProps = {
    label: string;
    direction: DimDirection,
}

export function DimEntry(props: DimEntryProps) {
    const appState = useContext(AppStateContext);
    const dimState = props.direction == DimDirection.Horizontal ? appState.width : appState.height;
    
   return (
        <div class="flex flex-col justify-start items-stretch p-2">
            <InputEntry label={props.direction == DimDirection.Horizontal ? "Width" : "Height"} dim={dimState.dim} />
            {appState.mountType.value != MountType.Flush ? <InputEntry label={props.direction == DimDirection.Horizontal ? "Reveal Left" : "Reveal Top"} dim={dimState.revealPre} /> : null}
            {appState.mountType.value != MountType.Flush ? <InputEntry label={props.direction == DimDirection.Horizontal ? "Reveal Right" : "Reveal Bottom"} dim={dimState.revealPost} /> : null}
            <CalculationDisplay label={props.direction == DimDirection.Horizontal ? "Mount Width" : "Mount Height"} dim={dimState.mountDim} />
        </div>
   ); 
}

