import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';


const CategoryHeader = (props: any) => {
    return (
        <Text style={styles.text}>{props.title}</Text>
    );
};

export default CategoryHeader;

const styles = StyleSheet.create({
    text: {
        fontFamily: FONTFAMILY.poppins_extrabold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.White,
        paddingHorizontal: SPACING.space_36,
        paddingVertical: SPACING.space_28,
    }
});
