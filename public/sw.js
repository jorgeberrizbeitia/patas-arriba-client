"use strict";

self.addEventListener("install", function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("push", function (event) {

    if (!event.data) return;

    const message = event.data.json();
    const relativePath = message.data.path;
    const notificationUrl = new URL(relativePath, self.location.origin).href;

    // Check if the current path matches the notificationUrl
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
        let isPathMatching = false;
        for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url === notificationUrl) {
                isPathMatching = true;
                break;
            }
        }

        // Show notification only if the path does not match
        if (!isPathMatching) {
            event.waitUntil( // fixes issue with unsubscribe on iOS https://dev.to/progressier/how-to-fix-ios-push-subscriptions-being-terminated-after-3-notifications-39a7
                self.registration.showNotification(message.title, {
                    body: message.body,
                    data: message.data
                })
            )
        }
    });
});

self.addEventListener("notificationclick", function (event) {
    console.log("On notification click: ", event);

    event.notification.close();

    var notificationData = event.notification.data;
    var relativePath = notificationData.path;

    if (!relativePath) {
        console.log("no url to open");
        return;
    }

    var notificationUrl = new URL(relativePath, self.location.origin).href;

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
