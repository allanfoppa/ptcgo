// REACT
import { useActionState, useEffect, useRef } from "react";
// PRIME REACT
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
// CORE MFE
import { InputLabel } from "core/InputLabel";
import { useGlobalContext } from "core/GlobalContext";
import { useRouterContext } from 'core/RouterContext';
import { RoutePaths } from "core/RoutePaths";
// LOGIN MFE
import { authentication } from "@requests/authentication.request";
import { DoNotHaveAnAccount } from "@components/DoNotHaveAnAccount";
import { ForgotYourPassword } from "@components/ForgotYourPassword";

type ActionStateResponse = {
	metadata: {
		message: string;
		statusCode: number;
	};
	data: {
		id: number;
		username: string;
		access_token: string;
	};
	errors: {
		field: string;
		message: string;
	}[];
};

const Login = () => {
	const globalContext = useGlobalContext();
	const routerContext = useRouterContext();
	const toast = useRef<Toast>(null);

	/**
	 * Handle form submission
	 */
	const [data, formAction, isPending] = useActionState<
		ActionStateResponse,
		FormData
	>(authentication, {
		metadata: { message: "", statusCode: 0 },
		data: { id: 0, username: "", access_token: "" },
		errors: [],
	});

	/**
	 * Handle with form is submitted response
	 */
	useEffect(() => {
		if (data.errors) {
			for (const error of data.errors) {
				showToaster("error", "Error", error.message);
			}
			return;
		}

		if (data.metadata.statusCode === 200) {
			showToaster("success", "Success", data.metadata.message);
			authenticateUser();
		} else {
			showToaster("error", "Error", data.metadata.message);
		}
	}, [data]);

	const authenticateUser = () => {
		globalContext.setIsLogged(true);
		globalContext.setToken(data.data.access_token);
		globalContext.setUser(data.data.username);
		routerContext.navigate(RoutePaths.DECKS);
	}

	const showToaster = (severity: any, summary: string, detail: string) => {
		toast.current?.show({ severity, summary, detail });
	};

	return (
		<form action={formAction} className="mt-8">
			<div className="flex align-items-center justify-content-center">
				<div className="surface-card p-4 shadow-2 border-round w-29rem">
					<h2 className="text-center mb-3">LOGIN</h2>
					<DoNotHaveAnAccount />
					<div>
						<InputLabel label="Username" labelFor="username" />
						<InputText
							id="username"
							name="username"
							placeholder="Type our username"
							autoComplete="username"
							className="w-full mb-3"
						/>

						<InputLabel label="Password" labelFor="password" />
						<Password
							id="password"
							name="password"
							data-testid="password"
							placeholder="Type your password"
							className="w-full mb-3"
							inputClassName="w-full mb-3"
							autoComplete="current-password"
							feedback={false}
						/>

						<div className="flex align-items-start justify-content-end mb-6">
							<ForgotYourPassword />
						</div>

						<Button
							id="login"
							data-testid="login"
							label="Login"
							icon={"pi pi-sign-in"}
							disabled={isPending}
							className="w-full inline-block"
						/>
					</div>
				</div>
			</div>
			<Toast ref={toast} position="top-center" />
		</form>
	);
};

export default Login;
