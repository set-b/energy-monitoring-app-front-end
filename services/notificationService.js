import * as Notifications from 'expo-notifications';

// Controls how a notification is handled while the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function ensurePermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Notification permission not granted');
    return false;
  }
  return true;
}

export async function sendTestNotification(title, body) {
  if (!(await ensurePermission())) return;

  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null, // fires immediately
  });
}

// hours: number of hours until the best time (0 = now)
export async function sendApplianceNotification(hours) {
  if (!(await ensurePermission())) return;

  const body =
    hours <= 0
      ? '⚡ The best time to use your appliances is now!'
      : `⚡ The best time to use your appliances is in: ${hours} hour${hours === 1 ? '' : 's'}`;

  await Notifications.scheduleNotificationAsync({
    content: { title: 'Appliance Timing', body },
    trigger: null,
  });
}

// hours: number of hours until the best carport time (0 = now)
export async function sendCarportNotification(hours) {
  if (!(await ensurePermission())) return;

  const body =
    hours <= 0
      ? '🚗 The best time to use the carport is now!'
      : `🚗 The best time to use the carport is in: ${hours} hour${hours === 1 ? '' : 's'}`;

  await Notifications.scheduleNotificationAsync({
    content: { title: 'Carport Timing', body },
    trigger: null,
  });
}