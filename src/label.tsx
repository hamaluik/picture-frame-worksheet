import { ComponentChildren } from "preact";

export type LabelProps = {
    isError?: boolean;
    id: string;
    children: ComponentChildren;
}

export function Label(props: LabelProps) {
    return (
        <label for={props.id} class={`block ${props.isError ? 'text-red-600 dark:text-red-400 print:text-red-600' : 'text-gray-800 dark:text-gray-100 print:text-black'} text-sm font-bold mb-2`}>{props.children}</label>
    );
};
