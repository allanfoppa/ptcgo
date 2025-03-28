import { z } from "zod";
import { ENDPOINT_DECKS } from "core/endpoints";

type TDecksRequest = {
	userId: string;
	token: string;
};

type TDecksBodyRequest = {
	name: string;
	description: string;
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
	data: {
		id: number;
		userId: string,
		name: string,
		description: string,
		createdAt: string
	};
	errors: {
		field: string;
		message: string;
	}[];
};

export const createDeck = async ({
  userId,
	token,
	formData,
}: TDecksRequest & { formData: FormData }): Promise<TDecksResponse> => {

	const name = formData.get("name") as string;
	const description = formData.get("description") as string;

	const schema = z.object({
    name: z
      .string()
      .toLowerCase()
      .min(2, { message: 'Name must be greater or equal to 2.' })
      .max(24, { message: 'Name can\'t be greater than 24 characters.' }),
    description: z
      .string()
      .max(100, { message: 'Name can\'t be greater than 100 characters.' }),
  });

	const validation = schema.safeParse({ name, description });

	if (!validation.success) {
		const errors = validation.error.issues.reduce((acc: Record<string, string>, issue) => {
			acc[issue.path[0] as string] = issue.message;
			return acc;
		}, {} as Record<string, string>);
		return {
			errors: Object.entries(errors).map(([field, message]) => ({ field, message })),
		} as TDecksResponse;
	}

	const data: TDecksBodyRequest = { name, description };

	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
		},
		body: JSON.stringify(data)
	};

	const response = await fetch(ENDPOINT_DECKS({ id: userId }), params);
	const json = await response.json();

	return json;
};
