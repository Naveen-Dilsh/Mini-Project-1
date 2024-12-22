import {create} from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast"

export const useCartStore = create((set,get)=>({
    cart:[],
    loading:false,
    total:0,
    subtotal:0,

    getCartItems :async()=>{
        
        try {
			const res = await axios.get("/cart");
			set({ cart: res.data });
            get().calculateTotals();
            toast.success("Cart items fetched successfully");
		} catch (error) {
			set({ cart: [] });
			toast.error("cant error occurred");
		}
    },

    addToCart : async (product)=>{
        try {
            console.log({productId:product._id})
            const response = await axios.post("/cart",{productId:product._id})
            toast.success(`${product.name} added to cart`,{ 
                icon: '🛒',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
                id:"cart",
              });
            set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response.data.message || "An error occurred");
		}
    },

    removeFromCart: async (productId) => {
		await axios.delete(`/cart`, { data: { productId } });
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
        toast.success("Item Removed")
	},
    updateQuantity :async (productId,quantity)=>{
        if(quantity===0){
            get().removeFromCart(productId)
            return;
        }
        console.log(productId)
        await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
        toast.success("Quantity changed");
    },

    calculateTotals: () => {
		const { cart, coupon } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		let total = subtotal;

		if (coupon) {
			const discount = subtotal * (coupon.discountPercentage / 100);
			total = subtotal - discount;
		}

		set({ subtotal, total });
	},

    clearCart: async () => {
		set({ cart: [], total: 0, subtotal: 0 });
	},
}))