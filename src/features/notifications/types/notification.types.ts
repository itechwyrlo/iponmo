export type NotificationType = 'NewMessage' | 'PaymentMarkedAsPaid';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  referenceId: string;
}
