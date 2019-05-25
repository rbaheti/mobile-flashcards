import React, {Component} from "react";
import {connect} from "react-redux";
import { Button, Text, View } from 'react-native'
import { purple } from '../utils/colors'

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
  }

  render() {
    return (
      <View>
        <Text>Deck</Text>
        <Button
        onPress={this.addCardPressed}
        title="Add Card"
        />
        <Button
        onPress={this.startQuizPressed}
        title="Start Quiz"
        />
        <Text>Delete Deck</Text>
      </View>
    )
 }
}

export default Deck