import useAuth from "../hooks/UseAuth"

function Home() {

  const { user } = useAuth()

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
      </div>

    </div>
  )
}

export default Home