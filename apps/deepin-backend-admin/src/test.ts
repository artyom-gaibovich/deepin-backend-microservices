async function fetchAPI() {
	await new Promise(
		(res) => {
			setTimeout(
				res,
				500,
			);
		},
	);
	return 'OK';
}

const arr =
	new Array<
		() => Promise<string>
	>(100).fill(
		fetchAPI,
	);

arr.reduce(
	async (
		promiseChain,
		currentPromise,
	) => {
		console.log(
			await promiseChain,
		);
		return currentPromise();
	},
	Promise.resolve(
		'BEGIN',
	),
);
