import CosmetologyHero from './CosmetologyHero';
import BeautyServicesList from './BeautyServicesList';
import StylistList from './StylistList';
import BookingForm from './BookingForm';

export default function Cosmetology() {
  return (
    <main>
      <CosmetologyHero />
      <BeautyServicesList />
      <StylistList />
      <BookingForm />
    </main>
  );
}
