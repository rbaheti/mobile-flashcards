import React, {Component} from "react";
import {connect} from "react-redux";
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import {deleteDeck} from '../actions';
import { purple } from '../utils/colors'
import { clearLocalNotification, setLocalNotification} from '../utils/helpers'

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: this.props.navigation.state.params.deckTitle
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
      title: deckTitle
    }
  }

  addCardPressed = () => {
    this.props.navigation.navigate(
      'AddCard',
      { deckTitle: this.state.deckTitle }
    )
  }

  startQuizPressed = () => {
    clearLocalNotification()
      .then(setLocalNotification);
    this.props.navigation.navigate(
      'Quiz',
      { deckTitle: this.state.deckTitle }
    )
  }

  deleteDeckPressed = () => {
    this.props.dispatch(deleteDeck(this.state.deckTitle));
    this.props.navigation.goBack();
  }

  render() {
    if (this.props.decks[this.state.deckTitle] === undefined) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitleLabel}>{this.state.deckTitle}</Text>
        <Text style={styles.numCardsLabel}>{this.props.decks[this.state.deckTitle].questions.length} cards</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.addCardPressed}>
          <Text style={styles.buttonText}>ADD CARD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={this.startQuizPressed}>
          <Text style={styles.buttonText}>START QUIZ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={this.deleteDeckPressed}>
          <Text style={[styles.buttonText, {color: 'red'}]}>DELETE DECK</Text>
        </TouchableOpacity>
      </View>
    )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
   },
  deckTitleLabel: {
    padding: 5,
    textAlign: 'center',
    paddingBottom: 5,
    fontSize: 20,
  },
  numCardsLabel: {
    paddingBottom: 10,
    fontSize: 14,
    color: 'gray',
  },
  buttonStyle: {
    margin: 5,
    padding: 10,
    alignItems: 'center',
    fontSize: 20,
    width: '50%',
    color: 'white',
    backgroundColor: purple,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  }
})

function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}

export default connect(mapStateToProps)(Deck);