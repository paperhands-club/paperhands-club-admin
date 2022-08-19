import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { getOrders, deleteOrder, editOrder, addOrder } from "@/api/order";
import TypingCard from '@/components/TypingCard'
import EditOrderForm from "./forms/edit-order-form"
import AddOrderForm from "./forms/add-order-form"

const { Column } = Table;
class Order extends Component {
  state = {
    result: [],
    currentRowData: {},
    editOrderModalVisible: false,
    editOrderModalLoading: false,
    addOrderModalVisible: false,
    addOrderModalLoading: false,
  };

  getOrders = async () => {
    const response = await getOrders()
    // console.log(response);
    const { result, code } = response.data
    if (code === "200") {
      this.setState({
        result
      })
    }
  }

  handleEditOrder = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editOrderModalVisible: true,
    });
  };
  
  handleEditOrderOk = _ => {
    const { form } = this.editOrderFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true, });
      editOrder(values).then((response) => {
        // console.log(response);
        form.resetFields();
        this.setState({ editOrderModalVisible: false, editOrderModalLoading: false });
        message.success("编辑成功!")
        this.getOrders()
      }).catch(e => {
        message.success("编辑失败,请重试!")
      })
      
    });
  };

  handleAddOrder = (row) => {
    this.setState({
      addOrderModalVisible: true,
    });
  };

  handleAddOrderOk = _ => {
    const { form } = this.addOrderFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addOrderModalLoading: true, });
      addOrder(values).then((response) => {
        // console.log(response);
        form.resetFields();
        this.setState({ addOrderModalVisible: false, addOrderModalLoading: false });
        message.success("添加成功!")
        this.getOrders()
      }).catch(e => {
        message.success("添加失败,请重试!")
      })
    });
  };

  handleCancel = _ => {
    this.setState({
      editOrderModalVisible: false,
      addOrderModalVisible: false,
    });
  };
  
  handleDeleteOrder = (row) => {
    const { id } = row
    if (id === "admin") {
      message.error("不能删除管理员用户！")
      return
    }
    deleteOrder({id}).then(res => {
      // console.log(res);
      message.success("删除成功")
      this.getOrders();
    })
  }

  componentDidMount() {
    this.getOrders()
  }

  render() {
    const { result } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddOrder}>添加訂單</Button>
      </span>
    )
    const cardContent = `訂單管理頁面`
    return (
      <div className="app-container">
        <TypingCard title='訂單管理' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={result} pagination={false}>
            <Column title="訂單ID" dataIndex="id" key="id" align="center"/>
            <Column title="訂單數量" dataIndex="quantity" key="quantity" align="center"/>
            <Column title="訂單價格" dataIndex="price" key="price" align="center"/>
            <Column title="訂單類型" dataIndex="type" key="type" align="center" />
            <Column title="操作" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="编辑" onClick={this.handleEditOrder.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="删除" onClick={this.handleDeleteOrder.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>

        <EditOrderForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editOrderFormRef = formRef}
          visible={this.state.editOrderModalVisible}
          confirmLoading={this.state.editOrderModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditOrderOk}
        />  

        <AddOrderForm
          wrappedComponentRef={formRef => this.addOrderFormRef = formRef}
          visible={this.state.addOrderModalVisible}
          confirmLoading={this.state.addOrderModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddOrderOk}
        />  
      </div>
    );
  }
}

export default Order;
