import React, { useEffect, useState } from 'react';
import { TbTrash } from 'react-icons/tb';

const ListProduct = () => {
    const [allproducts, setAllproducts] = useState([]);

    const fetchInfo = async () => {
        try {
            const res = await fetch('http://localhost:4000/listproducts');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            // Sort products by title
            data.sort((a, b) => a.name.localeCompare(b.name));
            setAllproducts(data);
        } catch (error) {
            console.error('Fetching error:', error);
        }
    };

    useEffect(() => {
        fetchInfo();  // Call the async function directly
    }, []);  // Empty dependency array to run only once on mount

    const remove_product = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove product');
            }

            fetchInfo(); // Refresh the product list
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    return (
        <div>
            <h4>Products List</h4>
            <table className="w-full mx-auto">
                <thead>
                    <tr>
                        <th className="p-2">Image</th>
                        <th className="p-2">Title</th>
                        <th className="p-2">Old Price</th>
                        <th className="p-2">New Price</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {allproducts.map((product) => (
                        <tr key={product.id} className="border-b border-slate-900/20">
                            <td>
                                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                            </td>
                            <td>{product.name}</td>
                            <td>${product.old_price}</td>
                            <td>${product.new_price}</td>
                            <td>{product.category}</td>
                            <td>
                                <div>
                                    <TbTrash onClick={() => remove_product(product.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProduct;