import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Moment from 'react-moment'

function ScheduleRow(props){
    return(
        <View style={[styles.main_container, { height: props.rowSize }]}>
            <View style={styles.time_container}>
                <Moment 
                    style={styles.time_text}
                    element={Text} 
                    format="HH:mm"
                >
                    {props.datetime}
                </Moment>
            </View>
            <View style={styles.grid_container}>
                <View style={[styles.separator, {borderBottomColor: 'black', borderBottomWidth:0.7}]} />
                <View style={styles.separator} />
                <View style={[styles.separator, {borderBottomColor: 'black'}]} />
                <View style={styles.separator} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row'
    },

    time_container: {
        flex: 1
    },

    time_text: {
        color: '#c2c2c2',
        textAlign: 'center'
    },

    grid_container: {
        flex: 5,
        justifyContent: 'space-around'
    },

    separator: {
        borderBottomColor: '#757575',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})

export default ScheduleRow