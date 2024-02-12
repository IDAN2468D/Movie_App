import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, Image, ImageBackground, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { AppHeader } from '.';
import { ButtonBG, CustomIcon } from '../components';
import EncryptedStorage from 'react-native-encrypted-storage';

const timeArray: string[] = [
    "10:30",
    "12:30",
    "14:30",
    "15:00",
    "19:30",
    "21:00",
    "22:30",
];

const generateDate = () => {
    const date = new Date();
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weekdays = [];
    for (let i = 0; i < 7; i++) {
        let tempDate = {
            date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
            day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
        };
        weekdays.push(tempDate)
    }
    return weekdays;
};

const generateSeats = (hallNumber: number) => {
    let numRow = 8;
    let numColumn = 3;
    let rowArray = [];
    let start = 1;
    let reachnine = false;

    for (let i = 0; i < numRow; i++) {
        let columnArray = [];
        for (let j = 0; j < numColumn; j++) {
            let seatObject = {
                number: start,
                taken: Boolean(Math.round(Math.random())),
                selected: false,
                hall: hallNumber // Add hall number to each seat object
            }
            columnArray.push(seatObject);
            start++
        }
        if (i == 3) {
            numColumn += 2;
        }
        if (numColumn < 9 && !reachnine) {
            numColumn += 2;
        } else {
            reachnine = true;
            numColumn -= 2;
        }
        rowArray.push(columnArray)
    }
    return rowArray;
};

const SeatBookingScreen = ({ navigation, route }: any) => {
    const [dataArray, setDataArray] = useState<any[]>(generateDate());
    const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
    const [price, setPrice] = useState<number>(0);
    const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats(route.params.hallIndex));
    const [selectedSeatArray, setSelectedSeatArray] = useState<number[]>([]);
    const [selectTimeIndex, setSelectTimeIndex] = useState<any>();
    const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
    const [selectedHallIndex, setSelectedHallIndex] = useState<number>(route.params.hallIndex);

    const selectSeat = (rowIndex: number, subindex: number, num: number) => {
        const hallIndex = selectedHallIndex;
        if (!twoDSeatArray[rowIndex][subindex].taken) {
            let array: number[] = [...selectedSeatArray];
            let temp = [...twoDSeatArray];
            temp[rowIndex][subindex].selected = !temp[rowIndex][subindex].selected;
            if (!array.includes(num)) {
                array.push(num);
                setSelectedSeatArray(array);
            } else {
                const tempindex = array.indexOf(num);
                if (tempindex > -1) {
                    array.splice(tempindex, 1);
                    setSelectedSeatArray(array);
                }
            }
            if (hallIndex !== undefined && hallIndex !== null) {
                console.log(`Seat selected in hall ${hallIndex}`);
                // Additional actions here...
            } else {
                console.log("Error: hallIndex is undefined or null");
            }
            setPrice(array.length * 5.0);
            setTwoDSeatArray(temp);

            console.log(`Seat selected in row ${rowIndex}`);
            console.log(`Seat selected in hall ${hallIndex}`);
            console.log('hallIndex:', hallIndex);
            setSelectedRowIndex(rowIndex);
            setSelectedHallIndex(hallIndex);
        }
    }

    const BookSeats = async () => {
        if (
            selectedSeatArray.length !== 0 &&
            timeArray[selectTimeIndex] != undefined &&
            dataArray[selectedDateIndex] !== undefined &&
            selectedRowIndex !== -1
        ) {
            try {
                await EncryptedStorage.setItem("ticket", JSON.stringify({
                    seatArray: selectedSeatArray,
                    time: timeArray[selectTimeIndex],
                    date: dataArray[selectedDateIndex],
                    row: selectedRowIndex,
                    hall: selectedHallIndex, // Include hall number in stored ticket
                    ticketImage: route.params.PosterImage,
                    movieIndex: route.params.movieIndex,
                })
                );
            } catch (error) {
                console.log("Something went Wrong while storing in BookState Function", error);
            }
            navigation.navigate("Ticket", {
                seatArray: selectedSeatArray,
                time: timeArray[selectTimeIndex],
                date: dataArray[selectedDateIndex],
                row: selectedRowIndex,
                hall: selectedHallIndex, // Include hall number in navigation
                ticketImage: route.params.PosterImage,
                movieIndex: route.params.movieIndex,
            });

            console.log(`Seats booked in rows: ${selectedSeatArray.map(seat => {
                for (let i = 0; i < twoDSeatArray.length; i++) {
                    for (let j = 0; j < twoDSeatArray[i].length; j++) {
                        if (twoDSeatArray[i][j].number === seat) {
                            return i;
                        }
                    }
                }
                return -1;
            })}`);
        } else {
            ToastAndroid.showWithGravity("Please Select Seats, Date and Time of Show",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }

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
