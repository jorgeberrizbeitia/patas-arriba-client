import { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from "@mui/material/Alert";
import service from '@service/config';
import {useNavigate} from "react-router-dom";

// combines two approaches to detect if using browser version or PWA version of the web. Added outside of component scope as it should never change.
const isAppInstalled = (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone);

function NotificationSettings() {

  const [notificationsEnabled, setNotificationsEnabled] = useState(Notification.permission === "granted");
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubscribe = async () => {
    setIsLoading(true)
    try {
    
      const swReg = await navigator.serviceWorker.register("/sw.js");
      
      const subscription = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(import.meta.env.VITE_VAPID_PUSH_PUBLIC_KEY),
      });
      
      console.log(JSON.stringify(subscription));
      
      await service.post('/pushsubscription', { subscription });

      console.log(Notification.permission)

      setNotificationsEnabled(Notification.permission === "granted");
      setIsLoading(false)

    } catch (err) {
      console.error('Unable to subscribe.', err);
      navigate("/server-error");
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true)
    try {
      const swReg = await navigator.serviceWorker.getRegistration();
      if (!swReg) {
        console.log('Service worker not found.');
        //todo handle error with toast
        setIsLoading(true)
        return;
      }
  
      const subscription = await swReg.pushManager.getSubscription();
      if (!subscription) {
        console.log('No active subscription found.');
        //todo handle error with toast
        setIsLoading(true)
        return;
      }
  
      // Unsubscribe from push notifications
      const unsubscribed = await subscription.unsubscribe();
      
      if (unsubscribed) {
        console.log('User unsubscribed successfully.');
        await service.delete('/pushsubscription');
        
        console.log(Notification.permission)
        setNotificationsEnabled(Notification.permission === "granted");
        setIsLoading(false)
      } else {
        console.log('Failed to unsubscribe.');
        //todo handle error with toast
        setIsLoading(true)
      }
      
    } catch (err) {
      console.error('Unable to unsubscribe.', err);
      navigate("/server-error");
    }
  };

  // const isNotificationPermissionDenied = Notification.permission === "denied";
  // const isNotificationPermissionGranted = Notification.permission === "granted";
    
  return (
    <>
      <Typography variant="h5" gutterBottom>
        <span>Notificaciones: </span>
      </Typography>

      {!isAppInstalled && <Alert severity="warning">Instala la app para activar las notificaciones.</Alert>}

      {isAppInstalled && <>
        
        {!notificationsEnabled && <>
          {/* <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center"> */}
          <LoadingButton loading={isLoading} onClick={handleSubscribe} variant="contained">Activar Notificaciones</LoadingButton>
          {/* </Box> */}
          <Alert severity="info">Estas notificaciones son solo para mensajes en eventos y grupos de coche. Luego se pueden desactivar.</Alert>
        </>}

        {notificationsEnabled && <>
          <Alert severity="info">Notificaciones Activas. Las notificaciones se activan y envían solo al último dispositivo donde se activó esta opción. Estas notificaciones son solo para mensajes en eventos y grupos de coche.</Alert>
          {/* <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center"> */}
          <LoadingButton loading={isLoading} onClick={handleUnsubscribe} variant="contained">Desactivar Notificaciones</LoadingButton>
          {/* </Box> */}
        </>}

        {/* {!isNotificationPermissionGranted && <>
            <Alert severity="warning">Push Notifications are disabled: please manually change the notification permission to 'default' or 'granted' in browser settings to subscribe to push messages.</Alert>
        </>} */}

      </>}
    </>
  );
}

export default NotificationSettings;
