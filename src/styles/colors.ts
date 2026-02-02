// 莫蘭迪色系配色方案
export const colors = {
  // 主色調 - 淡藍灰
  primary: {
    50: '#F0F2F8',
    100: '#E1E6F1',
    200: '#C3CDE3',
    300: '#A5B4D5',
    400: '#8B9DC3',
    500: '#6B85B1',
    600: '#556B8D',
    700: '#3F5069',
    800: '#293445',
    900: '#131A22',
  },
  
  // 次色調 - 淡綠灰
  secondary: {
    50: '#F2F4F2',
    100: '#E5E9E5',
    200: '#CBD3CB',
    300: '#B1BDB1',
    400: '#A8B2A5',
    500: '#8A9D87',
    600: '#6E7E6B',
    700: '#525E4F',
    800: '#363F34',
    900: '#1A1F19',
  },
  
  // 強調色 - 淡粉褐
  accent: {
    50: '#F8F5F2',
    100: '#F1EBE5',
    200: '#E3D7CB',
    300: '#D5C3B1',
    400: '#D4B5A0',
    500: '#C4A085',
    600: '#9D806A',
    700: '#76604F',
    800: '#4F4035',
    900: '#27201A',
  },
  
  // 中性色 - 溫暖灰
  neutral: {
    50: '#F5F3F0',
    100: '#EBE7E1',
    200: '#D7CFC3',
    300: '#C3B7A5',
    400: '#AF9F87',
    500: '#9B8769',
    600: '#7C6C54',
    700: '#5D513F',
    800: '#3E362A',
    900: '#1F1B15',
  },
  
  // 功能色
  success: '#A8C4A2',
  warning: '#E5C785',
  error: '#D4A5A5',
  info: '#A5C4D4',
  
  // 背景色
  background: '#F5F3F0',
  surface: '#FFFFFF',
  
  // 文字色
  text: {
    primary: '#3E362A',
    secondary: '#5D513F',
    tertiary: '#7C6C54',
    inverse: '#F5F3F0',
  }
};

// Tailwind 樣式對應
export const tw = {
  // 主色調
  primary: {
    bg: 'bg-[#8B9DC3]',
    bgHover: 'bg-[#6B85B1]',
    bgLight: 'bg-[#E1E6F1]',
    text: 'text-[#8B9DC3]',
    border: 'border-[#8B9DC3]',
  },
  
  // 次色調
  secondary: {
    bg: 'bg-[#A8B2A5]',
    bgHover: 'bg-[#8A9D87]',
    bgLight: 'bg-[#E5E9E5]',
    text: 'text-[#A8B2A5]',
    border: 'border-[#A8B2A5]',
  },
  
  // 強調色
  accent: {
    bg: 'bg-[#D4B5A0]',
    bgHover: 'bg-[#C4A085]',
    bgLight: 'bg-[#F1EBE5]',
    text: 'text-[#D4B5A0]',
    border: 'border-[#D4B5A0]',
  },
  
  // 中性色
  neutral: {
    bg: 'bg-[#9B8769]',
    bgHover: 'bg-[#7C6C54]',
    bgLight: 'bg-[#EBE7E1]',
    bgLighter: 'bg-[#F5F3F0]',
    text: 'text-[#9B8769]',
    textPrimary: 'text-[#3E362A]',
    textSecondary: 'text-[#5D513F]',
    textTertiary: 'text-[#7C6C54]',
    border: 'border-[#D7CFC3]',
    borderLight: 'border-[#EBE7E1]',
  },
  
  // 功能色
  success: {
    bg: 'bg-[#A8C4A2]',
    bgHover: 'bg-[#96B290]',
    bgLight: 'bg-[#E8F1E6]',
    text: 'text-[#A8C4A2]',
    textDk: 'text-[#8ca786]',
  },
  
  warning: {
    bg: 'bg-[#E5C785]',
    bgHover: 'bg-[#DDB96B]',
    bgLight: 'bg-[#F7F1E1]',
    text: 'text-[#E5C785]',
  },
  
  error: {
    bg: 'bg-[#D4A5A5]',
    bgHover: 'bg-[#C99191]',
    bgLight: 'bg-[#F3E8E8]',
    text: 'text-[#D4A5A5]',
  },
  
  info: {
    bg: 'bg-[#A5C4D4]',
    bgHover: 'bg-[#91B5C9]',
    bgLight: 'bg-[#E8F1F5]',
    text: 'text-[#A5C4D4]',
    textDk: 'text-[#748e9c]',
  }
};