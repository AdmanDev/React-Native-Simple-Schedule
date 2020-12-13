import React from 'react'
import { View, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function Header(props){
    const backColor = props.darkMode ? '#404040' : 'white'
    const textColor = props.darkMode ? 'white' : 'black'
    return(
        <View >
            <DropDownPicker
                style={{zIndex:2, backgroundColor: backColor}}
                dropDownStyle={{backgroundColor: backColor}}
                items={props.days}
                defaultValue={1}
                placeholder='Choisir un jour...'
                containerStyle={{height: 50}}
                itemStyle={{
                    justifyContent: 'center'
                }}
                labelStyle={{textAlign: 'center', color:textColor}}
                customArrowDown=
                {
                    (color, size)=> (<Image source={require('./Images/ic_arrow_down.png')} />)
                }
                customArrowUp=
                {
                    (color, size)=> (<Image source={require('./Images/ic_arrow_up.png')} />)
                }
                onChangeItem={props.onChangeDay}
            />
        </View>
    )
}
