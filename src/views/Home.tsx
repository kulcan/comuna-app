import { useEffect, useState } from "react";
import useAuth from "../hooks/UseAuth"
import useUserService from "../services/UserService";
import { getVal } from "../utils/FormUtils";
import useExpensesPoolService from "../services/ExpensesPool";

function Home() {

  const { user } = useAuth()
  const userService = useUserService()
  const expensesPoolService = useExpensesPoolService()

  const [friendEmail, setFriendEmail] = useState("")

  useEffect(() => {
    userService.getUserInfo(getVal(user?.email))
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
    userService.addUserFriend(getVal(user?.email), friendEmail);
    setFriendEmail("");
  }

  const handleCreateExpensesPool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleCreateTasksStack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            onClick={() => {
              if (user?.email != null) {
                navigator.clipboard.writeText(user?.email)
              }
            }}>
            {user?.email}
          </button>
          (click to copy)
        </p>
        <div className="flex flex-wrap mt-4 justify-center">

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2 p-5 bg-gray-300">
            <div className="flex justify-start items-center mb-2">
              <h1 className="text-2xl font-bold mr-2">Expenses pools</h1>
            </div>
            <ul>
              {
                userService.data?.friends?.length ?
                  userService.data?.friends?.map((friend, index) => {
                    return (
                      <li key={index}>
                        <div className="flex justify-start items-center mb-2">
                          {friend}
                          <button className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-0.5 px-2 ml-2 rounded">
                            -
                          </button>
                        </div>
                      </li>
                    )
                  }) : <li>No friends to show :c</li>
              }
            </ul>
            <div className="flex justify-start items-center mb-2">
              <form onSubmit={handleAddFriend}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="email@domain.com"
                  value={friendEmail}
                  onChange={(et) => { setFriendEmail(et.target.value) }}
                  className="shadow appearance-none border rounded mt-2 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 mt-2 rounded">
                  Add
                </button>
              </form>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2 p-5 bg-gray-200">
            <div className="flex justify-start items-center mb-2">
              <h1 className="text-2xl font-bold mr-2">Friends list</h1>
            </div>
            <ul>
              {
                userService.data?.friends?.length ?
                  userService.data?.friends?.map((friend, index) => {
                    return (
                      <li key={index}>
                        <div className="flex justify-start items-center mb-2">
                          {friend}
                          <button className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-0.5 px-2 ml-2 rounded">
                            -
                          </button>
                        </div>
                      </li>
                    )
                  }) : <li>No friends to show :c</li>
              }
            </ul>
            <div className="flex justify-start items-center mb-2">
              <form onSubmit={handleAddFriend}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="email@domain.com"
                  value={friendEmail}
                  onChange={(et) => { setFriendEmail(et.target.value) }}
                  className="shadow appearance-none border rounded mt-2 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 mt-2 rounded">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home