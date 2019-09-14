import React from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
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
      texMessage: "",
      messageList: []
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref("messages")
      .child(User.phone)
      .child(this.state.person.phone)
      .on("child_added", value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()]
          };
        });
      });
  }

  _handleChange = key => val => {
    this.setState({
      [key]: val
    });
  };

  _convertTime = time => {
    let a = new Date(time);
    let b = new Date();
    let result = (a.getHours() < 10 ? "0" : "") + a.getHours() + ":";
    result += (a.getMinutes() < 10 ? "0" : "") + a.getMinutes();
    if (b.getDay() !== a.getDay()) {
      result = a.getDay() + " " + a.getMonth() + " " + result;
    }
    return result;
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

  _renderRow = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "60%",
          alignSelf: item.from === User.phone ? "flex-end" : "flex-start",
          backgroundColor: item.from === User.phone ? "#fcf9ea" : "#d9eeec",
          borderRadius: 5,
          marginBottom: 10
        }}
      >
        <Text style={styles.itemMessageStyle}>{item.message}</Text>
        <Text style={styles.itemTimeStyle}>{this._convertTime(item.time)}</Text>
      </View>
    );
  };

  render() {
    let { height, width } = Dimensions.get("window");
    return (
      <SafeAreaView>
        <FlatList
          style={{ paddin: 10, height: height * 0.8, marginHorizontal: 5 }}
          data={this.state.messageList}
          renderItem={this._renderRow}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            value={this.state.texMessages}
            onChangeText={this._handleChange("texMessage")}
            placeholder="Type message..."
          />
          <TouchableOpacity onPress={this._seenMessage} style={styles.btnStyle}>
            <Text style={styles.btnStyleText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default ChatScreen;
