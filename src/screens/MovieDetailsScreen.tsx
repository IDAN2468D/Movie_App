import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, StatusBar, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native';
import { baseImagePath, movieDetails, moviecastDetails } from '../api/apicalls';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { AppHeader } from '.';
import LinearGradient from 'react-native-linear-gradient';
import { ButtonBG, CastCard, CategoryHeader, CustomIcon } from '../components';

const getMovieDetails = async (movieid: number) => {
    //console.log(movieDetails(movieid))
    try {
        let response = await fetch(movieDetails(movieid));
        let json = await response.json();
        return json;
    } catch (error) {
        console.log("Something Went Wrong in getMoviecastDetails Function", error);
    }
}

const getMoviecastDetails = async (movieid: number) => {
    console.log(moviecastDetails(movieid))
    try {
        let response = await fetch(moviecastDetails(movieid));
        let json = await response.json();
        return json;
    } catch (error) {
        console.log("Something Went Wrong in getMoviecastDetails Function", error);
    }
}


const MovieDetailsScreen = ({ navigation, route }: any) => {
    const [movieData, setMovieData] = useState<any>(undefined);
    const [movieCastDetails, setMoviecastDetails] = useState<any>(undefined);
    console.log(movieData, movieCastDetails)

    useEffect(() => {
        (async () => {
            const tempMovieData = await getMovieDetails(route.params.movieid)
            setMovieData(tempMovieData);
        })();

        (async () => {
            const tempMoviecastDetails = await getMoviecastDetails(route.params.movieid)
            setMoviecastDetails(tempMoviecastDetails.cast);
        })();

    }, []);

    if (
        movieData == undefined &&
        movieData == null &&
        movieCastDetails == undefined &&
        movieCastDetails == null
    ) {
        return (
            <ScrollView
                bounces={false}
                style={styles.container}
                contentContainerStyle={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.appHeaderContainer}>
                    <AppHeader name="close" header={"Movie Details"} action={() => navigation.goBack()} />
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={"large"} color={COLORS.Orange} />
                </View>
            </ScrollView>
        )
    }


    return (
        <ScrollView
            bounces={false}
            style={styles.container}
            //contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}>
            <StatusBar hidden />
            <View>
                <ImageBackground style={styles.imageBG} source={{ uri: baseImagePath("w780", movieData?.backdrop_path) }}>
                    <LinearGradient colors={[COLORS.BlackRGB10, COLORS.Black]} style={styles.linearGradient}>
                        <View style={styles.appHeaderContainer}>
                            <AppHeader name="close" header={movieData?.original_title} action={() => navigation.goBack()} />
                        </View>
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.imageBG}></View>
                <Image source={{ uri: baseImagePath("w342", movieData?.poster_path) }} style={styles.cardImage} />
            </View>
            <View style={styles.timeContainer}>
                <CustomIcon name='clock' style={styles.clockIcon} />
                <Text style={styles.runtimeText}>
                    {Math.floor(movieData?.runtime / 60)}h{""}
                    {Math.floor(movieData?.runtime % 60)}m
                </Text>
            </View>
            <View>
                <Text style={styles.title}>{movieData?.original_title}</Text>
                <View style={styles.genreContainer}>
                    {movieData?.genres.map((item: any) => {
                        return (
                            <View style={styles.genreBox} key={item.id}>
                                <Text style={styles.genreText}>{item.name}</Text>
                            </View>
                        )
                    })}
                </View>
                <Text style={styles.tagline}>{movieData?.tagline}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.reteContainer}>
                    <CustomIcon name='star' style={styles.starIcon} />
                    <Text style={styles.runtimeText}>
                        {movieData?.vote_average.toFixed(1)}({movieData?.vote_count})
                    </Text>
                    <Text style={styles.runtimeText}>
                        {movieData?.release_date.substring(8, 10)}
                        {" "}
                        {new Date(movieData?.release_date).toLocaleDateString("default", {
                            month: "long",
                        })} {movieData?.release_date.substring(0, 4)}
                    </Text>
                </View>
                <Text style={styles.descriptionText}>{movieData?.overview}</Text>
            </View>
            <CategoryHeader title="Top Cast" />
            <FlatList
                data={movieCastDetails}
                keyExtractor={(item: any) => item.id}
                horizontal
                contentContainerStyle={styles.containerGap24}
                renderItem={({ item, index }) => (
                    <CastCard
                        shoudlMarginatedAtEnd={true}
                        cardWidth={80}
                        isFirst={index == 0 ? true : false}
                        isLast={index == movieCastDetails.length - 1 ? true : false}
                        imagePate={baseImagePath("w185", item.profile_path)}
                        title={item.original_name}
                        subtitle={item.character}
                    />
                )}
            />
            <ButtonBG
                buttonBG={{
                    alignItems: 'center',
                    marginVertical: SPACING.space_24,
                }}
                TextBG={{
                    borderRadius: BORDERRADIUS.radius_25 * 2,
                    paddingHorizontal: SPACING.space_24,
                    paddingVertical: SPACING.space_10,
                    backgroundColor: COLORS.Orange,
                    fontFamily: FONTFAMILY.poppins_medium,
                    fontSize: FONTSIZE.size_14,
                    color: COLORS.White
                }}
                onPress={() => {
                    navigation.push("SeatBooking", {
                        BGImage: baseImagePath("w780", movieData.backdrop_path),
                        PosterImage: baseImagePath("original", movieData?.poster_path)
                    })
                }}
            />
        </ScrollView>
    );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    loadingContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        flex: 1,
    },
    appHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_20 * 2,
    },
    imageBG: {
        width: "100%",
        aspectRatio: 3072 / 1727,
    },
    linearGradient: {
        height: "100%",
    },
    cardImage: {
        width: "60%",
        aspectRatio: 200 / 300,
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
    },
    clockIcon: {
        fontSize: FONTSIZE.size_18,
        color: COLORS.WhiteRGBA50,
        marginLeft: SPACING.space_8,
    },
    timeContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SPACING.space_15,
    },
    runtimeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
        marginHorizontal: SPACING.space_36,
        marginVertical: SPACING.space_15,
        textAlign: "center",
    },
    genreContainer: {
        flex: 1,
        flexDirection: "row-reverse",
        gap: SPACING.space_24,
        flexWrap: "wrap",
        justifyContent: 'center',
    },
    genreBox: {
        borderColor: COLORS.WhiteRGBA50,
        borderWidth: 1,
        paddingHorizontal: SPACING.space_10,
        paddingVertical: SPACING.space_4,
        borderRadius: BORDERRADIUS.radius_25,
    },
    genreText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.WhiteRGBA75,
    },
    tagline: {
        fontFamily: FONTFAMILY.poppins_thin,
        fontSize: FONTSIZE.size_14,
        fontStyle: "italic",
        color: COLORS.White,
        marginHorizontal: SPACING.space_36,
        marginVertical: SPACING.space_15,
        textAlign: "center"
    },
    infoContainer: {
        marginHorizontal: SPACING.space_24,
    },
    reteContainer: {
        flexDirection: "row-reverse",
        gap: SPACING.space_10,
        alignItems: 'center',

    },
    starIcon: {
        fontSize: FONTSIZE.size_20,
        color: COLORS.Yellow,
    },
    descriptionText: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    containerGap24: {
        gap: SPACING.space_24
    }
});
