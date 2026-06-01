interface BaseNotification {
  id: string;
  receivedAt: string;
  isRead: boolean;
}

export interface MessageNotification extends BaseNotification {
  type: 'new_message';
  senderName: string;
  messagePreview: string;
  groupId: string;
  groupName: string;
}

export interface PaymentNotification extends BaseNotification {
  type: 'payment_confirmed';
  groupName: string;
  round: number;
}

export type AppNotification = MessageNotification | PaymentNotification;
