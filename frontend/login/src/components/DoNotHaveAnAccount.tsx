
export const DoNotHaveAnAccount: React.FC = () => {
  return (
    <p className="font-medium text-center no-underline text-blue-500 cursor-pointer flex flex-column mb-3">
      <span className="text-600 font-medium line-height-3">
        Don't have an account?
      </span>
      {/* TODO: Create a link to register user view */}
      <span className="mt-1">Create now!</span>
    </p>
  )
}
