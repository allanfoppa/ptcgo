import { z } from "zod";
import { ENDPOINT_AUTHENTICATION } from "@constants/endpoints.contant";

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
	errors: {
		field: string;
		message: string;
	}[];
};

export const authentication = async (
	_previousState: unknown,
	formData: FormData,
): Promise<TAuthenticationResponse> => {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	const schema = z.object({
		username: z.string().min(1, { message: "Username is required" }),
		password: z.string().min(1, { message: "Password is required" }),
	});

	const validation = schema.safeParse({ username, password });

	if (!validation.success) {
		const errors = validation.error.issues.reduce((acc: Record<string, string>, issue) => {
			acc[issue.path[0] as string] = issue.message;
			return acc;
		}, {} as Record<string, string>);
		return {
			errors: Object.entries(errors).map(([field, message]) => ({ field, message })),
		} as TAuthenticationResponse;
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
	return json;
};
