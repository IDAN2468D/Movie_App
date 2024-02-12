import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { AppHeader } from '.';
import { Image } from 'react-native';
import { SettingComponent } from '../components';

const UserAccountScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.appHeaderContainer}>
                <AppHeader name="close" header={""} action={() => navigation.goBack()} />
            </View>
            <View style={styles.profileContainer}>
                <Image source={require("../assets/image/avatar.png")} style={styles.avatarImage} />
                <Text style={styles.avatarText}>Idan Kazam</Text>
            </View>
            <ScrollView style={styles.appHeaderContainer}>
                <SettingComponent
                    icon="user"
                    heading="Account"
                    subheading="Edit Profile"
                    subtitle="Change Password"
                />
                <SettingComponent
                    icon="setting"
                    heading="Settings"
                    subheading="Theme"
                    subtitle="Permissions"
                />
                <SettingComponent
                    icon="dollar"
                    heading="Offers & Referrals"
                    subheading="Offer"
                    subtitle="Referrals"
                />
                <SettingComponent
                    icon="info"
                    heading="About"
                    subheading="About Movies"
                    subtitle="more"
                />
            </ScrollView>
        </View>
    );
};

export default UserAccountScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    appHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_20 * 2,
    },
    profileContainer: {
        alignItems: 'center',
        padding: SPACING.space_36,
    },
    avatarText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        marginTop: SPACING.space_16,
        color: COLORS.White,
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 80,
    },
});
