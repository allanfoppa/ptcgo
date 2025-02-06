type TCreateUserRequest = {
	username: string;
	password: string;
};

type TCreateUserResponse = {
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
};

export const createUser = async (
	data: TCreateUserRequest,
): Promise<TCreateUserResponse> => {
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	const response = await fetch("http://localhost:3001/user", params);
	const json = await response.json();
	return json;
};
