import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonBG = (props: any) => {
    return (
        <TouchableOpacity style={props.buttonBG} onPress={props.onPress}>
            <Text style={props.TextBG}>Select Seats</Text>
        </TouchableOpacity>
    )
}

export default ButtonBG;