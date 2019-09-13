import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  View
} from "react-native";
import styles from "../contants/styles/ChatScreenStyle";
import firebase from "firebase";
import User from "../utils/User";

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", null)
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam("name"),
        phone: props.navigation.getParam("phone")
      },
      texMessage: ""
    };
  }

  _handleChange = key => val => {
    this.setState({
      [key]: val
    });
  };
  _seenMessage = async () => {
    if (this.state.texMessage.length > 0) {
      let msgId = firebase
        .database()
        .ref("messages")
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.texMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone
      };
      updates[
        `messages/${User.phone}/${this.state.person.phone}/${msgId}`
      ] = message;
      updates[
        `messages/${this.state.person.phone}/${User.phone}/${msgId}`
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({
        texMessage: ""
      });
    }
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            value={this.state.texMessages}
            onChangeText={this._handleChange("texMessage")}
            placeholder="Type message..."
          />
          <TouchableOpacity onPress={this._seenMessage}>
            <Text style={styles.btnStyle}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default ChatScreen;
