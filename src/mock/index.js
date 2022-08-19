import Mock from "mockjs";
import loginAPI from "./login";
import remoteSearchAPI from "./remoteSearch";
import tableAPI from "./table";
import monitor from "./monitor";
import order from "./order";

// 呼叫以下路徑的api會被攔截，並直接返回mock數據

// 登录与用户相关
Mock.mock(/\/login/, "post", loginAPI.login);
Mock.mock(/\/logout/, "post", loginAPI.logout);
Mock.mock(/\/userInfo/, "post", loginAPI.userInfo);
Mock.mock(/\/user\/list/, "get", loginAPI.getUsers);
Mock.mock(/\/user\/delete/, "post", loginAPI.deleteUser);
Mock.mock(/\/user\/edit/, "post", loginAPI.editUser);
Mock.mock(/\/user\/validatUserID/, "post", loginAPI.ValidatUserID);
Mock.mock(/\/user\/add/, "post", loginAPI.addUser);


// dashboard
Mock.mock(/\/transaction\/list/, "get", remoteSearchAPI.transactionList);

// table
Mock.mock(/\/table\/list/, "post", tableAPI.tableList);
Mock.mock(/\/table\/delete/, "post", tableAPI.deleteItem);
Mock.mock(/\/table\/edit/, "post", tableAPI.editItem);

// monitor
Mock.mock(/\/monitor/, "post", monitor.monitor);

// order
Mock.mock(/\/order\/get_orders_listing/, "get", order.getOrders);
Mock.mock(/\/order\/add/, "post", order.addOrder);
Mock.mock(/\/order\/edit/, "put", order.editOrder);
Mock.mock(/\/order\/delete/, "del", order.deleteOrder);

export default Mock;
