import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const { productId} = params;
  const product = {
    id: productId,
    color: 'Blue',
    price: 599,
    discount: 20
  }
  return { product };
}

export default function Product() {
    const { product } = useLoaderData();
    console.log(product)
    return (
        <div> 
            <h1>Product Page</h1>
            <p>Product details: </p>
            <ul>
                <li>ProductId: {product.id}</li>
                <li>Color: Red</li>
                <li>Price: INR 500</li>
                <li>Discount: 20%</li>
            </ul>
        </div>
    )
}