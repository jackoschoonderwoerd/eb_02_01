

export interface Beer {
	id?: string;
	seqNo: number;
	name: string;
	description: string;
	vessel: string;
	clVolume: number;
	alcoholPercentage: string;
	price: number;
}

export interface OrderedBeer {
	beer: Beer,
	amount: number,
}

export function sortBySeqNo(c1: Beer, c2: Beer) {
	return c1.seqNo - c2.seqNo;
}