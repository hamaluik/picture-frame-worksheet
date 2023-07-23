import { Modal } from "../components/modal";
import { Button } from "../components/button";
import { useId, useState } from "preact/hooks";
import { Label } from "../components/label";
import { Input } from "../components/input";

export type ShareModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    shareURL: string,
};

const enum CopyState {
    ReadyToCopy,
    CantCopy,
    Copied,
};

export function ShareModal(props: ShareModalProps) {
    const [ copyState, setCopyState ] = useState(CopyState.ReadyToCopy);
    const inputId = useId();

    const onCopy = () => {
        try {
            navigator.clipboard.writeText(props.shareURL)
                .then(() => setCopyState(CopyState.Copied))
                .catch((e) => {
                    console.error("Failed to copy to clipboard", e);
                    setCopyState(CopyState.CantCopy);
                });
        }
        catch(e) {
            console.error("Failed to access clipboard API", e);
            setCopyState(CopyState.CantCopy);
            const inputEl: HTMLElement | null = document.getElementById(inputId);
            if(inputEl) {
                (inputEl as HTMLInputElement).focus();
                (inputEl as HTMLInputElement).select();
            }
        }
    };

    let copyText: string;
    switch(copyState) {
        case CopyState.ReadyToCopy:
            copyText = "Copy";
            break;
        case CopyState.Copied:
            copyText = "Copied!";
            break;
        case CopyState.CantCopy:
            copyText = "Can't copy automatically";
            break;
    };

    return (
        <Modal title="Share" show={props.show} onClose={() => props.setShow(false)}>
            <form method="dialog" onSubmit={onCopy}>
                <div class="flex flex-col gap-2 justify-start items-stretch">
                    <div class="mb-4">
                        <Label id={inputId}>URL</Label>
                        <Input id={inputId} readonly={true} value={props.shareURL} />
                    </div>
                    <div class="flex flex-row gap-2 justify-end items-stretch">
                        <Button onClick={onCopy}>{copyText}</Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
