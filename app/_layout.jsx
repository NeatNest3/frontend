import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { GlobalParamsProvider, useGlobalParams } from './../context/GlobalParamsContext';
import { useState, useEffect } from "react";
import { onAuthStateChangedListener } from '../firebase/firebaseAuth'; // Firebase auth listener
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors"; // Make sure your Colors constant is accessible

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useFonts({
    "Playfair": require("./../assets/fonts/Playfair_9pt-Regular.ttf"),
    "Playfair-Light": require("./../assets/fonts/Playfair_9pt-Light.ttf"),
    "Playfair-Bold": require("./../assets/fonts/Playfair_9pt-Bold.ttf"),
  });

  useEffect(() => {

    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);  
      setLoading(false); 
    });


    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIM_GOLD} /> 
      </View>
    );
  }

  console.log("User state:", user);

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIM_DARKGREEN, 
  },
});
