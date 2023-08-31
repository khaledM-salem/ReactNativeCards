import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg] = useState('Make sure to fill all the inputs');
  const [errors, setErrors] = useState(false);

  // Handle login logic and navigate to landing page
  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setErrors(true);
    } else {
      navigation.navigate('Landing');
    }
  };

  useEffect(() => {
    if (username.trim() !== '' && password.trim() !== '') {
      setErrors(false);
    }
  }, [username, password]);

  return (
    <View style={styles.container}>
      {errors && (
        <View style={styles.errorContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setErrors(false)}>
            <Text>X</Text>
          </TouchableOpacity>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => {
          setUsername(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  errorContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D3D3D3',
  },
  errorText: {
    color: 'red',
  },
  closeIcon: {
    position: 'absolute',
    left: 5,
    top: 2,
  },
});

export default LoginPage;
