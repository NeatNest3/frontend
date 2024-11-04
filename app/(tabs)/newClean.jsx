import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import NewCleanForm from "./../../components/NewClean/NewCleanForm"
import Header from "../../components/NewClean/Header";

const newClean = () => {
  return (
      <ScrollView>
        <Header />
        <NewCleanForm />
      </ScrollView>
  );
};

export default newClean;
