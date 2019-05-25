import {getDecksApi, addDeckApi, addQuestionApi} from "../utils/api";

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks (decks) {
  console.log("sending decks", decks);
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function deleteDeck (deckTitle) {
  return {
    type: DELETE_DECK,
    deckTitle,
  }
}

export function addQuestion (deckTitle, question) {
  return {
    type: ADD_QUESTION,
    deckTitle,
    question,
  }
}

export function handleInitialData() {
  console.log("handleInitialData called");
  return dispatch => getDecksApi()
    .then((decks) => {
      dispatch(receiveDecks(decks));
    });
}