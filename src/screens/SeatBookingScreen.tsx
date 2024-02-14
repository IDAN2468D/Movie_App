import React from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { AppHeader } from '.';
import { ButtonBG, CustomIcon } from '../components';
import useSeatBookingScreen from '../components/useSeatBookingScreen';

const SeatBookingScreen = ({ navigation, route }: any) => {
    const {
        dataArray,
        selectedDateIndex,
        price,
        twoDSeatArray,
        selectTimeIndex,
        timeArray,
        selectSeat,
        BookSeats,
        setSelectedDateIndex,
        setSelectTimeIndex,
    } = useSeatBookingScreen(route, navigation);

    return (
        <ScrollView
            style={styles.container}
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <StatusBar hidden />
            <View>
                <ImageBackground
                    source={{ uri: route.params?.BGImage }}
                    style={styles.ImageBG}
                >
                    <LinearGradient colors={[COLORS.BlackRGB10, COLORS.Black]} style={styles.linearGradient}>
                        <View style={styles.appHeaderContainer}>
                            <AppHeader name="close" header="" action={() => navigation.goBack()} />
                        </View>
                    </LinearGradient>
                </ImageBackground>
                <Text style={styles.screenText}>Screen this side</Text>
            </View>
            <View style={styles.seatContainer}>
                <View style={styles.containerGap20}>
                    {
                        twoDSeatArray?.map((item, index) => {
                            return (
                                <View key={index} style={styles.seatRow}>
                                    {
                                        item?.map((subitem, subindex) => {
                                            return (
                                                <TouchableOpacity
                                                    key={subitem.number}
                                                    onPress={() => {
                                                        selectSeat(
                                                            index,
                                                            subindex,
                                                            subitem.number,
                                                        )
                                                    }
                                                    }>
                                                    <CustomIcon
                                                        name='seat'
                                                        style={[styles.seatIcon,
                                                        subitem.taken ?
                                                            { color: COLORS.Grey } : {},
                                                        subitem.selected ?
                                                            { color: COLORS.Orange } : {}
                                                        ]} />
                                                </TouchableOpacity>
                                            )
                                        })}
                                </View>
                            )
                        })}
                </View>
                <View style={styles.seatRadioContainer}>
                    <View style={styles.radioContainer}>
                        <CustomIcon name='radio' style={styles.radioIcon} />
                        <Text style={styles.radioText}>Available</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <CustomIcon name='radio' style={[styles.radioIcon, { color: COLORS.Grey }]} />
                        <Text style={styles.radioText}>Taken</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <CustomIcon name='radio' style={[styles.radioIcon, { color: COLORS.Orange }]} />
                        <Text style={styles.radioText}>Selected</Text>
                    </View>
                </View>
            </View>
            <View >
                <FlatList
                    data={dataArray}
                    bounces={false}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    contentContainerStyle={styles.containerGap24}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setSelectedDateIndex(index)
                            }}>
                                <View style={[styles.dateContainer,
                                index == 0 ? { marginLeft: SPACING.space_24 }
                                    : index == dataArray.length - 1
                                        ? { marginRight: SPACING.space_24 }
                                        : {},
                                index == selectedDateIndex
                                    ? { backgroundColor: COLORS.Orange }
                                    : {},
                                ]}>
                                    <Text style={styles.dateText}>{item.date}</Text>
                                    <Text style={styles.dayText}>{item.day}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={styles.OuterContainer}>
                <FlatList
                    data={timeArray}
                    bounces={false}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    contentContainerStyle={styles.containerGap24}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setSelectTimeIndex(index)
                            }}>
                                <View style={[styles.timeContainer,
                                index == 0 ? { marginLeft: SPACING.space_24 }
                                    : index == dataArray.length - 1
                                        ? { marginRight: SPACING.space_24 }
                                        : {},
                                index == selectTimeIndex
                                    ? { backgroundColor: COLORS.Orange }
                                    : {},
                                ]}>
                                    <Text style={styles.timeText}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={styles.buttonPriceContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.totalPriceText}>Total Price</Text>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                </View>
                <ButtonBG
                    buttonBG={{
                        borderRadius: BORDERRADIUS.radius_25,
                        paddingHorizontal: SPACING.space_24,
                        paddingVertical: SPACING.space_16,
                        backgroundColor: COLORS.Orange,
                    }}
                    TextBG={{
                        fontSize: FONTSIZE.size_16,
                        color: COLORS.White,
                    }}
                    onPress={BookSeats}
                />
            </View>
        </ScrollView>
    );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    ImageBG: {
        width: "100%",
        aspectRatio: 3072 / 1727,
    },
    linearGradient: {
        height: "100%",
    },
    appHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_20 * 2,
    },
    screenText: {
        textAlign: "center",
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.WhiteRGBA15,
    },
    seatContainer: {
        marginVertical: SPACING.space_20,
    },
    containerGap20: {
        gap: SPACING.space_20
    },
    seatRow: {
        flexDirection: "row-reverse",
        gap: SPACING.space_20,
        justifyContent: 'center',
    },
    seatIcon: {
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
    },
    seatRadioContainer: {
        flexDirection: "row-reverse",
        marginTop: SPACING.space_36,
        marginBottom: SPACING.space_10,
        alignItems: 'center',
        justifyContent: "space-evenly",
    },
    radioContainer: {
        flexDirection: "row-reverse",
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    radioIcon: {
        fontSize: FONTSIZE.size_12,
        color: COLORS.White,
    },
    radioText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.White,
    },
    containerGap24: {
        gap: SPACING.space_24,
    },
    dateContainer: {
        width: SPACING.space_10 * 7,
        height: SPACING.space_10 * 10,
        borderRadius: SPACING.space_10 * 10,
        backgroundColor: COLORS.DarkGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
    },
    dayText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.White,
    },
    OuterContainer: {
        marginVertical: SPACING.space_24,

    },
    timeContainer: {
        paddingVertical: SPACING.space_4,
        borderWidth: 1,
        borderColor: COLORS.WhiteRGBA50,
        paddingHorizontal: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_25,
        backgroundColor: COLORS.DarkGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    buttonPriceContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: SPACING.space_24,
        paddingBottom: SPACING.space_24,
    },
    priceContainer: {
        alignItems: 'center',
    },
    totalPriceText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.Grey,
    },
    price: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
    }
});
