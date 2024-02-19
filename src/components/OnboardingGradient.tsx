import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../theme/theme';


const OnboardingGradient = (props: any) => {
    return (
        <View>
            <ImageBackground
                source={{ uri: props.imagePath }}
                style={styles.backgroundImage}
            >
                <LinearGradient
                    colors={[COLORS.BlackRGB10, COLORS.Black]}
                    style={styles.linearGradient}
                    start={{ x: 2.5, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.title}>{props.title}</Text>
                    <Text style={styles.subtitle}>{props.subtitle}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

export default OnboardingGradient;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 30,
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
    },
});