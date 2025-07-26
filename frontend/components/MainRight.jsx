import {useRef,useEffect} from 'react';
import Cards from './Cards';
import { ProductContext } from '../context/ProductContext';
import { useContext } from 'react';



const MainRight = ({ isAdmin = false, reloadTrigger }) => {
  const { products, fetchProducts } = useContext(ProductContext);

   useEffect(() => {
    fetchProducts();

  }, [reloadTrigger, fetchProducts]);

  const scrollContainerRef = useRef();

        useEffect(() => {
            const el = scrollContainerRef.current;
            const onWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault(); // prevent vertical scroll
                el.scrollLeft += e.deltaY; // scroll horizontally
            }
            };

            el.addEventListener('wheel', onWheel, { passive: false });
            return () => el.removeEventListener('wheel', onWheel);
        }, []);
  return (
    <div className="min-h-0 h-full w-full overflow-hidden py-4 box-border"> 
      

      <div className="flex-grow overflow-hidden">
        <div
         className='h-full overflow-x-auto overflow-y-hidden hide-scrollbar flex items-center ' 
          ref={scrollContainerRef}>
            <div className='grid grid-rows-2 grid-flow-col auto-cols-max gap-4 p-4 w-max'>
                {products.map((products) =>
                    isAdmin ? (
                        <Cards size="default" isAdmin   key={products._id} product={products}/>
                      ) : (
                        <Cards size="default" key={products._id} product={products} />
                    )
                )}
              </div>
            </div>
        </div> 
    </div>
  );
};

export default MainRight;
