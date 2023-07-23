import { Signal } from "@preact/signals";
import { useId, useState } from "preact/compat";
import { Label } from "./label";
import { Input, TextAlign } from "./input";
import Dimension from "../types/Dimension";

export type InputEntryProps = {
    label: string;
    dim: Signal<Dimension>;
}

export function InputEntry(props: InputEntryProps) {
    const [isError, setIsError] = useState(false);

    let onInput = (inp: string) => {
        props.dim.value = new Dimension(inp);
        setIsError(props.dim.value.isError);
    };

    const inputId = useId();
    
   return (
        <div class="mb-4">
            <Label id={inputId} isError={isError}>{props.label}</Label>
            <Input id={inputId} value={props.dim.value.input} onInput={onInput} isError={isError} align={TextAlign.Right} />
        </div>
   ); 
}
