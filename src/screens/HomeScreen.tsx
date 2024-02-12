import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, StatusBar, FlatList } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { upcomingMovies, newPlayingMovies, popularMovies, baseImagePath } from '../api/apicalls';
import { InputHeader, CategoryHeader, SubMovieCard, MovieCard } from '../components'

const { width, height } = Dimensions.get("window");

const getNowPlayingMoviesList = async () => {
    try {
        let response = await fetch(newPlayingMovies);
        let json = await response.json();
        return json;
    } catch (error) {
        console.log("Something went wrong in getNowPlayingMoviesList Function", error)
    }
}

const getUpcomingMoviesList = async () => {
    try {
        let response = await fetch(upcomingMovies);
        let json = await response.json();
        return json;
    } catch (error) {
        console.log("Something went wrong in getUpcomingMoviesList Function", error)
    }
}

const getPopularMoviesList = async () => {
    try {
        let response = await fetch(popularMovies);
        let json = await response.json();
        return json;
    } catch (error) {
        console.log("Something went wrong in getPopularMoviesList Function", error)
    }
}

const HomeScreen = ({ navigation }: any) => {
    const [nowPlayingMoviesList, setNewPlayingMoviesList] = useState<any>(undefined);
    const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
    const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

    useEffect(() => {
        (async () => {
            let tempNowPlaying = await getNowPlayingMoviesList();
            setNewPlayingMoviesList([{ id: "dummy1" }, ...tempNowPlaying.results, { id: "dummy2" }]);
            let tempPopular = await getPopularMoviesList();
            setPopularMoviesList(tempPopular.results);
            let tempUpcoming = await getUpcomingMoviesList();
            setUpcomingMoviesList(tempUpcoming.results);
        })()
    }, []);

    const searchMoviesFunction = () => {
        navigation.navigate("Search")
    }

    if (
        nowPlayingMoviesList == undefined &&
        nowPlayingMoviesList == null &&
        popularMoviesList == undefined &&
        popularMoviesList == null &&
        upcomingMoviesList == undefined &&
        upcomingMoviesList == null
    ) {
        return (
            <ScrollView
                style={styles.container}
                bounces={false}
                contentContainerStyle={styles.scrollViewContainer}
            >
                <StatusBar hidden />
                <View style={styles.InputHeaderContainer}>
                    <InputHeader searchFunction={searchMoviesFunction} />
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={"large"} color={COLORS.Orange} />
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView style={styles.container} bounces={false}>
            <StatusBar hidden />
            <View style={styles.InputHeaderContainer}>
                <InputHeader searchFunction={searchMoviesFunction} />
            </View>
            <CategoryHeader title={"Now Playing"} />
            <FlatList
                data={nowPlayingMoviesList}
                horizontal
                showsVerticalScrollIndicator={false}
                bounces={false}
                decelerationRate={0}
                snapToInterval={width * 0.7 + SPACING.space_36}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={styles.containerGap36}
                renderItem={({ item, index }) => {
                    if (!item.original_title) {
                        return (
                            <View style={{ width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2, }}></View>
                        )
                    }
                    return (
                        <MovieCard
                            title={item.original_title}
                            imagePath={baseImagePath("w780", item.poster_path)}
                            shoudlMarginatedAtEnd={true}
                            cardFunction={() => {
                                navigation.push("MovieDetails", { movieid: item.id })
                            }}
                            cardWidth={width * 0.7}
                            isFirst={index == 0 ? true : false}
                            isLast={index == nowPlayingMoviesList.length - 1 ? true : false}
                            genre={item.genre_ids.slice(1, 4)}
                            vote_average={item.vote_average}
                            vote_count={item.vote_count}
                        //shoudlMarginatedAdAround={true}
                        />
                    )
                }}
            />
            <CategoryHeader title={"Popular"} />
            <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={popularMoviesList}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={styles.containerGap36}
                renderItem={({ item, index }) => (
                    <SubMovieCard
                        title={item.original_title}
                        imagePath={baseImagePath("w342", item.poster_path)}
                        shoudlMarginatedAtEnd={true}
                        cardFunction={() => {
                            navigation.push("MovieDetails", { movieid: item.id })
                        }}
                        cardWidth={width / 3}
                        isFirst={index == 0 ? true : false}
                        isLast={index == popularMoviesList.length - 1 ? true : false}
                    />
                )}
            />
            <CategoryHeader title={"Upcoming"} />
            <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={upcomingMoviesList}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={styles.containerGap36}
                renderItem={({ item, index }) => (
                    <SubMovieCard
                        title={item.original_title}
                        imagePath={baseImagePath("w342", item.poster_path)}
                        shoudlMarginatedAtEnd={true}
                        cardFunction={() => {
                            navigation.push("MovieDetails", { movieid: item.id })
                        }}
                        cardWidth={width / 3}
                        isFirst={index == 0 ? true : false}
                        isLast={index == upcomingMoviesList.length - 1 ? true : false}
                        genre={item.genre_ids.slice(1, 4)}
                        vote_average={item.vote_average}
                        vote_count={item.vote_count}
                    />
                )}
            />
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: COLORS.Black,
    },
    scrollViewContainer: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    InputHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_28,
    },
    containerGap36: {
        gap: SPACING.space_20,
    }
});
