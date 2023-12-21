import { useState } from 'react';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-conf';

export type User = {
    displayName ?: string;
    friends ?: string[];
}

const useUserService = () => {

    const [data, setData] = useState<User>();
    const [loading, setLoading] = useState(true);

    const setUserInfo = async (userId: string, userInfo: User) => {
        try {
            await setDoc(doc(db, `users/${userId}/`), userInfo, { merge : true });
            setData((prevData) => ({...prevData, userInfo}) );
            return true;
        } catch (error) {
            return false;
        }
    };

    const getUserInfo = async (userId: string) => {
        setLoading(true);
        try {
            const docSnap = await getDoc(doc(db, `users/${userId}`));
            const data = docSnap.data() as User;
            setData(data);
            if (data) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        } finally {
            setLoading(false);
        }
    }

    const addUserFriend = async (userId: string, friendId: string) => {
        try {
            await updateDoc(doc(db, `users/${userId}`), {
                friends: arrayUnion(friendId)
            });
            getUserInfo(userId);
            return true;
        } catch (error) {
            return false;
        }
    }

    return { 
        data, loading, 
        setUserInfo, getUserInfo,
        addUserFriend
    };
};

export default useUserService;
