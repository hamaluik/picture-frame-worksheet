import { ComponentChildren } from "preact"

export type ButtonProps = {
    onClick?: () => void;
    children?: ComponentChildren;
    hoverLabel: string;
}

export function Button(props: ButtonProps) {
    const onClick = (evt: Event) => {
        evt.preventDefault();
        props.onClick && props.onClick();
    };

    return (
        <button onClick={onClick} title={props.hoverLabel} aria-label={props.hoverLabel} class="rounded-none p-2 w-full drop-shadow hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out text-white bg-lime-500 dark:text-black dark:bg-lime-400 inline-flex items-center gap-2 justify-center">{props.children}</button>
    )
}
