import React, { useRef } from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import Onboarding, { Page } from 'react-native-onboarding-swiper';
import { OnboardingGradient, useMovieLists } from '../components';
import { baseImagePath } from '../api/apicalls';
import { COLORS } from '../theme/theme';

const OnboardingScreen = ({ navigation }: any) => {
    const { nowPlayingMoviesList } = useMovieLists();
    const onboardingRef = useRef<Onboarding>(null);
    const navigateToHome = () => {
        navigation.navigate('Tab')
    };

    const renderOnboardingImage = (index: number) => {
        if (nowPlayingMoviesList && nowPlayingMoviesList.length > index) {
            return (
                <OnboardingGradient
                    imagePath={baseImagePath("w780", nowPlayingMoviesList[index]?.poster_path)}
                    title={nowPlayingMoviesList[index]?.title}
                    subtitle={nowPlayingMoviesList[index]?.overview}
                />
            );
        }
        return <></>;
    };

    const onboardingPages: Page[] = [
        {
            backgroundColor: '#000000',
            image: renderOnboardingImage(1),
            title: renderOnboardingImage(nowPlayingMoviesList?.[1]?.title ?? 'Fallback Title'),
            subtitle: renderOnboardingImage(nowPlayingMoviesList?.[1]?.overview ?? "Fallback SubTitle"),
        },
        {
            backgroundColor: '#000000',
            image: renderOnboardingImage(2),
            title: renderOnboardingImage(nowPlayingMoviesList?.[2]?.title ?? 'Fallback Title'),
            subtitle: renderOnboardingImage(nowPlayingMoviesList?.[2]?.overview ?? "Fallback SubTitle"),
        },
        {
            backgroundColor: '#000000',
            image: renderOnboardingImage(3),
            title: renderOnboardingImage(nowPlayingMoviesList?.[3]?.title ?? 'Fallback Title'),
            subtitle: renderOnboardingImage(nowPlayingMoviesList?.[3]?.overview ?? "Fallback SubTitle"),
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar translucent hidden={false} backgroundColor="transparent" />
            <Onboarding
                ref={onboardingRef}
                pages={onboardingPages}
                onDone={navigateToHome}
                onSkip={navigateToHome}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default OnboardingScreen;
