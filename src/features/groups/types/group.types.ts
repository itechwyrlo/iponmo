export type PaymentSchedule = 'Weekly' | 'Bi-weekly' | 'Monthly';

export type GroupStatus = 'Active' | 'Completed' | 'Cancelled';

export interface GroupListResponse {
  data: GroupSummary[];
  total: number;
}

export interface GroupSummary {
  id: string;
  name: string;
  contributionAmount: number;
  schedule: PaymentSchedule;
  totalSlots: number;
  currentRound: number;
  organizerId: string;
  myPaymentStatus: boolean;
  paidCount: number;
}

export interface MemberDetail {
  userId: string;
  fullName: string;
  slotNumber: number;
  payoutOrder: number;
  gcashNumber: string | null;
  mayaNumber: string | null;
}

export interface PaymentStatus {
  memberId: string;
  memberName: string;
  round: number;
  isPaid: boolean;
  paidAt: string | null;
}

export interface PayoutHistory {
  memberId: string;
  memberName: string;
  round: number;
  amount: number;
  paidAt: string;
}

export interface GroupDetail {
  id: string;
  name: string;
  contributionAmount: number;
  schedule: PaymentSchedule;
  numberOfSlots: number;
  currentRound: number;
  organizerId: string;
  startDate: string;
  status: GroupStatus;
  paidCount: number;
  collectedAmount: number;
  organizerGCashNumber: string | null;
  organizerMayaNumber: string | null;
}

export interface CreateGroupRequest {
  name: string;
  contributionAmount: number;
  schedule: PaymentSchedule;
  numberOfSlots: number;
  startDate: string;
}

export interface AddMemberRequest {
  accountId: string;
  slotNumber: number;
}
