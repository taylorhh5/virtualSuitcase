  export const categories = [
    { key: 'hat', label: 'Hat' },
    { key: 'shoes', label: 'Shoes' },
    { key: 'top', label: 'Top' },
    { key: 'bottom', label: 'Bottom' },
    { key: 'toiletries', label: 'Toiletries' },
    { key: 'miscellaneous', label: 'Misc' },
    { key: 'underwear', label: 'Underwear' },
    { key: 'socks', label: 'Socks' },
    { key: 'makeup', label: 'Makeup' }
];

export const CategoryMapper: { [key: string]: string } = {
  hat: 'Hats',
  shoes: 'Shoes',
  top: 'Tops',
  bottom: 'Bottoms',
  toiletries: 'Toiletries',
  miscellaneous: 'Miscellaneous',
  underwear: 'Underwear',
  socks: 'Socks',
  makeup: 'Makeup'
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
  makeup: '💄'
};