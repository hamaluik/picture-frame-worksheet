import { Signal } from "@preact/signals";
import Fraction from "fraction.js";
import { useId } from "preact/compat";
import { Label } from "./label";
import { Input, TextAlign } from "./input";

export type CalculationDisplayProps = {
    label: string;
    dim: Signal<Fraction>;
}

export function CalculationDisplay(props: CalculationDisplayProps) {
    const inputId = useId();
    
   return (
        <div class="mb-4">
            <Label forId={inputId}>{props.label}</Label>
            <Input id={inputId} isError={false} readonly={true} initialValue={props.dim.value.toFraction(true)} value={props.dim.value.toFraction(true)} align={TextAlign.Right} />
        </div>
   ); 
}
