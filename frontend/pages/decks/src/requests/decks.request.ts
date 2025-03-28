import { ENDPOINT_DECKS } from "core/endpoints";

type TDecksRequest = {
	userId: string;
	token: string;
};

type TDecksResponse = {
	metadata: {
		statusCode: number;
		message: string;
		info: {
			path: string;
			timestamp: string;
		};
	};
	data: [{
		id: number;
		userId: string,
		name: string,
		description: string,
		createdAt: string
	}];
	errors: {
		field: string;
		message: string;
	}[];
};

export const fetchDecks = async ({
  userId,
	token
}: TDecksRequest): Promise<TDecksResponse> => {

	const params = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
		},
	};

	const response = await fetch(ENDPOINT_DECKS({ id: userId}), params);
	const json = await response.json();
	return json;
};
