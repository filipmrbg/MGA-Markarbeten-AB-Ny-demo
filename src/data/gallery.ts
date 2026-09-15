export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  location?: string;
  description?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    image: '/gallery-external-1.webp',
    title: 'Tomtplanering & schaktning',
    location: 'Strängnäs',
    description: 'Omfattande markarbete och grundläggning för nybyggnation av villa.',
  },
  {
    id: '2',
    image: '/service-dranering.webp',
    title: 'Husgrundsdränering & fuktisolering',
    location: 'Mariefred',
    description: 'Komplett dräneringsarbete med Isodrän och återfyllning runt källargrund.',
  },
  {
    id: '3',
    image: '/gallery-external-2.webp',
    title: 'Schaktarbete med grävmaskin',
    location: 'Eskilstuna',
    description: 'Grovplanering och urgrävning för infart och garageuppfart.',
  },
  {
    id: '4',
    image: '/service-betong.webp',
    title: 'Gjutning av betongplatta',
    location: 'Södertälje',
    description: 'Armering och gjutning av isolerad betongplatta på mark.',
  },
  {
    id: '5',
    image: '/gallery-external-4.webp',
    title: 'Markförberedelse & schaktmassor',
    location: 'Strängnäs',
    description: 'Bortforsling av schaktmassor och finplanering inför stenläggning.',
  },
  {
    id: '6',
    image: '/gallery-external-3.webp',
    title: 'Stödmur & markutjämning',
    location: 'Nykvarn',
    description: 'Markförstärkning och anläggning av stödmur i kuperad terräng.',
  },
  {
    id: '7',
    image: '/service-markarbete.webp',
    title: 'Finplanering av tomt & gräsyta',
    location: 'Strängnäs',
    description: 'Matjordsspridning, utjämning och förberedelse för gräsmatta.',
  },
  {
    id: '8',
    image: '/hero-construction-site.webp',
    title: 'Infrastruktur & VA-schakt',
    location: 'Åkers Styckebruk',
    description: 'Grävning för vatten, avlopp och fiberkablar till fastighet.',
  },
  {
    id: '9',
    image: '/hero-main.webp',
    title: 'Maskinarbete i fält',
    location: 'Mälardalen',
    description: 'Modern maskinpark i full drift under pågående markentreprenad.',
  },
];

export default galleryItems;
