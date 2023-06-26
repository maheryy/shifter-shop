import Modal from "@/components/Modal";
import Table from "@/components/Table";
import ModalProduct from "@/components/Modal/ModalProduct";

const headers = ['Name', 'Price', 'Category', 'Seller', 'Status', 'Actions'];

const productsData = [
    {
        id: 1,
        name: 'Casque moto',
        price: 100,
        category: 'Accessoire',
        seller: 'Shiftershop',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Gants moto',
        price: 100,
        category: 'Turbo',
        seller: 'Shiftershop',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Shifter pro',
        price: 100,
        category: 'Turbo',
        seller: 'Shiftershop',
        status: 'Active',
    },
    {
        id: 4,
        name: 'Shifter pro',
        price: 100,
        category: 'Turbo',
        seller: 'Shiftershop',
        status: 'Active',
    },
    {
        id: 5,
        name: 'Shifter pro',
        price: 100,
        category: 'Turbo',
        seller: 'Shiftershop',
        status: 'Active',
    },
    {
        id: 6,
        name: 'Shifter pro',
        price: 100,
        category: 'Turbo',
        seller: 'Shiftershop',
        status: 'Active',
    },
];

const Products = () => {
    return (
        <div>
            <div className="flex flex-col flex-1 w-full">
                <main className="h-full pb-16 overflow-y-auto">
                    <div className="container grid px-6 mx-auto">
                        <h2
                            className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                        >
                            List of Products
                        </h2>
                        <Table headers={headers} data={productsData}
                            children={
                                <Modal
                                    children={
                                        <ModalProduct
                                            title="Edit Product"
                                            description="Edit the product"
                                            image="https://source.unsplash.com/random/800x600"
                                            price={100}
                                            category="Turbo"
                                            seller="Shiftershop"
                                            status="Active"
                                        />
                                    }
                                />
                            }
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Products;