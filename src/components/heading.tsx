import { ComponentChildren } from "preact";

export type HeadingProps = {
    children: ComponentChildren;
}

export function Heading(props: HeadingProps) {
    return (
        <h2 class="font-semibold text-xl col-span-2 text-gray-800 dark:text-gray-100 print:text-black">{props.children}</h2>
    );
};
