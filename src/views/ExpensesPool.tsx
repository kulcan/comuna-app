import React, { ChangeEvent, useEffect, useState } from "react";
import useAuth from "../hooks/UseAuth"
import useUserService from "../services/UserService";
import useExpensesPoolService from "../services/ExpensesPool";
import { Timestamp } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { getVal } from "../utils/FormUtils";

const initialValues = {
  concept: "",
  moneyValue: 0.0,
  date: Timestamp.now().toDate()
}

function ExpensesPool() {

  const [queryParameters] = useSearchParams()
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
    expensesPoolService.getExpensesPoolById(getVal(queryParameters.get("id")));
  }, []);

  return (
    <div className="min-w-fit mt-10 mx-3">


      <h1 className="text-3xl font-bold mb-2 flex justify-start">
        {expensesPoolService.singleData ? expensesPoolService.singleData?.displayName : ""}
      </h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form>

        </form>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Concept</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700">
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Silver
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ExpensesPool;