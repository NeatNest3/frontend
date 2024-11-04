import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const FilteredCleaners = () => {
  const router = useRouter();
  const { date, time, rooms } = router.params || {};              // Go to an empty object to avoid undefined errors

  console.log('Received Params:', { date, time, rooms });         // Logs the data pushed in param

  if (!rooms) {
    return <Text>No rooms selected.</Text>;                       // Text to display in no rooms are selected
  }

  // Sample data for cleaners
  const cleanersList = [
    { id: 'cleaner1', name: 'Alice', specialties: ['kitchen', 'bathroom'] },
    { id: 'cleaner2', name: 'Bob', specialties: ['bedroom'] },
    { id: 'cleaner3', name: 'Charlie', specialties: ['living_room', 'laundry'] },
  ];

  
  // Filter cleaners based on selected rooms
  const filteredCleaners = cleanersList.filter(cleaner =>
    cleaner.specialties.some(specialty => rooms.includes(specialty))
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Available Cleaners</Text>
      <Text style={{ fontSize: 18 }}>Selected Date: {date ? new Date(date).toLocaleDateString() : 'N/A'}</Text>
      <Text style={{ fontSize: 18 }}>Selected Time: {time || 'N/A'}</Text>
      <Text style={{ fontSize: 18 }}>Selected Rooms: {rooms.join(', ')}</Text>

      <FlatList
        data={filteredCleaners}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FilteredCleaners;