export function countUnreadNotifications(notifications, userId) {

    return notifications.filter(notification =>
        !notification.readBy?.includes(userId)
    ).length;
}
