interface Props {
  error: Error
}

function Alert({ error }: Props) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 text-center">
      <span className="sm:inline block">{error.message}</span>
    </div>
  )
}

export default Alert