import { ENDPOINT_AUTHENTICATION } from "../constants/endpoints.contant";

type TAuthenticationRequest = {
	username: string;
	password: string;
};

type TAuthenticationResponse = {
	metadata: {
		statusCode: number;
		message: string;
		info: {
			path: string;
			timestamp: string;
		};
	};
	data: {
		id: number;
		username: string;
		access_token: string;
	};
};

export const authentication = async (
	_previousState: unknown,
	formData: FormData,
): Promise<TAuthenticationResponse> => {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	if (username === '' || password === '') {
		// TODO: Validate with Zod
		throw new Error("Username or password is missing");
	}

	const data: TAuthenticationRequest = { username, password };

	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	const response = await fetch(ENDPOINT_AUTHENTICATION, params);
	const json = await response.json();
	console.log("json", json);
	return json;
};
