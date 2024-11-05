import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomHeaderLeftBack from "../components/CustomHeaderLeftBack";

const EditProfile = ({navigation}) => {

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft: () => <CustomHeaderLeftBack/>
    })
  })

  return (
    <ScrollView>
      
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({

})