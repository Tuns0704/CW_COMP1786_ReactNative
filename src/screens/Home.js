import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Button, Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { getTrips } from "../services/db-service";
import TripListItem from '../components/TripListItem';
import { useDbContext } from "../context/DbContext";

const Home = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const db = useDbContext();

  useLayoutEffect(
    function () {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.buttonLayout}>
            <Button
              color="#54B435"
              onPress={() => navigation.navigate("AddTrip")}
              title="Add Trip"
            />
            <Button
              color="#E14D2A"
              onPress={() => navigation.navigate("AddTrip")}
              title="Remove Trips"
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

  const handleOnPress = (tripId) => {
    navigation.navigate("DetailTrip", tripId);
  }

  if (error) {
    return <Text>{error.message}</Text>
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.list}>
        <FlatList
          data={trips}
          renderItem={({ item }) => (
            <TripListItem
              trip={item}
              onPress={() => handleOnPress({ tripId: item.id })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginRight: 15,
  },
  addButton: {
    flex: 0,
    backgroundColor: '#7DE5ED',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  list: {
    flex: 1,
    width: "100%",
  },
});

export default Home;
