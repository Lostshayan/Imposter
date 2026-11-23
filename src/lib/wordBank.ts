import { GameWord } from '../types/game';

export const CATEGORIES = [
  'All',
  'Food & Drinks',
  'Animals & Nature',
  'Places & Travel',
  'Movies & Pop Culture',
  'Everyday Objects',
  'Activities & Sports',
] as const;

export const WORD_BANK: GameWord[] = [
  // Food & Drinks
  {
    id: 'food_1',
    word: 'Pizza',
    category: 'Food & Drinks',
    hint: 'A popular baked flatbread with various toppings, famous in Italy and worldwide',
    options: ['Pizza', 'Burger', 'Taco', 'Lasagna'],
    fakeCivClues: ['Slice', 'Cheese and crust', 'Pepperoni topping', 'Delivery box', 'Wood fired oven'],
    fakeImposterClues: ['Very popular comfort food', 'Good for parties', 'Eaten with hands', 'Hot and savory', 'Comes in triangular pieces'],
  },
  {
    id: 'food_2',
    word: 'Espresso',
    category: 'Food & Drinks',
    hint: 'A concentrated beverage brewed by forcing hot water through finely ground beans',
    options: ['Espresso', 'Matcha', 'Hot Chocolate', 'Earl Grey Tea'],
    fakeCivClues: ['Dark roast', 'Little white cup', 'Barista machine', 'Crema on top', 'Double shot wake up'],
    fakeImposterClues: ['Strong hot beverage', 'Morning routine', 'Bitter taste', 'High caffeine boost', 'Found in cafes'],
  },
  {
    id: 'food_3',
    word: 'Sushi',
    category: 'Food & Drinks',
    hint: 'A traditional Japanese dish of prepared vinegared rice accompanied by seafood or vegetables',
    options: ['Sushi', 'Ramen', 'Dumplings', 'Fried Rice'],
    fakeCivClues: ['Nori seaweed wrap', 'Raw salmon and tuna', 'Wasabi and soy sauce', 'Chopsticks required', 'Ginger slices on the side'],
    fakeImposterClues: ['Asian delicacy', 'Eaten cold or fresh', 'Rolled or sliced', 'Served with green paste', 'Healthy and aesthetic'],
  },
  {
    id: 'food_4',
    word: 'Popcorn',
    category: 'Food & Drinks',
    hint: 'A light, puffy snack made from kernels that expand when heated',
    options: ['Popcorn', 'Potato Chips', 'Pretzels', 'Nachos'],
    fakeCivClues: ['Cinema bucket', 'Melted butter smell', 'Kernels popping', 'Red and white bag', 'Crunchy movie snack'],
    fakeImposterClues: ['Very common at theaters', 'Salty or sweet', 'Light and airy', 'Heated in microwave', 'Yellow or white'],
  },
  {
    id: 'food_5',
    word: 'Ice Cream',
    category: 'Food & Drinks',
    hint: 'A sweetened frozen dessert made typically from dairy and flavored',
    options: ['Ice Cream', 'Pudding', 'Frozen Yogurt', 'Cheesecake'],
    fakeCivClues: ['Waffle cone', 'Melts in summer sun', 'Two scoops with sprinkles', 'Mint chocolate chip', 'Sundae with a cherry'],
    fakeImposterClues: ['Cold sweet treat', 'Best in hot weather', 'Comes in many flavors', 'Licked or eaten with spoon', 'Found in freezer'],
  },
  {
    id: 'food_6',
    word: 'Croissant',
    category: 'Food & Drinks',
    hint: 'A flaky, buttery, crescent-shaped pastry of French origin',
    options: ['Croissant', 'Baguette', 'Doughnut', 'Pancake'],
    fakeCivClues: ['Flaky golden layers', 'Parisian bakery breakfast', 'Crescent curve', 'Buttery crumbs', 'Goes great with latte'],
    fakeImposterClues: ['European baked pastry', 'Golden brown', 'Breakfast favorite', 'Light and crispy texture', 'Rich in butter'],
  },

  // Animals & Nature
  {
    id: 'anim_1',
    word: 'Penguin',
    category: 'Animals & Nature',
    hint: 'A flightless aquatic bird known for black-and-white plumage and waddling gait',
    options: ['Penguin', 'Puffin', 'Polar Bear', 'Seal'],
    fakeCivClues: ['Antarctic ice', 'Tuxedo feathers', 'Waddling on glaciers', 'Slides on belly', 'Huddles in freezing blizzards'],
    fakeImposterClues: ['Lives in very cold climates', 'Swims underwater', 'Black and white coloring', 'Eats fish', 'Beloved flightless bird'],
  },
  {
    id: 'anim_2',
    word: 'Kangaroo',
    category: 'Animals & Nature',
    hint: 'A marsupial with large feet, powerful hind legs, and a front pouch for carrying young',
    options: ['Kangaroo', 'Koala', 'Ostrich', 'Wallaby'],
    fakeCivClues: ['Australian Outback', 'Joey in front pouch', 'Boxing hops', 'Massive tail for balance', 'Bounding across desert'],
    fakeImposterClues: ['Famous Australian animal', 'Known for jumping high', 'Carries baby in belly pouch', 'Herbivore creature', 'Very strong legs'],
  },
  {
    id: 'anim_3',
    word: 'Chameleon',
    category: 'Animals & Nature',
    hint: 'A specialized lizard known for color-shifting skin, independently moving eyes, and a long tongue',
    options: ['Chameleon', 'Gecko', 'Iguana', 'Salamander'],
    fakeCivClues: ['Blending into leaves', 'Independent 360 eyes', 'Super fast sticky tongue', 'Color changing camouflage', 'Curled tail on branches'],
    fakeImposterClues: ['Small reptile', 'Masters disguise in nature', 'Climbs on trees', 'Catches insects', 'Shifts appearance'],
  },
  {
    id: 'anim_4',
    word: 'Octopus',
    category: 'Animals & Nature',
    hint: 'An eight-limbed ocean creature known for its high intelligence and ink defence',
    options: ['Octopus', 'Squid', 'Jellyfish', 'Starfish'],
    fakeCivClues: ['Suction cups on tentacles', 'Shoots black ink', 'Three hearts and blue blood', 'Squeezes through tiny crevices', 'Ocean camouflage'],
    fakeImposterClues: ['Deep sea marine animal', 'Multiple flexible arms', 'Very smart invertebrate', 'Swims without bones', 'Lives in coral reefs'],
  },
  {
    id: 'anim_5',
    word: 'Sloth',
    category: 'Animals & Nature',
    hint: 'A slow-moving, tree-dwelling mammal found in Central and South American rainforests',
    options: ['Sloth', 'Koala', 'Panda', 'Chimpanzee'],
    fakeCivClues: ['Hangs upside down', 'Moves in extreme slow-mo', 'Sleeps 18 hours a day', 'Algae growing on fur', 'Canopy tree dweller'],
    fakeImposterClues: ['Known for being very relaxed', 'Rarely comes down from trees', 'Has curved claws', 'Super slow pace of life', 'Rainforest resident'],
  },

  // Places & Travel
  {
    id: 'place_1',
    word: 'Eiffel Tower',
    category: 'Places & Travel',
    hint: 'A wrought-iron lattice tower on the Champ de Mars in a romantic European capital',
    options: ['Eiffel Tower', 'Louvre Museum', 'Big Ben', 'Colosseum'],
    fakeCivClues: ['Parisian skyline', 'Sparkles every hour at night', 'Iron lady built in 1889', 'Gustave engineered it', 'Elevator to the summit'],
    fakeImposterClues: ['Huge European monument', 'Millions of tourists take photos', 'Iconic city landmark', 'Made of tall metal lattice', 'Associated with romance'],
  },
  {
    id: 'place_2',
    word: 'Pyramids of Giza',
    category: 'Places & Travel',
    hint: 'Massive ancient stone tomb monuments built by ancient pharaohs in the desert',
    options: ['Pyramids of Giza', 'Stonehenge', 'Taj Mahal', 'Colosseum'],
    fakeCivClues: ['Pharaoh Khufu tomb', 'Sphinx guardian nearby', 'Ancient wonder of limestone blocks', 'Desert sands of Egypt', 'Triangular silhouette'],
    fakeImposterClues: ['Thousands of years old', 'Giant stone structures', 'Located in dry desert climate', 'Mystery of ancient construction', 'Famous archaeological site'],
  },
  {
    id: 'place_3',
    word: 'Submarine',
    category: 'Places & Travel',
    hint: 'A watercraft capable of independent operation deep below the ocean surface',
    options: ['Submarine', 'Cruise Ship', 'Yacht', 'Seaplane'],
    fakeCivClues: ['Periscope up', 'Sonar pings beep', 'Depth pressure hull', 'Torpedos and ballast tanks', 'Yellow song by the Beatles'],
    fakeImposterClues: ['Underwater naval vessel', 'Navigates the ocean depths', 'Sealed air environment', 'Explores deep water', 'Used for defense or research'],
  },
  {
    id: 'place_4',
    word: 'Airport',
    category: 'Places & Travel',
    hint: 'A complex where aeroplanes take off, land, and passengers board flights',
    options: ['Airport', 'Train Station', 'Seaport', 'Bus Terminal'],
    fakeCivClues: ['Runway lights', 'Baggage claim carousel', 'Boarding gate announcement', 'Passport control & TSA', 'Duty free shopping'],
    fakeImposterClues: ['Major transit hub', 'People carrying luggage', 'Security screening checkpoints', 'Long hallways with terminals', 'Where journeys begin'],
  },

  // Movies & Pop Culture
  {
    id: 'pop_1',
    word: 'Spider-Man',
    category: 'Movies & Pop Culture',
    hint: 'A superhero with arachnid-like abilities who balances crime-fighting with high school or college life',
    options: ['Spider-Man', 'Batman', 'Iron Man', 'Superman'],
    fakeCivClues: ['Swinging between skyscrapers', 'Web shooter gadget', 'With great power comes great responsibility', 'Red and blue mask', 'Peter Parker'],
    fakeImposterClues: ['Famous comic book hero', 'Climbs walls effortlessly', 'Fights street criminals in NYC', 'Wears a masked suit', 'Has a famous catchphrase'],
  },
  {
    id: 'pop_2',
    word: 'Harry Potter',
    category: 'Movies & Pop Culture',
    hint: 'A boy wizard who attends a magical boarding school and battles a dark lord',
    options: ['Harry Potter', 'Lord of the Rings', 'Percy Jackson', 'Doctor Strange'],
    fakeCivClues: ['Lightning bolt scar on forehead', 'Platform 9 and 3/4', 'Gryffindor robes and wand', 'Golden snitch on broomstick', 'Hogwarts castle'],
    fakeImposterClues: ['Fantasy story about magic', 'Attends a supernatural school', 'Famous round spectacles', 'Wields a magic wand', 'Has two loyal best friends'],
  },
  {
    id: 'pop_3',
    word: 'Titanic',
    category: 'Movies & Pop Culture',
    hint: 'A romantic epic film revolving around a doomed luxury British passenger ship',
    options: ['Titanic', 'Pirates of the Caribbean', 'Cast Away', 'Life of Pi'],
    fakeCivClues: ['I am the king of the world', 'Heart of the Ocean necklace', 'Iceberg collision at sea', 'Jack and Rose on the bow', 'Drawing scene and the door'],
    fakeImposterClues: ['Tragic historic maritime voyage', 'Blockbuster romance movie', 'Unsinkable luxury liner', 'Set in cold Atlantic ocean', 'Won 11 Academy Awards'],
  },
  {
    id: 'pop_4',
    word: 'Batman',
    category: 'Movies & Pop Culture',
    hint: 'A billionaire vigilante who defends a corrupt city using martial arts and high-tech gadgets',
    options: ['Batman', 'Spider-Man', 'Iron Man', 'Wolverine'],
    fakeCivClues: ['Bat-signal in the clouds', 'Gotham city rooftop', 'Batmobile in secret cave', 'Dark knight cowl', 'Alfred the loyal butler'],
    fakeImposterClues: ['Has no superpowers only wealth', 'Operates in the dark shadows', 'Cape and horned mask', 'Famous archenemy with green hair', 'Detective vigilante'],
  },

  // Everyday Objects
  {
    id: 'obj_1',
    word: 'Smartphone',
    category: 'Everyday Objects',
    hint: 'A handheld electronic device combining mobile cellular functions with internet computing',
    options: ['Smartphone', 'Laptop', 'Smartwatch', 'Tablet'],
    fakeCivClues: ['Touchscreen glass', 'Dead battery at 1%', 'Selfie camera notch', 'Notifications buzzing in pocket', 'Apps and doomscrolling'],
    fakeImposterClues: ['Almost everyone carries one daily', 'Recharged every night', 'Rectangular pocket gadget', 'Glass screen with glowing icons', 'Used for texting and calls'],
  },
  {
    id: 'obj_2',
    word: 'Umbrella',
    category: 'Everyday Objects',
    hint: 'A folding canopy supported by ribs, used to protect against precipitation or sun',
    options: ['Umbrella', 'Raincoat', 'Sunglasses', 'Tent'],
    fakeCivClues: ['Pops open in a downpour', 'Curved hook handle', 'Shaking water drops off', 'Inside-out in windy storm', 'Keeps your head dry'],
    fakeImposterClues: ['Used outdoors when weather is wet', 'Canopy that collapses and opens', 'Carried during stormy days', 'Protects against rain', 'Left behind in coffee shops'],
  },
  {
    id: 'obj_3',
    word: 'Bicycle',
    category: 'Everyday Objects',
    hint: 'A human-powered, pedal-driven single-track vehicle with two wheels attached to a frame',
    options: ['Bicycle', 'Skateboard', 'Motorcycle', 'Scooter'],
    fakeCivClues: ['Pedaling up steep hills', 'Handlebars and ringing bell', 'Chain greased on gears', 'Wearing a safety helmet', 'Two wheels and spokes'],
    fakeImposterClues: ['Eco-friendly transportation', 'Two rubber wheels', 'Requires balance to ride', 'Pedal powered mechanism', 'Locked to outdoor racks'],
  },
  {
    id: 'obj_4',
    word: 'Telescope',
    category: 'Everyday Objects',
    hint: 'An optical instrument that makes distant cosmic or celestial objects appear magnified',
    options: ['Telescope', 'Microscope', 'Binoculars', 'Camera Lens'],
    fakeCivClues: ['Gazing at craters on the moon', 'Tripod pointed at night sky', 'Focusing on Saturn rings', 'Stargazing eyepiece', 'Astronomy observatory tube'],
    fakeImposterClues: ['Instrument for viewing far distances', 'Used by scientists and astronomers', 'Magnifies distant stars and planets', 'Long optical cylinder', 'Peeking through an eyepiece'],
  },
  {
    id: 'obj_5',
    word: 'Passport',
    category: 'Everyday Objects',
    hint: 'An official government travel document certifying identity and nationality for border crossing',
    options: ['Passport', 'Driver License', 'Boarding Pass', 'Credit Card'],
    fakeCivClues: ['Customs officer stamp', 'Gold foil crest on booklet cover', 'Valid for ten years', 'Biometric chip page', 'Required at international border'],
    fakeImposterClues: ['Small official booklet', 'Kept safe when traveling abroad', 'Contains photo ID and national crest', 'Shows entry and exit visas', 'Checked at airport gates'],
  },

  // Activities & Sports
  {
    id: 'act_1',
    word: 'Scuba Diving',
    category: 'Activities & Sports',
    hint: 'An underwater swimming mode in which the diver uses breathing apparatus completely independent of surface supply',
    options: ['Scuba Diving', 'Surfing', 'Skydiving', 'Bungee Jumping'],
    fakeCivClues: ['Oxygen tank on back', 'Clearing the goggles mask', 'Exploring coral reef corals', 'Flippers kicking in the deep', 'Hand signals underwater'],
    fakeImposterClues: ['Extreme water activity', 'Breathing underwater with gear', 'Interacting with marine life', 'Requires special certification', 'Wearing a wetsuit and fins'],
  },
  {
    id: 'act_2',
    word: 'Chess',
    category: 'Activities & Sports',
    hint: 'A two-player strategy board game played on a checkered gameboard with 64 squares',
    options: ['Chess', 'Checkers', 'Poker', 'Scrabble'],
    fakeCivClues: ['Checkmate victory', 'Knight L-shape jump', 'Black and white 64 squares', 'Protect the King at all costs', 'Queen is the most powerful piece'],
    fakeImposterClues: ['Classic tactical board game', 'Played with black and white pieces', 'Requires deep strategic thinking', 'Grandmaster tournament game', 'Turn based tactical duel'],
  },
];

export function getRandomWord(category?: string, usedIds: string[] = []): GameWord {
  let pool = WORD_BANK;
  if (category && category !== 'All') {
    pool = WORD_BANK.filter((w) => w.category === category);
    if (pool.length === 0) pool = WORD_BANK;
  }
  const unused = pool.filter((w) => !usedIds.includes(w.id));
  const selectionPool = unused.length > 0 ? unused : pool;
  const randomIndex = Math.floor(Math.random() * selectionPool.length);
  return selectionPool[randomIndex];
}
