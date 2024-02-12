import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { CustomIcon } from '.'

const genres: any = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "thriller",
    10752: "War",
    37: "Western"
}


const MovieCard = (props: any) => {
    return (
        <TouchableOpacity onPress={() => { }} activeOpacity={0.8}>
            <View
                style={[styles.container,
                props.shoudlMarginatedAtEnd
                    ? props.isFirst
                        ? { marginLeft: SPACING.space_36 }
                        : props.isLast
                            ? { marginRight: SPACING.space_36 }
                            : {}
                    : {},
                props.shoudlMarginatedAdAround ? { margin: SPACING.space_12 } : {},
                { maxWidth: props.cardWidth },
                ]}>
                <Image style={[styles.cardImage, { width: props.cardWidth }]} source={{ uri: props.imagePath }} />
                <View>
                    <View style={styles.rateContainer}>
                        <CustomIcon name='star' style={styles.starIcon} />
                        <Text style={styles.voteText}>{props.vote_average} ({props.vote_count})</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
                    <View style={styles.genreContainer}>
                        {
                            props.genre.map((item: any) => {
                                return (
                                    <View key={item} style={styles.genmreBox}>
                                        <Text style={styles.genreText}>{genres[item]}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MovieCard;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    cardImage: {
        aspectRatio: 2 / 3,
        borderRadius: BORDERRADIUS.radius_20,
    },
    textTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
        textAlign: "center",
        paddingVertical: SPACING.space_10,
    },
    rateContainer: {
        flexDirection: "row-reverse",
        gap: SPACING.space_10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.space_10,
    },
    starIcon: {
        fontSize: FONTSIZE.size_20,
        color: COLORS.Yellow,
    },
    voteText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    genreContainer: {
        flex: 1,
        flexDirection: "row-reverse",
        gap: SPACING.space_20,
        flexWrap: "wrap",
        justifyContent: 'center',
    },
    genmreBox: {
        borderColor: COLORS.WhiteRGBA50,
        borderWidth: 1,
        paddingVertical: SPACING.space_4,
        paddingHorizontal: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_20,
    },
    genreText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.WhiteRGBA75,
    }
})