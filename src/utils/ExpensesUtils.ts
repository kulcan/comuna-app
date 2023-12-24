import { Expense } from "../services/ExpensesPoolService";

export const calculateDebt = (expenses: Expense[]) => {
    let debts: Map<string, number> = new Map<string, number>();
    expenses.forEach((expense) => {
        if (typeof expense.amount === 'string') {
            expense.amount = parseFloat(expense.amount);
        }
        const debtForEachUser = expense.amount / expense.appliesToUsers?.length;
        expense.appliesToUsers.forEach((user) => {
            const preValue = debts.get(user);
            if (preValue) {
                debts.set(user, preValue + debtForEachUser);
            } else {
                debts.set(user, debtForEachUser);
            }
        });
    })
    return debts;
}

export const calculateContributions = (expenses: Expense[]) => {
    let contributions: Map<string, number> = new Map<string, number>();
    expenses.forEach((expense) => {
        if (typeof expense.amount === 'string') {
            expense.amount = parseFloat(expense.amount);
        }
        const preValue = contributions.get(expense.paidBy);
        if (preValue !== undefined) {
            contributions.set(expense.paidBy, preValue + expense.amount);
        } else {
            contributions.set(expense.paidBy, expense.amount);
        }
    })
    return contributions;
}

type UserDebt = { userId: string, value: number }

export const calculatePaymentOrder = (expenses: Expense[], participantsEmails: string[]) => {

    const debts = calculateDebt(expenses);
    const contributions = calculateContributions(expenses);

    const debtors: UserDebt[] = []
    const contributors: UserDebt[] = []

    participantsEmails.forEach((userId) => {
        const total = (debts.get(userId) || 0.0) - (contributions.get(userId) || 0.0);
        if (total > 0) {
            debtors.push({ userId: userId, value: total });
        } else {
            contributors.push({ userId: userId, value: total * -1 });
        }
    })

    console.log(debtors, contributors);

    const debtorsPaymentOrder = new Map<string, string>();

    let i = 0, j = 0;
    while (i < contributors.length && j < debtors.length) {
        let amountToPay = 0;
        const canPay = (contributors[i].value - debtors[j].value) > 0;
        if (canPay) {
            contributors[i].value -= debtors[j].value;
            amountToPay = debtors[j].value;
        } else {
            debtors[j].value -= contributors[i].value;
            amountToPay = contributors[i].value;
        }
        if (debtorsPaymentOrder.has(debtors[j].userId)) {
            const prevVal = debtorsPaymentOrder.get(debtors[j].userId);
            debtorsPaymentOrder.set(debtors[j].userId,
                prevVal + `\nplease pay ${amountToPay} to ${contributors[i].userId}`);
                debtorsPaymentOrder.set(debtors[j].userId,
                    prevVal + `\nplease pay ${amountToPay} to ${contributors[i].userId}`);
        } else {
            debtorsPaymentOrder.set(debtors[j].userId,
                `please pay ${amountToPay} to ${contributors[i].userId}`);
        }
        if (canPay) {
            j ++;
        } else {
            i ++;
        }
    }
    return debtorsPaymentOrder;
}