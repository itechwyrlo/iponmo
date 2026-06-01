export interface AppNotification {
  id: string;
  type: 'new_message';
  senderName: string;
  messagePreview: string;
  groupId: string;
  groupName: string;
  receivedAt: string;
  isRead: boolean;
}
