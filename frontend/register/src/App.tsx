// REACT
import { useActionState, useEffect, useRef } from "react";
// PRIME REACT
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
// CORE MFE
import { useRouterContext } from 'core/RouterContext';
import { RoutePaths } from "core/RoutePaths";
import { InputLabel } from "core/InputLabel";
// REGISTER MFE
import { registerUser } from "@requests/register-user.request";
import { HaveAnAccount } from "@components/HaveAnAccount";

type ActionStateResponse = {
	metadata: {
		message: string;
		statusCode: number;
	};
	data: {
		id: number;
		username: string;
	};
	errors: {
		field: string;
		message: string;
	}[];
};

const Register = () => {
	const routerContext = useRouterContext();
	const toast = useRef<Toast>(null);
	const redirectToLoginAfterRegister = () => setTimeout(() => routerContext.navigate(RoutePaths.HOME), 1000);

	/**
	 * Handle form submission
	 */
	const [data, formAction, isPending] = useActionState<
		ActionStateResponse,
		FormData
	>(registerUser, {
		metadata: { message: "", statusCode: 0 },
		data: { id: 0, username: "" },
		errors: [],
	});

	/**
	 * Handle with form is submitted response
	 */
	useEffect(() => {
		if (data.errors) {
			for (const error of data.errors) {
				toast.current?.show({
					severity: "error",
					summary: "Error",
					detail: error.message,
				});
			}
			return;
		}

		if (data.metadata.statusCode === 201) {
			toast.current?.show({
				severity: "success",
				summary: "Success",
				detail: data.metadata.message,
			});
			redirectToLoginAfterRegister();
		} else {
			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: data.metadata.message,
			});
		}
	}, [data]);

	return (
		<form action={formAction} className="mt-8">
			<div className="flex align-items-center justify-content-center">
				<div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
					<h2 className="text-center mb-3">REGISTER</h2>
					<HaveAnAccount />
					<div>
						<InputLabel label="Username" labelFor="username" />
						<InputText
							id="username"
							name="username"
							placeholder="Type our username"
							autoComplete="create-username"
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
							autoComplete="create-password"
						/>

						<Button
							id="register"
							data-testid="register"
							label="Register"
							icon={"pi pi-user-plus"}
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

export default Register;
