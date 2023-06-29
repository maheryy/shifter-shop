import Table from "@/components/Table";
import DeleteIcon from "@/components/Table/DeleteIcon";
import UpdateIcon from "@/components/Table/UpdateIcon";

const headers = ['Email', 'Firstname', 'Lastname', 'Phone', 'Address', 'Status', 'Actions'];

const customersData = [
    {
        id: 1,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 2,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 3,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 4,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 5,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 6,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 7,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 8,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 9,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 10,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 11,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
    {
        id: 12,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        phone: '1234567890',
        address: '123 Main St',
        status: 'Active',
    },
];

const button = () => {
    return (
        <>
            <button
                className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
                Edit
            </button>
        </>
    );
};

const Customers = () => {
    return (
        <div>
            <div className="flex flex-col flex-1 w-full">
                <main className="h-full pb-16 overflow-y-auto">
                    <div className="container grid px-6 mx-auto">
                        <h2
                            className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                        >
                            List of Customers
                        </h2>
                        <Table headers={headers} data={customersData} children={<><UpdateIcon /><DeleteIcon /></>} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Customers;