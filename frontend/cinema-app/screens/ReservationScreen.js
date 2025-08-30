import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReservationScreen({ route, navigation }) {
  const { token, cinema_id } = route.params;

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Φόρτωση ταινιών για το συγκεκριμένο cinema
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`http://192.168.100.77:3000/api/cinemas/${cinema_id}/movies`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMovies(res.data);
      } catch (err) {
        console.error(err);
        Alert.alert("Σφάλμα", "Δεν ήταν δυνατή η φόρτωση των ταινιών.");
      }
    };
    fetchMovies();
  }, []);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setTime(selectedTime);
  };

  const makeReservation = async () => {
    if (!selectedMovie) {
      Alert.alert("Σφάλμα", "Παρακαλώ επιλέξτε ταινία");
      return;
    }

    try {
      await axios.post(
        'http://192.168.100.77:3000/api/reservations',
        {
          movie_id: selectedMovie,
          cinema_id,
          date: date.toISOString().split('T')[0],
          time: `${time.getHours()}:${time.getMinutes()}`
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

  const renderMovie = ({ item }) => {
    const isSelected = selectedMovie === item.movie_id;
    return (
      <TouchableOpacity
        style={[styles.movieButton, isSelected && styles.selectedMovie]}
        onPress={() => setSelectedMovie(item.movie_id)}
      >
        <Text style={styles.movieText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Επιλέξτε Ταινία</Text>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.movie_id.toString()}
          renderItem={renderMovie}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

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

        <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 15 }]} onPress={makeReservation}>
          <Text style={styles.buttonText}>Κάνε Κράτηση</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  card: { backgroundColor: '#E0E0E0', padding: 20, borderRadius: 12, marginBottom: 15 },
  label: { fontSize: 16, color: '#333', marginTop: 10 },
  button: { backgroundColor: '#2C3E50', padding: 12, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  selectedText: { marginTop: 5, fontSize: 14, color: '#333' },
  movieButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  selectedMovie: {
    backgroundColor: '#4CAF50',
  },
  movieText: { color: 'white', fontWeight: 'bold' },
});
