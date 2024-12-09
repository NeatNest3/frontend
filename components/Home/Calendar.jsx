import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { Colors } from "../../constants/Colors";
import { activeClean } from "../../data"; 

export default function HomeCalendar() {
  const [selected, setSelected] = useState("");
  const [markedDates, setMarkedDates] = useState({});

  
  useEffect(() => {
    const newMarkedDates = {};

    activeClean.forEach((job) => {
      const formattedDate = `2024-${job.date.replace("-", "-")}`; 

      if (job.status === "active" || job.status === "in progress" || job.status === "complete") {
        newMarkedDates[formattedDate] = {
          marked: true, 
          dotColor: job.status === "active" ? Colors.PRIM_DARKGREEN : job.status === "in progress" ? Colors.PRIM_GOLD : "red", 
        };
      }
    });

    setMarkedDates(newMarkedDates);
  }, []); 

  return (
    <View>
      <Calendar
      theme={{
        textDayFontFamily: 'Playfair',
        textMonthFontFamily: 'Playfair-Bold',
        textDayFontSize:16,
        textMonthFontSize:22,
      }}
        horizontal={true}
        onDayPress={(day) => {
          setSelected(day.dateString); 
          console.log("selected day", day);
        }}
        markedDates={{
          ...markedDates,
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
