import type { ImageName } from './images.generated';

export const NAV_LINKS = [
  { label: 'Suites', id: 'suites' },
  { label: 'Experience', id: 'experience' },
  { label: 'Destinations', id: 'destinations' },
  { label: 'Life at Sea', id: 'life' },
  { label: 'About', id: 'about' },
] as const;

export type Suite = {
  id: string;
  index: string;
  name: string;
  image: ImageName;
  blurb: string;
  guests: string;
  size: string;
  terrace: string;
  from: string;
};

export const SUITES: Suite[] = [
  {
    id: 'ocean',
    index: '01',
    name: 'Ocean Suite',
    image: 'suite-ocean',
    blurb:
      'A low, quiet room finished in smoked oak and linen, turned entirely toward the water. Mornings arrive slowly here.',
    guests: '2 Guests',
    size: '34 m²',
    terrace: 'French Balcony',
    from: 'from €1,450 / night',
  },
  {
    id: 'panorama',
    index: '02',
    name: 'Panorama Suite',
    image: 'suite-panorama',
    blurb:
      'Floor-to-ceiling glass along the full length of the suite. Nothing stands between the bed and the horizon.',
    guests: '2–3 Guests',
    size: '52 m²',
    terrace: 'Private Terrace',
    from: 'from €2,380 / night',
  },
  {
    id: 'grand',
    index: '03',
    name: 'Grand Suite',
    image: 'suite-grand',
    blurb:
      'A separate living pavilion, a dressing room and a terrace wide enough to dine on. Architecture, not accommodation.',
    guests: '4 Guests',
    size: '86 m²',
    terrace: 'Wraparound Terrace',
    from: 'from €4,100 / night',
  },
  {
    id: 'residence',
    index: '04',
    name: "Owner's Residence",
    image: 'suite-residence',
    blurb:
      'The highest deck, held for four guests. Panelled walnut, a private library and a butler who is never seen arriving.',
    guests: '4–6 Guests',
    size: '140 m²',
    terrace: 'Sun Deck & Plunge Pool',
    from: 'from €8,900 / night',
  },
];

export const DETAIL_STAGES = [
  {
    index: '01',
    title: 'The View',
    image: 'detail-view' as ImageName,
    copy: 'Glass runs the length of the suite, uninterrupted. The horizon moves through the room from first light until the water goes dark.',
  },
  {
    index: '02',
    title: 'The Space',
    image: 'detail-space' as ImageName,
    copy: 'Low furniture, deep timber, nothing raised above eye level. The room is composed so that the sea is the only thing standing tall in it.',
  },
  {
    index: '03',
    title: 'The Details',
    image: 'detail-details' as ImageName,
    copy: 'Honed stone, unlacquered brass, linen pressed the same morning. Materials chosen to age well in salt air rather than to photograph well.',
  },
  {
    index: '04',
    title: 'The Service',
    image: 'detail-service' as ImageName,
    copy: 'A butler assigned to four suites and no more. Breakfast laid on the terrace at the hour you chose, without being asked twice.',
  },
] as const;

export const DESTINATIONS = [
  { name: 'Santorini', region: 'Aegean Sea', image: 'dest-santorini' as ImageName, nights: '7 Nights', season: 'Apr — Oct' },
  { name: 'Maldives', region: 'Indian Ocean', image: 'dest-maldives' as ImageName, nights: '10 Nights', season: 'Nov — Apr' },
  { name: 'Dubai', region: 'Arabian Gulf', image: 'dest-dubai' as ImageName, nights: '5 Nights', season: 'Oct — Mar' },
  { name: 'Mediterranean', region: 'Cyclades & Coast', image: 'dest-mediterranean' as ImageName, nights: '12 Nights', season: 'May — Sep' },
  { name: 'Norwegian Fjords', region: 'Arctic North', image: 'dest-fjords' as ImageName, nights: '9 Nights', season: 'Jun — Aug' },
  { name: 'Amalfi Coast', region: 'Tyrrhenian Sea', image: 'dest-amalfi' as ImageName, nights: '8 Nights', season: 'May — Oct' },
] as const;

export const STORY_BEATS = [
  { text: 'Wake somewhere new.', image: 'story-wake' as ImageName },
  { text: 'Dine above the horizon.', image: 'story-dine' as ImageName },
  { text: 'Disappear into the ocean.', image: 'story-ocean' as ImageName },
  { text: 'Return to extraordinary comfort.', image: 'story-return' as ImageName },
] as const;

/** Tile spans drive the asymmetric editorial grid — no two rows repeat. */
export const LIFE_TILES = [
  { name: 'Fine Dining', image: 'life-dining' as ImageName, note: 'Four restaurants, one seating', span: 'md:col-span-7 md:row-span-2' },
  { name: 'Private Spa', image: 'life-spa' as ImageName, note: 'Thalassotherapy & hammam', span: 'md:col-span-5' },
  { name: 'Infinity Pool', image: 'life-pool' as ImageName, note: 'Aft deck, heated year-round', span: 'md:col-span-5' },
  { name: 'Ocean Lounge', image: 'life-lounge' as ImageName, note: 'Live piano after nine', span: 'md:col-span-4' },
  { name: 'Private Dining', image: 'life-private' as ImageName, note: 'The chef’s table, six seats', span: 'md:col-span-4' },
  { name: 'Concierge', image: 'life-concierge' as ImageName, note: 'Ashore before you disembark', span: 'md:col-span-4' },
  { name: 'Wellness', image: 'life-wellness' as ImageName, note: 'Studio, gym & sea-air terrace', span: 'md:col-span-6' },
  { name: 'Sunset Deck', image: 'life-deck' as ImageName, note: 'West-facing, adults only', span: 'md:col-span-6' },
] as const;

export const STATS = [
  { value: '12', label: 'Destinations' },
  { value: '04', label: 'Signature Suites' },
  { value: '24/7', label: 'Private Concierge' },
  { value: '∞', label: 'Ocean Views' },
] as const;

export const SERVICE_POINTS = [
  { name: 'Personal Concierge', copy: 'One point of contact, from first enquiry to final evening.' },
  { name: 'Suite Dining', copy: 'Any restaurant menu, served on your terrace, at any hour.' },
  { name: 'Priority Embarkation', copy: 'A private lounge ashore and a door that is already open.' },
  { name: 'Private Transfers', copy: 'Car, tender or helicopter, arranged before you land.' },
] as const;

export const BOOKING_FIELDS = {
  destination: ['Mediterranean', 'Aegean Sea', 'Indian Ocean', 'Arabian Gulf', 'Arctic North', 'Tyrrhenian Sea'],
  departure: ['March 2027', 'April 2027', 'May 2027', 'June 2027', 'September 2027', 'October 2027'],
  guests: ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'],
  suite: ['Ocean Suite', 'Panorama Suite', 'Grand Suite', "Owner's Residence"],
} as const;
