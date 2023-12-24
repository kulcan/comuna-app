import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppPaths } from "../resources/Constants";
import useAuth from "../hooks/UseAuth";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation();
    const { user, logout } = useAuth()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log("ERROR:", error)
        }
    }

    // Close the menu when the route changes
    useEffect(() => {
        closeMenu()
    }, [location])

    return (
        <nav className="flex items-center justify-between flex-wrap bg-stone-800 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Comuna App</span>
            </div>
            <div className="block lg:hidden">
                <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? '' : 'hidden'}`}>
                <div className="text-sm lg:flex-grow">
                    <Link 
                        to={AppPaths.HOME}
                        onClick={closeMenu} 
                        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Control panel
                    </Link>
                </div>
                <div>
                    {/* <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Contribute</a> */}
                    &nbsp;
                    {
                        user ?
                            <Link
                                to={AppPaths.LOGIN}
                                onClick={() => {
                                    closeMenu()
                                    handleLogout()
                                }}
                                className="block mt-4 lg:inline-block lg:mt-0 text-red-500 hover:text-red-300">
                                Logout
                            </Link>
                        : ''
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar