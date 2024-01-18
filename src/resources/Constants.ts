export class AppPaths {
    static ANY = "*"
    static HOME = "/comuna-app"
    static EXPENSE_POOL = this.HOME + "/expense-pool"
    static LOGIN = this.HOME + "/login"
    static REGISTER = this.HOME + "/register"
    static RESET_PASSWORD = this.HOME + "/reset-password"
}

export class AppMessages {
    static UNEXPECTED_ERROR = "An unexpected error has occurred."
    static UNEXPECTED_EXCEPTION = "An unexpected exception has occurred."
    static NOT_IMPLEMENTED = "Not implemented yet, contact administrator."

    static MapFirebaseErrors(error: Error) {
        // TODO: Firebase errors mapping by code
    }
}