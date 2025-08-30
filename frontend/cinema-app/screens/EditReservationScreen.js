import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";

export default function EditReservationScreen({ route, navigation }) {
  const { token, reservation } = route.params;

  const [date, setDate] = useState(reservation.date);
  const [time, setTime] = useState(reservation.time);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://192.168.100.77:3000/api/reservations/${reservation.reservation_id}`,
        { date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Επιτυχία", "Η κράτηση ενημερώθηκε!");
      navigation.goBack();
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert("Σφάλμα", "Δεν μπόρεσε να γίνει ενημέρωση");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Ημερομηνία:</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.label}>Ώρα:</Text>
      <TextInput style={styles.input} value={time} onChangeText={setTime} />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Αποθήκευση</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f0f0f0' 
  },
  label: { 
    fontSize: 16, 
    marginTop: 10, 
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12, 
    padding: 12,
    marginTop: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4CAF50', 
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
