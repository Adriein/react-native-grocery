import React from 'react';
import { Text } from 'react-native-elements';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

export default HeaderComponent = (navigation) => {
  return (
    <SafeAreaView style={styles.header}>
      <ImageBackground
        style={styles.headerImage}
        source={require('../../assets/grocery.jpg')}
      >
        <View style={styles.headerItems}>
          <Avatar
            rounded
            title="AC"
            size="large"
            overlayContainerStyle={{ backgroundColor: '#d3d3d3' }}
            onPress={() => navigation.props.navigate('Cuenta')}
          />
          <Text h3 style={styles.headerTitle}>
            Listas de la compra
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 130,
  },
  headerImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerItems: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  headerTitle: {
    color: 'white',
    marginLeft: 10,
  },
});
