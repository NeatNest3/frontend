import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useGlobalParams } from "./../context/GlobalParamsContext";
import { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "../constants/Colors";


export default function RootLayout() {
  
  const  {globalParams}  = useGlobalParams(); 

  const router = useRouter()
  
  console.log(globalParams)

  const user = globalParams.user

  const [fontsLoaded] = useFonts({
    Playfair: require("./../assets/fonts/Playfair_9pt-Regular.ttf"),
    "Playfair-Light": require("./../assets/fonts/Playfair_9pt-Light.ttf"),
    "Playfair-Bold": require("./../assets/fonts/Playfair_9pt-Bold.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);

  console.log("User:", user)

  useEffect(() => {
    if (fontsLoaded) {
      setIsLoading(false); 
    }
  }, [fontsLoaded]);

  useEffect(() => {

     
    if (!isLoading) {
     
      if (user === null) {

        router.push("/LoginScreen"); 
      } else {
        router.push("/home"); 
      }
    }
  }, [isLoading, user, router]); 

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIM_GOLD} />
      </View>
    );
  }

  if (!isLoading) {
    if (user) {

    }
  }

  return (
      <Stack>
        {!user ? (
          <Stack.Screen
            name="LoginScreen"
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack>
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