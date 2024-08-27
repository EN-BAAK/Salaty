import AsyncStorage from "@react-native-async-storage/async-storage";
import { DayOfWeek } from "./types";

export const calcPureTime = (time: Date) => {
  const now = new Date()

  const diffInMilliseconds: number = Number(time) - Number(now);
  const diffInMinutes = diffInMilliseconds / 1000 / 60;

  let hour = Math.floor(diffInMinutes / 60);
  hour = hour < 0 ? 24 + hour : hour;

  let min = diffInMinutes % 60;
  min = min < 0 ? 60 + min : min;

  return { hour, min };
}

export const calcTime = (time: string) => {
    const [hourTime, minuteTime] = time.split(":");
    const now = new Date();

    const date = new Date();
    date.setHours(Number(hourTime));
    date.setMinutes(Number(minuteTime));

    const diffInMilliseconds: number = Number(date) - Number(now);
    const diffInMinutes = diffInMilliseconds / 1000 / 60;

    let hour = Math.floor(diffInMinutes / 60);
    hour = hour < 0 ? 24 + hour : hour;

    let min = diffInMinutes % 60;
    min = min < 0 ? 60 + min : min;

    return { hour, min };
};

export const fixDate = (time: string, date: number) => {
    const [hourTime, minuteTime] = time.split(":");

    let min = Number(minuteTime) + Number(date);
    let hour = Number(hourTime);

    if (min >= 60) {
        min -= 60;
        hour++;
    } else if (min < 0) {
        min += 60;
        hour--;
    }

    return { hour, min };
};

export const formateTime = (time: { hour: number; min: number }) => {
    let formateHour = time.hour < 10 ? `0${time.hour}` : `${time.hour}`;
    let formateMin = time.min < 10 ? `0${time.min}` : `${time.min}`;

    return [formateHour, formateMin].join(":").slice(0, 5);
};

export const formateTime12 = (time: string) => {
    const [timeHour, timeMin] = time.split(":");

    let hour: number =
        Number(timeHour) > 12 ? Number(timeHour) - 12 : Number(timeHour);

    let formateHour = hour < 10 ? `0${hour}` : `${hour}`;
    let formateMin = Number(timeMin) < 10 ? `0${timeMin}` : `${timeMin}`;

    return [formateHour, formateMin].join(":").slice(0, 5);
};

export const getSpecificData = async (pray: string, property: string) => {
    const json: string | null = await AsyncStorage.getItem("ManagedData");

    if (json === null) {
        console.log(`No Data Found`);
        return;
    }

    const data = JSON.parse(json);

    const targetIndex = data.findIndex((e: any) => e.name === pray);

    const result = data[targetIndex][property];

    return Number(result);
};

export const getCurrentTimeFormatted = () => {
    const now = new Date();

    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    let formateHour = currentHour < 10 ? `0${currentHour}` : `${currentHour}`;
    let formateMin =
        currentMinutes < 10 ? `0${currentMinutes}` : `${currentMinutes}`;

    return `${formateHour}:${formateMin}`.slice(0, 5);
};

export const convertTimeToMilliseconds = (time: string) => {
    const date = new Date();

    // Set the desired time values
    date.setHours(2);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Get the time in milliseconds
    const timeInMillis = date.getTime();

    return timeInMillis;
};

export const getTheSpacingTime = (time: string) => {
    const [hourTime, minuteTime] = time.split(":");
    const now = new Date();

    const date = new Date();
    date.setHours(Number(hourTime));
    date.setMinutes(Number(minuteTime));

    const diffInMilliseconds = +date - +now;

    return diffInMilliseconds;
};

export const getDayOfWeek = (day: number) => {
    const days: DayOfWeek[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return days[day];
};
