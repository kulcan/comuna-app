import { useReducer, useState } from "react"
import { ILoginUserForm } from "../interfaces/FormsInterfaces"
import formReducer from "../reducers/FormReducer"
import { handleFieldEdit } from "../utils/FormUtils"
import useAuth from "../hooks/UseAuth"
import { Link, useNavigate } from 'react-router-dom'
import Alert from "../components/Alert"
import { AppPaths } from "../resources/Constants"

const initialFormState: ILoginUserForm = {
  email: "",
  password: ""
}

function Login() {

  const { loginWithEmailPass, loginWithGoogle } = useAuth();
  const [formState, formDispatch] = useReducer(formReducer<ILoginUserForm>, initialFormState);
  const navigate = useNavigate()
  const [error, setError] = useState<Error>()

  const hadleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await loginWithEmailPass(formState)
      navigate(AppPaths.HOME)
    } catch (error) {
      setError(error instanceof Error ? error : undefined)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      navigate(AppPaths.HOME)
    } catch (error) {
      setError(error instanceof Error ? error : undefined)
    }
  }

  return (
    <div className="w-full max-w-xs mt-10 m-auto">

      <h1 className="text-3xl font-bold mb-2 flex justify-center">
        Welcome back!
      </h1>

      <form onSubmit={hadleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="your_email@domain.com"
            value={formState.email}
            onChange={(e) => handleFieldEdit(e, formDispatch)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="password"
            placeholder="********"
            value={formState.password}
            onChange={(e) => handleFieldEdit(e, formDispatch)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>

        <div className="w-full flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded" >
            Login
          </button>
        </div>
      </form>

      {error && <Alert error={error} />}

      <p className="my-4 text-sm flex justify-center">Don't have an account?,&nbsp;<Link to={AppPaths.REGISTER} className="text-blue-700 text-decoration-line: underline">Create one now!</Link></p>

      <button onClick={handleGoogleLogin} className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full">
        Login with Google
      </button>

    </div>
  )
}

export default Login