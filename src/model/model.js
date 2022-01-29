import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
	uri: '/express',
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache',
			notifyOnNetworkStatusChange: 'true'
		}
	}
});

export const fetchCategories = () => {
	return client
		.query({
			query: gql`
				{
					categories {
						name
					}
				}
			`,
			notifyOnNetworkStatusChange: true
		})
		.then((result) => {
			return result;
		});
};

export const fetchProducts = () => {
	return client
		.query({
			notifyOnNetworkStatusChange: 'true',
			fetchPolicy: 'network-only',
			query: gql`
				{
					category {
						products {
							id
							name
							brand
							inStock
							prices {
								amount
								currency
							}
							gallery
							category
						}
					}
				}
			`
		})
		.then((result) => {
			return result;
		});
};

export const fetchProduct = (id) => {
	return client
		.query({
			notifyOnNetworkStatusChange: 'true',
			fetchPolicy: 'network-only',
			query: gql`
				query Product($id: String!) {
					product(id: $id) {
						id
						name
						brand
						inStock
						gallery
						description
						prices {
							amount
							currency
						}
						attributes {
							name
							items {
								id
							}
						}
					}
				}
			`,
			variables: { id }
		})
		.then((result) => {
			return result;
		});
};

export const fetchCartProduct = (id) => {
	return client
		.query({
			notifyOnNetworkStatusChange: 'true',
			fetchPolicy: 'network-only',
			query: gql`
				query Product($id: String!) {
					product(id: $id) {
						id
						name
						brand
						inStock
						prices {
							amount
							currency
						}
					}
				}
			`,
			variables: { id }
		})
		.then((result) => {
			return result;
		});
};

export const fetchCurrencies = () => {
	return client
		.query({
			notifyOnNetworkStatusChange: 'true',
			fetchPolicy: 'network-only',
			query: gql`
				{
					currencies
				}
			`
		})
		.then((result) => {
			return result;
		});
};
