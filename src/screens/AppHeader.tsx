//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomIcon } from '../components';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

// create a component
const AppHeader = (props: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
                <CustomIcon name={props.name} style={styles.iconStyle} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{props.header}</Text>
            <View style={styles.emptyContainer}></View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // display: "flex",
        // flex: 1,
        flexDirection: "row-reverse",
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_24,
    },
    headerText: {
        flex: 1,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        textAlign: "center",
        color: COLORS.White,
    },
    emptyContainer: {
        height: SPACING.space_20 * 2,
        width: SPACING.space_20 * 2,
    },
    iconBG: {
        height: SPACING.space_18 * 2,
        width: SPACING.space_18 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.Orange,
    }
});

//make this component available to the app
export default AppHeader;
