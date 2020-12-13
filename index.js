import React from 'react'
import { View, ScrollView } from 'react-native';
import Header from './Header';
import ScheduleRow from './ScheduleRow';
import Appointment from './Appointment';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as fr from './Language/fr'
import * as en from './Language/en';

class Schedule extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            dayNumber: 1
        };

        this._onChangeDay = this._onChangeDay.bind(this);
    }

    _createTimesRows(firstHour){
        var datetime = new Date(firstHour);
        var times = [];
        var lines = this.props.numberOfRows;
        
        for(var i = 0; i < lines; i++){
            times.push(moment(datetime).format('YYYY-MM-DD HH:mm'));
            datetime.setHours(datetime.getHours() + 1);
        }

        return times;
    }

    _onChangeDay(item){
        this.setState({dayNumber: item.value});
        if(this.props.onSelectedDayChanged){
            this.props.onSelectedDayChanged(item.value);
        }
    }

    _getDayAppointments(){
        const data = this.props.data != null ? this.props.data : [];
        const selectedDay = this.state.dayNumber;

        return data.filter((item, index)=>{
            return item.DayIndex == selectedDay;
        })
    }

    render(){
        const lanRsc = this.props.lang == 'en' ? en : fr;
        const backColor = this.props.darkMode ? '#404040' : 'white';

        const rowSize = this.props.rowSize;
        const firstHour = new Date(2021, 2, 1 , this.props.minHour, this.props.minMinute, 0, 0);
        
        return(
            <View style={{flex:1, width: '100%', backgroundColor: backColor}}>
                <Header days={lanRsc.days} onChangeDay={this._onChangeDay} darkMode={this.props.darkMode} />
                <ScrollView>
                    {this._createTimesRows(firstHour).map((item, index)=>
                            <ScheduleRow 
                                key={index} 
                                datetime={item} 
                                rowSize={rowSize}
                            />
                    )}
                    {this._getDayAppointments().map((item, index)=>
                            <Appointment 
                                key={-index} 
                                langRsc={lanRsc}
                                canRemove={this.props.canRemove}
                                rowSize={rowSize} 
                                firstHour={firstHour} 
                                data={item} 
                                darkMode={this.props.darkMode}
                                onDelete={app=>{if(this.props.onAppointmentRemoved != null) this.props.onAppointmentRemoved(app)}}    
                            />
                    )} 
                </ScrollView>
            </View>
        );
    }
}

Schedule.propTypes = {
  lang: PropTypes.oneOf(['en', 'fr']),
  data: PropTypes.array,
  numberOfRows: PropTypes.number,
  darkMode: PropTypes.bool,
  rowSize: PropTypes.number,
  minHour: function(props, propName, componentName){
    if(props[propName] > 23 || props[propName] < 0){
        return new Error('Invalid value for ' + propName + ' prop for' + componentName + ' component. The value must be between 0 and 23.' );
    }
  },
  minMinute: function(props, propName, componentName){
    if(props[propName] > 59 || props[propName] < 0){
        return new Error('Invalid value for ' + propName + ' prop for ' + componentName + ' component. The value must be between 0 and 59.' );
    }
  },
  canRemove: PropTypes.bool,

  onSelectedDayChanged: PropTypes.func,
  onAppointmentRemoved: PropTypes.func
}

Schedule.defaultProps = {
    lang: 'en',
    data: [],
    canRemove: true,
    numberOfRows: 13,
    rowSize: 100,
    minHour: 8,
    minMinute: 30
}

export default Schedule;