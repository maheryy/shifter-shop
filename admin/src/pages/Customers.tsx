import Table from "@/components/Table";

const headers = ['Email', 'Firstname', 'Lastname', 'Phone', 'Address', 'Role', 'Status', 'Actions'];

const customersData = [
    {
        id: 1,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 2,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 3,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 4,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 5,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 6,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 7,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 8,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 9,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 10,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 11,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 12,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        phone: '1234567890',
        address: '123 Main St',
        role: 'Admin',
        status: 'Active',
    },
];

const Customers = () => {
    return (
        <div>
            <div className="flex flex-col flex-1 w-full">
                <main className="h-full pb-16 overflow-y-auto">
                    <div className="container grid px-6 mx-auto">
                        <h2
                            className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Customers
                        </h2>
                        <Table headers={headers} data={customersData} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Customers;