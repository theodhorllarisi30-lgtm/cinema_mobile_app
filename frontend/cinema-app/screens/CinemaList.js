import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function CinemaList({ route, navigation }) {
  const { token } = route.params;
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const res = await axios.get('http://192.168.100.77:3000/api/cinemas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCinemas(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#555" />
        <Text style={{ marginTop: 10 }}>Φορτώνει...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#E53935' }]} 
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonText}>Αποσύνδεση</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#5bc0de' }]} 
        onPress={() => navigation.navigate('MyReservations', { token })}
      >
        <Text style={styles.buttonText}>Οι κρατήσεις μου</Text>
      </TouchableOpacity>

      <FlatList
        data={cinemas}
        keyExtractor={(item) => item.cinema_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#5cb85c', marginTop: 10 }]}
              onPress={() => navigation.navigate('Reservation', { token, cinema_id: item.cinema_id })}
            >
              <Text style={styles.buttonText}>Κάνε κράτηση</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f0f0f0' 
  },
  card: { 
    backgroundColor: '#fff',
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    shadowColor: '#f0f0f0',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },
  name: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 5,
    color: '#333'
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    color: '#444'
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
});
