import React, {Component} from "react";
import {connect} from "react-redux";
import { Text, View, TextInput, Button } from 'react-native'
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
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={this.deckTitleChanged}
        value={this.state.deckTitle}
        />
        <Button
        onPress={this.createDeck}
        title="Create Deck"
        />
      </View>
    )
 }
}

function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}

export default connect(mapStateToProps)(AddDeck);