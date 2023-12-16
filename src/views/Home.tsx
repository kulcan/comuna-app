import { useReducer, useState } from "react";
import useAuth from "../hooks/UseAuth"
import { handleFieldEdit } from "../utils/FormUtils";

function Home() {

  const { user } = useAuth()

  const [ friendEmail, setFriendEmail ] = useState("")

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

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2 p-5 bg-gray-200">
            <div className="flex justify-start items-center mb-2">
              <h1 className="text-2xl font-bold mr-2">Expenses pools</h1>
              <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">+</button>
            </div>
            <ul>
              <li>Element 1</li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2 p-5 bg-gray-300">
            <div className="flex justify-start items-center mb-2">
              <h1 className="text-2xl font-bold mr-2">Tasks stacks</h1>
              <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">+</button>
            </div>
            <ul>
              <li>Element 1</li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2 p-5 bg-gray-200">
            <div className="flex justify-start items-center mb-2">
              <h1 className="text-2xl font-bold mr-2">Friends list</h1>
            </div>
            <ul>
              <li>Element 1</li>
            </ul>
            <div className="flex justify-start items-center mb-2">
            <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="email@domain.com"
                className="shadow appearance-none border rounded mt-2 mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 mt-2 rounded" >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home