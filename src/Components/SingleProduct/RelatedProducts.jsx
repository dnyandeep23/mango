import useFetch from "../../hook/useFetch";
import Products from "../Home/Products";

const RelatedProducts = ({productId,categoryId}) => {
const {data} = useFetch(`/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagiation[limit]=4`)
    // useFetch
    return <div className="related-product">
        <Products HeadingText="Related Products" products={data}/>
    </div>;
};

export default RelatedProducts;
