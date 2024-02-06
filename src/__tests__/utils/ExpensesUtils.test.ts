import { describe, expect, test } from '@jest/globals';
import { calculateDebt, calculatePaymentOrder } from '../../utils/ExpensesUtils';
import { Timestamp } from 'firebase/firestore';
import { Expense } from '../../services/ExpensesPoolService';


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

    test("some users do not participate in transactions", () => {
        const expenses = [
            { paidBy: "user1", concept: "", amount: 150, date: Timestamp.now(), appliesToUsers: ["user2"] },
            { paidBy: "user1", concept: "", amount: 133, date: Timestamp.now(), appliesToUsers: ["user3"] },
            { paidBy: "user2", concept: "", amount: 30, date: Timestamp.now(), appliesToUsers: ["user1", "user2", "user3"] },
            { paidBy: "user2", concept: "", amount: 120, date: Timestamp.now(), appliesToUsers: ["user1", "user2", "user3"] },
        ];
        const participants = ["user1", "user2", "user3", "user4", "user5"];
        const paymentOrder = calculatePaymentOrder(expenses, participants);
        expect(paymentOrder.get("user3")).toEqual("please pay 183 to user1")
        expect(paymentOrder.get("user2")).toEqual("please pay 50 to user1");
    });

    test("real life example 1", () => {
        const expenses = [
            {
                "paidBy": "lordmorgado.xbox@gmail.com",
                "date": {
                    "seconds": 1707177600,
                    "nanoseconds": 0
                },
                "concept": "bote d basura",
                "appliesToUsers": [
                    "maizorin97@gmail.com"
                ],
                "id": "1MHPhsxpGzO8rXYhHZNT",
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "amount": 429
            },
            {
                "amount": 96,
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "appliesToUsers": [
                    "maizorin97@gmail.com"
                ],
                "date": {
                    "seconds": 1706745600,
                    "nanoseconds": 0
                },
                "paidBy": "lordmorgado.xbox@gmail.com",
                "id": "8ZAF5tLmEUa9xG89hn4d",
                "concept": "tacos"
            },
            {
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "amount": 1350,
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "paidBy": "lordmorgado.xbox@gmail.com",
                "concept": "Total diciembre",
                "id": "kIaFnHuBUkDdM7pQxcuV",
                "date": {
                    "seconds": 1706745600,
                    "nanoseconds": 0
                }
            },
            {
                "id": "lai3RVazyCMpGjwNnjHv",
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "concept": "Parking ENVY",
                "date": {
                    "seconds": 1706745600,
                    "nanoseconds": 0
                },
                "amount": 80,
                "paidBy": "maizorin97@gmail.com"
            },
            {
                "paidBy": "osorniochris@gmail.com",
                "appliesToUsers": [
                    "maizorin97@gmail.com"
                ],
                "id": "sfd6lLx3cIRUSiPoCJUN",
                "amount": 71.61,
                "concept": "Noviembre",
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "date": {
                    "seconds": 1706745600,
                    "nanoseconds": 0
                }
            },
            {
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "paidBy": "lordmorgado.xbox@gmail.com",
                "id": "wLsrNUkDgw7QtB5Mr9lz",
                "date": {
                    "seconds": 1706745600,
                    "nanoseconds": 0
                },
                "concept": "jabon oferta",
                "amount": 125
            },
            {
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "concept": "Luz ",
                "amount": 302,
                "date": {
                    "seconds": 1706659200,
                    "nanoseconds": 0
                },
                "id": "SLhI7nnQHcUps9wMFbxE",
                "paidBy": "lordmorgado.xbox@gmail.com",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ]
            },
            {
                "concept": "Pechuga ",
                "paidBy": "josue.pruebas.1970@gmail.com",
                "amount": 89,
                "date": {
                    "seconds": 1706659200,
                    "nanoseconds": 0
                },
                "appliesToUsers": [
                    "maizorin97@gmail.com"
                ],
                "id": "iVZsnHwqrX5LRiRU9Q6E",
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ"
            },
            {
                "amount": 48,
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "paidBy": "osorniochris@gmail.com",
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "date": {
                    "seconds": 1706400000,
                    "nanoseconds": 0
                },
                "id": "BwIbeB14SzJudUkB1dPt",
                "concept": "Garrafon"
            },
            {
                "amount": 892,
                "concept": "Pizzas babyshower",
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "id": "oLqfQ85xCULeKkRucJ90",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "paidBy": "josue.pruebas.1970@gmail.com",
                "date": {
                    "seconds": 1706400000,
                    "nanoseconds": 0
                }
            },
            {
                "date": {
                    "seconds": 1706400000,
                    "nanoseconds": 0
                },
                "amount": 240,
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "id": "sdAZ2IJFa74BRVqRrpgB",
                "paidBy": "maizorin97@gmail.com",
                "concept": "Chelas ENVY",
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ"
            },
            {
                "concept": "Botella ENVY",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "imanol.rivero7@gmail.com"
                ],
                "id": "2D7xyIzGqS76HstEUXHQ",
                "date": {
                    "seconds": 1706313600,
                    "nanoseconds": 0
                },
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "amount": 1023,
                "paidBy": "josue.pruebas.1970@gmail.com"
            },
            {
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "amount": 48,
                "concept": "Garrafon",
                "date": {
                    "seconds": 1706313600,
                    "nanoseconds": 0
                },
                "id": "OMazVUwONbdxXkdbkTcU",
                "paidBy": "josue.pruebas.1970@gmail.com",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ]
            },
            {
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "id": "YS7ZNtmAwUzQ1uvCOePJ",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "paidBy": "imanol.rivero7@gmail.com",
                "date": {
                    "seconds": 1705968000,
                    "nanoseconds": 0
                },
                "amount": 66,
                "concept": "Garrafones"
            },
            {
                "id": "P9hMaNSIydnyU8e5fnlG",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com"
                ],
                "date": {
                    "seconds": 1705363200,
                    "nanoseconds": 0
                },
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "amount": 372,
                "concept": "Despensa Morgado",
                "paidBy": "maizorin97@gmail.com"
            },
            {
                "date": {
                    "seconds": 1705363200,
                    "nanoseconds": 0
                },
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "amount": 48,
                "concept": "Garrafon",
                "id": "msRvM4KCSq3Pv1bUUS3d",
                "paidBy": "maizorin97@gmail.com",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ]
            },
            {
                "date": {
                    "seconds": 1705276800,
                    "nanoseconds": 0
                },
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "amount": 449,
                "concept": "Internet",
                "id": "3UjeUw3SHq3GKNmKbmYx",
                "paidBy": "maizorin97@gmail.com"
            },
            {
                "concept": "Reparacion Tinaco",
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "amount": 400,
                "paidBy": "maizorin97@gmail.com",
                "appliesToUsers": [
                    "lordmorgado.xbox@gmail.com",
                    "josue.pruebas.1970@gmail.com",
                    "imanol.rivero7@gmail.com",
                    "osorniochris@gmail.com",
                    "maizorin97@gmail.com"
                ],
                "id": "HdlMmjhuExb5cyVu2qAb",
                "date": {
                    "seconds": 1705276800,
                    "nanoseconds": 0
                }
            },
            {
                "expensePoolId": "ST1ghmpnHnv4Lm0qgbxQ",
                "appliesToUsers": [
                    "osorniochris@gmail.com"
                ],
                "paidBy": "maizorin97@gmail.com",
                "date": {
                    "seconds": 1702425600,
                    "nanoseconds": 0
                },
                "amount": 89,
                "id": "YwOfz66YqdZsjLbWRRyS",
                "concept": "Internet Dic"
            }
        ] as Expense[];

        const participants = [
            "lordmorgado.xbox@gmail.com",
            "josue.pruebas.1970@gmail.com",
            "imanol.rivero7@gmail.com",
            "osorniochris@gmail.com",
            "maizorin97@gmail.com"
        ];
        const paymentOrder = calculatePaymentOrder(expenses, participants);
        expect(paymentOrder.get("lordmorgado.xbox@gmail.com")).toEqual(undefined);
        expect(paymentOrder.get("josue.pruebas.1970@gmail.com")).toEqual(undefined);
        expect(paymentOrder.get("imanol.rivero7@gmail.com")).toEqual(
            "please pay 525.4 to lordmorgado.xbox@gmail.com\nplease pay 475.7 to josue.pruebas.1970@gmail.com"
        );
        expect(paymentOrder.get("osorniochris@gmail.com")).toEqual(
            "please pay 683.2 to josue.pruebas.1970@gmail.com\nplease pay 99.29 to maizorin97@gmail.com"
        );
        expect(paymentOrder.get("maizorin97@gmail.com")).toEqual(undefined);
    });

});