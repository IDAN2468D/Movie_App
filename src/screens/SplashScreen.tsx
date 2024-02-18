import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import LottieView from 'lottie-react-native'

const SplashScreen = ({ navigation }: any) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate("Onboarding");
        }, 6600);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <LottieView source={require("../assets/lottie/Popcorn.json")} loop autoPlay style={{ width: 300, height: 300, }} />
            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, fontSize: FONTSIZE.size_30, color: COLORS.Orange }}>MovieApp</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Black,
    },

})