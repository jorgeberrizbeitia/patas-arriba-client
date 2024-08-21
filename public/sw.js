"use strict";

self.addEventListener("install", function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("push", function (event) {
    const message = event.data.json();
    self.registration.showNotification(message.title, {body: message.text});
});

self.addEventListener("notificationclick", function (event) {
    console.log("On notification click: ", event);

    event.notification.close();

    var notificationData = event.notification;
    var notificationUrl = notificationData.data.notificationUrl;

    if (!notificationUrl) {
        console.log("no url to open");
        return;
    }

    // This looks to see if the current page is already open and focuses if it is
    event.waitUntil(
        clients
            .matchAll({
                type: "window"
            })
            .then(function (clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url === notificationUrl && "focus" in client) {
                        client.focus();
                        return;
                    }
                }
                if (clients.openWindow) {
                    clients.openWindow(notificationUrl);
                }
            })
    );
});
