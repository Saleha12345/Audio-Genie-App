import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text,TouchableOpacity,Button, ScrollView, StyleSheet,Dimensions } from 'react-native';
import { Avatar, IconButton, Colors } from 'react-native-paper';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
const customColors = {
  blue: '#2196F3',
  green: '#4CAF50',
  yellow: '#FFEB3B',
  purple: '#9C27B0',
  red: '#F44336',
  orange: '#FF9800',
};

const getRandomColor = () => {
  const colors = [customColors.blue, customColors.green, customColors.yellow, customColors.purple];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const windowWidth = Dimensions.get('window').width;
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.100.23:3001/users');
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (email) => {
    try {
      const response = await axios.delete(`http://192.168.100.23:3001/users/${email}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user.email !== email));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const toggleUserStatus = async (email, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      const response = await axios.put(`http://10.113.70.36:3001/users/${email}/status/${newStatus}`);
      if (response.status === 200) {
        setUsers(users.map(user => user.email === email ? { ...user, status: newStatus } : user));
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const tableHead = ['Avatar', 'Name', 'Email', 'Subscription Plan', 'Action'];
  const tableData = users.map(user => [
    <View style={styles.avatarContainer}>
      <Avatar.Text
        size={40}
        label={user.username ? user.username.charAt(0) : '?'}
        style={{ backgroundColor: getRandomColor() }}
      />
    </View>,
    user.username || 'N/A',
    user.email || 'N/A',
    user.plan || 'N/A',
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: customColors.red }]}
        onPress={() => deleteUser(user.email)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: user.status === 'active' ? customColors.yellow : customColors.green }
        ]}
        onPress={() => toggleUserStatus(user.email, user.status)}
      >
        <Text style={styles.buttonText}>
          {user.status === 'active' ? 'Deactivate' : 'Activate'}
        </Text>
      </TouchableOpacity>
    </View>
  ]);
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.tableContainer}>
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.headerText}
              widthArr={[70, 140, 210, 130, 120]} // Adjust widthArr based on your content
            />
            <Rows
              data={tableData}
              textStyle={styles.text}
              widthArr={[70, 140, 210, 130, 120]} // Adjust widthArr based on your content
            />
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F5FF',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  head: {
    height: 90,
    backgroundColor: '#f1f8ff',
  },
  headerText: {
    margin: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  actionContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center', // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    width: windowWidth * 0.3, // 80% of the window width
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});

export default Users;
