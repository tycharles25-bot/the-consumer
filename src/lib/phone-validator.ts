// Phone number validation and formatting utilities

export function validatePhoneNumber(phone: string): { valid: boolean; formatted?: string; error?: string } {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Check US phone number format (country code 1, 10 digits)
  if (digits.length === 11 && digits.startsWith('1')) {
    // Validate area code and exchange code for US format
    const areaCode = digits.substring(1, 4);
    const exchange = digits.substring(4, 7);
    
    // Area code cannot start with 0 or 1
    if (areaCode[0] === '0' || areaCode[0] === '1') {
      return { valid: false, error: 'Invalid US area code' };
    }
    
    // Exchange code cannot start with 0 or 1
    if (exchange[0] === '0' || exchange[0] === '1') {
      return { valid: false, error: 'Invalid US phone number format' };
    }
    
    return { valid: true, formatted: `+${digits}` };
  }
  
  // Check if it's already a 10-digit US number without country code
  if (digits.length === 10) {
    // Validate area code and exchange code
    const areaCode = digits.substring(0, 3);
    const exchange = digits.substring(3, 6);
    
    if (areaCode[0] === '0' || areaCode[0] === '1') {
      return { valid: false, error: 'Invalid US area code' };
    }
    
    if (exchange[0] === '0' || exchange[0] === '1') {
      return { valid: false, error: 'Invalid US phone number format' };
    }
    
    return { valid: true, formatted: `+1${digits}` };
  }
  
  // Reject non-US numbers
  if (digits.length > 0 && !digits.startsWith('1')) {
    return { valid: false, error: 'Only United States (+1) phone numbers are allowed' };
  }
  
  return { valid: false, error: 'Please enter a valid US phone number (e.g., 5551234567)' };
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  
  return phone;
}

