import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Σφάλμα', 'Παρακαλώ συμπλήρωσε email και password');
      return;
    }

    try {
      const res = await axios.post('http://192.168.100.77:3000/api/auth/register', {
        email,
        password
      });

      Alert.alert('Επιτυχία', 'Ο χρήστης δημιουργήθηκε!');
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
      Alert.alert('Σφάλμα', err.response?.data?.error || 'Κάτι πήγε λάθος');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Εγγραφή</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Εγγραφή</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Έχω ήδη λογαριασμό
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
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 5, 
    backgroundColor: '#fff' 
  },
  button: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: { 
    color: '#007AFF', 
    marginTop: 15, 
    textAlign: 'center' 
  }
});
