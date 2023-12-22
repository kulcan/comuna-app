import { useState } from 'react';
import { Timestamp, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase-conf';
import ExpensesPool from '../views/ExpensesPool';

export type ExpensesPool = {
    id?: string;
    displayName?: string;
    timeCreated?: Timestamp;
    lastUpdated?: Timestamp;
    participantsEmails?: string[];
}

const useExpensesPoolService = () => {

    const [data, setData] = useState<ExpensesPool[]>();
    const [singleData, setSingleData] =  useState<ExpensesPool>()
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
            return true;
        } catch (error) {
            return false;
        } finally {
            setLoading(false);
        }
    }

    const getExpensesPoolById = async (expensesPoolId: string) => {
        setLoading(true);
        try {
            const expPoRef = collection(db, `expenses-pools`);
            const q = query(expPoRef, where("id", "==", expensesPoolId));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            let expensesPool: ExpensesPool | undefined = undefined;
            if (querySnapshot.size == 1) {
                querySnapshot.forEach(doc => {
                    expensesPool = doc.data() as ExpensesPool; 
                })
            }
            setSingleData(expensesPool);

            if (expensesPool) {
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
        singleData,
        createExpensesPool, getExpensesPoolsByUserId, getExpensesPoolById
    };
};

export default useExpensesPoolService;
