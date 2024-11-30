import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function History() {
  const router = useRouter();

  const onDashboardClick = (item) => {
    if (item.path) {  
      router.push(item.path);  
    }
  };

  const DashboardList = [
    {
      id: 1,
      name: 'Active Jobs',
      path: '/jobs/ActiveJobs',  
    },
    {
      id: 2,
      name: 'History',
      path: '/jobs/jobHistory',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={DashboardList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onDashboardClick(item)}  
            style={styles.touchables}
          >
            <Text style={styles.texts}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
  },
  touchables: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderBottomWidth: 0.5,
    gap: 25,
  },
  texts: {
    fontSize: 30,
    fontFamily: 'Playfair-Bold',
    textAlign: 'center',
  },
});
