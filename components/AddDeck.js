import React, {Component} from "react";
import {connect} from "react-redux";
import { Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import {addDeck} from '../actions';
import { purple } from '../utils/colors'

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: '',
      deckTitleExists: false,
    };
  }

  deckTitleChanged = (deckTitle) => {
    let deckTitleExists = Object.keys(this.props.decks).includes(deckTitle);;
    console.log("deckTitleExists", deckTitleExists);
    this.setState({deckTitle, deckTitleExists});
  }

  createDeck = () => {
    if (this.state.deckTitleExists || this.state.deckTitle === '') {
      return;
    }
    this.props.dispatch(addDeck({
      title: this.state.deckTitle,
      questions: []
    }));
    this.props.navigation.navigate(
      'Deck',
      { deckTitle: this.state.deckTitle }
    )
  }

  render() {
    return (
      // KeyboardAvoidingView needed to prevent keyboard from hiding TextInput.
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.titleLabel}>What is the title of your new deck?</Text>
        <TextInput
        style={styles.titleTextInput}
        onChangeText={this.deckTitleChanged}
        value={this.state.deckTitle}
        />
        <TouchableOpacity style={styles.createDeckButton} onPress={this.createDeck}>
          <Text style={styles.createDeckText}>CREATE DECK</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
   titleLabel: {
     textAlign: 'center',
     padding: 10,
     fontSize: 20,
   },
  titleTextInput: {
    margin: 5,
    fontSize: 20,
    height: 40,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  createDeckButton: {
    margin: 5,
    padding: 10,
    alignItems: 'center',
    fontSize: 20,
    width: '50%',
    color: 'white',
    backgroundColor: purple,
  },
  createDeckText: {
    fontWeight: 'bold',
    color: 'white',
  }
})

function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}

export default connect(mapStateToProps)(AddDeck);