import { useId} from "preact/compat";
import { Label } from "./label";
import { Input } from "./input";

export type TextEntryProps = {
    label: string;
    onInput: (input: string) => void;
    value: string;
}

export function TextEntry(props: TextEntryProps) {
    const inputId = useId();

   return (
        <div class="mb-4">
            <Label id={inputId}>{props.label}</Label>
            <Input id={inputId} onInput={props.onInput} value={props.value} />
        </div>
   ); 
}
