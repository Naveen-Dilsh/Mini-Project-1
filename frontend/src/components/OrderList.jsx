import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Package, 
  Clock, 
  CheckCircle2, 
  ChevronDown,
  Search,
  FilterX
} from 'lucide-react';

const sampleOrders = [
  {
    id: "ORD-001",
    date: "2024-02-08",
    total: 299.99,
    status: "Delivered",
    items: [
      { 
        name: "Premium Watch", 
        quantity: 1, 
        price: 299.99,
        image: "/api/placeholder/120/120"
      }
    ]
  },
  {
    id: "ORD-002",
    date: "2024-02-01",
    total: 459.98,
    status: "Processing",
    items: [
      { 
        name: "Leather Bag", 
        quantity: 1, 
        price: 399.99,
        image: "/api/placeholder/120/120"
      },
      { 
        name: "Wallet", 
        quantity: 1, 
        price: 59.99,
        image: "/api/placeholder/120/120"
      }
    ]
  },
  {
    id: "ORD-003",
    date: "2024-01-25",
    total: 789.97,
    status: "In Transit",
    items: [
      { 
        name: "Designer Shoes", 
        quantity: 1, 
        price: 599.99,
        image: "/api/placeholder/120/120"
      },
      { 
        name: "Belt", 
        quantity: 1, 
        price: 89.99,
        image: "/api/placeholder/120/120"
      },
      { 
        name: "Socks Set", 
        quantity: 1, 
        price: 99.99,
        image: "/api/placeholder/120/120"
      }
    ]
  }
];

const OrdersList = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'In Transit':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'Processing':
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <ShoppingBag className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white/90 p-4 rounded-lg border border-slate-200 shadow-md">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
        >
          <option value="All">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="In Transit">In Transit</option>
          <option value="Processing">Processing</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white/90 rounded-lg border border-slate-200 shadow-md overflow-hidden">
              {/* Order Header */}
              <div
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="p-4 cursor-pointer hover:bg-slate-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-semibold text-slate-800">{order.id}</h3>
                      <p className="text-sm text-slate-500">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-slate-800">
                      ${order.total.toFixed(2)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform duration-200 
                        ${expandedOrder === order.id ? 'transform rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {expandedOrder === order.id && (
                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-slate-200 last:border-b-0 last:pb-0">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-slate-800">{item.name}</p>
                          <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <p className="font-medium text-slate-800">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-slate-200">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-slate-800">Total</p>
                        <p className="font-semibold text-slate-800">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/90 rounded-lg border border-slate-200">
            <FilterX className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No Orders Found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;