import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import restaurantsData from './Restaurant.json';
import { useNavigation } from '@react-navigation/native';

const FetchData = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    setRestaurants(restaurantsData.restaurants);
  }, []);

  return (
    <View style={styles.container}>
          <View style={styles.header}>
        <TouchableOpacity style={styles.backArrowContainer}  onPress={() => navigation.navigate('HomePage')}>
          <Icon name="arrow-left" size={24} color="white"  />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Restaurants</Text>
      </View>
      <View style={styles.table}>
      <View style={[styles.row,styles.border]}>
        <Text style={styles.columnHeader}>Name</Text>
        <Text style={styles.columnHeader}>Address</Text>
        <Text style={styles.columnHeader}>Cuisine</Text>
        <Text style={styles.columnHeader}>Rating</Text>
      </View>
      {restaurants.map((restaurant, index) => (
        <View style={[styles.row, styles.border]} key={index}>
          <Text style={styles.column}>{restaurant.name}</Text>
          <Text style={styles.column}>{restaurant.address}</Text>
          <Text style={styles.column}>{restaurant.cuisine}</Text>
          <Text style={styles.column}>{restaurant.rating}</Text>
        </View>
      
      ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  header: {
    backgroundColor: '#ED6474',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backArrowContainer: {
    position: 'absolute',
    left: 16,
    top: 45,
    borderRadius: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  table:{
    paddingTop:30,
    paddingHorizontal:20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 8,
  },

});

export default FetchData;