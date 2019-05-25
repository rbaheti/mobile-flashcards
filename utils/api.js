import {
  _getDecks,
  _addDeck,
  _addQuestion
} from "./_DATA.js";

export function getDecksApi() {
  return _getDecks();
}

export function addDeckApi(deck) {
  return _addDeck(deck);
}

export function addQuestionApi({deckTitle, question}) {
  return _addQuestion({deckTitle, question});
}