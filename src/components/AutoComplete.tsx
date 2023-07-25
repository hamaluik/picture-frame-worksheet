import { useId } from "preact/hooks";
import { Label } from "./label";
import { Input } from "./input";
import { DataList } from "./DataList";

export type AutoCompleteProps = {
    label: string;
    onInput: (input: string) => void;
    value: string;
    options: Array<string>;
};

export function AutoComplete(props: AutoCompleteProps) {
    const listId = useId();
    const inputId = useId();

    return (
        <>
            <div class="mb-4">
                <Label id={inputId}>{props.label}</Label>
                <Input id={inputId} onInput={props.onInput} value={props.value} listId={listId} />
            </div>
            <DataList id={listId} options={props.options} />
        </>
    ); 
};
