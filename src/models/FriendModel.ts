import { getFirestore, addDoc, collection, Firestore } from "firebase/firestore"
import { BaseModel } from "./BaseModel";

export class FriendModel extends BaseModel {

    addFriend(friendEmail: string) {
        this.create('friends', { email: friendEmail })
    }

}