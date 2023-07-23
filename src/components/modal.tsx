import { ComponentChildren } from "preact"
import { useRef } from "preact/hooks";
import { Icon, IconType } from "./icon";
import { ButtonInline } from "./ButtonInline";

export type ModalProps = {
    title: string;
    show: boolean;
    onClose?: () => void;
    children?: ComponentChildren;
}

export function Modal(props: ModalProps) {
    const dialog = useRef<HTMLDialogElement>(null);

    if(dialog && dialog.current) {
        if(props.show) {
            try {
                dialog.current.showModal();
            }
            catch(_e) {}
        }
        else {
            dialog.current.close();
        }
    }

    const onClose = () => {
        props.onClose && props.onClose();
    };

    return (
        <dialog ref={dialog} onCancel={onClose} onClose={onClose} class="hidden open:block print-hidden drop-shadow-2xl fixed left-0 top-0 max-w-full max-h-full right-0 bottom-0 backdrop:backdrop-blur flex flex-col gap-4 justify-start items-stretch">
            <div class="text-white bg-lime-500 dark:text-black dark:bg-lime-400 px-4 py-2 flex flex-row justify-stretch items-center gap-2">
                <h2 class="text-xl font-bold flex-1">{props.title}</h2>
                <ButtonInline onClick={onClose} hoverLabel="Close"><Icon type={IconType.Close} /></ButtonInline>
            </div>
            <div class="px-4 pt-2 pb-4 dark:bg-gray-900 dark:text-gray-100 text-gray-800">{props.children}</div>
        </dialog>
    );
};

