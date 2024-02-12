import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';


const CastCard = (props: any) => {
    return (
        <View
            style={[
                styles.container,
                props.shoudlMarginatedAtEnd
                    ? props.isFirst
                        ? { marginLeft: SPACING.space_24 }
                        : props.isLast
                            ? { marginRight: SPACING.space_24 }
                            : {}
                    : {},
                { maxWidth: props.cardWidth },
            ]}>
            <Image source={{ uri: props.imagePate }} style={[styles.cardImage, { width: props.cardWidth }]} />
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            <Text numberOfLines={1} style={styles.subTitle}>{props.subtitle}</Text>
        </View>
    );
};

export default CastCard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    cardImage: {
        aspectRatio: 1920 / 2880,
        borderRadius: BORDERRADIUS.radius_25,
    },
    title: {
        alignSelf: "stretch",
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.White,
    },
    subTitle: {
        alignSelf: "stretch",
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.White,
    }
});
