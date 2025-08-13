import ProductCarousel from '@/components/shared/product/product-carousel';
import ProductList from '@/components/shared/product/product-list';
import DealCountdown from '@/components/ui/deal-countdown';
import IconBoxes from '@/components/ui/icon-boxes';
import ViewAllProductsButton from '@/components/view-all-products-button';
import sampleData from '@/db/sample-data';
import {
  getFeaturedProducts,
  getLatestProducts,
} from '@/lib/actions/product.actions';

async function Homepage() {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </>
  );
}
export default Homepage;
