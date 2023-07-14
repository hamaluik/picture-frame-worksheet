import { ComponentChildren } from "preact";

export type TitleProps = {
    children: ComponentChildren;
}

export function Title(props: TitleProps) {
    return (
        <h1 class="font-bold text-2xl text-gray-800 dark:text-gray-100 print:text-black inline-flex flex-row gap-2 items-center">{props.children}</h1>
    );
};
