import { IFormAction } from "../interfaces/FormsInterfaces"

export const handleFieldEdit = (
    { target: { name, value } }: React.ChangeEvent<HTMLInputElement>,
    formDispatch: React.Dispatch<IFormAction>
) => {
    formDispatch({ type: "update", field: name, value: value })
}


export const getVal = <T>(val: T | undefined | null) => {
    if (val) {
        return val;
    }
    throw Error("value cannot be null or undefined");
}