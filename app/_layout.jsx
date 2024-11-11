import { Stack } from "expo-router";
import { Colors } from "./../constants/Colors";
import { useFonts } from "expo-font";
import { GlobalParamsProvider } from './../context/GlobalParamsContext'

export default function RootLayout() {
  useFonts({
    "Playfair": require("./../assets/fonts/Playfair_9pt-Regular.ttf"),
    "Playfair-Light": require("./../assets/fonts/Playfair_9pt-Light.ttf"),
    "Playfair-Bold": require("./../assets/fonts/Playfair_9pt-Bold.ttf"),
  });

  return (
    <GlobalParamsProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GlobalParamsProvider>
  );
}
