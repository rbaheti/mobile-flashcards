import React, {Component} from "react";
import {connect} from "react-redux";
import { Text, View, FlatList, StyleSheet } from 'react-native'
import {handleInitialData} from '../actions';
import { purple } from '../utils/colors'

class Decks extends Component {
  componentDidMount() {
    if (this.props.decks === null || this.props.decks === undefined) {
      console.log("sending action.");
      this.props.dispatch(handleInitialData());
      return;
    }
  }

  deckPressed = (deckTitle) => {
    this.props.navigation.navigate(
      'Deck',
      { deckTitle }
    )
  }

  render() {
    console.log("decks:", JSON.stringify(this.props.decks));
    let decksArr = []
    if (this.props.decks !== null) {
      decksArr = Object.values(this.props.decks);
      decksArr.forEach((deck) => deck.key = deck.title);
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decksArr}
          renderItem={({item}) => <Text style={styles.item} onPress={() => this.deckPressed(item.title)}>{item.title}</Text>}
        />
      </View>
    )
 }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 25,
    height: 55,
    borderBottomWidth: 1,
  },
})

function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}

export default connect(mapStateToProps)(Decks);