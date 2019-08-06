import React, { Component } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";
import Swipeout from "react-native-swipeout";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = { list: [] };
  }

  rightSwipeOutButtons(item) {
    return [
      {
        text: "Remove",
        onPress: () => this.removeItem(item),
        backgroundColor: "#FF4500",
        color: "#FFF"
      },
      {
        text: "Check",
        onPress: () => this.checkItem(item),
        backgroundColor: "#7FFF00",
        color: "#000"
      }
    ];
  }

  leftSwipeOutButtons(item) {
    return [
      {
        text: "Uncheck",
        onPress: () => this.uncheckItem(item),
        backgroundColor: "#FF7F50",
        color: "#FFF"
      }
    ];
  }

  componentDidMount() {
    axios.get("https://rickandmortyapi.com/api/character").then(response => {
      this.setState({ list: response.data.results });
    });
  }

  removeItem(listItem) {
    let list = this.state.list.filter(item => {
      return item != listItem;
    });

    this.setState({ list });
  }

  checkItem(listItem) {
    let list = this.state.list.map(item => {
      if (item == listItem) {
        return { ...item, checkmark: true };
      } else {
        return item;
      }
    });

    this.setState({ list });
  }
  uncheckItem(listItem) {
    let list = this.state.list.map(item => {
      if (item == listItem) {
        return { ...item, checkmark: false };
      } else {
        return item;
      }
    });

    this.setState({ list });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <Swipeout
      right={this.rightSwipeOutButtons(item)}
      left={this.leftSwipeOutButtons(item)}
      backgroundColor={"transparent"}
      close
    >
      <ListItem
        title={item.name}
        checkmark={item.checkmark}
        subtitle={"Status: " + item.status}
        leftAvatar={{ source: { uri: item.image } }}
        bottomDivider={true}
        onPress={() =>
          Alert.alert(
            item.name,
            `species: ${item.species}, \n status: ${item.status} \n location ${
              item.location.name
            }`
          )
        }
      />
    </Swipeout>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.list}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
