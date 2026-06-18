// Some service images live under /assets/images/blog/, others under /assets/images/resources/ or
// /assets/images/gallery/. Using absolute URLs per item so the path differences don't compound.
const blog = 'https://3mcarcarebangalore.com/assets/images/blog';
const root = 'https://3mcarcarebangalore.com/assets/images';

export const services = [
  { no: '01', title: 'Paint Protection Film', desc: 'Protect your car from scratches, chips, and UV damage while keeping its showroom finish.', img: `${blog}/paint-protection-film-in-bengaluru-complete-guide-for-car-owners.png` },
  { no: '02', title: 'Sun Control Film', desc: 'Reduce heat, glare, and UV rays for a cooler, safer, and more comfortable ride.', img: `${blog}/sun-control-film-lifespan-kanakapura-road.png` },
  { no: '03', title: 'Graphene Coating', desc: 'Enhance paint durability, gloss, and protection against environmental damage.', img: `${blog}/graphene-coating-in-kanakapura-road-a-complete-car-care-guide.webp` },
  { no: '04', title: 'Ceramic Coating', desc: 'A liquid-glass shield delivering deep, mirror-like gloss and hydrophobic protection.', img: `${blog}/ceramic-coating-in-bengaluru-a--complete-guide-for-car-owners.png` },
  { no: '05', title: 'Interior GermKleen', desc: 'Eliminate bacteria, viruses, and odors to maintain a clean and hygienic cabin.', img: `${blog}/why-choose-interior-germKleen-treatment-for-your-car-in-nagasandra.webp` },
  { no: '06', title: 'Anti-Corrosion', desc: "Prevent rust on underbody and exposed areas, extending your vehicle's life.", img: `${blog}/anti-corrosion-treatment-kanakapura-underbody.png` },
  { no: '07', title: 'Wraps & Styling', desc: 'Transform your car with custom colors and graphics while protecting the paint.', img: `${blog}/3m-car-wraps-custom-styles-bangalore.png` },
  { no: '08', title: 'Nomad Floor Mats', desc: 'Premium all-weather 3M Nomad mats that trap dirt and elevate your cabin.', img: `${blog}/interior-car-detailing.png` }
];
