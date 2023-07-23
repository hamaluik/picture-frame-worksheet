import { ComponentChildren } from "preact"

export type ButtonInlineProps = {
    onClick?: () => void;
    children?: ComponentChildren;
    hoverLabel: string;
}

export function ButtonInline(props: ButtonInlineProps) {
    const onClick = (evt: Event) => {
        evt.preventDefault();
        props.onClick && props.onClick();
    };

    return (
        <button onClick={onClick} title={props.hoverLabel} aria-label={props.hoverLabel} class="hover:scale-110">{props.children}</button>
    )
}
