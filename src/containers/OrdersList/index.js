import { Form, Select, InputNumber, Switch, Slider, Button, Space } from 'antd';

// Custom DatePicker that uses Day.js instead of Moment.js

import { SmileFilled } from '@ant-design/icons';

import Link from 'next/link';
import Image from 'next/image';

import DatePicker from 'src/components/Forms/DatePicker';

import classes from './style.module.less';





import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Tooltip } from 'antd';
const valueEnum = {
	0: 'close',
	1: 'running',
	2: 'online',
	3: 'error',
};
const tableListDataSource = [];
const orderNumber = ['ABCD00001', 'ABCD00002', 'ABCD00003', 'ABCD00004', 'ABCD00005'];
const projectName = ['PXN', 'Moon Birds', 'ZombieClub', 'FortuneDao genesis', 'Ajoe'];
const sellers = ['Kilo', 'Kz'];
const buyers = ['Luke', 'Tommy'];
for (let i = 0; i < 5; i += 1) {
	tableListDataSource.push({
		key: i,
		orderNumber: orderNumber[i],
		name: projectName[i],
		mintNum: Math.floor((Math.random() * 3) + 1),
		seller: sellers[Math.floor(Math.random() * sellers.length)],
		buyer: buyers[Math.floor(Math.random() * buyers.length)],
		status: valueEnum[Math.floor(Math.random() * 10) % 4],
		createdAt: Date.now() - Math.floor(Math.random() * 100000),
		memo: i % 2 === 1 ? '7/30白單public mint' : '简短备注文案',
	});
}

const columns = [
	{
		title: '訂單編號',
		width: 200,
		dataIndex: 'orderNumber',
		align: 'left',
	},
	{
		title: '專案名稱',
		width: 200,
		dataIndex: 'name',
		render: (_) => <a>{_}</a>,
		align: 'left',
	},
	{
		title: '可鑄造数量',
		dataIndex: 'mintNum',
		width: 200,
		align: 'left',
	},
	{
		title: '状态',
		width: 200,
		dataIndex: 'status',
		initialValue: 'all',
		valueEnum: {
			all: { text: '全部', status: 'Default' },
			close: { text: '关闭', status: 'Default' },
			running: { text: '進行中', status: 'Processing' },
			online: { text: '已完成', status: 'Success' },
			error: { text: '异常', status: 'Error' },
		},
		align: 'left',
	},
	{
		title: '賣家',
		width: 200,
		dataIndex: 'seller',
		align: 'left',
	},
	{
		title: '買家',
		width: 200,
		dataIndex: 'buyer',
		align: 'left',
	},
	{
		title: (<>
			创建时间
			<Tooltip placement="top" title="这是一段描述">
				<QuestionCircleOutlined style={{ marginLeft: 4 }} />
			</Tooltip>
		</>),
		width: 200,
		key: 'since',
		dataIndex: 'createdAt',
		valueType: 'date',
		sorter: (a, b) => a.createdAt - b.createdAt,
		align: 'left',
	},
	{
		title: '备注',
		width: 200,
		dataIndex: 'memo',
		ellipsis: true,
		copyable: true,
		align: 'left',
	},
];



const FormItem = Form.Item;
const Option = Select.Option;

const content = {
	marginTop: '100px',
};

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const OrdersList = (props) => {
	// const { } = props;

	return (
		<>

			<ProTable 
				columns={[
					...columns,
					{
						hideInSearch: true,
						key: 'operation',
						title: '操作',
						fixed: 'right',
						align: 'center',
						render: (text, record) =>
						(<Space>
							<Button onClick={() => { execute(OperationType.EDIT, record); }}>編輯</Button>
							<Button onClick={() => { execute(OperationType.DELETE, record); }}>刪除</Button>
						</Space>)
					}
				]} 
				request={(params, sorter, filter) => {
					// 表单搜索项会从 params 传入，传递给后端接口。
					console.log(params, sorter, filter);
					return Promise.resolve({
						data: tableListDataSource,
						success: true,
					});
				}} 
				rowKey="key" 
				pagination={{
					size: 'small',
					showQuickJumper: true,
				}} 
				search={{
					optionRender: false,
					collapsed: false,
				}} 
				dateFormatter="string" 
				headerTitle="表格标题" 
				toolBarRender={() => [
					<Space>
						<Button key={1} type="primary" onClick={() => { execute(OperationType.ADD); }}>
							新增
						</Button>
					</Space>
				]} 
			/>


		</>
	);
};

OrdersList.propTypes = propTypes;

OrdersList.defaultProps = defaultProps;

export default OrdersList;
