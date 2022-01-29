export const migrations = {
	1: (previsousVersionState) => ({
		number: {
			change: previsousVersionState.number,
			lastUpdate: new Date()
		}
	})
};
