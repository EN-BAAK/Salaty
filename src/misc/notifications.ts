import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

class Notification {
    constructor() {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);
            },

            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: true,
            requestPermissions: false,
        });

        PushNotification.createChannel(
            {
                channelId: "reminders",
                channelName: "Task Reminder Notification",
                channelDescription: "Reminder For Any Tasks",
            },
            () => {}
        );

        PushNotification.getScheduledLocalNotifications((rn) => {
            console.log("SN ---", rn);
        });
    }
    pushNotification(title: string, message: string) {
        PushNotification.cancelAllLocalNotifications();
        PushNotification.localNotification({
            channelId: "reminders",
            title,
            message,
        });
    }
}

export default new Notification();
