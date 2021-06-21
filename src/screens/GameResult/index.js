import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';
import { useHouseContext } from '../Game/houseContext';
import { toPercent, toPrice, toRank, formatNumber } from '../../utils';

import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "red"
    },
    container: {
        width: "100%",
        // height: "100%",
        paddingHorizontal: 30,
        paddingTop: 40,
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        marginBottom: 40
    },
    accuracy: {
        display: 'flex',
        alignItems: 'center', 
        marginBottom: 25
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 25
    },
    performance: {
        width: "90%",
        marginBottom: 60,
    },
    stats: {
        marginBottom: 100
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: "75%",
    },
    card: {
        backgroundColor: AppStyles.color.steedBlue,
        width: 80,
        padding: 7,
        borderRadius: 5
    },
    middleCard: {
        marginHorizontal: 10
    },
    button: {
        width: 160,
        height: 48,
        borderWidth: 1
    }
})

const textStyle = StyleSheet.create({
    headerText: {
        color: AppStyles.color.steedLigthGrey,
        fontSize: 30,
    },
    accuracy: {
        color: AppStyles.color.steedLigthGrey,
        fontSize: 16,
        marginBottom: 3,
    },
    accuracyResult: {
        color: AppStyles.color.steedGreen,
        fontSize: 50,
    },
    price: {
        color: AppStyles.color.steedGreen,
        fontSize: 20,
        marginBottom: 2
    },
    soldDate: {
        color: AppStyles.color.steedDarkGrey,
        fontSize: 10
    },
    performance: {
        color: AppStyles.color.steedLigthGrey,
        lineHeight: 18,
        textAlign: 'center'
    },
    stats: {
        textAlign: 'center',
        color: AppStyles.color.steedDarkGrey,
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 10
    },
    cardValue: {
        fontSize: 16,
        color: AppStyles.color.steedLigthGrey,
        marginBottom: 2
    },
    indicator: {
        fontSize: 10,
        lineHeight: 11,
        color: AppStyles.color.steedDarkGrey,
    }
})


export default ({ navigation, route }) => {
    const {
        accuracy,
        points,
        sold_price,
        sold_date,
        description,
        total_points,
        rank,
        avg_accuracy,
        duration,
        id
    } = route.params;

    const {
        removedList,
        setRemovedList,
    } = useHouseContext();

    const onClick = useCallback(
        () => {
            setRemovedList([...removedList, id]);
            navigation.navigate('Game');
        },
        []
    );

    const scrollHeight = useMemo(() => Dimensions.get("window").height - 140, []);

    return (
        <View style={{...styles.container, height: scrollHeight}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <View style={styles.header}>
                    <Text style={textStyle.headerText}>Results!</Text>
                </View>
                <View style={styles.accuracy}>
                    <Text style={textStyle.accuracy}>Your Accuracy</Text>
                    <Text style={textStyle.accuracyResult}>{toPercent(accuracy)}</Text>
                </View>
                <View style={styles.info}>
                    <View style={{marginRight: 12}}>
                        <Text style={textStyle.price}>${toPrice(sold_price)}</Text>
                        <Text style={textStyle.soldDate}>House last sold price</Text>
                        <Text style={textStyle.soldDate}>{sold_date}</Text>
                    </View>
                    <View>
                        <Text style={textStyle.price}>{points}</Text>
                        <Text style={textStyle.soldDate}>Your Punt in</Text>
                        <Text style={textStyle.soldDate}>{duration} secs</Text>
                    </View>
                </View>
                <View style={styles.performance}>
                    <Text style={textStyle.performance}>
                        {description}
                    </Text>
                </View>
                <View style={styles.stats}>
                    <Text style={textStyle.stats}>Your stats</Text>
                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Text style={textStyle.cardValue}>{formatNumber(total_points)}</Text>
                            <Text style={textStyle.indicator}>Total Points</Text>
                            <Text style={textStyle.indicator}>Earned</Text>
                        </View>
                        <View style={{...styles.card, ...styles.middleCard}}>
                            <Text style={textStyle.cardValue}>{toRank(rank)}</Text>
                            <Text style={textStyle.indicator}>Leader board</Text>
                            <Text style={textStyle.indicator}>Position</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={textStyle.cardValue}>{toPercent(avg_accuracy)}</Text>
                            <Text style={textStyle.indicator}>Average</Text>
                            <Text style={textStyle.indicator}>Accuracy</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Button
                        title="Play Again"
                        type="outline"
                        buttonStyle={styles.button}
                        onPress={onClick}
                    />
                </View>
            </ScrollView>
        </View>
    )
}