import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import { AuthContextProvider } from '././context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { AppPaths } from './resources/Constants'
import Navbar from './components/Navbar'
import PageNotFound from './views/PageNotFound'
import ExpensesPoolView from './views/ExpensesPool'

function App() {
  return (
    <AuthContextProvider>
      <div className='h-screen flex flex-col'>
        <Navbar />
        <div className='bg-slate-300 overflow-y-auto flex-1'>
          <Routes>
            {/* Protected Routes */}
            <Route path={AppPaths.HOME} element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path={AppPaths.EXPENSE_POOL} element={<ProtectedRoute><ExpensesPoolView/></ProtectedRoute>} />
            {/* Normal Routes */}
            <Route path={AppPaths.ANY} element={<PageNotFound />} />
            {/* Non Reachable After Login Routes */}
            <Route path={AppPaths.LOGIN} element={<Login />} />
            <Route path={AppPaths.REGISTER} element={<Register />} />
          </Routes>
        </div>
      </div>
    </AuthContextProvider>

  )
}

export default App