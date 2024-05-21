// HomePage.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useUser } from "./UserContext";
import axios from 'axios';

const data = [
  {
    image: require("../images/card1.png"),
    title: "Speech Separation",
    description: "Isolate individual speakers in mixed audio files"
  },
  {
    image: require("../images/card2.png"),
    title: "Speech Analysis & Mute",
    description: "Analyze voice characteristics"
  },
  {
    image: require("../images/card3.png"),
    title: "Audio Search",
    description: "Efficiently search for keyword."
  }
];

const HomePage = () => {
  const { signupDetails, theme, fontSize } = useUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://192.168.100.23:3001/getFiles', {
          email: signupDetails.email
        });
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchData();
  }, [signupDetails.email]);

  const calculateFileSize = (content) => {
    const sizeInBytes = content.length * (3 / 4);
    return sizeInBytes / 1024; // Convert bytes to kilobytes
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, theme === "dark" && styles.darkCard]}>
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.cardTitle, { color: theme === "dark" ? "#FFF" : "#000" }]}>{item.title}</Text>
      <Text style={[styles.description, { color: theme === "dark" ? "#FFF" : "#000" }]}>{item.description}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, theme === "dark" && styles.darkContainer]} contentContainerStyle={{ alignItems: 'center' }}>
      <Text style={[styles.title, { color: theme === "dark" ? "#FFF" : "#000", fontSize: fontSize === "small" ? 14 : fontSize === "medium" ? 18 : 22 }]}>
        Welcome to AudioGenie
      </Text>
      <Carousel 
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={[styles.paginationDot, { backgroundColor: theme === "dark" ? "#FFF" : "#0040B5" }]}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <Text style={[styles.recent, { color: theme === "dark" ? "#FFF" : "#0040B5", fontSize: fontSize === "small" ? 14 : fontSize === "medium" ? 18 : 22 }]}>
        Recent Files
      </Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.tableContentContainer}>
        <View style={[styles.tableContainer, theme === "dark" && styles.darkTableContainer]}>
          <View style={[styles.tableHeader, theme === "dark" && styles.darkTableHeader]}>
            <Text style={[styles.headerItem, { color: theme === "dark" ? "#FFF" : "black" }]}>Filetype</Text>
            <Text style={[styles.headerItem, { color: theme === "dark" ? "#FFF" : "black" }]}>Name</Text>
            <Text style={[styles.headerItem, { color: theme === "dark" ? "#FFF" : "black" }]}>Size</Text>
            <Text style={[styles.headerItem, { color: theme === "dark" ? "#FFF" : "black" }]}>Date</Text>
          </View>
          {files && files.length > 0 ? (
            files.map((file, index) => (
              <View style={[styles.tableRow, theme === "dark" && styles.darkTableRow]} key={index}>
                <Text style={[styles.rowItem, { color: theme === "dark" ? "#FFF" : "#333" }]}>{file.type}</Text>
                <Text style={[styles.rowItem, { color: theme === "dark" ? "#FFF" : "#333" }]}>{file.name}</Text>
                <Text style={[styles.rowItem, { color: theme === "dark" ? "#FFF" : "#333" }]}>{calculateFileSize(file.content).toFixed(2)} KB</Text>
                <Text style={[styles.rowItem, { color: theme === "dark" ? "#FFF" : "#333" }]}>{file.date}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noFilesContainer}>
              <Text style={[styles.noFilesText, { color: theme === "dark" ? "#FFF" : "#333" }]}>No recent files</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0040B5',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    color: '#333',
  },
  recent: {
    color: '#0040B5',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  tableContentContainer: {
    paddingHorizontal: 20,
  },
  tableContainer: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  darkTableContainer: {
    backgroundColor: '#444',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    width: Dimensions.get('window').width * 0.8,
  },
  darkCard: {
    backgroundColor: '#555',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#0040B5',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  darkTableHeader: {
    backgroundColor: '#555',
  },
  headerItem: {
    flex: 1,
    fontWeight: 'bold',
    paddingVertical: 15,
    textAlign: 'center',
    color: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkTableRow: {
    borderBottomColor: '#666',
  },
  rowItem: {
    flex: 1,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#333',
  },
  noFilesContainer: {
    alignItems: 'center',
    padding: 20,
  },
  noFilesText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomePage;
