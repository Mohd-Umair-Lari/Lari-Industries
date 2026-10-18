import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUSD(amount: number, unit?: string): string {
  if (amount === 0 && unit?.toLowerCase().includes('custom')) {
    return 'Custom Choice';
  }
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return unit ? `${formatted} ${unit}` : formatted;
}

// Backward-compatible alias
export const formatPrice = formatUSD;

export const VALID_PROMO_CODES: Record<string, { percent: number; label: string }> = {
  SAFETY10: { percent: 10, label: '10% Industrial Safety Discount' },
  LARI2026: { percent: 15, label: '15% New Year 2026 Privilege' },
  BULK20: { percent: 20, label: '20% Bulk Industrial Order Discount' },
};
