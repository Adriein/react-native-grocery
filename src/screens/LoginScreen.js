import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation, login }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { state, signin } = useContext(AuthContext);

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
      {state.error && <Text style={styles.error}>{state.error}</Text>}
      <Button title="Entrar" onPress={() => signin({ username, password })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 40,
  },
  error: {
    fontSize: 16,
    color: 'red',
    margin: 'auto',
    marginBottom: 10
  },
});

export default LoginScreen;
