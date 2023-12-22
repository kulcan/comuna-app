import { useState } from 'react';
import { Timestamp, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase-conf';

export type ExpensesPool = {
    id?: string;
    displayName?: string;
    timeCreated?: Timestamp;
    lastUpdated?: Timestamp;
    participantsEmails?: string[];
}

const useExpensesPoolService = () => {

    const [data, setData] = useState<ExpensesPool[]>();
    const [loading, setLoading] = useState(true);

    const createExpensesPool = async (expensesPool: ExpensesPool) => {
        try {
            const docRef = doc(collection(db, `expenses-pools`));
            const timeNow = Timestamp.now();
            await setDoc(docRef, {
                ...expensesPool,
                id: docRef.id,
                timeCreated: timeNow,
                timeUpdated: timeNow
            });
            return true;
        } catch (error) {
            return false;
        }
    };

    const getExpensesPoolsByUserId = async (userId: string) => {
        setLoading(true);
        try {
            const expPoRef = collection(db, `expenses-pools`);
            const q = query(expPoRef, where("participantsEmails", "array-contains", userId));
            const querySnapshot = await getDocs(q);

            let dataQuery: ExpensesPool[] = [];
            querySnapshot.forEach(doc => {
                dataQuery.push(doc.data() as ExpensesPool);
            })
            setData(dataQuery);

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



    return {
        data, loading,
        createExpensesPool, getExpensesPoolsByUserId
    };
};

export default useExpensesPoolService;
