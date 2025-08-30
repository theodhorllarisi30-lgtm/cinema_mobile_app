import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReservationScreen({ route, navigation }) {
  const { token, restaurant_id } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [peopleCount, setPeopleCount] = useState('');

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setTime(selectedTime);
  };

  const makeReservation = async () => {
    if (!peopleCount || parseInt(peopleCount) <= 0) {
      Alert.alert("Σφάλμα", "Συμπληρώστε σωστά τον αριθμό ατόμων");
      return;
    }

    try {
      await axios.post(
        'http://192.168.100.77:3000/api/reservations',
        {
          restaurant_id,
          date: date.toISOString().split('T')[0],
          time: `${time.getHours()}:${time.getMinutes()}`,
          people_count: parseInt(peopleCount)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("Επιτυχία", "Η κράτηση δημιουργήθηκε!");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Σφάλμα", "Η κράτηση απέτυχε.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Ημερομηνία</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>Επιλέξτε ημερομηνία</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="calendar" onChange={onDateChange} />
        )}
        <Text style={styles.selectedText}>Επιλεγμένη ημερομηνία: {date.toLocaleDateString()}</Text>

        <Text style={styles.label}>Ώρα</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.buttonText}>Επιλέξτε ώρα</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker value={time} mode="time" is24Hour={true} display="spinner" onChange={onTimeChange} />
        )}
        <Text style={styles.selectedText}>Επιλεγμένη ώρα: {time.getHours()}:{time.getMinutes()}</Text>

        <Text style={styles.label}>Άτομα</Text>
        <TextInput
          style={styles.input}
          value={peopleCount}
          onChangeText={setPeopleCount}
          keyboardType="numeric"
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 15 }]} onPress={makeReservation}>
          <Text style={styles.buttonText}>Κάνε Κράτηση</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 10
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
    elevation: 2
  },
  button: {
    backgroundColor: '#2C3E50',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  selectedText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333'
  }
});
