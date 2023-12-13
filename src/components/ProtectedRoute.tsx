import useAuth from "../hooks/UseAuth"
import { Navigate } from "react-router-dom"
import { AppPaths } from "../resources/Constants"
import Loading from "../views/Loading"

function ProtectedRoute({ children }: any) {
  
  const {user, loading} = useAuth()

  if (loading) return <Loading />

  if (!user) return <Navigate to={AppPaths.LOGIN} />

  return <>{children}</>

}

export default ProtectedRoute