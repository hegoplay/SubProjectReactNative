import React from 'react'
import { Text, View } from 'react-native'
import Button from './Button'

const COLORS = {
    like: "#00eda6",
    nope: "#ff006f",
    star:"#07A6FF"
}

const Footer = () => {
  return (
    <View style ={{
        position:"absolute",
        bottom: 15,
        width: 240,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
        zIndex: -999
    }}>
        <Button
            name = "times"
            size={24}
            color={COLORS.nope}
        />
        <Button
            name = "star"
            size={24}
            color={COLORS.star}
        />
        <Button
            name = "heart"
            size={24}
            color={COLORS.like}
        />
    </View>
  )
}

export default Footer