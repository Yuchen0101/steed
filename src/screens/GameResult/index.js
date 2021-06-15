import React from 'react';
import { View, ScrollView, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import ScreenContainer from "../../components/ScreenContainer";

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


export default ({ navigation }) => {
    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.header}>
                <Text style={textStyle.headerText}>Results!</Text>
            </View>
            <View style={styles.accuracy}>
                <Text style={textStyle.accuracy}>Your Accuracy</Text>
                <Text style={textStyle.accuracyResult}>98.3%</Text>
            </View>
            <View style={styles.info}>
                <View style={{marginRight: 12}}>
                    <Text style={textStyle.price}>$1.34m</Text>
                    <Text style={textStyle.soldDate}>House last sold price</Text>
                    <Text style={textStyle.soldDate}>21-5-2020</Text>
                </View>
                <View>
                    <Text style={textStyle.price}>+230</Text>
                    <Text style={textStyle.soldDate}>Your Punt in</Text>
                    <Text style={textStyle.soldDate}>14 secs</Text>
                </View>
            </View>
            <View style={styles.performance}>
                <Text style={textStyle.performance}>
                    Setellar performance again Warren. You are one of the top predictors in this category. Kudos!
                </Text>
            </View>
            <View style={styles.stats}>
                <Text style={textStyle.stats}>Your stats</Text>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <Text style={textStyle.cardValue}>12000</Text>
                        <Text style={textStyle.indicator}>Total Points</Text>
                        <Text style={textStyle.indicator}>Earned</Text>
                    </View>
                    <View style={{...styles.card, ...styles.middleCard}}>
                        <Text style={textStyle.cardValue}>9th</Text>
                        <Text style={textStyle.indicator}>Leader board</Text>
                        <Text style={textStyle.indicator}>Position</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={textStyle.cardValue}>84%</Text>
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
                    onPress={() => navigation.navigate('Game')}
                />
            </View>
        </ScreenContainer>
    )
}