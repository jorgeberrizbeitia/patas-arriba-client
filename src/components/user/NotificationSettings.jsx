import { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import service from '@service/config';
import {useNavigate} from "react-router-dom";

function NotificationSettings() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const navigate = useNavigate()

    function urlB64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    const handleToggleNotifications = () => {
        syncSubscribe();
    }

    const syncSubscribe = async () => {
        const swReg = await navigator.serviceWorker.register("/sw.js");

        let subscription = swReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(import.meta.env.VITE_VAPID_PUSH_PUBLIC_KEY),
        });
        console.log(subscription) // Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
        subscription
            .then(function (pushSubscription) {
                console.log(JSON.stringify(pushSubscription))
                setNotificationsEnabled(!notificationsEnabled);
                return service.post('/pushsubscription', {subscription: pushSubscription})
            })
            .catch(function (err) {
                console.error('Unable to subscribe.', err);
                navigate("/server-error")
            });
    };

    const isNotificationPermissionDenied = () => {
        return Notification.permission === "denied";
    }

    const isNotificationPermissionGranted = () => {
        return Notification.permission === "granted";
    }

    const isAppInstalled = () => {
        return true;
//        return (window.matchMedia('(display-mode: standalone)').matches);
    }

    return (
        <>
            <Typography variant="h5" gutterBottom>
                <span>Notificaciones: </span>
            </Typography>

            {!isAppInstalled() &&
                <Alert severity="warning">Instala la app para activar las notificaciones.</Alert>
            }

            {isAppInstalled() && <>
                <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                    <Button onClick={handleToggleNotifications} variant="contained" disabled={isNotificationPermissionDenied()}>Activar Notificaciones</Button>
                </Box>

                <br/>
                {!isNotificationPermissionDenied() && <>
                    <Alert severity="info">Las notificaciones se activan y envían solo al último dispositivo.</Alert>
                </>}

                {isNotificationPermissionDenied() && <>
                    <Alert severity="warning">Push Notifications are disabled: please manually change the notification permission to 'default' or 'granted' in
                        browser settings to subscribe to push messages.</Alert>
                </>}
            </>}
        </>
    );
}

export default NotificationSettings;
