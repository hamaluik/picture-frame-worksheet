export enum TextAlign {
    Left = "left",
    Right = "right",
};

export type InputProps = {
    isError?: boolean;
    id: string;
    onInput: (input: string) => void;
    readonly?: boolean;
    value: string;
    align?: TextAlign;
}

export function Input(props: InputProps) {
    let onInput = (evt: Event) => props.onInput((evt.target as HTMLInputElement)!.value);

    return (
        <input id={props.id} type="text" value={props.value} onInput={onInput} class={`shadow appearance-none border w-full py-2 px-3 ${props.isError ? (props.readonly ? 'text-red-200' : 'text-red-700') : (props.readonly ? 'text-gray-800 dark:text-gray-100' : 'text-gray-800')} ${props.readonly ? 'bg-slate-200 dark:bg-slate-700 print:bg-slate-200' : 'bg-white'} print:text-black print:shadow-none print:outline-none print:border-2 leading-tight focus:outline-none focus:shadow-outline ${props.align == TextAlign.Right ? 'text-right' : 'text-left'}`} />
    );
};
