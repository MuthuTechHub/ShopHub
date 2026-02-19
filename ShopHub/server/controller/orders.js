const orderModel = require("../models/orders");

class Order {
  // Fetch all orders for the Admin Dashboard
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Fetch orders for a specific user
  async getOrderByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All fields must be required" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  // Create a new order with dummy transaction details
  async postCreateOrder(req, res) {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    
    // Validate all required fields
    if (!allProduct || !user || !amount || !transactionId || !address || !phone) {
      return res.json({ error: "All fields are required to place an order" });
    } else {
      try {
        let newOrder = new orderModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        
        let save = await newOrder.save();
        if (save) {
          return res.json({ success: true, message: "Order created successfully" });
        }
      } catch (err) {
        console.log(err);
        return res.json({ error: "Database error: Could not save order" });
      }
    }
  }

  // Update order status (e.g., Shipped, Delivered)
  async postUpdateOrder(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All fields must be required" });
    } else {
      try {
        let currentOrder = await orderModel.findByIdAndUpdate(oId, {
          status: status,
          updatedAt: Date.now(),
        });
        if (currentOrder) {
          return res.json({ success: "Order updated successfully" });
        }
      } catch (err) {
        console.log(err);
        return res.json({ error: "Error updating order" });
      }
    }
  }

  // Delete an order from the database
  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "Order ID is required" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (err) {
        console.log(err);
        return res.json({ error: "Error deleting order" });
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;