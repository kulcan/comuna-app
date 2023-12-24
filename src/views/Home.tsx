import React, { ChangeEvent, useEffect, useState } from "react";
import useAuth from "../hooks/UseAuth"
import useUserService from "../services/UserService";
import { getVal } from "../utils/FormUtils";
import useExpensesPoolService from "../services/ExpensesPoolService";
import { MultiSelect } from "react-multi-select-component";
import { Link } from "react-router-dom";
import { AppPaths } from "../resources/Constants";

const initialValues = {
  friendEmail: "",
  newPoolName: "",
  selectedFriendsPool: []
}

function Home() {

  const { user } = useAuth();
  const userService = useUserService();
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
    userService.getUserInfo(getVal(user?.email));
    expensesPoolService.getExpensesPoolsByUserId(getVal(user?.email));
  }, [])

  useEffect(() => {
    if (userService.data === undefined && !userService.loading) {
      console.log("no data for user, updating...")
      userService.setUserInfo(getVal(user?.email), {
        displayName: getVal(user?.displayName),
        friends: []
      })
    }
  }, [userService.data, userService.loading])

  const handleAddFriend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userService.addUserFriend(getVal(user?.email), values.friendEmail);
    setValue("friendEmail", "");
  }

  const handleCreateExpensesPool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    expensesPoolService.getExpensesPoolsByUserId(getVal(user?.email))
    const participants = values.selectedFriendsPool.map(({ value }) => (value))
    if (participants.length > 0) {
      expensesPoolService.createExpensesPool({
        displayName: values.newPoolName,
        participantsEmails: [...participants, getVal(user?.email)]
      })
      setValue("newPoolName", "");
      setValue("selectedFriendsPool", []);
    }
  }

  return (
    <div className="min-w-fit mt-10 mx-3">


      <h1 className="text-3xl font-bold mb-2 flex justify-start">
        Control panel
      </h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p>
          Hello {user && (<b>{user.displayName}</b> || <b>{user.email}</b>)}, here you can create a new
          spending plan or tasks account to share with other users of the app, remember that your unique
          identifier to share with other users is your email <button
            className="text-blue-700 text-decoration-line: underline"
            onClick={() => navigator.clipboard.writeText(getVal(user?.email))}>
            {user?.email}
          </button>
          (click to copy)
        </p>
        <div className="flex flex-wrap mt-4 justify-center">

          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-2 p-5 bg-gray-200">
            <h1 className="text-2xl font-bold mr-2">Create expenses pool</h1>

            <form onSubmit={handleCreateExpensesPool}>
              <input
                type="text"
                required
                placeholder="New pool name"
                name="newPoolName"
                value={values.newPoolName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded mt-2 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              <br />
              <label htmlFor="newPoolParticipants">Participants:</label>
              <div>
                <MultiSelect
                  options={
                    userService.data?.friends?.length ?
                      userService.data.friends.map(val => ({
                        label: val, value: val
                      })) : []
                  }
                  value={values.selectedFriendsPool}
                  onChange={(newValues: any) => {
                    setValues(prevValues => ({
                      ...prevValues,
                      selectedFriendsPool: newValues
                    }))
                  }}
                  labelledBy="newPoolParticipants"
                />
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 mt-2 rounded">
                Create new
              </button>
            </form>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-2 p-5 bg-gray-300">
            <h1 className="text-2xl font-bold mr-2">Active pools</h1>
            <table>
              <tbody>
                {
                  Array.isArray(expensesPoolService.data) && expensesPoolService.data?.length > 0 ?
                    expensesPoolService.data?.map((pool, index) => {
                      return (
                        <tr key={index}>
                          <td>{pool.displayName}</td>
                          <td>
                            <button className="bg-green-500 hover:bg-green-700 text-white text-sm py-0.5 px-2 ml-2 rounded">
                              <Link to={AppPaths.EXPENSE_POOL + `?id=${pool.id}`}>
                                manage
                              </Link>
                            </button>
                            <button 
                              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-0.5 px-2 ml-2 rounded"
                              onClick={() => navigator.clipboard.writeText(getVal(pool.id))}>
                                copy id
                            </button>
                            <button 
                              className="bg-red-500 hover:bg-red-700 text-white text-sm py-0.5 px-2 ml-2 rounded"
                              onClick={() => expensesPoolService.deleteExpensePoolWithId(getVal(pool.id))}>
                                delete
                              </button>
                          </td>
                        </tr>
                      )
                    }) : <tr><td>No pools to show :c</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-2 p-5 bg-gray-200">
            <h1 className="text-2xl font-bold mr-2">Friends list</h1>
            <form onSubmit={handleAddFriend} className="mb-4">
              <input
                type="email"
                name="friendEmail"
                autoComplete="email"
                required
                placeholder="email@domain.com"
                value={values.friendEmail}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded mt-2 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 mt-2 rounded">
                Add new
              </button>
            </form>
            <table>
              <tbody>
                {
                  userService.data?.friends?.length ?
                    userService.data?.friends?.map((friend, index) => {
                      return (
                        <tr key={index}>
                          <td>{friend}</td>
                          <td>
                            <button 
                              className="bg-red-500 hover:bg-red-700 text-white text-sm py-0.5 px-2 ml-2 rounded"
                              onClick={() => userService.deleteUserFriend(getVal(user?.email), friend) }>
                              delete
                            </button>
                          </td>
                        </tr>
                      )
                    }) : <tr><td>No friends to show :c</td></tr>
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home