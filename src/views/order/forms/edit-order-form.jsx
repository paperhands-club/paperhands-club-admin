import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
const { TextArea } = Input;
class EditOrderForm extends Component {
  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
    } = this.props;
    const { getFieldDecorator } = form;
    const { id, quantity, price, type } = currentRowData;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="编辑"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="用户ID:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="訂單數量:">
            {getFieldDecorator("quantity", {
              rules: [{ required: true, message: "请输入訂單數量!" }],
              initialValue: quantity,
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value={1}>single</Select.Option>
                <Select.Option value={2}>bundle</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="訂單價格:">
            {getFieldDecorator("price", {
              initialValue: price,
            })(<Input placeholder="请输入訂單價格" />)}
          </Form.Item>
          <Form.Item label="訂單類型:">
            {getFieldDecorator("type", {
              initialValue: type,
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value={0}>出錢包</Select.Option>
                <Select.Option value={1}>出DC</Select.Option>
                <Select.Option value={2}>填地址</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditOrderForm" })(EditOrderForm);
