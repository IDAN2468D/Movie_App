import * as React from 'react';
import { HomeScreen, SearchScreen, TicketScreen, UserAccountScreen, } from '../screens';
import { COLORS, SPACING, FONTSIZE } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.Black,
                    borderTopWidth: 0,
                    height: SPACING.space_10 * 10,
                },
            }}>
            <Tab.Screen
                name="User"
                component={UserAccountScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <View style={[styles.activeTabBackground, focused ? { backgroundColor: COLORS.Orange } : {}]}>
                            <CustomIcon name='user' color={COLORS.White} size={FONTSIZE.size_30} />
                        </View>
                    }
                }}
            />
            <Tab.Screen
                name="Ticket"
                component={TicketScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <View style={[styles.activeTabBackground, focused ? { backgroundColor: COLORS.Orange } : {}]}>
                            <CustomIcon name='ticket' color={COLORS.White} size={FONTSIZE.size_30} />
                        </View>
                    }
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <View style={[styles.activeTabBackground, focused ? { backgroundColor: COLORS.Orange } : {}]}>
                            <CustomIcon name='search' color={COLORS.White} size={FONTSIZE.size_30} />
                        </View>
                    }
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <View style={[styles.activeTabBackground, focused ? { backgroundColor: COLORS.Orange } : {}]}>
                            <CustomIcon name='video' color={COLORS.White} size={FONTSIZE.size_30} />
                        </View>
                    }
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    activeTabBackground: {
        backgroundColor: COLORS.Black,
        padding: SPACING.space_18,
        borderRadius: SPACING.space_18 * 10,
    }
})