/**
 * Core Financial Engine.
 * All mathematical logic regarding school fees happens here.
 */
class FeeCalculationService {
  
  /**
   * Calculates total invoice amounts securely.
   * @param {Array} items - Array of { amount: number }
   * @param {number} discount - Total discount amount to apply
   * @param {number} lateFee - Late fee penalty
   * @param {number} waiver - Amount waived by admin
   * @returns {Object} Complete breakdown of the invoice
   */
  static calculateInvoiceTotals(items, discount = 0, lateFee = 0, waiver = 0) {
    const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    
    // Formula: (Subtotal - Discount) + LateFee - Waiver
    let totalAmount = (subtotal - discount) + lateFee - waiver;
    
    if (totalAmount < 0) totalAmount = 0; // Prevent negative invoices

    return {
      subtotal,
      discount,
      lateFee,
      waiver,
      totalAmount
    };
  }

  /**
   * Determines the authoritative status of an invoice.
   */
  static determineInvoiceStatus(totalAmount, paidAmount, dueDate, isWaived = false) {
    if (isWaived || (totalAmount === 0 && paidAmount === 0)) return 'waived';
    if (paidAmount >= totalAmount) return 'paid';
    if (paidAmount > 0 && paidAmount < totalAmount) return 'partially_paid';
    
    if (new Date() > new Date(dueDate)) return 'overdue';
    
    return 'pending';
  }

  /**
   * Handles safe deduction/reversal for partial payments.
   */
  static calculateBalance(totalAmount, paidAmount) {
    let balance = totalAmount - paidAmount;
    return balance < 0 ? 0 : balance; 
  }
}

module.exports = FeeCalculationService;
