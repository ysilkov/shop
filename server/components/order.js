import OrderMongoDB from "./orderMongoDB.js";

class Order {
  static async createOrder(email, fullName, phone, delivery, address, order) {
    try {
      const orderProducts = await OrderMongoDB.create({
        email,
        fullName,
        phone,
        delivery,
        address,
        order,
      });
      return orderProducts;
    } catch (e) {
      throw new ErrorMessage(e);
    }
  }
}

export default Order;
