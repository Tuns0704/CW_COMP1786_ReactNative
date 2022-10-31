import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, TextInput, Button, ScrollView, Alert } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';
import { getTripById } from '../services/db-service';
import { useDbContext } from "../context/DbContext";
import { updateTrip, deleteTrip } from '../services/db-service';

const EditTrip = ({ navigation, route }) => {
  const db = useDbContext();
  useEffect(function () {
    async function fetchData() {
      try {
        const tripById = await getTripById(db, tripId);
        setTrip(tripById);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [db]);

  const [trip, setTrip] = useState([]);
  const [name, setName] = useState();
  const [destination, setDestination] = useState();
  const [date, setDate] = useState();
  const [risk, setRisk] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState(null);
  const { tripId } = route.params;

  async function EditTrip() {
    if (name === "") {
      setError("Please enter Trip");
      return;
    } if (destination === "") {
      setError("Please enter Destination");
      return;
    } if (date === "") {
      setError("Please enter Trip Date");
      return;
    } if (description === "") {
      setError("Please enter Description");
      return;
    }
    try {
      await updateTrip(db, name, destination, date, risk, description, tripId);
      Alert.alert(
        'Success',
        'Update Trip successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ],
        { cancelable: false }
      );
    } catch (e) {
      setError(`An error occurred while update the Trip: ${e.message}`);
    }
  }

  async function DeleteTrip() {
    try {
      await deleteTrip(db, tripId);
      Alert.alert(
        'Success',
        'Delete Trip successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ],
        { cancelable: false }
      );
    } catch (e) {
      setError(`An error occurred while delete the Trip: ${e.message}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input}
          onChangeText={text => setName(text)}
          placeholder={trip.name} />
        <Text style={styles.label}>Destination</Text>
        <TextInput style={styles.input}
          onChangeText={destination => setDestination(destination)}
          placeholder={trip.destination} />
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input}
          onChangeText={date => setDate(date)}
          placeholder={trip.date} />
        <Text style={styles.label}>Risk Assessment</Text>
        <View style={styles.radioGroup}>
          <View style={styles.RadioButton}>
            <Text>Yes</Text>
            <RadioButton
              value="Yes"
              status={risk === 'Yes' ? 'checked' : 'unchecked'}
              onPress={() => setRisk('Yes')} />
          </View>
          <View style={styles.RadioButton}>
            <Text>No</Text>
            <RadioButton
              value="No"
              status={risk === 'No' ? 'checked' : 'unchecked'}
              onPress={() => setRisk('No')} />
          </View>
        </View>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input}
          onChangeText={description => setDescription(description)}
          placeholder={trip.description} />
        <View style={styles.buttonLayout}>
          <Button color={"#54B435"} title="Save" onPress={EditTrip} />
          <Button color={"#E14D2A"} title="Delete" onPress={DeleteTrip} />
        </View>
        {error && <Text style={styles.textError}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  buttonLayout: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default EditTrip;