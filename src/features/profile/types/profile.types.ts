export interface ProfileResponse {
  accountId: string;
  fullName: string;
  email: string;
  role: string;
  gCashNumber: string | null;
  mayaNumber: string | null;
  qrCodeUrl: string | null;
}

export interface UpdatePaymentDetailsRequest {
  gCashNumber: string | null;
  mayaNumber: string | null;
}
