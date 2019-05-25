import React, {Component} from "react";
import {connect} from "react-redux";
import { Button, Text, TextInput, View } from 'react-native'
import {addQuestion} from '../actions';
import { gray, purple } from '../utils/colors'

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: this.props.navigation.state.params.deckTitle,
      question: '',
      answer: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  questionChanged = (question) => {
    this.setState({question});
  }

  answerChanged = (answer) => {
    this.setState({answer});
  }

  createCard = () => {
    if (this.state.question === '' || this.state.answer === '') {
      return;
    }
    console.log("adding card for ", this.state.deckTitle);

    this.props.dispatch(addQuestion(
      this.state.deckTitle,
      {
       question: this.state.question,
       answer: this.state.answer,
      }
  ));
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='Question'
        placeholderTextColor={gray}
        onChangeText={this.questionChanged}
        value={this.state.question}
        />
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='Answer'
        placeholderTextColor={gray}
        onChangeText={this.answerChanged}
        value={this.state.answer}
        />
        <Button
        onPress={this.createCard}
        title="Submit"
        />
      </View>
    )
 }
}

export default connect()(AddCard);