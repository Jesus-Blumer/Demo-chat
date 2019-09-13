import React from "react";
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import firebase from 'firebase'
import styles from '../contants/styles/LoginScreenStyles'
import User from '../utils/User'

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    phone: "",
    name: ""
  };

  _handleChange = key => val => {
    this.setState({
      [key]: val
    });
  };
 
  
  _submitForm = async () => {
    if (this.state.phone.length < 10) {
     alert('Error, Numero incorrecto')
    }else if (this.state.name.length < 2) {
      alert('Error, Nombre incorrecto')
    }else{
      // alert(`${this.state.phone}\n${this.state.name}`)
      //--------Save User Data----------//
      await AsyncStorage.setItem('userPhone', this.state.phone)
      User.phone = this.state.phone
      firebase.database().ref(`users/${User.phone}`).set({
        name: this.state.name
      })
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          placeholder="Phone Number"
          style={styles.textInputStyle}
          value={this.state.phone}
          onChangeText={this._handleChange('phone')}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Name"
          style={styles.textInputStyle}
          value={this.state.name}
          onChangeText={this._handleChange('name')}
        />
        <TouchableOpacity onPress={this._submitForm}>
          <Text style={styles.btnStyle}>Enter</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
    );
  }
}
export default LoginScreen;
