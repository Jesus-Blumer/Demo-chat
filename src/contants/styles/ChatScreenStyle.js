import React from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  containerInput:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5
  },
  textInputStyle: {
    borderColor: "#6bc5d2",
    padding: 10,
    borderWidth: 1,
    width: "80%",
    borderRadius: 10
  },
  btnStyle: {
    paddingBottom: 10,
    marginLeft: 5,
  },
  btnStyleText: {
    color: "black",
    backgroundColor: "#fcfafa",
    padding: 10,
    borderRadius: 5,
    fontSize: 18
  },
  itemMessageStyle: {
    color: 'black',
    padding: 7,
    fontSize: 16
  },
  itemTimeStyle: {
    color: '#757575',
    padding: 3,
    fontSize: 10
  }
});
export default styles