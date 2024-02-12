import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';


const InputHeader = (props: any) => {
    const [searchText, onChangeText] = useState<string>("")
    return (
        <View style={styles.inputBox}>
            <TextInput
                style={styles.textInput}
                value={searchText}
                onChangeText={textInput => onChangeText(textInput)}
                placeholder='Search your Movies...'
                placeholderTextColor={COLORS.WhiteRGBA32}
            />
            <TouchableOpacity style={styles.searchIcon} onPress={() => props.searchFunction(searchText)}>
                <CustomIcon name='search' color={COLORS.Orange} size={FONTSIZE.size_20} />
            </TouchableOpacity>
        </View>
    );
};

export default InputHeader;

const styles = StyleSheet.create({
    inputBox: {
        display: "flex",
        paddingVertical: SPACING.space_8,
        paddingHorizontal: SPACING.space_24,
        borderWidth: 2,
        borderColor: COLORS.WhiteRGBA15,
        borderRadius: BORDERRADIUS.radius_25,
        flexDirection: "row-reverse"
    },
    textInput: {
        width: "90%",
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    searchIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.space_10,
    }
});
