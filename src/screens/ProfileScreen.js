import React from "react";
import { 
  TouchableOpacity,
  SafeAreaView, 
  TextInput, 
  Text 
} from "react-native";
import User from "../utils/User";
import styles from "../contants/styles/ProfileScreenStyles";
import firebase from 'firebase'

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  state = {
    name: User.name
  }

  _handleChange = key => val => {
    this.setState({
      [key]: val
    })
  }

  _changeName = async => {
    if (this.state.name < 3) {
        alert('Error, por favor validar nombre')
    }else if (User.name !== this.state.name){
      firebase.database().ref('users').child(User.phone).set({name: this.state.name})
      User.name = this.state.name
      alert('Nombre ccambiado con exito!')
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.sizeItems}>{User.phone}</Text>
        <TextInput
          style={styles.textInputStyle}
          value={this.state.name}
          onChangeText={this._handleChange('name')}
        />
        <TouchableOpacity onPress={this._changeName}>
          <Text style={styles.btnStyle}>Cambiar nombre</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export default ProfileScreen;
