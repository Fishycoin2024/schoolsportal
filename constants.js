module.exports = {
  ROLES: {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    PARENT: 'parent'
  },
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted'
  },
  ATTENDANCE_STATUS: {
    PRESENT: 'present',
    ABSENT: 'absent',
    LATE: 'late',
    LEAVE: 'leave'
  },
  FEE_STATUS: {
    PENDING: 'pending',
    PARTIALLY_PAID: 'partially_paid',
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
    WAIVED: 'waived'
  },
  PAYMENT_METHODS: {
    CASH: 'cash',
    BANK_TRANSFER: 'bank_transfer',
    ONLINE: 'online',
    CARD: 'card',
    CHEQUE: 'cheque',
    OTHER: 'other'
  },
  RESULT_PERIOD_TYPES: {
    TERM: 'term',
    QUARTER: 'quarter',
    SEMESTER: 'semester',
    MID_TERM: 'mid_term',
    FINAL_TERM: 'final_term',
    MONTHLY: 'monthly',
    CUSTOM: 'custom'
  }
};
