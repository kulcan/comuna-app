import { useReducer, useState } from "react"
import { IRegisterUserForm } from "../interfaces/FormsInterfaces"
import formReducer from "../reducers/FormReducer"
import { handleFieldEdit } from "../utils/FormUtils"
import useAuth from "../hooks/UseAuth"
import { Link, useNavigate } from 'react-router-dom'
import { AppPaths } from "../resources/Constants"
import Alert from "../components/Alert"

const initialFormState: IRegisterUserForm = {
  email: "",
  password: ""
}

function Register() {

  const { registerUserEmailPass } = useAuth();
  const [formState, formDispatch] = useReducer(formReducer<IRegisterUserForm>, initialFormState);
  const navigate = useNavigate()
  const [error, setError] = useState<Error>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await registerUserEmailPass(formState)
      navigate(AppPaths.HOME)
    } catch (error) {
      setError(error instanceof Error ? error : undefined)
    }
  }

  return (
    <div className="w-full max-w-xs mt-10 m-auto">

      <h1 className="text-3xl font-bold mb-2 flex justify-center">
        Create an Account
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="youremail@domain.com"
            value={formState.email}
            onChange={(e) => handleFieldEdit(e, formDispatch)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            onChange={(e) => handleFieldEdit(e, formDispatch)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>

        <div className="w-full flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded" >
            Register
          </button>
        </div>
      </form>

      {error && <Alert error={error} />}

      <p className="my-4 text-sm flex justify-center">Already have an account?,&nbsp;<Link to={AppPaths.LOGIN} className="text-blue-700 text-decoration-line: underline">Login now!</Link></p>

    </div>
  )
}

export default Register