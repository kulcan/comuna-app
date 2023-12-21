import { useState } from 'react';
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-conf';

export type ExpensesPool = {
    id ?: string;
    displayName ?: string;
    timeCreated ?: Timestamp;
    lastUpdated ?: Timestamp;
    participantsEmails ?: string[];
}

const useExpensesPoolService = () => {

    const [data, setData] = useState<ExpensesPool>();
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

    const getExpensesPools = async (userId: string | undefined) => {

    }

    

    return { 
        data, loading, 
        createExpensesPool
    };
};

export default useExpensesPoolService;
