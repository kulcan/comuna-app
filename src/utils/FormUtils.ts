import { IFormAction } from "../interfaces/FormsInterfaces"

export const handleFieldEdit = (
    {target: {name, value}}: React.ChangeEvent<HTMLInputElement>,
    formDispatch: React.Dispatch<IFormAction>
) => {
    formDispatch({type:"update", field:name, value:value})
}