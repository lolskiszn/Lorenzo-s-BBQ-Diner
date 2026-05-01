
export interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Menu {
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  item: string;
  status: 'Pending' | 'Preparing' | 'Completed';
  amount: number;
  time: string;
}

export const MENU_ITEMS: Menu[] = [
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken Plate',
    description: 'Slow-smoked chicken leg & thigh basted in our signature spicy BBQ sauce.',
    price: 55,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop',
    category: 'Plates'
  },
  {
    id: 'beef-ribs',
    name: 'Smoked Beef Ribs',
    description: 'Tender, fall-off-the-bone beef ribs smoked for 12 hours over hickory wood.',
    price: 85,
    image: '/regenerated_image_1777652998186.png',
    category: 'Signature'
  },
  {
    id: 'jollof-chicken',
    name: 'Jollof Rice + Grilled Chicken',
    description: 'Authentic smoky Jollof rice served with spicy grilled chicken and plantain.',
    price: 60,
    image: '/regenerated_image_1777652994519.png',
    category: 'Local Fusion'
  },
  {
    id: 'bbq-burger',
    name: 'BBQ Burger Combo',
    description: 'Hand-pressed beef patty, smoked bacon, cheddar, and onion rings with fries.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    category: 'Burgers'
  },
  {
    id: 'fried-rice-wings',
    name: 'Fried Rice + Wings',
    description: 'Oriental style fried rice served with 4 jumbo crispy BBQ wings.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=800&auto=format&fit=crop',
    category: 'Combos'
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    description: 'Chilled seasonal fruit juice pressed fresh daily.',
    price: 15,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=800&auto=format&fit=crop',
    category: 'Drinks'
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-001', customer: 'Kwame Mensah', item: 'Smoked Beef Ribs', status: 'Completed', amount: 85, time: '10:30 AM' },
  { id: 'ORD-002', customer: 'Abena Appiah', item: 'BBQ Chicken Plate', status: 'Preparing', amount: 55, time: '11:15 AM' },
  { id: 'ORD-003', customer: 'John Doe', item: 'Jollof Rice + Chicken', status: 'Pending', amount: 60, time: '11:45 AM' },
  { id: 'ORD-004', customer: 'Sarah Smith', item: 'BBQ Burger Combo', status: 'Completed', amount: 45, time: '09:45 AM' },
];
