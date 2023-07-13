import { useId} from "preact/compat";
import { Label } from "./label";
import { Input } from "./input";

export type TextEntryProps = {
    label: string;
}

export function TextEntry(props: TextEntryProps) {
    const inputId = useId();
    
   return (
        <div class="mb-4">
            <Label forId={inputId} isError={false}>{props.label}</Label>
            <Input id={inputId} initialValue="" isError={false} />
        </div>
   ); 
}
