import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [basicCount, setBasicCount] = useState(0);
  const [standardCount, setStandardCount] = useState(0);
  const [premiumCount, setPremiumCount] = useState(0);
  const [monthlyRegistrations, setMonthlyRegistrations] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [countriesData, setCountriesData] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    fetchUsers();
    fetchMonthlyRegistrations();
    fetchCountries();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.100.23:3001/users");
      if (response.status === 200) {
        const users = response.data;
        setUserData(users);
        setUserCount(users.length);
        countSubscriptions(users);
       
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get("http://192.168.100.23:3001/active-users");
        setActiveCount(response.data.length);
        console.log(activeCount);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchActiveUsers();
  }, []);

  const countSubscriptions = (users) => {
    let basic = 0;
    let standard = 0;
    let premium = 0;
    users.forEach((user) => {
      switch (user.plan) {
        case "Basic":
          basic++;
          break;
        case "Standard":
          standard++;
          break;
        case "Premium":
          premium++;
          break;
        default:
          break;
      }
    });
    setBasicCount(basic);
    setStandardCount(standard);
    setPremiumCount(premium);
    setSubscriptionData([basic, standard, premium]);
    
  };
  

  const fetchMonthlyRegistrations = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.23:3001/monthlyRegistrations"
      );
      if (response.status === 200) {
        setMonthlyRegistrations(response.data);
      }
    } catch (error) {
      console.error("Error fetching monthly registrations:", error);
    }
  };

  const processData = () => {
    const dataByMonth = {};

    for (let i = 1; i <= 12; i++) {
      dataByMonth[i] = 0;
    }

    monthlyRegistrations.forEach(({ month, count }) => {
      dataByMonth[month] = count;
    });

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const labels = monthNames.map((month) => month);
    const data = Object.values(dataByMonth);

    return { labels, data };
  };

  const chartData = {
    labels: processData().labels,
    datasets: [
      {
        label: "Registrations",
        data: processData().data,
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://192.168.100.23:3001/userCountries");
      if (response.status === 200) {
        const countries = response.data;
        setCountriesData({
          labels: countries.labels,
          data: countries.data,
        });
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const subscriptionChart = {
    labels: ["Basic", "Standard", "Premium"],
    datasets: [
      {
        data: subscriptionData,
        colors: [
          () => "rgba(255, 99, 132, 0.5)",
          () => "rgba(54, 162, 235, 0.5)",
          () => "rgba(255, 206, 86, 0.5)",
        ],
      },
    ],
  };

  const countryChart = {
    labels: countriesData.labels,
    datasets: [
      {
        data: countriesData.data,
        colors: [
          () => "rgba(255, 99, 132, 0.7)",
          () => "rgba(54, 162, 235, 0.7)",
          () => "rgba(255, 206, 86, 0.7)",
          () => "rgba(75, 192, 192, 0.7)",
          () => "rgba(153, 102, 255, 0.7)",
          () => "rgba(255, 159, 64, 0.7)",
        ],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.header}>Dashboard</Text> */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image source={require('./../../images/total-users.png')} style={styles.image} />
          <Text style={styles.cardText}>{userCount} Users</Text>
        </View>
        <View style={styles.card}>
          <Image source={require('./../../images/total-sub.png')} style={styles.image} />
          <Text style={styles.cardText}>{userCount} Subscriptions</Text>
        </View>
        <View style={styles.card}>
          <Image source={require('./../../images/active-users.png')} style={styles.image} />
          <Text style={styles.cardText}>{activeCount} Active</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Subscriptions</Text>
        <BarChart
          style={styles.chart}
          data={subscriptionChart}
          width={screenWidth - 40}
          height={300}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          formZero={true}
          withCustomBarColorFromData={true}
          flatColor={true}
          showBarTops={false}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Countries Data</Text>
        <PieChart
        style={styles.chart}
          data={countryChart.datasets[0].data.map((value, index) => ({
            name: countryChart.labels[index],
            population: value,
            color: countryChart.datasets[0].colors[index](),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          }))}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="white"
          paddingLeft="15"
          absolute
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Registrations</Text>
        <BarChart
          style={styles.chart}
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          formZero={true}
          withCustomBarColorFromData={true}
          flatColor={true}
          showBarTops={false}
        />
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  fillShadowGradient: '#FF493B', // THIS
  fillShadowGradientOpacity: 1, // THIS
  decimalPlaces: 0,
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F5FF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  card: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor:"white", 
    borderRadius:10,
    
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10
  },
  chart: {
    borderRadius: 10,
    backgroundColor: "white",
    
  },
});

export default AdminDashboard;
