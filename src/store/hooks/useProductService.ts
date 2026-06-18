import useAppSelector from "@/src/common/hooks/useAppSelector";
import { selectedProducts } from "../slices/lobby.slice";
import { Product } from "../types";

type ServiceOperators = {
  getProductById: (id: number) => Product;
  getProductByName: (id: string) => Product;
};

export const useProductService = (): Readonly<ServiceOperators> => {
  const products = useAppSelector(selectedProducts);

  const getProductById = (id: number): Product => {
    const item = products.find((product: Product) => product.id === id);
    return item || ({} as Product);
  };

  const getProductByName = (name: string): Product => {
    const item = products.find((product: Product) => product.name === name);
    return item || ({} as Product);
  };

  return {
    getProductById,
    getProductByName,
  };
};
