import { Signal } from "@preact/signals";
import { useId } from "preact/compat";
import Dimension from "../types/Dimension";
import { Label } from "../components/label";
import { Input, TextAlign } from "../components/input";

export type CalculationDisplayProps = {
    label: string;
    dim: Signal<Dimension>;
}

export function CalculationDisplay(props: CalculationDisplayProps) {
    const inputId = useId();
    
   return (
        <div class="mb-4">
            <Label id={inputId} isError={props.dim.value.isError}>{props.label}</Label>
            <Input id={inputId} readonly={true} isError={props.dim.value.isError} value={props.dim.value.display} align={TextAlign.Right} />
        </div>
   ); 
}
