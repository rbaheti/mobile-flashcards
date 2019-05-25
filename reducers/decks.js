import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_QUESTION } from '../actions'

export default function decks (state = null, action) {
  console.log("current state", state);
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.title]: action.deck,
      }
    case DELETE_DECK :
      const { [action.deckTitle]: removedDeck, ...remainingDecks } = state;
      return { ...remainingDecks };
    case ADD_QUESTION :
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: state[action.deckTitle].questions.concat([action.question])
        }
      }
    default :
      return state
  }
}