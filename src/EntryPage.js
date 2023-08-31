import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const EntryPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EntryPage;
