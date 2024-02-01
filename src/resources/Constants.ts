export class AppPaths {
    static ANY = "*"
    static HOME = "/"
    static EXPENSE_POOL = "/expense-pool"
    static LOGIN = "/login"
    static REGISTER = "/register"
    static RESET_PASSWORD = "/reset-password"
}

export class AppMessages {
    static UNEXPECTED_ERROR = "An unexpected error has occurred."
    static UNEXPECTED_EXCEPTION = "An unexpected exception has occurred."
    static NOT_IMPLEMENTED = "Not implemented yet, contact administrator."
    static SURE_TO_DELETE_ITEM = "Are you sure you wish to delete this item?"

    static MapFirebaseErrors(error: Error) {
        // TODO: Firebase errors mapping by code
    }
}