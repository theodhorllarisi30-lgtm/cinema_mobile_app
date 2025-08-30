import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function MyReservationsScreen({ route, navigation }) {
  const { token } = route.params;
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await axios.get('http://192.168.100.77:3000/api/reservations/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.reservation_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.movie_title}</Text>
            <Text style={styles.location}>{item.date} | {item.time}</Text>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#E53935' }]}
              onPress={async () => {
                try {
                  await axios.delete(`http://192.168.100.77:3000/api/reservations/${item.reservation_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
                  fetchReservations();
                } catch (err) {
                  console.error(err);
                  alert("Σφάλμα κατά τη διαγραφή");
                }
              }}
            >
              <Text style={styles.buttonText}>Διαγραφή</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#4CAF50' }]}
              onPress={() => navigation.navigate("EditReservation", { token, reservation: item })}
            >
              <Text style={styles.buttonText}>Επεξεργασία</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: '#2C3E50', marginTop: 10 }]} onPress={fetchReservations}>
        <Text style={styles.buttonText}>Ανανέωση</Text>
      </TouchableOpacity>
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
    backgroundColor: '#E0E0E0', 
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
    fontSize: 18, 
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
    color: '#444',
    marginBottom: 10
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
