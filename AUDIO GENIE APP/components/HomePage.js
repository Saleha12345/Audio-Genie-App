import React, { useState, useEffect }  from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
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
  const { signupDetails } = useUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(signupDetails.email)
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
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
       <Text style={styles.title}>Welcome to AudioGenie</Text>


<Carousel
     data={data}
     renderItem={renderItem}
     sliderWidth={300}
     itemWidth={300}
     layout="default"
     sliderHeight={400} // Set carousel height
     itemHeight={300} // Set card height
     onSnapToItem={(index) => setActiveIndex(index)} 
    />
<Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      
      <Text style={styles.recent}>
        Recent Files
      </Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerItem}>Filetype</Text>
          <Text style={styles.headerItem}>Name</Text>
          <Text style={styles.headerItem}>Size</Text>
          <Text style={styles.headerItem}>Date</Text>
        </View>
        
        {files.map((file, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.rowItem}>{file.type}</Text>
            <Text style={styles.rowItem}>{file.name}</Text>
            <Text style={styles.rowItem}>{calculateFileSize(file.content).toFixed(2)} KB</Text>
            <Text style={styles.rowItem}>{file.date}</Text>
          </View>
        ))}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color
    marginBottom:0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0040B5', // Primary color
    marginTop:40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#0040B5', // Primary color
    marginBottom: 20,
    marginTop:20,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginHorizontal: 10,
    paddingHorizontal:10,
    marginTop: 20,
    color: '#333', // Description color
  },
  recent: {
    color:'#0040B5',
    fontSize:20,
    textAlign:'left',
    fontWeight:'bold',
    marginTop:100,
    right:100,

  },
  tableContainer: {
    marginTop: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '95%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,

    marginBottom: 20,
    alignItems: 'center',
    height:500,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    padding:5,
    marginBottom:20,
  },
  paginationContainer: {
    paddingVertical: 10,
    marginTop: -90,
    
  

  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#ffffff',
    marginTop:27,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    
  },
  headerItem: {
    flex: 1,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    color:'black'
  },
  tableRow: {
    flexDirection: 'row',
    
  },
  rowItem: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
  },
});
export default HomePage;
