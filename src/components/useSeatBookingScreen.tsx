import React, { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const useSeatBookingScreen = (route: any, navigation: any) => {
    const [dataArray, setDataArray] = useState<any[]>([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
    const [price, setPrice] = useState<number>(0);
    const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>([]);
    const [selectedSeatArray, setSelectedSeatArray] = useState<number[]>([]);
    const [selectTimeIndex, setSelectTimeIndex] = useState<any>();
    const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
    const [selectedHallIndex, setSelectedHallIndex] = useState<number>(route.params.hallIndex);

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

    useEffect(() => {
        setDataArray(generateDate());
        setTwoDSeatArray(generateSeats(route.params.hallIndex));
    }, []);

    return {
        dataArray,
        selectedDateIndex,
        price,
        twoDSeatArray,
        selectedSeatArray,
        selectTimeIndex,
        selectedRowIndex,
        selectedHallIndex,
        timeArray,
        selectSeat,
        BookSeats,
        setSelectedDateIndex,
        setSelectTimeIndex,
    };
};

export default useSeatBookingScreen;
