import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar, FlatList } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { InputHeader, SubMovieCard } from '../components';
import { baseImagePath, searchMovies } from '../api/apicalls';

const { width, height } = Dimensions.get("screen");

const SearchScreen = ({ navigation }: any) => {
    const [searchList, setSearchList] = useState([]);

    const searchMoviesFunction = async (name: string) => {
        try {
            let response = await fetch(searchMovies(name));
            let json = await response.json()
            setSearchList(json.results)
        } catch (error) {
            console.log("Something went wrong in searchMoviesFunction", error)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View>
                <FlatList
                    data={searchList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item: any) => item.id}
                    numColumns={2}
                    bounces={false}
                    ListHeaderComponent={
                        <View style={styles.InputHeaderContainer}>
                            <InputHeader searchFunction={searchMoviesFunction} />
                        </View>
                    }
                    renderItem={({ item, index }) => (
                        <SubMovieCard
                            title={item.original_title}
                            imagePath={baseImagePath("w342", item.poster_path)}
                            shoudlMarginatedAtEnd={false}
                            shoudlMarginatedAdAround={true}
                            cardFunction={() => {
                                navigation.push("MovieDetails", { movieid: item.id })
                            }}
                            cardWidth={width / 2 - SPACING.space_12 * 2}
                        />
                    )}
                />
            </View>
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        width,
        alignItems: 'center',
        backgroundColor: COLORS.Black,
    },
    InputHeaderContainer: {
        display: "flex",
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_28,
        marginBottom: SPACING.space_16,
    },
});
