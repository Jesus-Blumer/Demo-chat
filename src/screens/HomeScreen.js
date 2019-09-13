import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  SafeAreaView
} from "react-native";
import firebase from "firebase";
import styles from "../contants/styles/HomeScreenStyles";
import User from "../utils/User";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Chats"
  };

  state = {
    users: []
  };

  componentWillMount() {
    let dbRef = firebase.database().ref("users");
    dbRef.on("child_added", val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person]
          };
        });
      }
    });
  }

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  _renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Chat", item)}
        style={styles.containerItems}
      >
        <Text style={styles.itemStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.users}
          renderItem={this._renderRow}
          keyExtractor={item => item.phone}
        />
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
