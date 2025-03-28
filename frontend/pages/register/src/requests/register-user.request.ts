import { z } from "zod";
import { ENDPOINT_REGISTRATION } from "core/endpoints";

type TRegisterUserRequest = {
	username: string;
	password: string;
};

type TRegisterUserResponse = {
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
	};
	errors: {
		field: string;
		message: string;
	}[];
};

export const registerUser = async (
	_previousState: unknown,
	formData: FormData,
): Promise<TRegisterUserResponse> => {

	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	const schema = z.object({
    username: z
      .string()
      .toLowerCase()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(18, { message: 'Username can\'t be greater than 18 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be between 8 and 32 characters.' })
      .max(32, { message: 'Password must be between 8 and 32 characters.' }),
  });

	const validation = schema.safeParse({ username, password });

	if (!validation.success) {
		const errors = validation.error.issues.reduce((acc: Record<string, string>, issue) => {
			acc[issue.path[0] as string] = issue.message;
			return acc;
		}, {} as Record<string, string>);
		return {
			errors: Object.entries(errors).map(([field, message]) => ({ field, message })),
		} as TRegisterUserResponse;
	}

	const data: TRegisterUserRequest = { username, password };

	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	const response = await fetch(ENDPOINT_REGISTRATION, params);
	const json = await response.json();
	return json;
};
