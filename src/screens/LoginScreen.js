import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputStyle: {
    borderColor: "#6bc5d2",
    padding: 10,
    borderWidth: 1,
    width: "90%",
    borderRadius: 10,
    marginBottom: 8
  },
  btnStyle: {
    color: "black",
    backgroundColor: "#6bc5d2",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 18
  },
});
