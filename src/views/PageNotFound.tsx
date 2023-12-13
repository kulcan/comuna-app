import { Link } from "react-router-dom"
import { AppPaths } from "../resources/Constants"

function PageNotFound() {

  return (
    <div role="status" className="w-full flex justify-center max-w-xs m-auto">
      <p>Page not found. 
      &nbsp;
      <Link to={AppPaths.HOME} className="text-blue-700 text-decoration-line: underline">
        Return to home
      </Link>
      </p>
    </div>
  )
}

export default PageNotFound