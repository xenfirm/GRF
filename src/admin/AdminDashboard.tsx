import { Bird, EyeOff, FileText, Images, Star } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import { useBirds } from '../hooks/useBirds';
import { useGalleryImages } from '../hooks/useGalleryImages';
import { useWebsiteContentSections } from '../hooks/useWebsiteContentSections';

export default function AdminDashboard() {
  const { birds, loading: birdsLoading } = useBirds(false);
  const { images, loading: imagesLoading } = useGalleryImages(false);
  const { sections, loading: sectionsLoading } = useWebsiteContentSections(false);
  const loading = birdsLoading || imagesLoading || sectionsLoading;

  if (loading) return <LoadingState label="Loading dashboard..." />;

  const cards = [
    { label: 'Total birds', value: birds.length, icon: Bird },
    { label: 'Available birds', value: birds.filter((bird) => bird.is_available).length, icon: Bird },
    { label: 'Unavailable birds', value: birds.filter((bird) => !bird.is_available).length, icon: EyeOff },
    { label: 'Featured birds', value: birds.filter((bird) => bird.is_featured).length, icon: Star },
    { label: 'Total gallery images', value: images.length, icon: Images },
    { label: 'Hidden gallery images', value: images.filter((image) => !image.is_visible).length, icon: EyeOff },
    { label: 'Website sections', value: sections.length, icon: FileText },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-darktext">Dashboard</h1>
        <p className="text-sm text-gray-500">Birds, availability, featured content and gallery activity.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl bg-white p-5 shadow-card">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary">
              <Icon size={20} />
            </div>
            <div className="text-3xl font-bold text-darktext">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-white p-5 shadow-card">
          <h2 className="mb-4 font-bold text-darktext">Recently added birds</h2>
          <div className="space-y-3">
            {birds.slice(0, 5).map((bird) => (
              <div key={bird.id} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                <img src={bird.image_url || ''} alt={bird.name_en} className="h-12 w-12 rounded-lg object-cover bg-primary-50" />
                <div>
                  <div className="font-semibold text-sm">{bird.name_en}</div>
                  <div className="text-xs text-gray-500">{bird.breed} · {bird.is_available ? 'Available' : 'Unavailable'}</div>
                </div>
              </div>
            ))}
            {birds.length === 0 && <p className="text-sm text-gray-500">No birds yet.</p>}
          </div>
        </section>
        <section className="rounded-xl bg-white p-5 shadow-card">
          <h2 className="mb-4 font-bold text-darktext">Recently uploaded images</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.slice(0, 6).map((image) => (
              <img key={image.id} src={image.image_url} alt={image.alt_text} className="aspect-square rounded-lg object-cover" />
            ))}
            {images.length === 0 && <p className="text-sm text-gray-500">No gallery images yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
