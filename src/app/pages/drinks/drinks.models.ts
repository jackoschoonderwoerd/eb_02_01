export interface DrinkCategory {
	id?: string;
	name: string;
	seqNo: number;
}

export interface Drink {
	id?: string;
	name: string;
	nameDutch: string;
	nameEnglish: string;
	categoryId: string
	price: number;
	seqNo: number;
	vessel: string;
}