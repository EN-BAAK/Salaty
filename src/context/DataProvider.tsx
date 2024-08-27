import React, { Component, createContext, useContext } from "react";
import { DataContextType, DataProviderState, PrayersDateFixer, managedData } from "../misc/types";
import { fixDate, formateTime, getDayOfWeek, getTheSpacingTime } from "../misc/helpers";
import { getLocales } from "react-native-localize";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { prays } from "../misc/constants";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";

const DataContext = createContext<undefined | DataContextType>(undefined)

interface DataProviderProps {
  children: React.ReactNode
}

export default class DataProvider extends Component<DataProviderProps, DataProviderState> {

  private unsubscribe: (() => void) | undefined;
  constructor(props: DataProviderProps) {
    super(props)

    this.state = {
      currentDate: {
        dayOfMonth: 0,
        dayOfWeek: "Sunday",
        month: 0,
        year: 0
      },
      prayersDate: {
        Fajr: "",
        Sunrise: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: "",
      },
      prayersData: [],
      language: "ar",
      nextPray: "Fajr",
      isFetchDataFailed: false,
      isNetworkConnected: false,
      // allowBackgroundService: false
    }
  }

  setCurrentTime = () => {
    const DATE = new Date()
    const date = {
      dayOfMonth: DATE.getDate(),
      dayOfWeek: getDayOfWeek(DATE.getDay()),
      month: DATE.getMonth() + 1,
      year: DATE.getFullYear(),
    }

    this.setState({ currentDate: date })
  }

  fetchPrayersDataFromAPI = async () => {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${this.state.currentDate.dayOfMonth}-${this.state.currentDate.month}-${this.state.currentDate.year}?city=Damascus&country=Syria&method=8`
    )
    const data = await response.json()

    const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.data.timings


    this.setState({
      prayersDate: { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha }
    })

    await AsyncStorage.setItem("PrayersData", JSON.stringify({
      Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
    }))
  }

  fetchPrayersDataFromCatch = async () => {
    const json: string | null = await AsyncStorage.getItem("PrayersData")

    if (!json)
      throw new Error("No data found in catch")

    const data = JSON.parse(json)

    this.setState({
      prayersDate: { ...data }
    })
  }

  fetchPrayersData = async () => {
    const isNetworkConnected = this.state.isNetworkConnected;
    console.log("Is network Connect? ", isNetworkConnected)

    try {
      isNetworkConnected
        ? await this.fetchPrayersDataFromAPI()
        : await this.fetchPrayersDataFromCatch()
    } catch (err) {
      console.log("Fetch Prayers failed", err)
      this.setState({ isFetchDataFailed: true })
    }
  }

  setNextPray = () => {
    for (const pray of prays) {
      const prayerTime = getTheSpacingTime(this.state.prayersDate[pray])
      if (prayerTime > 0) {
        this.setState({ nextPray: pray })
        return;
      }
    }
  }

  setLanguage = async () => {
    const json = await AsyncStorage.getItem("language")
    let catchLanguage

    json
      ? catchLanguage = JSON.parse(json)
      : catchLanguage = getLocales()[0]["languageCode"]

    this.setState({
      language: catchLanguage
    })
  }

  // setAllowBackgroundService = async () => {
  //   const json = await AsyncStorage.getItem("backgroundPermission")
  //   let data;

  //   data = json ? JSON.parse(json) : false

  //   this.setState({
  //     allowBackgroundService: data
  //   })
  // }

  editLanguage = async (language: string) => {
    this.setState({ language })
    const data = JSON.stringify(language)

    await AsyncStorage.setItem("language", data)
  }

  // editBackgroundPermission = async (allow: boolean) => {
  //   this.setState({ allowBackgroundService: allow })

  //   const data = JSON.stringify(allow)

  //   await AsyncStorage.setItem("backgroundPermission", data)
  // }

  setExistManagedData = async (data: managedData[]) => {
    const newData: PrayersDateFixer[] = data.map(pray => {
      const fixedDate = formateTime(fixDate(this.state.prayersDate[pray.name], pray.date));
      const remindMe = formateTime(fixDate(fixedDate, pray.remind))
      return {
        name: pray.name,
        fixedDate,
        remindMe,
        isEnable: pray.toggle,
      };
    })

    this.setState({ prayersData: newData });
  }

  setInitialManagedData = async () => {
    const data: managedData[] = prays.map(pray => {
      return {
        name: pray,
        date: 0,
        remind: -10,
        toggle: true
      }
    })

    await AsyncStorage.setItem("ManagedData", JSON.stringify(data))
    this.setExistManagedData(data)
  }

  setManagedData = async () => {
    const json: string | null = await AsyncStorage.getItem("ManagedData")

    if (!json)
      return this.setInitialManagedData()

    const data = JSON.parse(json)

    this.setExistManagedData(data)
  }

  editData = async (pray: string, property: string, value: string | number) => {
    let json: string | null = await AsyncStorage.getItem("ManagedData");

    if (json) {
      let data = JSON.parse(json);

      const targetIndex = data.findIndex((e: managedData) => e.name === pray);

      data[targetIndex][property] = value;

      await AsyncStorage.setItem("ManagedData", JSON.stringify(data));

      this.setExistManagedData(data);

      this.setNextPray()
    }

  };

  componentDidMount = async () => {
    this.unsubscribe = await NetInfo.addEventListener(state => {
      this.setState({ isNetworkConnected: state.isConnected })
    })
    await this.setCurrentTime()
    await this.fetchPrayersData()
    await this.setManagedData()
    await this.setNextPray()
    await this.setLanguage()
    // await this.setAllowBackgroundService()
  }

  componentWillUnmount = () => {
    if (this.unsubscribe)
      this.unsubscribe()
  }

  render(): React.ReactNode {
    if (this.state.isFetchDataFailed)
      return <ErrorView />

    if (!this.state.prayersData.length)
      return <LoadingView />

    return (
      <DataContext.Provider value={{
        prays: this.state.prayersData,
        nextPray: this.state.nextPray,
        language: this.state.language,
        // allowBackgroundService: this.state.allowBackgroundService,
        editData: this.editData,
        editLanguage: this.editLanguage,
        // editBackgroundPermission: this.editBackgroundPermission
      }}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}

export const useDataContext = () => {
  const CONTEXT = useContext(DataContext)
  return CONTEXT as DataContextType
}

