export type DataListProps = {
    id: string,
    options: Array<string>,
}

export function DataList(props: DataListProps) {
    return (
        <datalist id={props.id}>
        {
            props.options.map((opt) => <option value={opt}/>)
        }
        </datalist>
    )
}
