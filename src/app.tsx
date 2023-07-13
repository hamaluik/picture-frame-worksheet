import { DimDirection } from "./app-state";
import { DimEntry } from "./dim-entry";
import { MountTypeSelector } from "./mount-type-selector";

export function App() {
    return (
        <>
            <div class="p-2">
                <MountTypeSelector />
            </div>
            <div class="flex flex-row">
                <DimEntry label="Width" direction={DimDirection.Horizontal} />
                <DimEntry label="Height" direction={DimDirection.Vertical} />
            </div>
        </>
    );
}
