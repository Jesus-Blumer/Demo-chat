import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import From from './components/Form';

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <From/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
