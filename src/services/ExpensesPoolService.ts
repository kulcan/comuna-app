import { useState } from 'react';
import { Timestamp, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase-conf';

export type ExpensesPool = {
    id?: string;
    displayName?: string;
    timeCreated?: Timestamp;
    lastUpdated?: Timestamp;
    participantsEmails?: string[];
}

export type Expense = {
    id?: string;
    expensePoolId?: string;
    concept?: string;
    amount?: number;
    date?: Timestamp;
    appliesToUsers?: string[];
    paidBy?: string;
}

const useExpensesPoolService = () => {

    const [data, setData] = useState<ExpensesPool[]>([]);
    const [singleData, setSingleData] = useState<ExpensesPool>()
    const [expenses, setExpenses] = useState<Expense[]>([])
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

    const deleteExpensePoolWithId = async (expensesPoolId: string) => {
        try {
            await deleteDoc(doc(db, `expenses-pools/${expensesPoolId}`));
            setData((prevData) => {
                return prevData.filter((exp) => exp.id != expensesPoolId);
            });
            return true;
        } catch (error) {
            return false;
        } 
    }

    const getExpensesPoolById = async (expensesPoolId: string) => {
        setLoading(true);
        try {
            const expPoRef = collection(db, `expenses-pools`);
            const q = query(expPoRef, where("id", "==", expensesPoolId));
            const querySnapshot = await getDocs(q);
            let expensesPool: ExpensesPool | undefined = undefined;
            if (querySnapshot.size === 1) {
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

    const addExpense = async (expensePoolId: string, expense: Expense) => {
        
        try {
            const docRef = doc(collection(db, `expenses-pools/${expensePoolId}/expenses`));
            const newExp = {
                ...expense,
                id: docRef.id,
                expensePoolId: expensePoolId
            };
            await setDoc(docRef, newExp);
            setExpenses((prevEx) => [...prevEx, newExp]);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getExpensesFromPoolId = async (expensesPoolId: string) => {
        setLoading(true);
        try {
            const docSnap = await getDocs(collection(db, `expenses-pools/${expensesPoolId}/expenses`));
            const expData = docSnap.docs.map(doc => doc.data() as Expense);
            setExpenses(expData);
            if (expData) {
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

    const deleteExpenseWithId = async (expensesPoolId: string, expenseId: string) => {
        try {
            await deleteDoc(doc(db, `expenses-pools/${expensesPoolId}/expenses/${expenseId}`));
            setExpenses((prevEx) => {
                return prevEx.filter((exp) => exp.id != expenseId);
            });
            return true;
        } catch (error) {
            return false;
        } 
    }

    return {
        data,
        loading,
        singleData,
        expenses,
        createExpensesPool,
        getExpensesPoolsByUserId,
        deleteExpensePoolWithId,
        getExpensesPoolById,
        getExpensesFromPoolId,
        addExpense,
        deleteExpenseWithId
    };
};

export default useExpensesPoolService;
