export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type Prayers = "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

export interface DataProviderState {
  currentDate: {
    dayOfMonth: number;
    dayOfWeek: DayOfWeek;
    month: number;
    year: number;
  };
  prayersDate: {
    [key: string]: string;
  };
  prayersData: PrayersDateFixer[];
  nextPray: Prayers;
  language: string;
  isFetchDataFailed: boolean;
  isNetworkConnected: boolean | null;
  // allowBackgroundService: boolean;
}

export type PrayersDateFixer = {
  name: string;
  fixedDate: string;
  remindMe: string;
  isEnable: boolean;
  nextOne?: boolean;
};

export type managedData = {
  name: string;
  date: number;
  remind: number;
  toggle: boolean;
};

export type DataContextType = {
  prays: PrayersDateFixer[];
  nextPray: string;
  language: string;
  // allowBackgroundService: boolean;
  editData: (
    pray: string,
    property: string,
    value: string | number
  ) => Promise<void>;
  editLanguage: (language: string) => Promise<void>;
  // editBackgroundPermission: (allow: boolean) => Promise<void>
};
