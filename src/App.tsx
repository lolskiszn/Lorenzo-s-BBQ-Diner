/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, type FormEvent } from 'react';
import { 
  ShoppingBag, 
  ChevronRight, 
  Plus, 
  Minus, 
  X, 
  Utensils, 
  ChefHat, 
  CreditCard, 
  BarChart3, 
  Phone, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Package,
  CheckCircle,
  Menu as MenuIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS, MOCK_ORDERS, type Menu, type CartItem, type Order } from './constants';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    type: 'Pickup',
    address: ''
  });

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  , [cart]);

  const addToCart = (item: Menu) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
      setIsCartOpen(false);
    }, 5000);
  };

  return (
    <div className="h-screen bg-stone-50 text-zinc-900 font-sans flex flex-col overflow-hidden selection:bg-amber-500 selection:text-zinc-900">
      {/* Top Header / Demo Branding */}
      <header className="bg-zinc-900 text-stone-100 px-6 py-3 flex justify-between items-center border-b-2 border-bbq-gold z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-bbq-red rounded-lg flex items-center justify-center font-bold text-xl italic text-bbq-gold shadow-lg">L</div>
          <h1 className="text-xl font-black tracking-tight uppercase italic decoration-bbq-gold underline-offset-4 decoration-2">Lorenzo’s BBQ + Diner</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold">Product Sales Demo</span>
          <button className="bg-bbq-red hover:bg-red-700 text-white px-5 py-2 rounded-full text-[10px] font-black transition-all border border-red-900 shadow-xl uppercase tracking-widest active:scale-95">
            Let’s Discuss This Setup
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* LEFT COLUMN: Customer Ordering Experience (60%) */}
        <section className="lg:col-span-7 bg-stone-50 p-6 flex flex-col overflow-hidden border-r border-stone-200">
          <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            {/* Mini Hero */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-zinc-900 rounded-2xl p-8 overflow-hidden min-h-[200px] flex items-center shadow-2xl accent-border-l"
            >
              <div className="relative z-10 w-full lg:w-2/3">
                <h2 className="text-3xl font-black text-stone-100 leading-tight mb-3">
                  Smoky BBQ. Fresh Meals. <br/>
                  <span className="text-bbq-gold">Easy Online Ordering.</span>
                </h2>
                <p className="text-stone-400 text-sm mb-6 max-w-sm">
                  Order your favorite BBQ meals for pickup or delivery in just a few clicks.
                </p>
                <div className="flex gap-3">
                  <a href="#menu" className="bg-bbq-gold text-zinc-900 px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors">Order Now</a>
                  <a href="#menu" className="border border-stone-600 text-stone-300 px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition-colors">View Menu</a>
                </div>
              </div>
              <div 
                className="absolute right-[-20px] top-0 h-full w-1/2 opacity-40 bg-cover bg-center skew-x-[-12deg] scale-110" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600')" }}
              ></div>
            </motion.div>

            {/* Menu Grid */}
            <div id="menu">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 border-b border-stone-200 pb-3 flex justify-between items-end">
                <span className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-bbq-red" />
                  Our Signature Menu
                </span>
                <span className="text-bbq-red text-[10px] bg-bbq-red/5 px-2 py-0.5 rounded">GHS Pricing</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {MENU_ITEMS.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-xl shadow-sm border border-stone-200 p-3 hover:shadow-xl hover:border-bbq-gold/30 transition-all cursor-default"
                  >
                    <div className="h-32 bg-stone-100 rounded-lg mb-3 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt={item.name} 
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 bg-zinc-900/80 text-white text-[8px] font-black uppercase tracking-widest rounded-md backdrop-blur-sm">
                        {item.category}
                      </div>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xs font-bold leading-tight group-hover:text-bbq-red transition-colors">{item.name}</h4>
                      <span className="text-xs font-black text-bbq-red">GHS {item.price}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 line-clamp-1 mb-3">{item.description}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full bg-stone-100 text-[10px] font-black uppercase tracking-widest py-2 rounded-lg hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3 h-3" />
                      Add to Order
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Preview (Integrated) */}
          <div className="mt-8 bg-stone-100 rounded-2xl p-6 border-2 border-dashed border-stone-300 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-bbq-gold" />
                Your Demo Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h4>
              <div className="text-right">
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Total Amount</p>
                <span className="text-xl font-black text-bbq-red">GHS {cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {cart.length > 0 ? (
              <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <input 
                    required
                    type="text" 
                    placeholder="Customer Name" 
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full text-[11px] font-medium p-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-bbq-gold/20 outline-none transition-all"
                  />
                  <input 
                    required
                    type="tel" 
                    placeholder="Phone Number" 
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full text-[11px] font-medium p-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-bbq-gold/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <select 
                    value={customerInfo.type}
                    onChange={(e) => setCustomerInfo({...customerInfo, type: e.target.value})}
                    className="w-full text-[11px] font-medium p-3 bg-white border border-stone-200 rounded-xl outline-none"
                  >
                    <option>Pickup</option>
                    <option>Delivery</option>
                  </select>
                  <button 
                    type="submit"
                    className="w-full bg-bbq-red text-white text-[11px] font-black py-3 rounded-xl uppercase tracking-[0.2em] shadow-lg shadow-bbq-red/20 hover:bg-zinc-900 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    Place Demo Order
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 text-stone-400 text-xs italic">
                Add some delicious BBQ to see the checkout workflow.
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Business Operations (40%) */}
        <section className="lg:col-span-5 bg-zinc-900 p-8 flex flex-col text-stone-100 overflow-hidden border-l border-zinc-800">
          <div className="flex-1 overflow-y-auto space-y-10 pr-2 custom-scrollbar-dark">
            {/* POS Stats */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-bbq-gold mb-6 flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                POS Dashboard Preview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800 p-5 rounded-2xl border border-zinc-700 shadow-xl group hover:border-bbq-gold/30 transition-all">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Revenue Today</p>
                  <p className="text-2xl font-black text-bbq-gold flex items-baseline gap-1">
                    <span className="text-xs uppercase">GHS</span> 1,840
                  </p>
                </div>
                <div className="bg-zinc-800 p-5 rounded-2xl border border-zinc-700 shadow-xl group hover:border-bbq-gold/30 transition-all">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Total Orders</p>
                  <p className="text-2xl font-black">24</p>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-zinc-800 rounded-2xl border border-zinc-700 p-6 flex-1 shadow-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 flex justify-between items-center">
                Live Order Stream
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-700 text-zinc-600 text-[9px] uppercase font-black tracking-widest">
                      <th className="pb-3 pr-4">Customer</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-300 text-[11px]">
                    {MOCK_ORDERS.map((order, i) => (
                      <tr key={i} className="border-b border-zinc-700/50 last:border-0 hover:bg-white/5 transition-colors group">
                        <td className="py-4 pr-4 font-bold">{order.customer}</td>
                        <td className="py-4 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            order.status === 'Completed' ? 'bg-emerald-900/40 text-emerald-400' :
                             order.status === 'Preparing' ? 'bg-bbq-gold/10 text-bbq-gold' :
                             'bg-zinc-700 text-zinc-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right font-black group-hover:text-bbq-gold transition-colors">{order.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Workflow Diagram */}
            <div className="bg-bbq-red/5 border border-bbq-red/20 rounded-2xl p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-bbq-red mb-6 text-center">Integrated Workflow</p>
              <div className="flex items-center justify-between relative px-2">
                {[
                  { step: '01', label: 'Ordered', icon: ShoppingBag },
                  { step: '02', label: 'Kitchen', icon: ChefHat },
                  { step: '03', label: 'Ready', icon: CheckCircle2 }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 relative z-10 group">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[11px] font-black group-hover:bg-bbq-red transition-all shadow-lg">
                      <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                    </div>
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest group-hover:text-bbq-gold">{item.label}</span>
                  </div>
                ))}
                <div className="absolute top-5 left-10 right-10 h-[1px] bg-zinc-800 z-0"></div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-2 gap-4 pb-4">
              {[
                "Reduce Order Mix-ups",
                "Track Sales Easily",
                "Digital Receipts",
                "POS Connectivity"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-xl border border-zinc-800 group hover:border-bbq-gold/20 transition-all">
                  <div className="w-2 h-2 bg-bbq-gold rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                  <span className="text-[10px] text-zinc-400 uppercase font-black tracking-widest group-hover:text-stone-100 transition-colors">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Integrated Footer Info */}
      <footer className="bg-stone-200 px-6 py-3 border-t border-stone-300 flex justify-between items-center z-50">
        <p className="text-[10px] text-stone-500 font-black uppercase tracking-widest flex items-center gap-2">
          <Phone className="w-3 h-3" />
          Note: Real implementations integrate with MoMo, Visa, and WhatsApp APIs.
        </p>
        <div className="flex gap-6">
           <span className="hidden md:inline text-[9px] font-black text-stone-400 tracking-[0.2em]">DEMO ENVIRONMENT ACTIVE</span>
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-bbq-gold rounded-full"></div>
             <span className="text-[9px] font-black text-stone-500 tracking-widest uppercase">v2.0.0-geometric</span>
           </div>
        </div>
      </footer>

      {/* Success Notification */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 left-10 right-10 md:left-auto md:right-10 md:w-96 z-[100]"
          >
            <div className="bg-zinc-900 text-stone-100 p-8 rounded-3xl border-2 border-bbq-gold shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-bbq-gold">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 5 }}
                  className="w-full h-full bg-bbq-red"
                />
              </div>
              <div className="w-16 h-16 bg-bbq-gold text-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest mb-3 text-bbq-gold">Demo Order Received</h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Excellent! This is how Lorenzo’s could receive and manage online orders instantly through this portal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

