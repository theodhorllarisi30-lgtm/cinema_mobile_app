import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Σφάλμα', 'Παρακαλώ συμπλήρωσε email και password');
      return;
    }

    try {
      const res = await axios.post('http://192.168.100.77:3000/api/auth/login', {
        email,
        password
      });

      const token = res.data.token;
      Alert.alert('Επιτυχία', 'Συνδεθήκατε επιτυχώς');
      navigation.navigate('Restaurants', { token });
    } catch (err) {
      console.error(err);
      Alert.alert('Σφάλμα', err.response?.data?.error || 'Κάτι πήγε λάθος');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Σύνδεση</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Σύνδεση</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Δεν έχετε λογαριασμό; Εγγραφή
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f0f0f0', 
  },
  title: { 
    fontSize: 26, 
    marginBottom: 25, 
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#bbb', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8, 
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#555', 
    padding: 15,
    borderRadius: 50, 
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: { 
    color: '#007AFF', 
    marginTop: 20, 
    textAlign: 'center',
    fontSize: 15,
  }
});
