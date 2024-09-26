import { Container } from '@/shared/components/shared';
import { FeaturedStores } from '@/shared/components/shared/featured-stores';
import { Api } from '@/shared/services/api-client';

export default async function HomePage({ params }: { params: any }) {
  const stores = await Api.stores.getAll();
  return (
    <Container className={'grid grid-cols-5 gap-4 py-4'}>
      <FeaturedStores stores={stores} />
    </Container>
  );
}
