export class AppPaths {
    static ANY = "*"
    static HOME = "/"
    static LOGIN ="/login"
    static REGISTER = "/register"
}

export class AppMessages {
    static UNEXPECTED_ERROR = "An unexpected error has occurred."
    static UNEXPECTED_EXCEPTION = "An unexpected exception has occurred."
    static NOT_IMPLEMENTED = "Not implemented yet, contact administrator."

    static MapFirebaseErrors(error: Error) {
        // TODO: Firebase errors mapping by code
    }
}