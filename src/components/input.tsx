export enum TextAlign {
    Left = "left",
    Right = "right",
};

export type InputProps = {
    isError?: boolean;
    id: string;
    onInput?: (input: string) => void;
    readonly?: boolean;
    value: string;
    align?: TextAlign;
    listId?: string;
}

export function Input(props: InputProps) {
    let onInput = (evt: Event) => {
        if(!props.onInput) return;
        props.onInput((evt.target as HTMLInputElement)!.value);
    };

    let onFocus = (evt: Event) => {
        (evt.target as HTMLInputElement).select();
    };

    return (
        <input id={props.id} list={props.listId} type="text" value={props.value} onInput={onInput} onFocus={onFocus} class={`shadow appearance-none border w-full py-2 px-3 ${props.isError ? (props.readonly ? 'text-red-400' : 'text-red-600') : (props.readonly ? 'text-gray-800 dark:text-gray-100' : 'text-gray-800')} ${props.readonly ? 'bg-slate-200 dark:bg-slate-700 print:bg-slate-200' : 'bg-white'} print:text-black print:shadow-none print:outline-none print:border-2 leading-tight focus:outline-none focus:shadow-outline ${props.align == TextAlign.Right ? 'text-right' : 'text-left'}`} />
    );
};
