import React from 'react'
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import styles from '../contants/styles/HomeScreenStyles'
import User from '../utils/User'

class HomeScreen extends React.Component {
static navigationOptions = {
  title: 'Chats'
}
  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  render(){
    return(
      <View style={styles.container}>
        <Text>{User.phone}</Text>
        <TouchableOpacity onPress={this._logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default HomeScreen

