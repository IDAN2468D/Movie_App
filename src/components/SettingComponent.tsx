import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomIcon } from '.'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

const SettingComponent = (props: any) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.container}>
            <View>
                <CustomIcon name={props.icon} style={styles.iconStyle} />
            </View>
            <View style={styles.settingsContainer}>
                <Text style={styles.title}>{props.heading}</Text>
                <Text style={styles.subtitle}>{props.subheading}</Text>
                <Text style={styles.subtitle}>{props.subtitle}</Text>
            </View>
            <View style={styles.iconBG}>
                <CustomIcon name={"arrow-right"} style={styles.iconStyle} />
            </View>
        </TouchableOpacity>
    )
}

export default SettingComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        paddingVertical: SPACING.space_20,
    },
    settingsContainer: {
        flex: 1,
    },
    iconStyle: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_24,
        paddingHorizontal: SPACING.space_20,
    },
    title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    subtitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.WhiteRGBA15,

    },
    iconBG: {
        justifyContent: 'center',
    }
})