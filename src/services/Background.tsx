import { NativeEventEmitter, NativeModules } from "react-native";
import { useDataContext } from "../context/DataProvider";
import { calcPureTime } from "../misc/helpers";

const nativeModule = new NativeEventEmitter(NativeModules.myNativeModule);

nativeModule.addListener('MyEvent', (eventData) => {
  console.log('Received event from Kotlin:',eventData);
});

const CONTEXT = useDataContext()
const {prays, nextPray} = CONTEXT;

const attempt = (time: string) => {
  const currentPrayData = prays.find(item => item.name === nextPray)
  console.log(currentPrayData)

  const date = new Date()

  console.log(calcPureTime(date))
}