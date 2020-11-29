import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import groceryApi from '../api/grocery';

const AccountScreen = () => {
  useEffect(() => {
    (async () => {
      setUsername(await AsyncStorage.getItem('username'));
      setPublicId(await AsyncStorage.getItem('publicId'));
    })();
  }, []);

  const [username, setUsername] = useState('');
  const [publicId, setPublicId] = useState('');
  const [follow, setFollow] = useState('');

  const addFollower = async () => {
    console.log(follow);
    await groceryApi.post('/api/follow', {publicId: follow});
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <Image
            source={require('../../assets/grocery1.jpg')}
            style={styles.profileImg}
          />

          <Icon
            reverse
            name="photo-camera"
            type="materialicons"
            color="#FCBF49"
            containerStyle={{ position: 'absolute', bottom: 5, right: 5 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{username}</Text>
        <Text style={styles.text}>{publicId}</Text>
      </View>
      <Input
        label="Añade el codigo de un amigo"
        leftIcon={<Icon type="feather" name="user" size={24} color="black" />}
        containerStyle={{ marginTop: 50 }}
        onChangeText={setFollow}
        onEndEditing={addFollower}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    marginTop: 20,
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    position: 'relative',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default AccountScreen;
