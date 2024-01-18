import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import Alert from "../components/Alert"
import { AppPaths } from "../resources/Constants"
import useAuth from "../hooks/UseAuth"

function ResetPassword() {

  const { resetPassword } = useAuth();
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<Error>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await resetPassword(email);
      navigate(AppPaths.HOME);
    } catch (error) {
      setError(error instanceof Error ? error : undefined);
    }
  }

  return (
    <div className="w-full max-w-xs mt-10 m-auto">

      <h1 className="text-3xl font-bold mb-2 flex justify-center">
        Password reset
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
            Enter your email, we will send you a code to reset your password.
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="your_email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>

        <div className="w-full flex justify-center">
          <button 
            className={"bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"}>
            Sent code
          </button>
        </div>
      </form>

      {error && <Alert error={error} />}

    </div>
  )
}

export default ResetPassword;