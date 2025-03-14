import { useRouterContext } from 'core/RouterContext';
import { RoutePaths } from "core/RoutePaths";

export const HaveAnAccount: React.FC = () => {
    const routerContext = useRouterContext();

  return (
    <p className="font-medium text-center no-underline text-blue-500 cursor-pointer flex flex-column mb-3">
      <span className="text-600 font-medium line-height-3">
        Have an account?
      </span>
      <span
        onClick={() => routerContext.navigate(RoutePaths.HOME)}
        className="text-blue-500 cursor-pointer mt-1"
      >
        Login now!
      </span>
    </p>
  )
}
