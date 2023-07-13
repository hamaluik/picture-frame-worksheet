import { Signal } from "@preact/signals";
import Fraction from "fraction.js";
import { useId, useState } from "preact/compat";
import { Label } from "./label";
import { Input, TextAlign } from "./input";

export type InputEntryProps = {
    label: string;
    dim: Signal<Fraction>;
}

export function InputEntry(props: InputEntryProps) {
    const [isError, setIsError] = useState(false);

    let onInput = (inp: string) => {
        try {
            props.dim.value = new Fraction(inp);
            setIsError(false);
        }
        catch(e) {
            console.warn("Error parsing fraction", e);
            setIsError(true);
        }
    };

    const inputId = useId();
    
   return (
        <div class="mb-4">
            <Label forId={inputId} isError={isError}>{props.label}</Label>
            <Input id={inputId} initialValue={props.dim.value.toFraction(true)} onInput={onInput} isError={isError} align={TextAlign.Right} />
        </div>
   ); 
}
