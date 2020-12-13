declare module 'rn-simple-schedule' {
    import { ComponentType } from 'react';
    import { ColorValue } from "react-native";
   
    type appointmentType = { "Title": string, DayIndex: number, "StartTime": string, "EndTime": string, "Color": ColorValue }

    type Schedule = {
        lang?: 'en' | 'fr',
        data?: appointmentType[],
        numberOfRows?: number,
        darkMode?: boolean,
        rowSize?: number,
        minHour?: number,
        minMinute?: number,
        canRemove?: boolean,
      
        onSelectedDayChanged?: (dayIndex: number) => void,
        onAppointmentRemoved?: (appointment : appointmentType) => void
    };
    const Schedule: ComponentType<Schedule>;
    export default Schedule;
  }
  