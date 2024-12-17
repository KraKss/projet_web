import DataTable from './DataTable';

const ProductTable = () => {
    const products = [
        { product_id: 1, seller_id: 2, name: '3D Printer', description: 'High-quality 3D printer', price: 500, filament_type: 'PLA' },
        { product_id: 2, seller_id: 3, name: '3D Filament', description: 'Red PLA filament', price: 30, filament_type: 'PLA' }
    ];

    const columns = ['product_id', 'seller_id', 'name', 'description', 'price', 'filament_type'];

    return <DataTable data={products} columns={columns} actions={true} />;
};

export default ProductTable;