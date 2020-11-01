import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

const LoginScreen = ({ navigation, login }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = () => {
    login();
  };
  return (
    <View style={styles.container}>
      <Input label="Usuario" value={username} onChangeText={setUsername} />
      <Input
        label="Password"
        secureTextEntry
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 40,
  },
});

export default LoginScreen;
