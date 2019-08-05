import { ProductModel } from '../products/product.model';
import { SupplierModel } from '../suppliers/supplier.model';

export class SupplierProductModel {
    id: number;
    title: string;
    description: string;
    imageFilename: string;
    imageUrl: string;
    imageThumbnailUrl: string;
    product: ProductModel;

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.imageFilename = data.imageFilename;
        this.imageUrl = data.imageUrl;
        this.imageThumbnailUrl = data.imageThumbnailUrl;
        this.product = data.product;
    }
}

export class SupplierProductListModel extends SupplierProductModel {
    supplier: SupplierModel;

    constructor(data) {
        super(data);
        this.supplier = data.supplier;
    }
}

export class SupplierProductViewModel extends SupplierProductListModel {
    createdAt: Date;

    constructor(data) {
        super(data);
        this.createdAt = data.createdAt;
    }
}
