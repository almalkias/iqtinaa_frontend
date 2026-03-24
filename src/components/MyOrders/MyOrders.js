import Order from "../Order/Order";
import { useState, useContext, useEffect } from "react";
import "./MyOrders.css";
import apiClient from "../../api/client";
import { AuthContext } from "../contexts/AuthContext";
import { useLoading } from '../contexts/LoadingContext';


function MyOrders() {
    const [orders, setOrders] = useState([]);
    const { authToken } = useContext(AuthContext);
    const { loading, setIsLoading } = useLoading();

    useEffect(() => {
        setIsLoading(true);
        const fetchOrders = async () => {
            try {
                const response = await apiClient.get("orders/")
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [authToken, setIsLoading]);

    return (
        <div className='my-orders'>
            <div className="container">
                {!loading && orders.length === 0 && <h3 id='no-orders'>لا يوجد طلبات</h3>}
                {!loading && orders.length > 0 && orders.map(order => (
                    <Order key={order.id} paints={order} />
                ))}
            </div>
        </div>
    )
}

export default MyOrders;
