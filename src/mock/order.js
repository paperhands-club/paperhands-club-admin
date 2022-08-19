const orders = [
  {
    "id": "mock-1233",
    "quantity": 1,
    "price": "0.1000",
    "type": 2
  },
  {
    "id": "mock-1236",
    "quantity": 2,
    "price": "0.1000",
    "type": 0
  }
]

// export物件
// export default {
//   fn1: () => {...},
//   fn2: () => {...},
// }
export default {
  getOrders: () => {
    return {
      code: "200",
      result: orders,
    };
  },
  addOrder: () => {
    return {
      status: 0,
    };
  },
  editOrder: () => {
    return {
      status: 0,
    };
  },
  deleteOrder: () => {
    return {
      status: 0,
    };
  },
};
