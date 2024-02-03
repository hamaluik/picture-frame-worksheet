import { Signal } from "@preact/signals";
import { useId, useState } from "preact/compat";
import { Label } from "./label";
import { Input, TextAlign } from "./input";
import Dimension from "../types/Dimension";

export type InputEntryProps = {
    label: string;
    dim?: Signal<Dimension>;
    valueProvider?: () => string;
    valueSetter?: (val: string) => boolean;
}

export function InputEntry(props: InputEntryProps) {
    const [isError, setIsError] = useState(false);

    let onInput = (inp: string) => {
        if(!!props.dim) {
            props.dim.value = new Dimension(inp);
            setIsError(props.dim.value.isError);
        }
        else if(!!props.valueSetter) {
            setIsError(props.valueSetter(inp)!);
        }
    };

    const inputId = useId();
    const value = !!props.dim
        ? props.dim.value.input
        : props.valueProvider()!;

    return (
        <div class="mb-4">
            <Label id={inputId} isError={isError}>{props.label}</Label>
            <Input id={inputId} value={value} onInput={onInput} isError={isError} align={TextAlign.Right} />
        </div>
    ); 
}
