import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Package from "../models/Package.js";
import Blog from "../models/Blog.js";
import Testimonial from "../models/Testimonial.js";
import Inquiry from "../models/Inquiry.js";
import Booking from "../models/Booking.js";

dotenv.config();

const users = [
  {
    name: "Luxury Travel Admin",
    email: "admin@example.com",
    password: "password123", // Will be hashed by pre-save hook
    role: "admin",
    phone: "+15559876543",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
    phone: "+15551234567",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
  },
];

const packages = [
  {
    title: "Maldives Luxury Overwater Villa Escape",
    destination: "Maldives",
    duration: "5 Days / 4 Nights",
    category: "Luxury",
    overview:
      "Escape to a tropical paradise and experience pure relaxation in a private overwater villa surrounded by crystal clear waters, colorful coral reefs, and pristine white beaches.",
    description:
      "Our flagship Maldives package offers the pinnacle of tropical indulgence. Wake up to direct ocean views, dive into the warm lagoons directly from your deck, and enjoy candlelit dinners on private beaches. This all-inclusive getaway features seaplane transfers, premium dining experiences, personalized butler service, and a guided private snorkeling safari. Perfect for honeymooners and luxury seekers alike.",
    price: 3500,
    discountedPrice: 2999,
    inclusions: [
      "5-Star Luxury Overwater Villa Accommodation",
      "All-Inclusive Premium Dining & Beverages",
      "Roundtrip Seaplane Transfers from Malé Airport",
      "Private 24/7 Butler Service",
      "1x Complimentary Couples Spa Massage (60 mins)",
      "Complimentary Snorkeling Equipment & Water Sports",
    ],
    exclusions: [
      "International Airfares",
      "Optional Excursions (e.g. Scuba Diving)",
      "Travel Insurance & Visa Fees",
      "Personal Expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Malé & Seaplane Transfer",
        description:
          "Arrive at Malé International Airport where your representative greets you. Board a scenic seaplane flight to your luxury resort. Check into your overwater villa, sip a welcome cocktail, and enjoy a sunset dinner.",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Private Snorkeling Safari & Coral Garden Tour",
        description:
          "Embark on a private boat trip to explore local coral gardens. Spot reef sharks, turtles, and manta rays. Return for a floating lunch in your private villa pool.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 3,
        title: "Sunset Dolphin Cruise & Beach BBQ",
        description:
          "Spend your day relaxing or using non-motorized water sports. In the evening, board a luxury yacht for a sunset dolphin cruise. Enjoy an outstanding beachside BBQ under the stars.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 4,
        title: "Spa Indulgence & Underwater Dining",
        description:
          "Indulge in a premium couples spa ritual. For dinner, experience an unforgettable multi-course degustation menu at the resort's world-famous underwater restaurant.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 5,
        title: "Leisurely Breakfast & Departure",
        description:
          "Enjoy a leisurely breakfast and final dip in the lagoon before checking out. Board the seaplane back to Malé for your flight home.",
        meals: ["Breakfast"],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
    ],
    hotelDetails:
      "5-Star Soneva Jani or Anantara Veli Resort (Overwater Villa)",
    transport: "Private Yacht & Scenic Seaplane",
    groupSize: "Private (Couples/Families)",
    featured: true,
    status: "published",
    ratings: 4.9,
    seo: {
      title: "Luxury Maldives Overwater Villa Getaway - Book Now",
      description:
        "Book a premium Maldives overwater villa holiday package. Includes seaplane transfers, butler service, spa treatments, and underwater dining.",
      keywords:
        "maldives luxury package, overwater villa maldives, Maldives honeymoon tour",
    },
  },
  {
    title: "Swiss Alps Winter Wonderland Adventure",
    destination: "Switzerland",
    duration: "7 Days / 6 Nights",
    category: "Adventure",
    overview:
      "Experience the magic of the Swiss Alps, staying in cozy Zermatt and luxury Alpine chalets. Ski pristine slopes, ride the Glacier Express, and indulge in fondue.",
    description:
      "This Swiss Alps winter tour combines high-adrenaline adventure with luxury comfort. From the car-free village of Zermatt near the Matterhorn, to the snowy valleys of St. Moritz, you will ski with a private instructor, enjoy scenic train journeys, relax in heated geothermal outdoor pools, and dine at Michelin-starred Alpine restaurants. Perfect for adventure-seekers looking for scenic beauty and winter sports.",
    price: 4800,
    discountedPrice: 4200,
    inclusions: [
      "6 Nights in Luxury Alpine Chalets & Resorts",
      "Daily Alpine Breakfast & Gourmet Dinners",
      "Glacier Express Excellence Class Train Tickets",
      "3-Day Lift Pass & Ski Equipment Rentals",
      "Private Ski/Snowboard Instructor (1 Day)",
      "VIP Airport Pickup & Mountain Transfers",
    ],
    exclusions: [
      "International Flights",
      "Luncheon & Alpine Drinks",
      "Spa Add-on Treatments",
      "Equipment Insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Zurich & Transfer to Zermatt",
        description:
          "VIP pickup at Zurich Airport and private transport to the majestic car-free village of Zermatt. Check into your luxury chalet facing the iconic Matterhorn peak.",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Guided Skiing on Matterhorn Glacier Paradise",
        description:
          "Gear up for a guided day of skiing or snowboarding on the high slopes. Beginners receive dedicated instruction, while experts hit the back-bowls.",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Helicopter Sightseeing & Après-Ski Fondue",
        description:
          "Take a private helicopter flight around the Matterhorn summit. In the evening, enjoy a traditional Swiss cheese fondue feast in a historic mountain cabin.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 4,
        title: "Glacier Express Excellence Class to St. Moritz",
        description:
          "Board the Glacier Express in Excellence Class. Sit back, enjoy a 5-course lunch with wine pairing, and take in the panoramic snowy mountains.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 5,
        title: "St. Moritz Ski & Alpine Thermal Spa",
        description:
          "Hit the slopes of Corviglia in St. Moritz. Unwind in the afternoon in an outdoor thermal spa with panoramic views of the Engadin Valley.",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 6,
        title: "Bobsled Experience & Michelin Star Gala",
        description:
          "Ride the world's oldest Olympic bobsled run with professional pilots. In the evening, attend a private gourmet gala dinner.",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 7,
        title: "Departure via Zurich",
        description:
          "Private transfer back to Zurich Airport for your departure home, taking in final panoramic views.",
        meals: ["Breakfast"],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1491555103944-7c647fd85706?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&q=80&w=800",
    ],
    hotelDetails: "The Omnia Zermatt & Badrutt’s Palace St. Moritz",
    transport: "Glacier Express Train & Private Audi e-tron Transfers",
    groupSize: "Max 8 travelers",
    featured: true,
    status: "published",
    ratings: 4.8,
    seo: {
      title: "Switzerland Winter Ski & Train Tour - Premium Itinerary",
      description:
        "Book the ultimate Swiss Alps winter tour package. Ski in Zermatt, ride the Glacier Express Excellence Class, and stay in St. Moritz.",
      keywords:
        "swiss alps tour, zermatt skiing package, glacier express luxury tour, switzerland winter holiday",
    },
  },
  {
    title: "Bali Cultural Discovery & Rainforest Retreat",
    destination: "Indonesia",
    duration: "6 Days / 5 Nights",
    category: "Family",
    overview:
      "Discover Ubud's lush rice terraces, ancient water temples, and volcanic highlands before retreating to a luxury beachfront villa in Seminyak.",
    description:
      "Immerse your family in the rich culture and stunning landscapes of Bali. You'll start in Ubud, the spiritual heart of the island, staying in villas nestled in the jungle. Hike Mount Batur for sunrise, visit ancient temples, and learn Balinese cooking. Then, head to the sandy shores of Seminyak to relax in a beach club and surf. This tour balances adventure, learning, and relaxation.",
    price: 1800,
    discountedPrice: 1599,
    inclusions: [
      "3 Nights Luxury Jungle Villa in Ubud",
      "2 Nights Beachfront Villa in Seminyak",
      "Daily Buffet Breakfast & Highlight Meals",
      "Private Dedicated Chauffeur & English Guide",
      "Sunrise Mount Batur Trekking with Breakfast",
      "All Temple Entrance Fees & Cultural Activities",
    ],
    exclusions: [
      "International Flights",
      "Gratuities for Driver/Guide",
      "Lunch & Dinner except mentioned",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Denpasar & Ubud Transfer",
        description:
          "Greeted by your private driver and transfer to Ubud. Check into your jungle villa. Enjoy a traditional massage and a dinner facing the river gorge.",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Tegallalang Rice Terraces & Holy Water Temple",
        description:
          "Visit the famous Tegallalang Rice Terraces, take pictures on the giant swings, and head to Tirta Empul Temple for a spiritual purification ritual.",
        meals: ["Breakfast", "Lunch"],
      },
      {
        day: 3,
        title: "Mount Batur Sunrise Trek & Hot Springs",
        description:
          "Wake up early for a guided trek up Mount Batur. Enjoy breakfast cooked by volcanic steam at the summit. Soak in natural hot springs afterward.",
        meals: ["Breakfast", "Lunch"],
      },
      {
        day: 4,
        title: "Ubud Cooking Class & Seminyak Coastal Drive",
        description:
          "Join a family cooking class to prepare authentic Balinese dishes. Check out and drive to Seminyak. Spend the evening at a premium beach club.",
        meals: ["Breakfast", "Lunch"],
      },
      {
        day: 5,
        title: "Tanah Lot Sunset & Seafood Dinner",
        description:
          "Relax on the beach or take a surf lesson. In the late afternoon, visit the sea temple of Tanah Lot. Savor a seafood dinner on Jimbaran Beach.",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 6,
        title: "Leisurely Morning & Airport Transfer",
        description:
          "Enjoy a final swim and souvenir shopping. Transfer to Denpasar airport for your flight home.",
        meals: ["Breakfast"],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518548419070-2c2a3412d5c3?auto=format&fit=crop&q=80&w=800",
    ],
    hotelDetails: "The Hanging Gardens Ubud & W Bali Seminyak Resort",
    transport: "Private Air-Conditioned SUV",
    groupSize: "Private Family Tour",
    featured: true,
    status: "published",
    ratings: 4.7,
    seo: {
      title: "Premium Bali Rainforest & Beach Tour - Family Vacation",
      description:
        "Explore Bali with our luxury Ubud and Seminyak family vacation package. Includes private driver, Mount Batur hike, and temple tours.",
      keywords:
        "bali family package, luxury bali tour, ubud jungle villa, seminyak beach holiday",
    },
  },
  {
    title: "Serengeti Luxury Wildlife Safari",
    destination: "Tanzania",
    duration: "6 Days / 5 Nights",
    category: "Wildlife",
    overview:
      "Experience the magic of Africa. Witness the Great Migration, stay in luxury tented camps, and enjoy close encounters with the Big Five.",
    description:
      "Venture into the heart of the Serengeti and Ngorongoro Crater. This premium African safari package offers luxury mobile tented camps that follow the migration, expert local guides, and custom-outfitted 4x4 vehicles. Savor bush dinners, take a hot air balloon flight at dawn, and spot lions, leopards, rhinos, elephants, and buffalos up close.",
    price: 5200,
    discountedPrice: 4799,
    inclusions: [
      "5 Nights in Ultra-Luxury Tented Safaris & Lodges",
      "All Meals, Sundowners, and Bush Dining Experiences",
      "Private Custom 4x4 Safari Vehicle with Pop-Up Roof",
      "Unlimited Game Drives led by Certified Rangers",
      "Ngorongoro Crater Conservation Area Fees",
      "Premium Airport Meet & Greet with Flight Transfers",
    ],
    exclusions: [
      "International Flights to Kilimanjaro",
      "Tanzania Entry Visa Fees",
      "Gratuities for Rangers & Camp Staff",
    ],
    itinerary: [
      {
        day: 1,
        title: "Fly to Serengeti & Afternoon Game Drive",
        description:
          "Arrive at Kilimanjaro Airport and catch a light aircraft flight directly to the Serengeti plains. Enjoy your first game drive on the way to camp.",
        meals: ["Lunch", "Dinner"],
      },
      {
        day: 2,
        title: "Full Day Witnessing The Great Migration",
        description:
          "Spend the day tracking the Great Migration. Witness wildebeests crossing rivers and predators hunting in the grass. Enjoy a picnic lunch.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 3,
        title: "Serengeti Hot Air Balloon & Bush Dinner",
        description:
          "Ascend over the Serengeti in a hot air balloon at sunrise. Celebrate landing with a champagne breakfast. Wind up the day with a luxury dinner under the stars.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 4,
        title: "Transfer to Ngorongoro Highlands",
        description:
          "Depart for the Ngorongoro Conservation Area, checking out Olduvai Gorge along the way. Check into a dramatic cliffside lodge.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 5,
        title: "Ngorongoro Crater Floor Safari",
        description:
          "Descend 600m into the Ngorongoro Crater floor for a full-day safari. Spot rare black rhinos, hippos, and pride of lions.",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 6,
        title: "Traditional Maasai Visit & Departure",
        description:
          "Visit a local Maasai village to learn about their traditions. Fly back to Kilimanjaro Airport for your international flight home.",
        meals: ["Breakfast"],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800",
    ],
    hotelDetails:
      "Four Seasons Safari Lodge Serengeti & Crater Lodge Ngorongoro",
    transport: "Private Safari 4x4 Land Cruiser & Internal Flights",
    groupSize: "Max 6 travelers per cruiser",
    featured: true,
    status: "published",
    ratings: 4.95,
    seo: {
      title: "Tanzania Serengeti Migration Safari - All-Inclusive Luxury",
      description:
        "Book a luxury Serengeti safari tour. Witness the great wildebeest migration, tour Ngorongoro Crater, and stay in 5-star wilderness lodges.",
      keywords:
        "serengeti luxury safari, ngorongoro crater tour, african migration package, luxury safari lodge",
    },
  },
];

const blogs = [
  {
    title: "10 Crucial Travel Tips for First-Time Luxury Travelers",
    thumbnail:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
    content:
      "Luxury travel is not just about staying in expensive hotels—it is about curated experiences, saving time, and enjoying comfort. If you are preparing to book your first high-end vacation, here are ten essential tips to make the most of your journey:\n\n### 1. Leverage Local Concierge Services\nHotels of a certain tier offer personalized concierge teams. Email them weeks in advance to arrange reservations at fully-booked Michelin restaurants or arrange tickets to exclusive local events.\n\n### 2. Pacify Your Itinerary\nDo not overpack your schedule. The hallmark of true luxury is relaxation and having the time to soak in your surroundings. Limit yourself to one major activity per day.\n\n### 3. Consider Private Transfers\nSkip airport taxi lines. Booking a private airport meet-and-greet along with chauffeured transit reduces arrival stress significantly.\n\n### 4. Pack Light but Right\nMany premium airlines and transfers (such as seaplanes or helicopters) have strict luggage limits. Invest in high-quality carry-ons and check if your resorts offer complimentary overnight laundry services.",
    tags: ["Luxury", "Guide", "Travel Tips"],
    category: "Travel Guide",
    author: "Chief Editor",
    seo: {
      title: "First-Time Luxury Travel Tips - Professional Holiday Guide",
      description:
        "Learn the golden rules of high-end traveling. From leveraging concierge service to scheduling your flights and packing correctly.",
      keywords: "luxury travel tips, VIP airport pickup, travel packing guide",
    },
  },
  {
    title: "The Ultimate Guide to Packing for a Serengeti Safari",
    thumbnail:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800",
    content:
      "Heading on an African safari is a life-changing adventure, but packing for it requires careful strategy due to small aircraft size limits and wild environment conditions.\n\n### What Colors to Pack\nStick to neutral earth tones like khaki, tan, brown, and olive green. Avoid wearing dark blue and black, as these colors attract tsetse flies, and bright whites will quickly look dusty.\n\n### Essential Gear to Carry\n- **Binoculars**: Crucial for spotting wildlife in the distance.\n- **Telephoto Camera**: To capture high-quality animal snapshots.\n- **Sturdy Boots**: Comfortable, closed shoes for bush walks.\n- **Wide-Brimmed Hat**: To shield yourself from the tropical sun.",
    tags: ["Safari", "Packing", "Africa"],
    category: "Safari Tips",
    author: "Wildlife Specialist",
    seo: {
      title: "What to Pack for Serengeti Safari - Packing Checklist",
      description:
        "Discover the ultimate safari packing list: recommended clothing colors, critical camera gear, footwear, and luggage constraints.",
      keywords:
        "safari packing list, serengeti tour preparation, african travel safari guide",
    },
  },
  {
    title: "Top 5 Best Tourist Attractions in Greece for Travelers",
    thumbnail:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
    content:
      "Greece is a land of myth, history, and breathtaking islands. If you are planning a trip to this Mediterranean gem, here are the top 5 attractions you must include in your itinerary:\n\n### 1. The Acropolis, Athens\nThe iconic citadel sits above Athens and contains the remains of ancient buildings, including the Parthenon. It is a testament to ancient Greek civilization.\n\n### 2. Santorini Caldera\nFamous for its blue-domed churches and white buildings clinging to cliffs, Santorini offers the most beautiful sunset views in the world.\n\n### 3. Meteora Monasteries\nThese stunning Eastern Orthodox monasteries are built on natural sandstone rock pillars. They look like they are suspended in the air.\n\n### 4. Mykonos Windmills\nMykonos is known for its beautiful beaches, vibrant nightlife, and the iconic 16th-century windmills standing near the harbor.\n\n### 5. Ancient Delphi\nLocated on Mount Parnassus, Delphi was once considered the center of the earth in ancient Greek mythology and features ruins of the Temple of Apollo.",
    tags: ["Greece", "Attractions", "Travel", "Europe"],
    category: "Travel Guide",
    author: "Aga Holidays",
    seo: {
      title: "Top 5 Best Tourist Attractions in Greece",
      description:
        "Explore the top tourist attractions in Greece, including the Acropolis, Santorini, and Mykonos.",
      keywords: "greece attractions, greece travel guide, santorini caldera",
    },
  },
  {
    title: "9 Unmissable Places to Visit in Andaman",
    thumbnail:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=800",
    content:
      "The Andaman and Nicobar Islands are a tropical paradise with crystal-clear waters, lush rainforests, and white sand beaches. Here are 9 unmissable spots to visit:\n\n### 1. Radhanagar Beach, Havelock Island\nOften ranked as one of the best beaches in Asia, Radhanagar features pristine sand and turquoise waters perfect for swimming.\n\n### 2. Cellular Jail, Port Blair\nA national memorial that stands as a silent witness to the hardships faced by freedom fighters during colonial times.\n\n### 3. Ross Island (Netaji Subhash Chandra Bose Island)\nExplore the historic ruins of British administrative buildings now reclaimed by giant roots and friendly deer.\n\n### 4. Elephant Beach, Havelock\nKnown for its vibrant coral reefs and marine life, this is the prime spot for snorkeling and water sports.",
    tags: ["Andaman", "Beaches", "India", "Travel"],
    category: "Travel Guide",
    author: "Aga Holidays",
    seo: {
      title: "9 Best Places to Visit in Andaman and Nicobar Islands",
      description:
        "Discover the top 9 unmissable destinations in Andaman, including Radhanagar Beach and Cellular Jail.",
      keywords: "andaman tourism, places to visit in andaman, havelock island",
    },
  },
  {
    title: "7 Romantic Spots in Goa for Couples",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    content:
      "Goa is more than just a party destination. With its quiet beaches, colonial architecture, and beautiful rivers, it offers several romantic spots for couples looking to spend quality time together.\n\n### 1. Butterfly Beach\nA hidden cove where you can enjoy privacy, watch dolphins play in the water, and witness beautiful sunsets.\n\n### 2. Fontainhas, Panaji\nThe Latin Quarter of Goa, characterized by narrow winding streets, colorful Portuguese villas, and cozy cafes.\n\n### 3. Cabo de Rama Fort\nOffers panoramic views of the Arabian Sea. It is a stunning, isolated spot to sit and enjoy the ocean breeze.",
    tags: ["Goa", "Romance", "Beaches", "India"],
    category: "Bespoke Guide",
    author: "Aga Holidays",
    seo: {
      title: "7 Most Romantic Spots in Goa for Couples",
      description:
        "A curated list of romantic destinations in Goa, perfect for couples and honeymooners.",
      keywords: "romantic goa, goa beaches couples, honeymoon spots goa",
    },
  },
  {
    title: "Top 7 Tourist Attractions in Kashmir",
    thumbnail:
      "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f6?auto=format&fit=crop&q=80&w=800",
    content:
      "Known as heaven on earth, Kashmir offers gorgeous snow-clad mountains, lush green valleys, and pristine lakes. Here are 7 top attractions to explore:\n\n### 1. Dal Lake, Srinagar\nEnjoy a shikhara ride or stay in a house-boat. The lake offers a floating flower market and peaceful mountain reflections.\n\n### 2. Gulmarg\nA premier skiing destination in Asia, home to the second-highest cable car (Gondola) in the world.\n\n### 3. Pahalgam\nKnown as the Valley of Shepherds, it is a beautiful location with rushing rivers and pine forests.",
    tags: ["Kashmir", "Mountain", "Scenic", "Adventure"],
    category: "Adventure Guide",
    author: "Aga Holidays",
    seo: {
      title: "Top 7 Tourist Attractions in Kashmir - Heaven on Earth",
      description:
        "Explore Kashmir's top tourist attractions, including Dal Lake, Gulmarg, and Pahalgam.",
      keywords: "kashmir tourism, gulmarg skiing, dal lake shikhara ride",
    },
  },
  {
    title: "How to Plan the Perfect Maldives Overwater Villa Getaway",
    thumbnail:
      "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&q=80&w=800",
    content:
      "An overwater villa in the Maldives is the ultimate bucket-list holiday. Planning it properly ensures a seamless experience. From picking the right resort to packing, here is our guide:\n\n### When to Visit\nDry season runs from November to April, offering the best weather, clear skies, and calm waters.\n\n### All-Inclusive vs. Half-Board\nResorts in the Maldives are isolated on individual islands. Eating out is not an option, so choosing an all-inclusive plan is often the most cost-effective decision.",
    tags: ["Maldives", "Luxury", "Honeymoon", "Guide"],
    category: "Luxury Guide",
    author: "Aga Holidays",
    seo: {
      title: "Planning a Maldives Overwater Villa Getaway - Travel Guide",
      description:
        "Tips and tricks to plan your luxury overwater villa vacation in the Maldives.",
      keywords:
        "maldives travel plan, maldives overwater villa, maldives honeymoon",
    },
  },
  {
    title: "Understanding the Great Wildebeest Migration in Serengeti",
    thumbnail:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    content:
      "The Great Wildebeest Migration is one of the most spectacular natural events on the planet. Every year, over two million animals move across the Serengeti ecosystem.\n\n### The Route\nThe migration follows a circular route dictated by rainfall patterns. Witnessing the dramatic Mara River crossings in July-August is a highlight for many safari seekers.",
    tags: ["Wildlife", "Migration", "Serengeti", "Africa"],
    category: "Safari Tips",
    author: "Wildlife Specialist",
    seo: {
      title: "The Great Wildebeest Migration - Serengeti Safari Guide",
      description:
        "Learn the route, timings, and best spots to witness the Great Wildebeest Migration in the Serengeti.",
      keywords:
        "wildebeest migration, serengeti safari, tanzania safari migration",
    },
  },
  {
    title: "7 Places to Visit in Singapore",
    thumbnail:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800",
    content:
      "Singapore is a futuristic global hub that blends green spaces, historic neighborhoods, and modern architecture. If you are planning a trip, here are 7 unmissable places to visit:\n\n### 1. Marina Bay Sands\nThe world-famous luxury resort features a striking rooftop Infinity Pool, high-end shopping, and panoramic views from the SkyPark.\n\n### 2. Gardens by the Bay\nA futuristic park spanning 101 hectares, home to the iconic Supertree Grove, the Flower Dome, and the Cloud Forest.\n\n### 3. Sentosa Island\nA resort island with sandy beaches, luxury hotels, golf courses, and various attractions including Universal Studios.\n\n### 4. Universal Studios Singapore\nA premier theme park with rides and shows based on popular films and television series, perfect for families.\n\n### 5. Singapore Flyer\nA giant Ferris wheel offering panoramic views of the city skyline and neighboring islands.\n\n### 6. Chinatown\nA vibrant historic neighborhood filled with traditional shophouses, street food stalls, and the Buddha Tooth Relic Temple.\n\n### 7. Clarke Quay\nA bustling riverside quay lined with colorful bars, restaurants, and nightclubs, ideal for experiencing nightlife.",
    tags: ["Singapore", "Adventure", "Asia", "Travel"],
    category: "Travel Guide",
    author: "Aga Holidays",
    seo: {
      title: "7 Best Places to Visit in Singapore - Travel Guide",
      description:
        "Explore the top 7 unmissable destinations in Singapore, including Marina Bay Sands and Gardens by the Bay.",
      keywords:
        "singapore tourism, places to visit in singapore, marina bay sands",
    },
  },
];

const testimonials = [
  {
    customerName: "Sarah Jenkins",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    message:
      "The Maldives overwater villa vacation was absolutely flawless. The seaplane transfer was perfectly timed, and the butler took care of every single dining reservation. Unforgettable!",
    rating: 5,
  },
  {
    customerName: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    message:
      "Our family loved the Bali rainforest and beach resort itinerary. Mount Batur sunrise trek was a highlight, and our private guide made us feel completely safe and welcome.",
    rating: 5,
  },
  {
    customerName: "Emma Richardson",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    message:
      "Seeing the great migration in the Serengeti was a lifelong dream. The safari vehicle had excellent window spaces and the luxury tents felt like a five-star hotel in the wild.",
    rating: 5,
  },
];

const seedDB = async () => {
  try {
    const connStr =
      process.env.MONGO_URI || "mongodb://localhost:27017/tourism-booking";
    console.log(`Connecting to database at ${connStr} for seeding...`);
    await mongoose.connect(connStr);
    console.log("Database connected.");

    // Clear existing data
    console.log("Clearing old collections...");
    await User.deleteMany({});
    await Package.deleteMany({});
    await Blog.deleteMany({});
    await Testimonial.deleteMany({});
    await Inquiry.deleteMany({});
    await Booking.deleteMany({});
    console.log("Collections cleared.");

    // Create Users (will trigger pre-save password hash)
    console.log("Seeding users...");
    const createdUsers = [];
    for (const u of users) {
      const newUser = new User(u);
      await newUser.save();
      createdUsers.push(newUser);
    }
    console.log(`Successfully seeded ${createdUsers.length} users.`);

    // Create Packages
    console.log("Seeding packages...");
    const seededPackages = [];
    for (const p of packages) {
      const newPkg = new Package(p);
      await newPkg.save();
      seededPackages.push(newPkg);
    }
    console.log(`Successfully seeded ${seededPackages.length} packages.`);

    // Create Blogs
    console.log("Seeding blogs...");
    const seededBlogs = [];
    for (const b of blogs) {
      const newBlog = new Blog(b);
      await newBlog.save();
      seededBlogs.push(newBlog);
    }
    console.log(`Successfully seeded ${seededBlogs.length} blogs.`);

    // Create Testimonials
    console.log("Seeding testimonials...");
    const seededTestimonials = await Testimonial.insertMany(testimonials);
    console.log(
      `Successfully seeded ${seededTestimonials.length} testimonials.`,
    );

    console.log("----------------------------------------------------");
    console.log("DB Seeding Completed Successfully!");
    console.log(`Admin Login Email: ${users[0].email}`);
    console.log(`Admin Login Password: ${users[0].password}`);
    console.log(`User Login Email: ${users[1].email}`);
    console.log(`User Login Password: ${users[1].password}`);
    console.log("----------------------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed with error:", error.message);
    process.exit(1);
  }
};

seedDB();
