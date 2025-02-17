

export const HaveAnAccount: React.FC = () => {
  return (
    <p className="font-medium text-center no-underline text-blue-500 cursor-pointer flex flex-column mb-3">
      <span className="text-600 font-medium line-height-3">
        Have an account?
      </span>
      {/* TODO: Create a link to login user view */}
      <span className="mt-1">Login now!</span>
    </p>
  )
}
