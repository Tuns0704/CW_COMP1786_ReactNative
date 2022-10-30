import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Button, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { getTrips } from "../services/db-service";
import TripListItem from '../components/TripListItem';
import { useDbContext } from "../context/DbContext";

export default function Home({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const db = useDbContext();

  useLayoutEffect(
    function () {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.buttonLayout}>
            <Button
              color="black"
              onPress={() => navigation.navigate("AddTrip")}
              title="Delete All"
            />
          </View>
        )
      })
    }, [navigation]
  );

  const focusEffect = useCallback(function () {
    async function fetchData() {
      try {
        const trips = await getTrips(db);
        setTrips(trips);
      } catch (e) {
        setError(`An error occurred while retrieving the trips: ${e.message}`);
      }
    }
    fetchData();
  }, [db]);
  useFocusEffect(focusEffect);

  if (error) {
    return <Text>{error.message}</Text>
  }
  return (
    <View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddTrip")}>
        <Text> + </Text>
      </TouchableOpacity>
      <FlatList style={styles.flatList}
        data={trips}
        renderItem={({ item }) => <TripListItem trip={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
  },
  buttonLayout: {
    marginRight: 15,
  },
  addButton: {
    flex: 1,
    backgroundColor: 'lightblue',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});