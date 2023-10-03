import { useQuery } from 'react-query';

export const useProducts = () => {
    return useQuery('products', () =>
        fetch('https://fakestoreapi.com/products').then((res) => res.json())
    );
};

export const useProduct = (id) => {
    return useQuery(['product', id], () =>
        fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json())
    );
};