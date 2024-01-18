import { describe, expect, test } from '@jest/globals';
import { calculateDebt, calculatePaymentOrder } from '../../utils/ExpensesUtils';
import { Timestamp } from 'firebase/firestore';


describe("calculateDebt", () => {

    test("calculate debt of a empty array", () => {
        expect(calculateDebt([])).toStrictEqual(new Map());
    });

    // todo

});


describe("calculatePaymentOrder", () => {

    test("one single contributor", () => {
        const expenses = [
            { paidBy: "user4", concept: "", amount: 499, date: Timestamp.now(), appliesToUsers: ["user1", "user2", "user3", "user4"] },
            { paidBy: "user4", concept: "", amount: 128, date: Timestamp.now(), appliesToUsers: ["user2", "user3"] },
            { paidBy: "user4", concept: "", amount: 200, date: Timestamp.now(), appliesToUsers: ["user3", "user4"] },
        ];
        const participants = ["user1", "user2", "user3", "user4"];
        const paymentOrder = calculatePaymentOrder(expenses, participants);
        expect(paymentOrder.get("user1")).toEqual("please pay 124.75 to user4")
        expect(paymentOrder.get("user2")).toEqual("please pay 188.75 to user4");
        expect(paymentOrder.get("user3")).toEqual("please pay 288.75 to user4");
    });

    test("multiple contributors, multiple debtors", () => {
        const expenses = [
            { paidBy: "user4", concept: "", amount: 499, date: Timestamp.now(), appliesToUsers: ["user1", "user2", "user3", "user4"] },
            { paidBy: "user4", concept: "", amount: 128, date: Timestamp.now(), appliesToUsers: ["user2", "user3"] },
            { paidBy: "user4", concept: "", amount: 200, date: Timestamp.now(), appliesToUsers: ["user3", "user4"] },
            { paidBy: "user3", concept: "", amount: 1200, date: Timestamp.now(), appliesToUsers: ["user1", "user2", "user3", "user4"] },
        ];
        const participants = ["user1", "user2", "user3", "user4"];
        const paymentOrder = calculatePaymentOrder(expenses, participants);
        expect(paymentOrder.get("user1")).toEqual("please pay 424.75 to user3")
        expect(paymentOrder.get("user2")).toEqual("please pay 186.5 to user3\nplease pay 302.25 to user4");
    });

});