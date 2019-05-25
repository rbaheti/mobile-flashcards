import React, {Component} from "react";
import {connect} from "react-redux";
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: this.props.navigation.state.params.deckTitle,
      questionIdx: 0,
      displayAnswer: false,
      numCorrectlyAnswered: 0,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  questionAnswerPressed = () => {
    this.setState({displayAnswer: !this.state.displayAnswer});
  }

  correctPressed = () => {
    this.setState({
      questionIdx: this.state.questionIdx + 1,
      displayAnswer: false,
      numCorrectlyAnswered: this.state.numCorrectlyAnswered + 1
    });
  }

  incorrectPressed = () => {
    this.setState({
      questionIdx: this.state.questionIdx + 1,
      displayAnswer: false
    });
  }

  getText = () => {
    let question = this.props.decks[this.state.deckTitle].questions[this.state.questionIdx];
    if (this.state.displayAnswer) {
      return question.answer;
    }
    return question.question;
  }

  render() {
    let numQuestions = this.props.decks[this.state.deckTitle].questions.length;
    if (numQuestions === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.resultLabel}>
            Sorry, you cannot take a quiz because there are no cards in the deck.
          </Text>
        </View>
      );
    }

    let finishedAllQuestions = false;
    if (this.state.questionIdx === numQuestions) {
      finishedAllQuestions = true;
    }
    if (finishedAllQuestions) {
      return (
        <View style={styles.container}>
          <Text style={styles.resultLabel}>
            {"Num correctly answered: " + this.state.numCorrectlyAnswered + " / " + numQuestions}
          </Text>
          <Text style={styles.resultLabel}>
            {"Num incorrectly answered: " + (numQuestions - this.state.numCorrectlyAnswered) + " / " + numQuestions}
          </Text>

          <TouchableOpacity style={styles.buttonStyle} onPress={() => {this.props.navigation.goBack();}}>
          <Text style={styles.buttonText}>GO BACK</Text>
        </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.questionAnswerLabel}>{this.getText()}</Text>
        
        <TouchableOpacity style={styles.buttonStyle} onPress={this.questionAnswerPressed}>
          <Text style={styles.buttonText}>{this.state.displayAnswer ? 'QUESTION' : 'ANSWER'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={this.correctPressed}>
          <Text style={styles.buttonText}>CORRECT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={this.incorrectPressed}>
          <Text style={styles.buttonText}>INCORRECT</Text>
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
   resultLabel: {
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 20,
  },
   questionAnswerLabel: {
    padding: 5,
    textAlign: 'center',
    paddingBottom: 20,
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

export default connect(mapStateToProps)(Quiz);