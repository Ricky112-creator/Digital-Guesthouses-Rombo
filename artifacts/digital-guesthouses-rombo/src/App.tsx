import { type FormEvent, type ReactNode, useState } from 'react';
import { ArrowRight, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const phone = '+254 720 957 914';
const whatsappNumber = '254720957914';
const image = (name: string) => `/images/gallery/${name}`;

const gallery = [
  { src: image('secondary-IMG-20260202-WA0003.jpg'), label: 'A warm welcome at Mt. Betheli' },
  { src: image('IMG_7073.JPG.jpg'), label: 'A restful twin room' },
  { src: image('IMG_7074.JPG.jpg'), label: 'Quiet corners to settle into' },
  { src: image('IMG_7068.JPG.jpg'), label: 'Family room at Digital Guesthouse' },
  { src: image('IMG_6936.JPG'), label: 'Conference room, ready for your team' },
  { src: image('IMG_6941.JPG'), label: 'A flexible room for gathering' },
  { src: image('secondary-IMG20260325221430_01.jpg'), label: 'Reception, Rombo' },
];

const restaurantMenu = [
  {
    category: 'Breakfast',
    items: [
      ['Battered Eggs Sandwich & Milkshake', 'KES 300'],
      ['Boiled Eggs, Kebab, Toast & Smoothie', 'KES 350'],
      ['Chapo Mayai', 'KES 100'],
      ['Spanish Omelette', 'KES 100'],
      ['Plain Omelette', 'KES 100'],
      ['Deep-fried Plantain & Strong Tea', 'KES 100'],
      ['Battered Toast & Chai', 'KES 100'],
      ['Chai & Mandazi', 'KES 60'],
      ['Black Coffee', 'KES 60'],
      ['White Coffee', 'KES 80'],
      ['Fresh Milk', 'KES 60'],
      ['Smokies (each)', 'KES 50'],
      ['2 Fried Eggs', 'KES 80'],
      ['African Tea', 'KES 40'],
      ['Chapati (each)', 'KES 20'],
      ['Mandazi (each)', 'KES 10'],
      ['Special Tea', 'KES 80'],
      ['Masala Tea', 'KES 50'],
      ['Dawa', 'KES 100'],
    ],
  },
  {
    category: 'Main dishes',
    items: [
      ['Nyama Choma (1 kg)', 'KES 1,000'],
      ['Nyama Fry (1 kg)', 'KES 1,000'],
      ['Grilled Tilapia', 'KES 1,000'],
      ['Chicken Barbecue', 'KES 1,000'],
      ['Ugali with Greens', 'KES 100'],
      ['Biryani Chicken', 'KES 400'],
      ['Pilau', 'KES 200'],
      ['Ugali & Maziwa Mala', 'KES 100'],
      ['Beans & Chapati', 'KES 90'],
    ],
  },
  {
    category: 'Sides',
    items: [
      ['Kachumbari', 'KES 50'],
      ['Cabbage Salad', 'KES 50'],
      ['Cucumber Salad', 'KES 50'],
    ],
  },
  {
    category: 'Beverages',
    items: [
      ['Cocktail', 'KES 100'],
      ['Mocktail', 'KES 50'],
      ['Fresh Juice', 'KES 100'],
      ['Soda', 'KES 50'],
      ['Yogurt', 'KES 100'],
    ],
  },
] as const;

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function WhatsAppButton({ message, children = 'Book on WhatsApp', className = 'btn btn-primary' }: { message: string; children?: ReactNode; className?: string }) {
  return (
    <a data-testid="link-whatsapp-booking" className={className} href={whatsappUrl(message)} target="_blank" rel="noreferrer">
      <MessageCircle size={15} strokeWidth={2} /> {children}
    </a>
  );
}

function Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const links = [
    ['/about', 'Our story'],
    ['/mt-betheli', 'Mt. Betheli'],
    ['/digital-guesthouse', 'Digital Guesthouse'],
    ['/restaurant', 'Winners Restaurant'],
    ['/conference', 'Conference'],
    ['/gallery', 'Gallery'],
    ['/rates', 'Rates'],
  ];
  return (
    <>
      <div className="topline">
        <span>RomBo, Kenya · The quieter side of Amboseli</span>
        <a data-testid="link-topline-whatsapp" href={whatsappUrl('Hello Digital Guesthouses Rombo, I would like to ask about availability.')} target="_blank" rel="noreferrer">WhatsApp is the fastest way to reach us ↗</a>
      </div>
      <header className={`nav ${open ? 'open' : ''}`}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <Link data-testid="link-brand-home" href="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark">D</span>
            <span className="brand-copy"><span className="brand-name">Digital Guesthouses</span><span className="brand-sub">Rombo · Kenya</span></span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            {links.map(([href, label]) => <Link data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`} key={href} href={href} className={location === href ? 'active' : ''} onClick={() => setOpen(false)}>{label}</Link>)}
          </nav>
          <div className="nav-actions">
            <Link data-testid="link-nav-contact" href="/contact" className="btn btn-ghost">Contact</Link>
            <WhatsAppButton message="Hello Digital Guesthouses Rombo, I would like to book a stay." />
            <button data-testid="button-toggle-menu" className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-title">Come for the mountain. Stay for the welcome.</div>
            <p style={{ maxWidth: 280, marginTop: 18 }}>Two guesthouses, one restaurant, and a very good reason to slow down in Rombo.</p>
          </div>
          <div><h3>Explore</h3><Link data-testid="link-footer-story" href="/about">Our story</Link><Link data-testid="link-footer-stays" href="/mt-betheli">Where to stay</Link><Link data-testid="link-footer-gallery" href="/gallery">Gallery</Link><Link data-testid="link-footer-reviews" href="/testimonials">Guest notes</Link></div>
          <div><h3>Gather</h3><Link data-testid="link-footer-restaurant" href="/restaurant">Winners Restaurant</Link><Link data-testid="link-footer-conference" href="/conference">Conference hall</Link><Link data-testid="link-footer-rates" href="/rates">Rates</Link><Link data-testid="link-footer-booking" href="/booking">Book your stay</Link></div>
          <div><h3>Find us</h3><p>Rombo, near Amboseli National Park<br />Kajiado County, Kenya</p><a data-testid="link-footer-phone" href={`tel:${phone.replaceAll(' ', '')}`}><Phone size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />{phone}</a><a data-testid="link-footer-whatsapp" href={whatsappUrl('Hello, I would like to enquire about Digital Guesthouses Rombo.')} target="_blank" rel="noreferrer">Message on WhatsApp ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Digital Guesthouses Rombo</span><span>Affordable luxury, close to the wild</span></div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site"><Nav />{children}<Footer /></div>;
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return <section className="page-hero"><div className="container"><div className="breadcrumb">Digital Guesthouses Rombo / {eyebrow}</div><div className="eyebrow">{eyebrow}</div><h1 className="reveal">{title}</h1><p className="reveal delay-1">{text}</p></div></section>;
}

function Home() {
  return <Shell>
    <main>
      <section className="hero">
        <div className="hero-image" style={{ backgroundImage: `url("${image('secondary-IMG-20260202-WA0003.jpg')}")` }} />
        <div className="container hero-content">
          <div className="eyebrow hero-kicker reveal">Stay close to what matters · Rombo, Kenya</div>
          <h1 className="reveal delay-1">The mountain<br /><em>is waiting.</em></h1>
          <p className="hero-intro reveal delay-2">A warm, honest base near Amboseli — with Kilimanjaro views, clean rooms, good food, and a door that opens to every kind of traveller.</p>
          <div className="hero-actions reveal delay-3"><Link data-testid="link-hero-stays" href="/mt-betheli" className="btn btn-primary">Find your room <ArrowRight size={15} /></Link><Link data-testid="link-hero-story" href="/about" className="btn btn-light">Why Rombo?</Link></div>
        </div>
        <div className="hero-stamp">Kilimanjaro<br />country<br />since 2018</div>
        <div className="hero-note">A small address with a wide horizon</div>
      </section>
      <section className="trust-strip">
        <div className="trust-item"><strong>KES 600–3,500</strong><span>Rooms for every kind of journey</span></div>
        <div className="trust-item"><strong>30 min</strong><span>From the Amboseli gateway</span></div>
        <div className="trust-item"><strong>24 / 7</strong><span>Security and a team on site</span></div>
        <div className="trust-item"><strong>WhatsApp</strong><span>Book in a conversation, not a queue</span></div>
      </section>
      <section className="section">
        <div className="container split">
          <div className="image-frame reveal"><img src={image('IMG_7073.JPG.jpg')} alt="A tidy room at Digital Guesthouses Rombo" /><span className="image-caption">A room to exhale in</span></div>
          <div className="copy reveal delay-1"><div className="eyebrow">A better kind of stopover</div><h3>Simple comforts. A serious view.</h3><p>Whether you are on the way to a safari, sharing a weekend with family, or bringing a small team together, our two guesthouses make room for the pace you actually want.</p><div className="feature-list"><div className="feature">Hot showers</div><div className="feature">Free Wi-Fi</div><div className="feature">Free parking</div><div className="feature">Breakfast at Mt. Betheli</div><div className="feature">Room service</div><div className="feature">Quiet setting</div></div><Link data-testid="link-home-amenities" href="/about" className="btn btn-dark">See the full welcome <ArrowRight size={15} /></Link></div>
        </div>
      </section>
      <section className="section dark-band">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Choose your kind of close</div><h2>Two addresses.<br />One warm welcome.</h2></div><p>Stay above the ordinary at Mt. Betheli, or keep it easy and spacious at the Digital Guesthouse. Both are close to Winners Restaurant.</p></div>
          <div className="stay-grid">
            <Link data-testid="link-stay-mt-betheli" href="/mt-betheli" className="stay-card tall"><img src={image('IMG_7073.JPG.jpg')} alt="Mt. Betheli room" /><div className="eyebrow">01 · Affordable luxury</div><h3>Mt. Betheli Digital Guesthouse</h3><p>Premium bed-and-breakfast rooms with direct Kilimanjaro views. From KES 1,500 a night.</p><span className="btn btn-light">Explore Mt. Betheli <ArrowRight size={14} /></span></Link>
            <div className="stay-side">
              <Link data-testid="link-stay-digital" href="/digital-guesthouse" className="stay-card"><img src={image('IMG_7068.JPG.jpg')} alt="Family room at Digital Guesthouse" /><div className="eyebrow">02 · Space for the group</div><h3>Digital Guesthouse</h3><p>Clean, safe, spacious family rooms from KES 600 a night.</p><span className="btn btn-light">See rooms <ArrowRight size={14} /></span></Link>
              <Link data-testid="link-stay-restaurant" href="/restaurant" className="stay-card"><img src={image('secondary-IMG20260325221430_01.jpg')} alt="Winners Restaurant reception and entrance" /><div className="eyebrow">03 · Gather around</div><h3>Winners Restaurant</h3><p>Kenyan plates, room service, and an easy place to land.</p><span className="btn btn-light">View the table <ArrowRight size={14} /></span></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm"><div className="container numbers"><div className="number"><strong>30</strong><span>Seats for your next workshop or team day</span></div><div className="number"><strong>02</strong><span>Guesthouses, side by side in Rombo</span></div><div className="number"><strong>01</strong><span>Very quick WhatsApp booking conversation</span></div></div></section>
      <section className="quote-panel"><div className="container"><blockquote>“Spotless rooms, hot showers, and the Kilimanjaro view at sunrise was unreal.”</blockquote><cite>Sarah M. · Nairobi to Amboseli</cite></div></section>
      <section className="section"><div className="container section-head"><div><div className="eyebrow">Your next morning</div><h2>Wake up this close to the wild.</h2></div><div><p>Ask us about rooms, a meal, a conference slot, or the best way into Amboseli. We reply on WhatsApp with a real answer.</p><WhatsAppButton message="Hello Digital Guesthouses Rombo, I am planning a trip near Amboseli and would like help choosing a room." className="btn btn-dark" /></div></div></section>
    </main>
  </Shell>;
}

function About() {
  return <Shell><main><PageHero eyebrow="Our story" title={<>A small place with a <em>wide horizon.</em></>} text="Digital Guesthouses Rombo is a practical, welcoming base on Kenya’s southern edge — built for travellers who want the wild nearby and a warm room to return to." /><section className="section"><div className="container split"><div className="copy"><div className="eyebrow">The Rombo way</div><h3>Close to Amboseli. Grounded in community.</h3><p>We started with a simple idea: good hospitality does not need to be complicated. It needs clean rooms, a safe welcome, a hot meal, and people who know the road ahead.</p><p>Today, Mt. Betheli and Digital Guesthouse sit side by side, with Winners Restaurant and our 30-seat conference hall completing the little world. It is an easy place to pause before safari, after a long drive, or between big conversations.</p><WhatsAppButton message="Hello, I would like to learn more about staying at Digital Guesthouses Rombo." /></div><div className="image-frame"><img src={image('secondary-IMG-20260202-WA0003.jpg')} alt="The bright interior of Digital Guesthouses Rombo" /><span className="image-caption">Rombo, Kenya</span></div></div></section><section className="section dark-band"><div className="container"><div className="section-head"><div><div className="eyebrow">What you can count on</div><h2>The useful details<br />are already here.</h2></div><p>No fuss, no hidden choreography. Just the things that make a stay feel considered.</p></div><div className="amenities"><div className="amenity">24/7 security<small>Gated, guarded premises and a team nearby.</small></div><div className="amenity">Free parking<small>Bring the safari vehicle. There is room for it.</small></div><div className="amenity">Hot showers<small>Running hot water in all rooms.</small></div><div className="amenity">Free Wi-Fi<small>Stay connected when you need to.</small></div><div className="amenity">Staff on site<small>Friendly help, from check-in to directions.</small></div><div className="amenity">Kilimanjaro views<small>On clear mornings, the mountain shows up.</small></div></div></div></section></main></Shell>;
}

function PropertyPage({ premium }: { premium: boolean }) {
  const title = premium ? <>A room with the<br /><em>mountain in it.</em></> : <>More room for<br /><em>your people.</em></>;
  const eyebrow = premium ? 'Mt. Betheli Digital Guesthouse' : 'Digital Guesthouse';
  const text = premium ? 'Affordable luxury for couples, solo travellers, and safari-goers who like a slower morning.' : 'Clean, safe, spacious family lodging for groups, families, and travellers watching the budget — not the standards.';
  const features = premium ? ['Private premium single rooms', 'Complimentary breakfast', 'Direct Kilimanjaro views', 'On-site Winners Restaurant', '24/7 security', 'Free Wi-Fi and hot showers'] : ['Self-contained family rooms', 'Single and two-bed rooms', 'Spacious for groups', '30 metres from Winners Restaurant', '24/7 security', 'Free Wi-Fi and hot showers'];
  return <Shell><main><PageHero eyebrow={eyebrow} title={title} text={text} /><section className="section"><div className="container split"><div className="image-frame"><img src={image(premium ? 'IMG_7073.JPG.jpg' : 'IMG_7068.JPG.jpg')} alt={premium ? 'Room at Mt. Betheli Digital Guesthouse' : 'Family room at Digital Guesthouse'} /><span className="image-caption">{premium ? 'Mt. Betheli · Rombo' : 'Digital Guesthouse · Rombo'}</span></div><div className="copy"><div className="eyebrow">{premium ? 'The elevated stay' : 'The easy stay'}</div><h3>{premium ? 'A good night, then a better morning.' : 'Bring the whole story.'}</h3><p>{premium ? 'Wake up to a clear line of sight across the landscape, take breakfast on site, and leave for Amboseli feeling rested rather than rushed.' : 'Families and small groups get the space to settle in, with clean self-contained rooms, hot water, and the reassuring basics close at hand.'}</p><div className="feature-list">{features.map((f) => <div className="feature" key={f}>{f}</div>)}</div><div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 20 }}><strong className="mono" style={{ color: 'hsl(var(--accent))' }}>{premium ? 'KES 1,500–3,500' : 'KES 600–1,200'} <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '.65rem' }}>/ night</span></strong><Link data-testid={`link-${premium ? 'mt' : 'digital'}-rates`} href="/rates" className="btn btn-ghost">See rates <ArrowRight size={14} /></Link></div><WhatsAppButton message={`Hello Digital Guesthouses Rombo, I would like to enquire about ${premium ? 'Mt. Betheli' : 'Digital Guesthouse'} availability.`} /></div></div></section><section className="section-sm"><div className="container"><div className="section-head"><div><div className="eyebrow">The practical promise</div><h2>Everything you need.<br />Nothing you do not.</h2></div><p>{premium ? 'Breakfast is included for Mt. Betheli guests. Winners Restaurant is right on site for lunch, dinner, and room service.' : 'Digital Guesthouse is about making the trip work beautifully for your family or group, without overcomplicating the stay.'}</p></div><div className="numbers"><div className="number"><strong>{premium ? '01' : '02'}</strong><span>{premium ? 'Premium room experience' : 'Room configurations for groups'}</span></div><div className="number"><strong>30m</strong><span>To Winners Restaurant</span></div><div className="number"><strong>24/7</strong><span>Security and support on site</span></div></div></div></section></main></Shell>;
}

function Restaurant() {
  return <Shell><main>
    <PageHero eyebrow="Winners Restaurant" title={<>The best part of<br /><em>coming back.</em></>} text="Local Kenyan cuisine, easy room service, and a table that makes a long day feel finished." />
    <section className="section"><div className="container split reverse">
      <div className="image-frame"><img src={image('winners-restaurant-exterior.jpg')} alt="Winners Restaurant exterior in Rombo" /><span className="image-caption">Winners Restaurant · Rombo</span></div>
      <div className="copy"><div className="eyebrow">A seat is waiting</div><h3>Good food does not need a dress code.</h3><p>Winners Restaurant is the shared heart of the two guesthouses. Start with breakfast, refuel between drives, or order in when the only plan is a quiet evening.</p><div className="feature-list"><div className="feature">Kenyan staples</div><div className="feature">Breakfast options</div><div className="feature">Safari group meals</div><div className="feature">Room service</div></div><WhatsAppButton message="Hello Winners Restaurant, I would like to ask about the menu and a table." children="Ask about the menu" /></div>
    </div></section>
    <section className="section menu-section"><div className="container">
      <div className="section-head"><div><div className="eyebrow">The Winners table</div><h2>Come hungry.<br />Leave happy.</h2></div><p>Every item is available to order through WhatsApp. Tap any dish and your message will be ready to send.</p></div>
      <div className="menu-grid">{restaurantMenu.map((group) => <div className="menu-category" key={group.category}>
        <div className="menu-category-head"><h3>{group.category}</h3><span>WhatsApp to order</span></div>
        <div className="menu-items">{group.items.map(([name, price], index) => <a data-testid={`link-menu-${group.category.toLowerCase().replaceAll(' ', '-')}-${index}`} className="menu-item" href={whatsappUrl(`Hello Winners Restaurant, I would like to order ${name} for ${price}. Please confirm availability.`)} target="_blank" rel="noreferrer" key={name}><span>{name}</span><strong>{price}</strong><MessageCircle size={13} /></a>)}</div>
      </div>)}</div>
      <div className="menu-order-note"><div><strong>Ordering is simple.</strong><span>Send us your choices, preferred pickup or delivery time, and any special notes.</span></div><WhatsAppButton message="Hello Winners Restaurant, I would like to place an order. Please share today's availability." className="btn btn-dark" children="Start an order" /></div>
    </div></section>
    <section className="section dark-band"><div className="container split"><div className="copy"><div className="eyebrow">For the road ahead</div><h3>Order in. Eat well. Go further.</h3><p>Tell us what time you are heading out and we can help make breakfast, packed meals, or dinner fit the day.</p><WhatsAppButton message="Hello Winners Restaurant, I am staying at Digital Guesthouses Rombo and would like to arrange a meal." className="btn btn-light" children="Plan a meal" /></div><div className="image-frame"><img src={image('IMG_7074.JPG.jpg')} alt="A guest room prepared for a restful night" /></div></div></section>
  </main></Shell>;
}

function Conference() {
  return <Shell><main><PageHero eyebrow="Conference Hall" title={<>Make space for<br /><em>good work.</em></>} text="A 30-seat meeting room in Rombo for training sessions, workshops, small conferences, and team days that need to get somewhere." /><section className="section"><div className="container split"><div className="image-frame"><img src={image('IMG_6941.JPG')} alt="Conference setup with tables and chairs" /><span className="image-caption">30 seats · flexible layouts</span></div><div className="copy"><div className="eyebrow">A room that works</div><h3>Keep the room focused. Keep the day moving.</h3><p>At Mt. Betheli, your group is close to refreshments, bedrooms, and a team who can help with the practical pieces. Choose an hourly slot that fits your agenda.</p><div className="feature-list"><div className="feature">30 seats</div><div className="feature">Flexible layouts</div><div className="feature">Hourly rental</div><div className="feature">Integrated catering</div><div className="feature">Time-slot bookings</div><div className="feature">Accommodation nearby</div></div><WhatsAppButton message="Hello Digital Guesthouses Rombo, I would like to enquire about booking the 30-seat conference hall." children="Check a conference slot" /></div></div></section><section className="section-sm"><div className="container quote-panel"><blockquote>“The right room can turn a meeting into a moment.”</blockquote><cite>Corporate retreats · workshops · training days</cite></div></section></main></Shell>;
}

function Gallery() {
  const [selected, setSelected] = useState<typeof gallery[number] | null>(null);
  return <Shell><main><PageHero eyebrow="Gallery" title={<>A glimpse of<br /><em>the place.</em></>} text="The rooms, corridors, tables, and small details that make Digital Guesthouses feel like Rombo." /><section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">Look around</div><h2>Come as you are.<br />Settle in.</h2></div><p>Tap a photograph to see it larger. When you are ready, we will show you the rest on WhatsApp.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button data-testid={`button-gallery-image-${index}`} className="gallery-item" key={item.src} onClick={() => setSelected(item)}><img src={item.src} alt={item.label} /><span className="gallery-overlay">{item.label}</span></button>)}</div></div></section>{selected && <div className="lightbox" role="dialog" aria-label={selected.label} onClick={() => setSelected(null)}><button data-testid="button-close-lightbox" className="lightbox-close" onClick={() => setSelected(null)}><X size={15} /> Close</button><img src={selected.src} alt={selected.label} onClick={(event) => event.stopPropagation()} /></div>}</main></Shell>;
}

const rates = [
  { name: 'Mt. Betheli · premium single', detail: 'Breakfast included · Kilimanjaro views', price: 'KES 3,500 max' },
  { name: 'Mt. Betheli · standard', detail: 'Bed and breakfast · on-site dining', price: 'KES 1,500–3,500' },
  { name: 'Digital Guesthouse · single', detail: 'Self-contained · Wi-Fi · hot shower', price: 'From KES 600' },
  { name: 'Digital Guesthouse · two-bed / family', detail: 'Spacious room · groups welcome', price: 'KES 600–1,200' },
  { name: 'Conference hall · hourly', detail: '30 seats · catering available', price: 'Ask for a quote' },
];

function Rates() {
  return <Shell><main><PageHero eyebrow="Rates" title={<>Clear prices for<br /><em>easy planning.</em></>} text="Choose the stay that suits your trip. For exact availability and a tailored quote, send us a WhatsApp — it takes about a minute." /><section className="section"><div className="container"><div className="rate-table"><div className="rate-row head"><span>Stay or service</span><span>Includes</span><span>Guide price</span><span /></div>{rates.map((rate, index) => <div className="rate-row" key={rate.name}><strong>{rate.name}</strong><span>{rate.detail}</span><span className="price">{rate.price}</span><WhatsAppButton message={`Hello Digital Guesthouses Rombo, I would like to enquire about ${rate.name}. Please share availability and the exact quote.`} className="btn btn-dark">Ask about this</WhatsAppButton></div>)}</div><div style={{ display: 'flex', gap: 13, flexWrap: 'wrap', marginTop: 28 }}><span className="muted" style={{ fontSize: '.75rem' }}>Rates can vary by dates and group size.</span><Link data-testid="link-rates-booking" href="/booking" className="btn btn-primary">Start a booking <ArrowRight size={14} /></Link></div></div></section><section className="section-sm dark-band"><div className="container section-head"><div><div className="eyebrow">No surprises</div><h2>A real person confirms<br />before anything is final.</h2></div><p>There is no simulated payment screen here. We confirm dates, room type, and pricing together in the WhatsApp conversation.</p></div></section></main></Shell>;
}

function Booking() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', dates: '', guests: '1 guest', stay: 'Mt. Betheli Digital Guesthouse', note: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hello Digital Guesthouses Rombo, my name is ${form.name || '[name]'}. I would like to ask about ${form.stay} for ${form.dates || '[dates]'} for ${form.guests}. ${form.note ? `A note: ${form.note}` : ''}`;
    setSent(true);
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };
  return <Shell><main><PageHero eyebrow="Book your stay" title={<>One message<br /><em>gets it moving.</em></>} text="Tell us what you are looking for and WhatsApp will open with your request ready to send. We confirm the details personally." /><section className="section"><div className="container booking-shell"><aside className="booking-note"><div className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>The simple way in</div><h2>Book in a conversation.</h2><p>No forms disappearing into a black hole. No fake payment flow. Just a quick note to the team, a clear answer, and a room that is ready when you arrive.</p><ol className="booking-steps"><li><b>01</b><span>Share your dates and the kind of room you need.</span></li><li><b>02</b><span>We reply with availability and a confirmed price.</span></li><li><b>03</b><span>Arrive in Rombo. We will take it from there.</span></li></ol></aside><form className="booking-form" onSubmit={submit}><div className="form-grid"><div className="field"><label htmlFor="booking-name">Your name</label><input data-testid="input-booking-name" id="booking-name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="e.g. Sarah Mwangi" required /></div><div className="field"><label htmlFor="booking-dates">Dates</label><input data-testid="input-booking-dates" id="booking-dates" value={form.dates} onChange={(event) => update('dates', event.target.value)} placeholder="e.g. 12–14 August" required /></div></div><div className="form-grid"><div className="field"><label htmlFor="booking-stay">I am interested in</label><select data-testid="select-booking-stay" id="booking-stay" value={form.stay} onChange={(event) => update('stay', event.target.value)}><option>Mt. Betheli Digital Guesthouse</option><option>Digital Guesthouse</option><option>Conference Hall</option><option>Winners Restaurant</option></select></div><div className="field"><label htmlFor="booking-guests">Number of guests</label><select data-testid="select-booking-guests" id="booking-guests" value={form.guests} onChange={(event) => update('guests', event.target.value)}><option>1 guest</option><option>2 guests</option><option>3–5 guests</option><option>6+ guests</option></select></div></div><div className="field"><label htmlFor="booking-note">Anything we should know?</label><textarea data-testid="textarea-booking-note" id="booking-note" value={form.note} onChange={(event) => update('note', event.target.value)} placeholder="Arrival time, family needs, safari plans..." /><button data-testid="button-submit-booking" type="submit" className="btn btn-primary">Open WhatsApp request <MessageCircle size={15} /></button></div>{sent && <div className="booking-success"><strong>Your request is ready.</strong> WhatsApp should have opened in a new tab. If it did not, use the WhatsApp button in the navigation and mention your dates.</div>}</form></div></section></main></Shell>;
}

function Testimonials() {
  return <Shell><main><PageHero eyebrow="Guest notes" title={<>The kind words<br /><em>we keep.</em></>} text="A few notes from people who chose the mountain road, the warm room, and a stay that did what it promised." /><section className="section"><div className="container testimonial-grid"><article className="testimonial"><div className="stars">5 / 5</div><blockquote>“Spotless rooms, hot showers, Kilimanjaro view at sunrise was unreal. Booking on WhatsApp took 2 minutes.”</blockquote><cite>Sarah M. · Nairobi → Amboseli trip</cite></article><article className="testimonial"><div className="stars">5 / 5</div><blockquote>“Affordable luxury is the right description. Quiet, safe, breakfast was included and warm.”</blockquote><cite>James &amp; Linda K. · Weekend getaway</cite></article><article className="testimonial"><div className="stars">5 / 5</div><blockquote>“Cleanest budget stay I have had in Kenya. 24/7 security made me comfortable.”</blockquote><cite>David O. · Solo traveller from Mombasa</cite></article></div></section><section className="section-sm"><div className="container quote-panel"><blockquote>Come with a plan. Leave with a story.</blockquote><cite>Digital Guesthouses Rombo · near Amboseli National Park</cite></div></section></main></Shell>;
}

function Contact() {
  return <Shell><main><PageHero eyebrow="Contact" title={<>The shortest route<br />is a <em>message.</em></>} text={`Find us in Rombo, Kenya, near Amboseli National Park. Call ${phone}, or send a WhatsApp for the quickest reply.`} /><section className="section"><div className="container contact-grid"><div className="contact-card"><div className="eyebrow">Bookings & enquiries</div><h3>Talk to the team.</h3><p>Ask about rooms, availability, directions, meals, the conference hall, or what to expect when you arrive.</p><WhatsAppButton message="Hello Digital Guesthouses Rombo, I would like to make an enquiry." /><a data-testid="link-contact-phone" className="btn btn-ghost" style={{ marginTop: 10 }} href={`tel:${phone.replaceAll(' ', '')}`}><Phone size={14} /> Call {phone}</a></div><div className="map-card"><div className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>Our address</div><h3>Rombo, Kenya</h3><p>Close to the Amboseli route, with Mount Kilimanjaro views on a clear day.</p><a data-testid="link-contact-directions" className="btn btn-light" href="https://www.google.com/maps/search/?api=1&query=Rombo%2C%20Kenya" target="_blank" rel="noreferrer">Open directions <ArrowRight size={14} /></a></div></div></section><section className="section-sm"><div className="container split"><div className="copy"><div className="eyebrow">Before you arrive</div><h3>Bring the questions.</h3><p>We can help with the practical details: room type, breakfast, meal timing, parking, small group stays, and conference arrangements.</p><Link data-testid="link-contact-faq-rates" href="/rates" className="btn btn-dark">See rates first <ArrowRight size={14} /></Link></div><div className="image-frame"><img src={image('IMG_6936.JPG')} alt="The flexible conference and dining room" /><span className="image-caption">A room for many plans</span></div></div></section></main></Shell>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/mt-betheli"><PropertyPage premium /></Route><Route path="/digital-guesthouse"><PropertyPage premium={false} /></Route><Route path="/restaurant" component={Restaurant} /><Route path="/conference" component={Conference} /><Route path="/gallery" component={Gallery} /><Route path="/rates" component={Rates} /><Route path="/booking" component={Booking} /><Route path="/testimonials" component={Testimonials} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;