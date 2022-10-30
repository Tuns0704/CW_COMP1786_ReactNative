import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, TextInput, Button, Alert } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';
import { insertTrip } from '../services/db-service';
import { useDbContext } from "../context/DbContext";
import { ScrollView } from 'react-native-gesture-handler';

const AddTrip = ({ navigation }) => {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [risk, setRisk] = useState('No');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const db = useDbContext();

  async function AddTrip() {
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
      await insertTrip(db, name, destination, date, risk, description);
      Alert.alert(
        'Success',
        'Add Trip successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ],
        { cancelable: false }
      );
    } catch (e) {
      setError(`An error occurred while adding the Trip: ${e.message}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input}
          onChangeText={name => setName(name)}
          placeholder="Trip Name" />
        <Text style={styles.label}>Destination</Text>
        <TextInput style={styles.input}
          onChangeText={destination => setDestination(destination)}
          placeholder="Trip Destination" />
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input}
          onChangeText={date => setDate(date)}
          placeholder="Trip Date" />
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
          placeholder="Trip Destination" />
        <Button title="Add Trip" onPress={AddTrip} />
        {error && <Text style={styles.textError}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
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

export default AddTrip;