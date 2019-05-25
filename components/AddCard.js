import React, {Component} from "react";
import {connect} from "react-redux";
import { Button, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, View, StyleSheet } from 'react-native'
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
      // KeyboardAvoidingView needed to prevent keyboard from hiding TextInput.
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TextInput
        style={styles.titleTextInput}
        placeholder='Question'
        placeholderTextColor={gray}
        onChangeText={this.questionChanged}
        value={this.state.question}
        />
        <TextInput
        style={styles.titleTextInput}
        placeholder='Answer'
        placeholderTextColor={gray}
        onChangeText={this.answerChanged}
        value={this.state.answer}
        />
        
        <TouchableOpacity style={styles.buttonStyle} onPress={this.createCard}>
          <Text style={styles.buttonText}>SUBMIT</Text>
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
  titleTextInput: {
    margin: 5,
    fontSize: 20,
    height: 40,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
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

export default connect()(AddCard);