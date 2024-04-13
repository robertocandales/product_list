import React, { createContext, useContext } from 'react';
import useStateWithStorage from '../hooks/useStateWithStorage';

interface OrderItem {
  id: string;
  subTotal: number;
  total: number;
}

interface OrderContextType {
  orderItems: OrderItem[];
  subTotal: number;
  addToOrder: (item: OrderItem) => void;
}

// Create the context
const OrderContext = createContext<OrderContextType>({
  orderItems: [],
  subTotal: 0,
  addToOrder: () => {},
});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const [orderItems, setOrderItems] = useStateWithStorage<OrderItem[]>(
    'orderItems',
    []
  );
  const [subTotal, setSubtotal] = useStateWithStorage<number>('subTotal', 0);

  const calculateSubtotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.subTotal, 0);
  };

  const addToOrder = (item: OrderItem) => {
    setOrderItems([...orderItems, item]);
    setSubtotal(calculateSubtotal([...orderItems, item]));
  };

  return (
    <OrderContext.Provider value={{ orderItems, subTotal, addToOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
