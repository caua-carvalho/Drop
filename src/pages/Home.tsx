import { Hero } from '../components/home/Hero';
import { CategoryStrip } from '../components/home/CategoryStrip';
import { FeaturedProducts, NewArrivals } from '../components/home/ProductRail';
import { EditorialBand } from '../components/home/EditorialBand';
import { PromoBanners } from '../components/home/PromoBanners';
import { Benefits } from '../components/home/Benefits';
import { InstagramFeed } from '../components/home/InstagramFeed';
import { NewsletterCta } from '../components/home/NewsletterCta';

export function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <EditorialBand />
      <NewArrivals />
      <PromoBanners />
      <Benefits />
      <InstagramFeed />
      <NewsletterCta />
    </>
  );
}
