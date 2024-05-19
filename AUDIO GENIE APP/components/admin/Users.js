import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
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
      const response = await axios.put(`http://192.168.100.23:3001/users/${email}/status/${newStatus}`);
      if (response.status === 200) {
        setUsers(users.map(user => user.email === email ? { ...user, status: newStatus } : user));
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const tableHead = ['Avatar', 'Name', 'Email', 'Subscription Plan', 'Action'];
  const tableData = users.map(user => [
    <Avatar.Text size={36} label={user.username.charAt(0)} style={{ backgroundColor: getRandomColor() }} />,
    user.username,
    user.email,
    user.plan,
    <View style={styles.actionContainer}>
      <IconButton icon="delete" color={customColors.red} onPress={() => deleteUser(user.email)} />
      <IconButton icon="block" color={user.status === 'active' ? customColors.yellow : customColors.green} onPress={() => toggleUserStatus(user.email, user.status)} />
    </View>
  ]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Users</Text>
      <View style={styles.tableContainer}>
        <Table borderStyle={styles.tableBorder}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F5FF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
});

export default Users;
