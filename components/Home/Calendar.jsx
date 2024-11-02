import { View, Text } from "react-native";
import React, { useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Colors } from "../../constants/Colors";

export default function HomeCalendar() {
  const [selected, setSelected] = useState("");

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
          console.log("selected day", day);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            dotColor: Colors.PRIM_DARKGREEN,
          },
        }}
      />
    </View>
  );
}
