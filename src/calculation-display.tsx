import { Signal } from "@preact/signals";
import Fraction from "fraction.js";
import { useId } from "preact/compat";

export type CalculationDisplayProps = {
    label: string;
    dim: Signal<Fraction>;
}

export function CalculationDisplay(props: CalculationDisplayProps) {
    const inputId = useId();
    
   return (
        <div class="mb-4">
            <label for={inputId} class="block text-gray-700 text-sm font-bold mb-2">{props.label}</label>
            <input id={inputId} type="text" readonly={true} value={props.dim.value.toFraction(true)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
   ); 
}
