import Table from "@/components/Table";

const headers = ['Email', 'Firstname', 'Lastname', 'Role', 'Status', 'Actions'];

const sellersData = [
    {
        id: 1,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 2,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 3,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 4,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 5,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 6,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 7,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 8,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 9,
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 10,
        email: 'jane.doe@gmail.com',
        firstname: 'Jane',
        lastname: 'Doe',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 11,
        email: 'karim.dahoumane@gmail.com',
        firstname: 'Karim',
        lastname: 'Dahoumane',
        role: 'Seller',
        status: 'Active',
    },
    {
        id: 12,
        email: 'stanley.crico@gmail.com',
        firstname: 'Stanley',
        lastname: 'Crico',
        role: 'Seller',
        status: 'Active',
    },
];

const Sellers = () => {
    return (
        <div>
            <div className="flex flex-col flex-1 w-full">
                <main className="h-full pb-16 overflow-y-auto">
                    <div className="container grid px-6 mx-auto">
                        <h2
                            className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                        >
                            List of Sellers
                        </h2>
                        <Table headers={headers} data={sellersData} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Sellers;