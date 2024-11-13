import React, { useState } from 'react';
import { TextInput, Button, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { signUp, logIn } from '../firebase/firebaseAuth';  // Import auth functions

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setEmail('');
      setPassword('');
      setError('');
      navigation.replace('(tabs)');  // Replace current screen with the main tabs on successful sign-up
    } catch (err) {
      setError('Error signing up: ' + err.message);
    }
  };

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      setEmail('');
      setPassword('');
      setError('');
      navigation.replace('(tabs)');  // Replace current screen with the main tabs on successful login
    } catch (err) {
      setError('Error logging in: ' + err.message);
    }
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Log In" onPress={handleLogIn} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
