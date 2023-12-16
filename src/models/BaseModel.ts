import { getFirestore, addDoc, collection, Firestore } from "firebase/firestore"

export class BaseModel {
    actualUserEmail: string
    db: Firestore

    constructor(actualUserEmail: string) {
        this.actualUserEmail = actualUserEmail;
        this.db = getFirestore()
    }

    create(path: string, object: any) {
        addDoc(collection(this.db, path), object)
    }

}