import { useActionState, useEffect, useRef } from "react";
import { InputText } from "core/InputText";
import { Password } from "core/Password";
import { Button } from "core/Button";
import { InputLabel } from "core/InputLabel";
import { authentication } from "./requests/authentication.request";
import { Toast } from 'primereact/toast';
import { DoNotHaveAnAccount } from "./components/DoNotHaveAnAccount";
import { ForgotYourPassword } from "./components/ForgotYourPassword";

type ActionStateResponse = {
	metadata: {
		message: string;
		statusCode: number;
	};
};

const Login = () => {
	const toast = useRef<Toast>(null);

	const [data, formAction, isPending] = useActionState<ActionStateResponse, FormData>(
		authentication,
		{ metadata: { message: "", statusCode: 0 } },
	);

	useEffect(() => {
		if (data.metadata.statusCode === 200) {
			toast.current?.show({ severity: 'success', summary: 'Success', detail: data.metadata.message });
		} else if (data.metadata.statusCode === 401) {
			toast.current?.show({ severity: 'error', summary: 'Fail', detail: data.metadata.message });
		} else {
			toast.current?.show({ severity: 'error', summary: 'Fail', detail: data.metadata.message });
		}
	}, [data]);

	return (
		<form action={formAction}>
			<div className="flex align-items-center justify-content-center">
				<div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
					<h2 className="text-center mb-3">LOGIN</h2>
					<DoNotHaveAnAccount />
					<div>
						<InputLabel
							label="Username"
							labelFor="username"
						/>
						<InputText
							id="username"
							name="username"
							placeholder="Type our username"
							extraClass="w-full mb-3"
						/>

						<InputLabel
							label="Password"
							labelFor="password"
						/>
						<Password
							id="password"
							name="password"
							placeholder="Type your password"
							wrapExtraClass="w-full mb-3"
							inputExtraClass="w-full mb-3"
						/>

						<div className="flex align-items-start justify-content-end mb-6">
							<ForgotYourPassword />
						</div>

						<Button
							id="sign-in"
							label="Sign In"
							icon={'pi pi-user'}
							isPending={isPending}
							extraClass="w-full inline-block"
						/>
					</div>
				</div>
			</div>
			{/* TODO: Create a component in Core MFE */}
			<Toast ref={toast} position="top-center" />
		</form>
	);
};

export default Login;
