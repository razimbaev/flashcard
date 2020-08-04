import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
const GET_ALL_DECKS_ENDPOINT = "/v1/deck";
const GET_ALL_CARDS_ENDPOINT = "/v1/card";
const CREATE_CARD_ENDPOINT = "/v1/card";
const UPDATE_CARD_ENDPOINT = "/v1/card/";

export const getAllDecks = () => {
  return axios.get(BASE_URL + GET_ALL_DECKS_ENDPOINT);
};

export const getAllCards = () => {
  return axios.get(BASE_URL + GET_ALL_CARDS_ENDPOINT);
};

export const createNewCard = (cardFront, cardBack, decks) => {
  return axios.post(BASE_URL + CREATE_CARD_ENDPOINT, {
    cardFront,
    cardBack,
    decks,
  });
};

export const updateCard = (cardFront, cardBack, decks, originalCardFront) => {
  return axios.put(BASE_URL + UPDATE_CARD_ENDPOINT + originalCardFront, {
    cardFront,
    cardBack,
    decks,
  });
};
