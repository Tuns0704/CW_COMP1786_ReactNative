import React, { useState } from 'react'
import { useLayoutEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TextInput, Button, ScrollView } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';
import { getTripById } from '../services/db-service';
import { useDbContext } from "../context/DbContext";

const DetailTrip = ({ navigation, route }) => {
  const [trip, setTrip] = useState([]);
  const db = useDbContext();
  const { tripId } = route.params;

  async function fetchData() {
    const tripById = await getTripById(db, tripId);
    setTrip(tripById);
  }
  fetchData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input}
          value={trip.name}
          placeholder="Trip Name"
          editable={false}
          selectTextOnFocus={false} />
        <Text style={styles.label}>Destination</Text>
        <TextInput style={styles.input}
          value={trip.destination}
          placeholder="Trip Destination"
          editable={false}
          selectTextOnFocus={false} />
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input}
          value={trip.date}
          placeholder="Trip Date"
          editable={false}
          selectTextOnFocus={false} />
        <Text style={styles.label}>Risk Assessment</Text>
        <View style={styles.radioGroup}>
          <View style={styles.RadioButton}>
            <Text>Yes</Text>
            <RadioButton
              value="Yes"
              status={trip.riskAssessment === 'Yes' ? 'checked' : 'unchecked'}
              disabled />
          </View>
          <View style={styles.RadioButton}>
            <Text>No</Text>
            <RadioButton
              value="No"
              status={trip.riskAssessment === 'No' ? 'checked' : 'unchecked'}
              disabled />
          </View>
        </View>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input}
          value={trip.description}
          placeholder="Trip Destination"
          editable={false}
          selectTextOnFocus={false}
        />
        <Button
          color={"orange"}
          title="Edit Trip"
          onPress={() => navigation.navigate("EditTrip", { tripId: trip.id })} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  form: {
    width: '80%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  RadioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },
  textError: {
    color: 'red',
    fontSize: 18,
    marginTop: 10,
  },
});

export default DetailTrip