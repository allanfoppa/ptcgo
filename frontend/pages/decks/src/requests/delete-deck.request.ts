import { ENDPOINT_DECKS } from "core/endpoints";

type TDecksRequest = {
  deckId: string;
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

export const deleteDeck = async ({
  deckId,
  token,
}: TDecksRequest): Promise<TDecksResponse> => {

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  };

  const response = await fetch(ENDPOINT_DECKS({ id: deckId }), params);
  const json = await response.json();

  return json;
};
