import React from 'react';
import { View, ScrollView, StatusBar, FlatList, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { InputHeader, CategoryHeader, SubMovieCard, MovieCard } from '../components';
import useMovieLists from '../components/useMovieLists';
import { baseImagePath } from '../api/apicalls';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }: any) => {
    const { nowPlayingMoviesList, popularMoviesList, upcomingMoviesList } = useMovieLists();

    const searchMoviesFunction = () => {
        navigation.navigate("Search")
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
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    scrollViewContainer: {
        flexGrow: 1,
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
