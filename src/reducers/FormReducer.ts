import { IFormAction } from "../interfaces/FormsInterfaces";

function formReducer<T>(state: T, action: IFormAction): T {
    const { type, field, value } = action
    switch (type) {
        case "update":
            return {
                ...state,
                [field]: value,
            };
        default:
            return state;
    }
}
export default formReducer