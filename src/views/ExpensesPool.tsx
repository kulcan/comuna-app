import React, { ChangeEvent, useEffect, useState } from "react";
import useAuth from "../hooks/UseAuth"
import useExpensesPoolService from "../services/ExpensesPoolService";
import { useSearchParams } from "react-router-dom";
import { getVal } from "../utils/FormUtils";
import { MultiSelect } from "react-multi-select-component";
import { Timestamp } from "firebase/firestore";
import { calculateContributions, calculateDebt, calculatePaymentOrder, getStr } from "../utils/ExpensesUtils";
import { AppMessages } from "../resources/Constants";

const initialValues = {
  paidBy: "",
  concept: "",
  amount: 0.0,
  date: new Date(Date.now()).toISOString().split('T')[0],
  appliesToUsers: [],

  debts: new Map<string, number>(),
  contributions: new Map<string, number>(),
  debtorsPaymentOrder: new Map<string, string>()

}

function ExpensesPool() {

  const [queryParameters] = useSearchParams()
  const poolId = getVal(queryParameters.get("id"));

  const { user } = useAuth();
  const expensesPoolService = useExpensesPoolService();


  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const setValue = (field: string, newVal: any): void => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: newVal,
    }));
  };

  useEffect(() => {
    expensesPoolService.getExpensesPoolById(poolId);
    expensesPoolService.getExpensesFromPoolId(poolId);
    setValue("paidBy", user?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (expensesPoolService.expenses && expensesPoolService.currentPool?.participantsEmails) {
      setValue("debts", calculateDebt(expensesPoolService.expenses));
      setValue("contributions", calculateContributions(expensesPoolService.expenses));
      setValue("debtorsPaymentOrder", calculatePaymentOrder(expensesPoolService.expenses, expensesPoolService.currentPool.participantsEmails));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expensesPoolService.expenses])

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.appliesToUsers.length > 0) {
      expensesPoolService.addExpense(getVal(expensesPoolService.currentPool?.id), {
        amount: values.amount,
        concept: values.concept,
        date: Timestamp.fromDate(new Date(values.date)),
        appliesToUsers: values.appliesToUsers.map(({ value }) => (value)),
        paidBy: getVal(user?.email)
      });
      setValue("amount", "");
      setValue("concept", "");
      setValue("appliesToUsers", []);
    }
  }

  return (
    <div className="min-w-fit mt-10 mx-3">


      <h1 className="text-3xl font-bold mb-2 flex justify-start">
        {expensesPoolService.currentPool ? expensesPoolService.currentPool?.displayName : ""}
      </h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleAddExpense} className="mb-4">
          <input
            type="text"
            name="concept"
            required
            placeholder="Expense concept"
            value={values.concept}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded mt-2 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
          <input
            type="number"
            name="amount"
            required
            placeholder="Money amount"
            value={values.amount}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded mt-2 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
          <input
            type="date"
            name="date"
            required
            value={values.date}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded mt-2 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
          <div className="mt-2">
            <label>This expense applies to:</label>
            <MultiSelect
              className="appearance-none rounded text-gray-700 leading-tight focus:outline-none"
              options={
                expensesPoolService.currentPool?.participantsEmails ?
                  expensesPoolService.currentPool?.participantsEmails
                    .map(val => {
                      return ({ label: val, value: val })
                    }) : []
              }
              value={values.appliesToUsers}
              onChange={(newValues: any) => {
                setValues(prevValues => ({
                  ...prevValues,
                  appliesToUsers: newValues
                }))
              }}
              labelledBy="newPoolParticipants"
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 mt-2 rounded">
            Add new
          </button>
        </form>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Paid by</th>
              <th scope="col" className="px-6 py-3">Concept</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Applies to</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {
              expensesPoolService.expenses.length > 0 ?
                expensesPoolService.expenses?.sort((exp1, exp2) => {
                  return exp2.date.seconds - exp1.date.seconds;
                }).map(expense => (
                  <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700" key={expense.id}>
                    <td className="px-6 py-4">
                      {expense.paidBy}
                    </td>
                    <td className="px-6 py-4">
                      {expense.concept}
                    </td>
                    <td className="px-6 py-4">
                      ${expense.amount}
                    </td>
                    <td className="px-6 py-4">
                      {expense.date?.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <ul>
                        {
                          expense.appliesToUsers?.map(usr => (
                            <li key={usr}>{usr}</li>
                          ))
                        }
                      </ul>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white text-sm py-0.5 px-2 ml-2 rounded"
                        onClick={() => { 
                          if (window.confirm(
                            `${AppMessages.SURE_TO_DELETE_ITEM}\n${getStr(expense)}`)) {
                            expensesPoolService.deleteExpenseWithId(getVal(expense.expensePoolId), getVal(expense.id));
                          }
                        }}>
                        delete
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700 text-center">
                    <td colSpan={5}>Nothing to show :c</td>
                  </tr>
                )
            }
          </tbody>
        </table>
        <br />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Participant</th>
              <th scope="col" className="px-6 py-3">Total Contributions</th>
              <th scope="col" className="px-6 py-3">Debts</th>
              <th scope="col" className="px-6 py-3">Total Debts</th>
              <th scope="col" className="px-6 py-3">Payment order suggestion</th>
            </tr>
          </thead>
          <tbody>
            {
              expensesPoolService.currentPool ?
                expensesPoolService.currentPool.participantsEmails?.map((userId) => (
                  <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700" key={userId}>
                    <td className="px-6 py-4">
                      {userId}
                    </td>
                    <td className="px-6 py-4">
                      $ {values.contributions.get(userId) || 0.0}
                    </td>
                    <td className="px-6 py-4">
                      $ {values.debts.get(userId) || 0.0}
                    </td>
                    <td className="px-6 py-4">
                      $ {(values.debts.get(userId) || 0.0) - (values.contributions.get(userId) || 0.0)}
                    </td>
                    <td className="px-6 py-4">
                      <pre>
                        { values.debtorsPaymentOrder.get(userId) }
                      </pre>
                    </td>
                  </tr>
                )) : (
                  <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700 text-center">
                    <td colSpan={5}>Nothing to show :c</td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ExpensesPool;