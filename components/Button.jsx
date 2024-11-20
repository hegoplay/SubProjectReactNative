import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

const Button = ({name,size,color,style,onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View>
            <FontAwesome name={name} size={size} color={color}/>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default Button