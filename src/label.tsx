import { ComponentChildren } from "preact";

export type LabelProps = {
    isError?: boolean;
    forId: string;
    children: ComponentChildren;
}

export function Label({isError = false, forId, children}: LabelProps) {
    return (
        <label for={forId} class={`block ${isError ? 'text-red-700 dark:text-red-100 print:text-red-700' : 'text-gray-700 dark:text-gray-100 print:text-black'} text-sm font-bold mb-2`}>{children}</label>
    );
};
