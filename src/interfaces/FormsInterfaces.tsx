export interface IFormAction {
    type: "update"
    field: string
    value: string
}

export interface IRegisterUserForm {
    email: string
    password: string
}

export interface ILoginUserForm {
    email: string
    password: string
}