import { ProductCategoryModel } from '../product-categories/product-category.model';

export class ProductModel {
    id: number;
    name: string;
    orderInstruction: string;
    onLocation: boolean;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.orderInstruction = data.orderInstruction;
        this.onLocation = data.onLocation;
    }
}

export class ProductListModel extends ProductModel {
    productCategory: ProductCategoryModel;

    constructor(data) {
        super(data);
        this.productCategory = data.productCategory;
    }
}

export class ProductViewModel extends ProductListModel {
    constructor(data) {
        super(data);
    }
}
