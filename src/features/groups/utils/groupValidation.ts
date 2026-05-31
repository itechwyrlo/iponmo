const PAL_REGEX = /^PAL-[0-9A-F]{8}$/;
const VALID_SCHEDULES = new Set(['Weekly', 'Bi-weekly', 'Monthly']);

export function validateCreateGroupForm(values: {
  name: string;
  contributionAmount: string;
  schedule: string;
  numberOfSlots: string;
  startDate: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.name.trim()) {
    errors.name = 'Group name is required.';
  } else if (/[<>]/.test(values.name)) {
    errors.name = 'Group name cannot contain < or > characters.';
  } else if (values.name.length > 100) {
    errors.name = 'Group name must be 100 characters or fewer.';
  }

  if (!values.schedule || !VALID_SCHEDULES.has(values.schedule)) {
    errors.schedule = 'Please select a valid payment schedule.';
  }

  if (!values.contributionAmount) {
    errors.contributionAmount = 'Contribution amount is required.';
  } else {
    const amount = parseFloat(values.contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      errors.contributionAmount = 'Amount must be greater than 0.';
    } else if (amount > 999999999.99) {
      errors.contributionAmount = 'Amount exceeds the maximum of ₱999,999,999.99.';
    }
  }

  if (!values.numberOfSlots) {
    errors.numberOfSlots = 'Number of slots is required.';
  } else {
    const slots = parseInt(values.numberOfSlots, 10);
    if (isNaN(slots) || slots < 2) {
      errors.numberOfSlots = 'Minimum 2 slots required.';
    } else if (slots > 500) {
      errors.numberOfSlots = 'Maximum 500 slots allowed.';
    }
  }

  if (!values.startDate) {
    errors.startDate = 'Start date is required.';
  } else {
    const selected = new Date(values.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);
    if (selected < today) {
      errors.startDate = 'Start date cannot be in the past.';
    } else if (selected > maxDate) {
      errors.startDate = 'Start date cannot be more than 10 years from now.';
    }
  }

  return errors;
}

export function validateAddMemberForm(
  values: { accountId: string; slotNumber: string },
  maxSlots: number,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.accountId.trim()) {
    errors.accountId = 'Account ID is required.';
  } else if (!PAL_REGEX.test(values.accountId.trim())) {
    errors.accountId = 'Must be PAL- followed by 8 uppercase hex characters (e.g. PAL-1A2B3C4D).';
  }

  if (!values.slotNumber) {
    errors.slotNumber = 'Slot number is required.';
  } else {
    const slot = parseInt(values.slotNumber, 10);
    if (isNaN(slot) || slot < 1) {
      errors.slotNumber = 'Slot number must be at least 1.';
    } else if (slot > maxSlots) {
      errors.slotNumber = `Slot number must be between 1 and ${maxSlots}.`;
    }
  }

  return errors;
}
