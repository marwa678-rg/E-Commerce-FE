import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { api } from "../../../API/api";
import { handleError } from "../../../utils/errorHandler";
import {
  BsBoxSeamFill,
  BsCartCheckFill,
  BsClockHistory,
  BsCashStack,
} from "react-icons/bs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

//CSS
import "./dashboard.css";

export const Dashboard = () => {
  //Loading State
  const [loading, setLoading] = useState(false);
  //States
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  //Fetch Products
  async function fetchAllProducts() {
    try {
      //call API => /api/v1/products
      const response = await api.get("/products");

      console.log(response.data.products);

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  // Fetch Orders
  async function fetchAllOrders() {
    try {
      //call API => /api/v1/order
      const response = await api.get("/order");

      console.log(response.data.orders);

      setOrders(response.data.orders);
    } catch (error) {
      handleError(error);
    }
  }

  //useEffect
  useEffect(() => {
    //Fetch dashboard Data
    async function fetchDashboardData() {
      try {
        setLoading(true);
        await fetchAllProducts();
        await fetchAllOrders();
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  //Dashboard Statistics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "pending",
  ).length;
  const totalRevenue = orders.reduce(
    (total, order) => total + order.totalPrice,
    0,
  );

  const statistics = [
    { title: "Total Products", value: totalProducts, icon: <BsBoxSeamFill /> },
    { title: "Total Orders", value: totalOrders, icon: <BsCartCheckFill /> },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <BsClockHistory />,
    },
    {
      title: "Total Revenue",
      value: `${totalRevenue}  EGP`,
      icon: <BsCashStack />,
    },
  ];
  //chart data
  const pending = orders.filter(
    (order) => order.orderStatus === "pending",
  ).length;
  const processing = orders.filter(
    (order) => order.orderStatus === "processing",
  ).length;
  const shipped = orders.filter(
    (order) => order.orderStatus === "shipped",
  ).length;
  const delivered = orders.filter(
    (order) => order.orderStatus === "delivered",
  ).length;
  const cancelled = orders.filter(
    (order) => order.orderStatus === "cancelled",
  ).length;
  //Pie Chart
  const chartData = [
    { name: "Pending", value: pending },
    { name: "Processing", value: processing },
    { name: "Shipped", value: shipped },
    { name: "Delivered", value: delivered },
    { name: "Cancelled", value: cancelled },
  ];

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const COLORS = [
    "#ffc107", // Pending (warning)
    "#0d6efd", // Processing (primary)
    "#17a2b8", // Shipped (info)
    "#198754", // Delivered (success)
    "#dc3545", // Cancelled (danger)
  ];

  return (
    <>
      <Container fluid>
        <h2 className="mb-4 fw-bold  dashboard_admin">Dashboard Overview</h2>
        <Row className="g-4 pt-3">
          {statistics.map((item, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="dashboard-icon">{item.icon}</div>
                  <h5>{item.title}</h5>
                  <h2>{item.value}</h2>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h2 className="my-4">Orders Status</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name">
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Container>
    </>
  );
};
