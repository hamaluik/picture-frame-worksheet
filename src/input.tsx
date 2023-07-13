import { ChangeEvent } from "preact/compat";
import { useState } from "preact/hooks";
import { parseVulgars } from "vulgar-fractions";

export enum TextAlign {
    Left = "left",
    Right = "right",
};

export type InputProps = {
    isError: boolean;
    id: string;
    onInput?: (input: string) => void;
    initialValue: string;
    readonly?: boolean;
    value?: string;
    align?: TextAlign;
}

export function Input(props: InputProps) {
    const [displayedValue, setDisplayedValue] = useState(props.initialValue);

    let onInput = (evt: ChangeEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = evt.target as HTMLInputElement;
        if(target === null) return;
        setDisplayedValue(target.value);
        props.onInput && props.onInput(target.value);
    };

    let disp = props.value != null ? props.value : displayedValue;
    if(props.readonly) disp = parseVulgars(disp);

    return (
        <input id={props.id} type="text" value={disp} onInput={onInput} class={`shadow appearance-none border w-full py-2 px-3 ${props.isError ? (props.readonly ? 'text-red-200' : 'text-red-700') : (props.readonly ? 'text-gray-800 dark:text-gray-100' : 'text-gray-800')} ${props.readonly ? 'bg-slate-200 dark:bg-slate-700 print:bg-slate-200' : 'bg-white'} print:text-black print:shadow-none print:outline-none print:border-2 leading-tight focus:outline-none focus:shadow-outline ${props.align == TextAlign.Right ? 'text-right' : 'text-left'}`} />
    );
};
