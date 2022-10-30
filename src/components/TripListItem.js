import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function TripListItem({ trip, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>Name: {trip.name}</Text>
        <Text style={styles.destination}>Destination: {trip.destination}</Text>
        <Text style={styles.date}>Date: {trip.date}</Text>
        <Text style={styles.riskRequired}>Risk Assessment: {trip.riskAssessment}</Text>
        <Text style={styles.description}>Description: {trip.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    paddingBottom: 5,
  },
  destination: {
    fontSize: 14,
  },
  date: {
    position: 'absolute',
    right: 20,
    top: 20,
    fontSize: 18,
  },
  riskRequired: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
  },
})