export const categories = [
  { key: 'hat', label: 'Hats' },
  { key: 'top', label: 'Tops' },
  { key: 'bottom', label: 'Bottoms' },
  { key: 'underwear', label: 'Underwear' },
  { key: 'socks', label: 'Socks' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'toiletries', label: 'Toiletries' },
  { key: 'electronics', label: 'Electronics' },
  { key: 'miscellaneous', label: 'Misc' }
];

export const CategoryMapper: { [key: string]: string } = {
  hat: 'Hats',
  top: 'Tops',
  bottom: 'Bottoms',
  underwear: 'Underwear',
  socks: 'Socks',
  shoes: 'Shoes',
  toiletries: 'Toiletries',
  electronics: 'Electronics',
  miscellaneous: 'Miscellaneous',
};


// Define the category mapping with emojis. May add directly to category objects
export const categoryEmojis: { [key: string]: string } = {
  hat: '🧢',
  shoes: '👟',
  top: '👕',
  bottom: '👖',
  toiletries: '🪥',
  miscellaneous: '🔧',
  underwear: '🩲',
  socks: '🧦',
  electronics: '🎧'
};