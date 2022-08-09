import React from 'react';
// import PropTypes from 'prop-types';

import Head from 'src/components/Head';

import OrdersList from 'src/containers/OrdersList';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const OrdersPage = (props) => {
	// const { } = props;

	return (
		<>
			<Head title="Orders" />
			<OrdersList />
		</>
	);
};

OrdersPage.propTypes = propTypes;

OrdersPage.defaultProps = defaultProps;

export default OrdersPage;
