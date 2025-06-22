import { locale } from '@/config';

const pluralRules = new Intl.PluralRules(locale);

export function pluralizeText(count: number, singular: string, plural: string) {
  const grammaticalNumber = pluralRules.select(count);
  switch (grammaticalNumber) {
    case 'one':
      return singular;
    case 'other':
      return count + ' ' + plural;
    default:
      throw new Error('Unknown: ' + grammaticalNumber);
  }
}

export function formatPrice(
  currency: string,
  amountInCents: number,
  quantity = 1,
  locale = 'en-NG' // Nigerian locale
) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    (amountInCents * quantity) / 100
  );
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function deSlugifyAndTruncate(slug: string, maxLength = 50) {
  let words = slug.replace(/-/g, ' ');
  words = words.replace(/\b\w/g, char => char.toUpperCase()); // Capitalize words

  return words.length > maxLength
    ? words.substring(0, maxLength) + '...'
    : words;
}

export function truncate(words: string | null, maxLength = 50) {
  if (words) {
    return words.length > maxLength
      ? words.substring(0, maxLength) + '...'
      : words;
  }
}

export function maskPhoneNumber(
  phoneNumber: string,
  isRevealed: boolean
): string {
  const regex = /^(\+234)(\d{3})(\d{3})(\d{4})$/;
  const match = phoneNumber.match(regex);

  if (match) {
    const [, countryCode, firstThree, nextThree, lastFour] = match;
    return isRevealed
      ? `(${countryCode}) ${firstThree}-${nextThree}-${lastFour}`
      : `(${countryCode}) ${firstThree}-XXX-XXXX`;
  }

  return phoneNumber; // Return as-is if invalid
}
