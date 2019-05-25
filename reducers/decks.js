import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

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
        ...action.deck
      }
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