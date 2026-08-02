import { cn } from '@/utils/cn';
import { create } from 'zustand';

type NotificationType = 'success' | 'error' | 'info';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
};

type NotificationStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
};

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Math.random().toString(36).slice(2), ...notification },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

const notificationByType = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

export const Notifications = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            'w-80 rounded-lg p-4 shadow-lg cursor-pointer',
            notificationByType[notification.type],
          )}
          onClick={() => removeNotification(notification.id)}
        >
          <h4 className="font-semibold">{notification.title}</h4>
          <p className="text-sm">{notification.message}</p>
        </div>
      ))}
    </div>
  );
};
