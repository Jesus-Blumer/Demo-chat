import React from 'react'
import {
  Alert,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

class From extends React.Component{
   
  state = {
    phone: '',
    name: ''
  }

  _handleChange = key => val => {
    this.setState({
      [key]: val
    })
  }

  _submitForm = () => {
    alert(`${this.state.phone}\n${this.state.name}`)
  }

  render(){
    return(
     <>
        <Text style={styles.textStyle}>Login</Text>
        <TextInput
          placeholder='Phone Number'
          style={styles.textInputStyle}
          value={this.state.phone}
          onChangeText={this._handleChange('phone')}
          keyboardType='numeric'
        />
        <TextInput
          placeholder='Name'
          style={styles.textInputStyle}
          value={this.state.name}
          onChangeText={this._handleChange('name')}
        />
        <TouchableOpacity onPress={this._submitForm}>
          <Text style={styles.btnStyle}>Enter</Text>
        </TouchableOpacity>
      </>
    )
  }
}
export default From

const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: '#6bc5d2',
    padding: 10,
    borderWidth: 1,
    width: '90%',
    borderRadius: 10,
    marginBottom: 8,
  },
  btnStyle: {
    color: 'black',
    backgroundColor: '#6bc5d2',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 18
  },
  textStyle: {
    marginBottom: 10,
    fontSize: 25
  }
})