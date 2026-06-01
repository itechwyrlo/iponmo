export interface Message {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  text: string | null;
  imageUrl: string | null;
  sentAt: string;
  isRead: boolean;
}

export interface SendMessageRequest {
  groupId: string;
  receiverId: string;
  text: string | null;
  imageUrl: string | null;
}
