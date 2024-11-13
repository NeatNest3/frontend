import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { GlobalParamsProvider } from './../context/GlobalParamsContext';
import { useState, useEffect } from "react";
import { onAuthStateChangedListener } from '../firebase/firebaseAuth'; // Auth state change listener
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initially loading, until auth state is determined

  useFonts({
    "Playfair": require("./../assets/fonts/Playfair_9pt-Regular.ttf"),
    "Playfair-Light": require("./../assets/fonts/Playfair_9pt-Light.ttf"),
    "Playfair-Bold": require("./../assets/fonts/Playfair_9pt-Bold.ttf"),
  });

  useEffect(() => {
    // Initialize the auth state change listener
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);  // Update user state based on auth changes
      setLoading(false);  // Once Firebase state is checked, stop loading
    });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);


  // If still loading, display nothing or a loading spinner (you can customize this as needed)
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  console.log('User state: ', user);
  
  return (
    <GlobalParamsProvider>
      <Stack>
        {user ? (
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="LoginScreen"
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack>
    </GlobalParamsProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIM_DARKGREEN,
  },
});