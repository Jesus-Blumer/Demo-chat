import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import firebase from "firebase";
import User from "../utils/User";

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCnnPKb1cnyZEWy8T5ZEfNOEJ4YEOoL4sE",
      authDomain: "chatrn-8da35.firebaseapp.com",
      databaseURL: "https://chatrn-8da35.firebaseio.com",
      projectId: "chatrn-8da35",
      storageBucket: "",
      messagingSenderId: "911456772119",
      appId: "1:911456772119:web:6bbcf9f9be3a3e28e13c52"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem("userPhone");
    this.props.navigation.navigate(User.phone ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
