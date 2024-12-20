import { useState } from 'react';
import DataTable from './DataTable';
import ProductForm from './Form/ProductForm.jsx';

const ProductTable = () => {
    const [products, setProducts] = useState([
        { product_id: 1, seller_id: 2, name: '3D Printer', description: 'High-quality 3D printer', price: 500, filament_type: 'PLA' },
        { product_id: 2, seller_id: 3, name: '3D Filament', description: 'Red PLA filament', price: 30, filament_type: 'PLA' },
        { product_id: 3, seller_id: 4, name: 'Resin Printer', description: 'Precision resin printer', price: 700, filament_type: 'Resin' },
        { product_id: 4, seller_id: 5, name: 'Resin', description: 'High-quality resin for printing', price: 50, filament_type: 'Resin' },
        { product_id: 5, seller_id: 6, name: '3D Scanner', description: 'Portable 3D scanner', price: 1200, filament_type: null },
        { product_id: 6, seller_id: 7, name: '3D Pen', description: '3D pen for drawing', price: 50, filament_type: 'PLA' },
        { product_id: 7, seller_id: 1, name: '3D test', description: 'test', price: 150, filament_type: null },
    ]);

    const columns = ['product_id', 'seller_id', 'name', 'description', 'price', 'filament_type'];

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [
            ...prevProducts,
            { ...newProduct, product_id: prevProducts.length + 1 },
        ]);
    };

    return (
        <div>
            <DataTable
                data={products}
                columns={columns}
                form={( dataUpdate = null) => {
                    console.log(dataUpdate);
                    return <ProductForm  dataUpdate={dataUpdate}/>}
                }
            />
        </div>
    );
};

export default ProductTable;
