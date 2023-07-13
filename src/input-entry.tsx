import { Signal } from "@preact/signals";
import Fraction from "fraction.js";
import { ChangeEvent, useId, useState } from "preact/compat";

export type InputEntryProps = {
    label: string;
    dim: Signal<Fraction>;
}

export function InputEntry(props: InputEntryProps) {
    const [displayedValue, setDisplayedValue] = useState(props.dim.value.toFraction(true));
    const [isError, setIsError] = useState(false);

    let onInput = (evt: ChangeEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = evt.target as HTMLInputElement;
        if(target === null) return;
        setDisplayedValue(target.value);
        try {
            props.dim.value = new Fraction(target.value);
            setIsError(false);
        }
        catch(e) {
            console.error(e);
            setIsError(true);
        }
    };

    const inputId = useId();
    
   return (
        <div class="mb-4">
            <label for={inputId} class={`block ${isError ? 'text-red-700' : 'text-gray-700'} text-sm font-bold mb-2`}>{props.label}</label>
            <input id={inputId} type="text" value={displayedValue} onInput={onInput} class={`shadow appearance-none border rounded w-full py-2 px-3 ${isError ? 'text-red-700' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`} />
        </div>
   ); 
}
