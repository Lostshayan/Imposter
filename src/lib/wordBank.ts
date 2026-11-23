import { GameWord } from '../types/game';

export interface CategoryInfo {
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const CATEGORIES_LIST: CategoryInfo[] = [
  { name: 'Movies & Cinema', icon: '🎬', description: 'Blockbuster films, iconic directors & cinema classics', color: 'from-amber-500 to-red-600' },
  { name: 'Books & Literature', icon: '📚', description: 'Famous novels, classic literature & legendary characters', color: 'from-indigo-500 to-blue-600' },
  { name: 'Famous Personalities', icon: '🌟', description: 'Celebrities, historical icons, scientists & athletes', color: 'from-yellow-400 to-amber-600' },
  { name: 'Food & Culinary', icon: '🍕', description: 'Delicious dishes, street food, desserts & beverages', color: 'from-orange-500 to-rose-600' },
  { name: 'Animals & Wildlife', icon: '🦁', description: 'Creatures of the land, ocean depths & skies', color: 'from-emerald-500 to-teal-600' },
  { name: 'World Places & Travel', icon: '🌍', description: 'Wonders of the world, famous landmarks & destinations', color: 'from-cyan-500 to-blue-600' },
  { name: 'Video Games & Gaming', icon: '🎮', description: 'Retro classics, modern hits & iconic gaming legends', color: 'from-purple-500 to-pink-600' },
  { name: 'Music & Instruments', icon: '🎸', description: 'Instruments, bands, concerts & musical gear', color: 'from-rose-500 to-violet-600' },
  { name: 'Sports & Fitness', icon: '⚽', description: 'Worldwide sports, tournaments, athletes & athletic gear', color: 'from-green-500 to-emerald-600' },
  { name: 'Everyday Objects & Tech', icon: '📱', description: 'Gadgets, appliances, travel gear & modern tech', color: 'from-slate-500 to-zinc-600' },
];

export const ALL_CATEGORY_NAMES = CATEGORIES_LIST.map((c) => c.name);

export const WORD_BANK: GameWord[] = [
  // ===================== MOVIES & CINEMA =====================
  {
    id: 'mov_1',
    word: 'Titanic',
    category: 'Movies & Cinema',
    hint: 'A romantic epic film revolving around a doomed luxury passenger liner that struck an iceberg',
    fakeCivClues: ['I am the king of the world', 'Heart of the Ocean necklace', 'Iceberg collision', 'Jack and Rose', 'Violin players on deck'],
    fakeImposterClues: ['Blockbuster maritime romance', 'Set on the open ocean', 'Tragic historic voyage', 'Won many Oscars', 'Massive ship disaster'],
  },
  {
    id: 'mov_2',
    word: 'Inception',
    category: 'Movies & Cinema',
    hint: 'A psychological sci-fi thriller about thieves entering subconscious dreams to steal or plant ideas',
    fakeCivClues: ['Spinning metal top totem', 'Dream within a dream', 'Folded city streets', 'Elevator subconscious levels', 'Kick wake-up music'],
    fakeImposterClues: ['Mind-bending sci-fi thriller', 'Complex multi-layered plot', 'Directed by Christopher Nolan', 'About thoughts and sleeping', 'Heist inside the mind'],
  },
  {
    id: 'mov_3',
    word: 'Jurassic Park',
    category: 'Movies & Cinema',
    hint: 'A sci-fi adventure film about a safari theme park populated by genetically cloned dinosaurs',
    fakeCivClues: ['Amber mosquito DNA', 'Water cup vibrating ripples', 'T-Rex breakout in the rain', 'Velociraptor in kitchen', 'Life finds a way'],
    fakeImposterClues: ['Wild prehistoric creatures run loose', 'Amusement park gone wrong', 'Tropical remote island', 'Dangerous giant beasts', 'Steven Spielberg classic'],
  },
  {
    id: 'mov_4',
    word: 'Star Wars',
    category: 'Movies & Cinema',
    hint: 'An epic space opera franchise featuring Jedi knights, lightsabers, and a galactic civil war',
    fakeCivClues: ['Glowing lightsaber hum', 'May the Force be with you', 'Death Star trench run', 'Millennium Falcon hyperdrive', 'Heavy breathing mask'],
    fakeImposterClues: ['Classic cosmic franchise', 'Intergalactic battles', 'Good vs evil space conflict', 'Famous robots and spaceships', 'Hero with a laser sword'],
  },
  {
    id: 'mov_5',
    word: 'The Matrix',
    category: 'Movies & Cinema',
    hint: 'A cyberpunk sci-fi movie where humanity is unknowingly trapped inside a simulated reality',
    fakeCivClues: ['Red pill vs blue pill', 'Green falling digital code', 'Dodging bullets in slow-mo', 'Leather trench coats and shades', 'There is no spoon'],
    fakeImposterClues: ['Simulated artificial world', 'Rebellion against machines', 'Martial arts and leather coats', 'Questioning what is real', 'Action sci-fi classic'],
  },
  {
    id: 'mov_6',
    word: 'The Lion King',
    category: 'Movies & Cinema',
    hint: 'A celebrated animated film following a young African savanna prince reclaiming his throne from his uncle',
    fakeCivClues: ['Pride Rock sunrise', 'Hakuna Matata song', 'Wildebeest stampede gorge', 'Baboon drawing with fruit', 'Circle of Life'],
    fakeImposterClues: ['African savanna royalty', 'Beloved animated Disney classic', 'Regal animals in nature', 'Tragic uncle betrayal', 'Coming of age adventure'],
  },
  {
    id: 'mov_7',
    word: 'Avengers',
    category: 'Movies & Cinema',
    hint: 'A superhero team film where Earth’s mightiest heroes unite against cosmic invaders',
    fakeCivClues: ['Assembly call', 'Infinity stones and gauntlet', 'New York alien portal', 'Green rage smash', 'Vibranium shield throw'],
    fakeImposterClues: ['Ensemble hero team', 'Saving Earth from invasion', 'Massive box office franchise', 'Suits of armor and weapons', 'Comic book adaptation'],
  },

  // ===================== BOOKS & LITERATURE =====================
  {
    id: 'book_1',
    word: 'Sherlock Holmes',
    category: 'Books & Literature',
    hint: 'A brilliant Victorian London consulting detective known for deductive reasoning and a pipe',
    fakeCivClues: ['221B Baker Street', 'Magnifying glass and pipe', 'Faithful Dr. Watson notes', 'Elementary deduction', 'Violin and deerstalker cap'],
    fakeImposterClues: ['Famous British detective', 'Solves impossible mysteries', 'Exceptional observation skills', 'Victorian London era', 'Iconic literary sleuth'],
  },
  {
    id: 'book_2',
    word: 'Harry Potter',
    category: 'Books & Literature',
    hint: 'A fantasy novel series following a boy wizard attending a magical boarding school',
    fakeCivClues: ['Lightning scar on forehead', 'Platform 9 and 3/4', 'Sorting hat ceremony', 'Feather quill and owl letters', 'Golden snitch on broomstick'],
    fakeImposterClues: ['Magical boarding school', 'Young wizard protagonist', 'Wields magic wand', 'Battles dark magical forces', 'Bestselling fantasy series'],
  },
  {
    id: 'book_3',
    word: 'Romeo & Juliet',
    category: 'Books & Literature',
    hint: 'Shakespeare’s tragic romance about two star-crossed young lovers from feuding families in Verona',
    fakeCivClues: ['Balcony soliloquy at night', 'Capulet and Montague feud', 'A rose by any other name', 'Poison potion vial', 'Tragic tomb misunderstanding'],
    fakeImposterClues: ['Forbidden romantic tragedy', 'Ancient family feud', 'Written by Shakespeare', 'Star-crossed young lovers', 'Set in historic Italy'],
  },
  {
    id: 'book_4',
    word: 'Frankenstein',
    category: 'Books & Literature',
    hint: 'A gothic novel about an ambitious scientist who creates a living creature from assembled parts',
    fakeCivClues: ['Lightning storm laboratory', 'Created from graveyard parts', 'Mary Shelley masterpiece', 'Monster fears blazing torches', 'The modern Prometheus'],
    fakeImposterClues: ['Gothic horror classic', 'Scientist plays creator', 'Reanimated artificial life', 'Tormented misunderstood creature', 'Science gone too far'],
  },
  {
    id: 'book_5',
    word: 'Lord of the Rings',
    category: 'Books & Literature',
    hint: 'An epic high-fantasy saga following a quest across Middle-earth to destroy a corrupting golden ring',
    fakeCivClues: ['Mount Doom volcanic fires', 'One Ring in darkness bind them', 'Hobbit with bare hairy feet', 'Elven cloaks and Lembas bread', 'My precious whisper'],
    fakeImposterClues: ['Grand fantasy saga', 'Dangerous quest across mythical lands', 'Cursed magical artifact', 'Elves, dwarves and wizards', 'Battle for Middle-earth'],
  },
  {
    id: 'book_6',
    word: 'Alice in Wonderland',
    category: 'Books & Literature',
    hint: 'A whimsical novel about a young girl who falls down a rabbit hole into a surreal nonsensical world',
    fakeCivClues: ['Mad Hatter tea party', 'Grinning Cheshire cat', 'White rabbit with pocket watch', 'Drink Me potion shrinks', 'Queen of Hearts croquet'],
    fakeImposterClues: ['Bizarre dreamlike world', 'Talking strange creatures', 'Fell through a rabbit hole', 'Nonsense riddles and tea', 'Classic children fantasy'],
  },

  // ===================== FAMOUS PERSONALITIES =====================
  {
    id: 'pers_1',
    word: 'Albert Einstein',
    category: 'Famous Personalities',
    hint: 'A revolutionary theoretical physicist with iconic unruly hair who developed the theory of relativity',
    fakeCivClues: ['E equals mc squared', 'Nobel prize for physics', 'Tongue sticking out photo', 'General relativity chalkboard', 'Wild unruly gray hair'],
    fakeImposterClues: ['World famous scientist', 'Genius theoretical thinker', 'Known for mathematical formulas', 'Changed understanding of physics', 'Iconic 20th century mind'],
  },
  {
    id: 'pers_2',
    word: 'Taylor Swift',
    category: 'Famous Personalities',
    hint: 'A global music pop icon and songwriter renowned for record-breaking stadium tours and passionate fans',
    fakeCivClues: ['The Eras Stadium Tour', 'Friendship bracelets trade', 'Rerecorded Taylor Versions', 'Red lipstick guitar', 'Number 13 lucky charm'],
    fakeImposterClues: ['Global chart-topping musician', 'Enormous worldwide fanbase', 'Famous for songwriting albums', 'Sells out massive stadiums', 'Pop and country singer'],
  },
  {
    id: 'pers_3',
    word: 'Cristiano Ronaldo',
    category: 'Famous Personalities',
    hint: 'An elite Portuguese football legend famous for his extraordinary athleticism, #7 jersey, and "Siu" celebration',
    fakeCivClues: ['Siu jumping celebration', 'Number 7 jersey', 'Incredible heading vertical leap', 'Portuguese national captain', 'Five Champions League trophies'],
    fakeImposterClues: ['World renowned soccer superstar', 'Extreme athletic fitness', 'Record-breaking goal scorer', 'Global sports icon', 'Famous celebratory leap'],
  },
  {
    id: 'pers_4',
    word: 'Leonardo da Vinci',
    category: 'Famous Personalities',
    hint: 'An Italian Renaissance polymath who painted the Mona Lisa and drew visionary mechanical inventions',
    fakeCivClues: ['Enigmatic Mona Lisa smile', 'The Last Supper mural', 'Vitruvian Man proportions', 'Mirror handwriting sketches', 'Early helicopter sketches'],
    fakeImposterClues: ['Italian Renaissance master', 'Painter, inventor and polymath', 'Created priceless museum masterpieces', 'Centuries ahead of his time', 'Sketched flying machines'],
  },
  {
    id: 'pers_5',
    word: 'Michael Jackson',
    category: 'Famous Personalities',
    hint: 'The legendary "King of Pop" known for the moonwalk dance, sparkling glove, and record-breaking album Thriller',
    fakeCivClues: ['Gliding moonwalk steps', 'Single sparkling white glove', 'Red leather Thriller jacket', 'Anti-gravity lean stunt', 'Fedora hat tip on stage'],
    fakeImposterClues: ['The King of Pop music', 'Iconic dance moves', 'Bestselling music artist', 'Known for flashy stage costumes', 'Electrifying vocal performance'],
  },
  {
    id: 'pers_6',
    word: 'Elon Musk',
    category: 'Famous Personalities',
    hint: 'A prominent billionaire tech entrepreneur heading electric vehicle development, orbital space rockets, and brain chips',
    fakeCivClues: ['Reusable booster rockets landing', 'Cybertruck stainless steel', 'X logo bird rebrand', 'Mars colonization dream', 'Electric battery gigafactory'],
    fakeImposterClues: ['Controversial tech billionaire', 'Builds rockets and electric cars', 'Active social media presence', 'Focuses on space and energy', 'CEO of multiple tech giants'],
  },
  {
    id: 'pers_7',
    word: 'William Shakespeare',
    category: 'Famous Personalities',
    hint: 'The greatest English playwright and poet who wrote Hamlet, Romeo and Juliet, and Macbeth in Elizabethan London',
    fakeCivClues: ['Globe Theatre in London', 'To be or not to be soliloquy', 'Quill and parchment sonnets', 'Ruff collar and doublet', 'Avon playwright'],
    fakeImposterClues: ['Historic literary icon', 'Master of English drama', 'Wrote timeless plays and tragedies', 'Elizabethan era writer', 'Read in schools worldwide'],
  },

  // ===================== FOOD & CULINARY =====================
  {
    id: 'food_1',
    word: 'Pizza',
    category: 'Food & Culinary',
    hint: 'A popular oven-baked round flatbread topped with cheese, tomato sauce, and savory toppings',
    fakeCivClues: ['Melted mozzarella crust', 'Triangular cut slices', 'Wood-fired brick oven', 'Square cardboard delivery box', 'Pepperoni rings'],
    fakeImposterClues: ['Favorite comfort meal', 'Baked flatbread with toppings', 'Eaten with hands', 'Popular for group parties', 'Originated in Italy'],
  },
  {
    id: 'food_2',
    word: 'Espresso',
    category: 'Food & Culinary',
    hint: 'A rich concentrated dark coffee brewed under high pressure, typically served in small ceramic cups',
    fakeCivClues: ['Golden crema on top', 'Tiny ceramic cup', 'Steam wand and portafilter', 'Double shot morning boost', 'Dark roasted grounds'],
    fakeImposterClues: ['High caffeine hot beverage', 'Small serving size', 'Bitter intense flavor', 'Ordered at coffee shops', 'Morning routine drink'],
  },
  {
    id: 'food_3',
    word: 'Sushi',
    category: 'Food & Culinary',
    hint: 'A traditional Japanese dish of prepared vinegared rice served with raw fish, vegetables, and nori seaweed',
    fakeCivClues: ['Black nori seaweed roll', 'Soy sauce dipping dish', 'Wasabi kick paste', 'Pickled ginger slices', 'Fresh salmon sashimi'],
    fakeImposterClues: ['Japanese culinary specialty', 'Prepared with seafood and rice', 'Eaten with chopsticks', 'Served fresh or chilled', 'Aesthetic presentation'],
  },
  {
    id: 'food_4',
    word: 'Popcorn',
    category: 'Food & Culinary',
    hint: 'A puffy, airy snack produced by heating corn kernels until they burst and expand',
    fakeCivClues: ['Red and white striped cinema tub', 'Melted butter fragrance', 'Unpopped kernels at bottom', 'Popping microwave bag', 'Crunchy movie companion'],
    fakeImposterClues: ['Classic movie snack', 'Light and salty crunch', 'Heated corn kernels', 'Sold in big cinema buckets', 'White puffy texture'],
  },
  {
    id: 'food_5',
    word: 'Ice Cream',
    category: 'Food & Culinary',
    hint: 'A sweetened frozen dairy treat available in numerous flavors, often served in a waffle cone',
    fakeCivClues: ['Melting waffle cone', 'Two scoops with sprinkles', 'Mint chocolate chip flavor', 'Brain freeze sensation', 'Cherry on a sundae'],
    fakeImposterClues: ['Sweet frozen dessert', 'Eaten cold on hot days', 'Comes in scoops or tubs', 'Licked on a cone', 'Found in freezer section'],
  },
  {
    id: 'food_6',
    word: 'Croissant',
    category: 'Food & Culinary',
    hint: 'A buttery, flaky, crescent-shaped pastry made of laminated dough of French origin',
    fakeCivClues: ['Golden flaky layers', 'Crescent moon curve', 'French bakery morning aroma', 'Buttery pastry crumbs', 'Pairs with cafe au lait'],
    fakeImposterClues: ['European baked pastry', 'Golden brown crust', 'Crispy and buttery layers', 'Breakfast staple', 'Curved shape'],
  },
  {
    id: 'food_7',
    word: 'Tacos',
    category: 'Food & Culinary',
    hint: 'A traditional Mexican dish consisting of a folded maize or wheat tortilla filled with seasoned meats and salsa',
    fakeCivClues: ['Lime wedge squeeze', 'Chopped cilantro and onion', 'Crispy or soft tortilla fold', 'Spicy red salsa drip', 'Tuesday dinner feast'],
    fakeImposterClues: ['Famous Mexican handheld food', 'Tortilla shell with fillings', 'Seasoned meat and toppings', 'Spicy sauces and cheese', 'Folded or rolled'],
  },

  // ===================== ANIMALS & WILDLIFE =====================
  {
    id: 'anim_1',
    word: 'Penguin',
    category: 'Animals & Wildlife',
    hint: 'A flightless aquatic bird known for black-and-white tuxedo coloring, waddling gait, and icy habitats',
    fakeCivClues: ['Antarctic sea ice', 'Tuxedo feather pattern', 'Belly sliding on snow', 'Huddling against blizzards', 'Torpedo swimming underwater'],
    fakeImposterClues: ['Lives in polar freezing climate', 'Flightless bird species', 'Black and white plumage', 'Swims and eats seafood', 'Waddling walk'],
  },
  {
    id: 'anim_2',
    word: 'Kangaroo',
    category: 'Animals & Wildlife',
    hint: 'An Australian marsupial with powerful hind legs, large feet, and an abdominal pouch for carrying joeys',
    fakeCivClues: ['Australian Outback red dirt', 'Joey peeking from front pouch', 'Powerful jumping hops', 'Heavy balancing tail', 'Boxing stance'],
    fakeImposterClues: ['Famous Australian mammal', 'Bounces and jumps far', 'Carries baby in belly pocket', 'Strong hind legs', 'Grazing herbivore'],
  },
  {
    id: 'anim_3',
    word: 'Chameleon',
    category: 'Animals & Wildlife',
    hint: 'A specialized lizard distinguished by color-shifting camouflage, stereoscopic eyes, and an elastic tongue',
    fakeCivClues: ['Shifting skin hues to match leaves', 'Independent 360 eyes', 'Lightning fast sticky tongue', 'Prehensile curling tail', 'Reptile in tree canopy'],
    fakeImposterClues: ['Color-changing small reptile', 'Camouflages in foliage', 'Climbs on tree branches', 'Hunts small insects', 'Distinctive swiveling eyes'],
  },
  {
    id: 'anim_4',
    word: 'Octopus',
    category: 'Animals & Wildlife',
    hint: 'A soft-bodied, eight-armed marine mollusk known for high intelligence, camouflage, and ink expulsion',
    fakeCivClues: ['Eight suction-cupped arms', 'Cloud of dark ink defence', 'Three hearts and blue blood', 'Squeezing through tiny glass jars', 'Master of coral mimicry'],
    fakeImposterClues: ['Intelligent sea creature', 'Multiple flexible arms', 'Swims without any skeleton', 'Shoots defensive ink', 'Deep ocean inhabitant'],
  },
  {
    id: 'anim_5',
    word: 'Sloth',
    category: 'Animals & Wildlife',
    hint: 'A slow-moving, tree-dwelling tropical mammal that hangs upside down in rainforest canopies',
    fakeCivClues: ['Hanging upside down from limbs', 'Extreme slow motion climbing', 'Algae tinted greenish fur', 'Sleeping 20 hours a day', 'Rainforest canopy dweller'],
    fakeImposterClues: ['Known for very relaxed speed', 'Lives high in tree branches', 'Curved claws for gripping', 'Spends day sleeping', 'Tropical forest animal'],
  },
  {
    id: 'anim_6',
    word: 'Dolphin',
    category: 'Animals & Wildlife',
    hint: 'A highly intelligent aquatic mammal known for playful acrobatic leaps, clicks, and a blowhole',
    fakeCivClues: ['Echolocation clicking sounds', 'Leaping through boat waves', 'Curved dorsal fin and blowhole', 'Playful pod intelligence', 'Grey streamlined marine mammal'],
    fakeImposterClues: ['Friendly intelligent sea mammal', 'Breathes air through blowhole', 'Performs acrobatic jumps', 'Swims in ocean pods', 'Communicates with clicks'],
  },

  // ===================== WORLD PLACES & TRAVEL =====================
  {
    id: 'place_1',
    word: 'Eiffel Tower',
    category: 'World Places & Travel',
    hint: 'A famous wrought-iron lattice tower standing on the Champ de Mars in Paris, France',
    fakeCivClues: ['Parisian skyline iron lady', 'Sparkling evening light show', 'Champ de Mars garden lawn', 'Gustave engineered in 1889', 'Summit city observation deck'],
    fakeImposterClues: ['Famous European monument', 'Millions of visiting tourists', 'Made of metal lattice', 'Romantic city backdrop', 'Tall structural icon'],
  },
  {
    id: 'place_2',
    word: 'Pyramids of Giza',
    category: 'World Places & Travel',
    hint: 'Colossal ancient monumental stone tombs built by Egyptian pharaohs in the desert sands',
    fakeCivClues: ['Pharaoh Khufu resting tomb', 'Sphinx guardian stone lion', 'Limestone blocks in Sahara', 'Triangular geometric peaks', 'Ancient wonder of the world'],
    fakeImposterClues: ['Thousands of years ancient', 'Huge triangular stone structures', 'Desert archaeological site', 'Built by historic rulers', 'Famous historic landmark'],
  },
  {
    id: 'place_3',
    word: 'Statue of Liberty',
    category: 'World Places & Travel',
    hint: 'A colossal neoclassical copper sculpture on Liberty Island in New York Harbor, gifted by France',
    fakeCivClues: ['Green oxidized copper robes', 'Raised golden torch in harbor', 'Spiked radiate crown', 'Broken chains at feet', 'Gift from French republic'],
    fakeImposterClues: ['Iconic harbor statue', 'Symbolizes freedom and welcome', 'Green weathered metal', 'Holds a torch up high', 'Famous American landmark'],
  },
  {
    id: 'place_4',
    word: 'Colosseum',
    category: 'World Places & Travel',
    hint: 'An immense elliptical amphitheater in the center of Rome, once hosting gladiatorial battles',
    fakeCivClues: ['Roman gladiators duel arena', 'Ancient travertine stone arches', 'Underground hypogeum cages', 'Emperor thumb up or down', 'Ruins in heart of Italy'],
    fakeImposterClues: ['Historic circular stone arena', 'Centuries old Roman ruin', 'Spectator stadium for combat', 'Famous Italian monument', 'Arched stone exterior'],
  },
  {
    id: 'place_5',
    word: 'Taj Mahal',
    category: 'World Places & Travel',
    hint: 'An immense white marble mausoleum in Agra, India, commissioned by Emperor Shah Jahan for his wife',
    fakeCivClues: ['Ivory white marble dome', 'Reflecting pool in Agra garden', 'Shah Jahan tribute of love', 'Four surrounding minaret towers', 'Intricate floral stone inlays'],
    fakeImposterClues: ['Breathtaking white palace tomb', 'Monument of true love', 'Famous Indian architectural gem', 'Reflected in garden water', 'Grand central dome'],
  },

  // ===================== VIDEO GAMES & GAMING =====================
  {
    id: 'game_1',
    word: 'Super Mario',
    category: 'Video Games & Gaming',
    hint: 'An iconic Nintendo franchise starring an Italian plumber who rescues Princess Peach from Bowser',
    fakeCivClues: ['Red cap with M insignia', 'Stomping on brown goombas', 'Green warp pipes and coins', 'Power-up red mushroom', 'Saving Princess Peach from castle'],
    fakeImposterClues: ['Most famous platformer hero', 'Jumping across colorful worlds', 'Classic Nintendo video game', 'Mustache and overalls', 'Saving royal damsel'],
  },
  {
    id: 'game_2',
    word: 'Minecraft',
    category: 'Video Games & Gaming',
    hint: 'A blocky 3D sandbox video game where players explore infinite terrain, mine minerals, and build structures',
    fakeCivClues: ['Punching wooden tree trunks', 'Hissing green creeper explosion', 'Diamond pickaxe mining', 'Nether portal obsidian blocks', 'Cubic voxel graphics'],
    fakeImposterClues: ['Blocky building sandbox game', 'Gathering resources and crafting', 'Surviving night monsters', 'Massive global gaming hit', 'Everything is made of cubes'],
  },
  {
    id: 'game_3',
    word: 'Pokémon',
    category: 'Video Games & Gaming',
    hint: 'A monster-taming franchise where trainers battle, trade, and capture creatures using red and white balls',
    fakeCivClues: ['Gotta catch em all', 'Red and white Pokéball throw', 'Yellow electric mouse buddy', 'Gym badge battle challenge', 'Turn based creature battle'],
    fakeImposterClues: ['Collecting and training monsters', 'Battling other trainers', 'Pocket creatures in balls', 'Global anime and game franchise', 'Turn based elemental attacks'],
  },
  {
    id: 'game_4',
    word: 'Tetris',
    category: 'Video Games & Gaming',
    hint: 'A classic tile-matching puzzle game where falling geometric tetromino blocks are cleared by completing lines',
    fakeCivClues: ['Falling four-block shapes', 'Clearing four lines at once', 'Classic Russian folk melody', 'Rotating blocks quickly', 'Grid stacking to the top'],
    fakeImposterClues: ['Legendary puzzle video game', 'Fitting falling geometric blocks', 'Clearing horizontal lines', 'Fast reflexes as speed rises', 'Addictive arcade classic'],
  },
  {
    id: 'game_5',
    word: 'Pac-Man',
    category: 'Video Games & Gaming',
    hint: 'A vintage arcade maze game where a yellow character chomps pellets while dodging colorful ghosts',
    fakeCivClues: ['Waka waka eating sound', 'Chasing blue flashing ghosts', 'Flashing power pellet corner', 'Blinky, Pinky, Inky, Clyde', 'Cherry and fruit bonus items'],
    fakeImposterClues: ['Retro arcade maze chomp', 'Dodging four colored ghosts', 'Yellow circle shaped character', 'Eating glowing dots', 'Early gaming history icon'],
  },

  // ===================== MUSIC & INSTRUMENTS =====================
  {
    id: 'mus_1',
    word: 'Electric Guitar',
    category: 'Music & Instruments',
    hint: 'A stringed musical instrument that converts string vibrations into electrical signals played through an amplifier',
    fakeCivClues: ['Six steel strings and pick', 'Distortion amplifier pedals', 'Blistering rock solo riffs', 'Whammy bar pitch bends', 'Plugged with instrument cable'],
    fakeImposterClues: ['Essential rock band instrument', 'Played with fingers or pick', 'Connected to loud sound speakers', 'Features neck with frets', 'Symbol of rock and roll'],
  },
  {
    id: 'mus_2',
    word: 'Piano',
    category: 'Music & Instruments',
    hint: 'An acoustic keyboard musical instrument where felt hammers strike steel strings when keys are pressed',
    fakeCivClues: ['88 black and white keys', 'Sustain foot pedal', 'Curved polished grand lid', 'Hammer striking internal strings', 'Classical concert recital'],
    fakeImposterClues: ['Classic keyboard instrument', 'Played with both hands', 'Has black and white keys', 'Found in concert halls', 'Expressive musical melodies'],
  },
  {
    id: 'mus_3',
    word: 'Vinyl Record',
    category: 'Music & Instruments',
    hint: 'An analog sound storage medium consisting of a flat polyvinyl chloride disc with spiral sound grooves',
    fakeCivClues: ['Turntable needle stylus in groove', '33 and 45 RPM rotation speeds', 'Album cover artwork cardboard', 'Analog warm sound crackle', 'Spinning black grooved platter'],
    fakeImposterClues: ['Classic music disc format', 'Played on a spinning turntable', 'Has spiral sound grooves', 'Collector retro music item', 'Round black physical media'],
  },
  {
    id: 'mus_4',
    word: 'DJ Turntable',
    category: 'Music & Instruments',
    hint: 'Equipment used by disc jockeys to manipulate vinyl or digital tracks, scratch sounds, and mix beats',
    fakeCivClues: ['Crossfader slide switch', 'Scratching record back and forth', 'Headphones on one ear', 'Club sound system mixer', 'Beatmatching tempo sliders'],
    fakeImposterClues: ['Used in nightclubs and parties', 'Mixes dance songs seamlessly', 'Scratching audio effects', 'Controlled by DJ on stage', 'Electronic music equipment'],
  },

  // ===================== SPORTS & FITNESS =====================
  {
    id: 'sport_1',
    word: 'Basketball',
    category: 'Sports & Fitness',
    hint: 'A team sport where players advance an orange ball by dribbling and attempt to shoot it through an elevated hoop',
    fakeCivClues: ['Orange pebbled rubber ball', 'Swishing through the net', 'Three point arc jump shot', 'Dribbling on hardwood court', 'Slam dunk on the rim'],
    fakeImposterClues: ['Fast-paced ball court game', 'Shooting through an elevated rim', 'Played with orange bouncy ball', 'Dribbling and passing', 'Five players on each side'],
  },
  {
    id: 'sport_2',
    word: 'Chess',
    category: 'Sports & Fitness',
    hint: 'A two-player tactical strategy board game played on an 8x8 checkered grid with 16 pieces per player',
    fakeCivClues: ['Checkmate king trapped', 'Knight jumping L-shape', 'Black and white 64 squares', 'Queen diagonal and straight moves', 'Pawn reaching opposite rank'],
    fakeImposterClues: ['Classic intellectual battle', 'Played with black and white pieces', 'Requires intense foresight', 'Captured king ends game', 'Ancient strategic game'],
  },
  {
    id: 'sport_3',
    word: 'Formula 1',
    category: 'Sports & Fitness',
    hint: 'The highest class of international open-wheel single-seater motorsport road racing',
    fakeCivClues: ['Two-second pit stop tire swap', 'Checkered flag at finish line', 'Screaming hybrid V6 engine', 'Monaco street circuit hairpin', 'Podium champagne spray'],
    fakeImposterClues: ['High speed elite car racing', 'Open cockpit race cars', 'Grand Prix worldwide circuits', 'Famous racing drivers and teams', 'High-tech pit stops'],
  },
  {
    id: 'sport_4',
    word: 'Scuba Diving',
    category: 'Sports & Fitness',
    hint: 'An underwater swimming discipline where divers breathe from portable pressurized gas cylinders',
    fakeCivClues: ['Pressurized tank on back', 'Clearing the dive mask', 'Exploring vibrant coral reefs', 'Rubber fin kicks in blue water', 'Submerged pressure gauge check'],
    fakeImposterClues: ['Deep water exploration', 'Breathing with gas cylinder', 'Wearing wetsuit and flippers', 'Interacting with marine life', 'Certified aquatic sport'],
  },

  // ===================== EVERYDAY OBJECTS & TECH =====================
  {
    id: 'obj_1',
    word: 'Smartphone',
    category: 'Everyday Objects & Tech',
    hint: 'A portable handheld computing device combining cellular phone capabilities with mobile internet apps',
    fakeCivClues: ['Touchscreen gorilla glass', 'Cracked screen protector', '1% battery charging scramble', 'Front camera selfie notch', 'Vibrating notifications buzz'],
    fakeImposterClues: ['In almost everyone’s pocket', 'Recharged every single night', 'Glass screen glowing with apps', 'Used for texting and internet', 'Essential modern gadget'],
  },
  {
    id: 'obj_2',
    word: 'Umbrella',
    category: 'Everyday Objects & Tech',
    hint: 'A collapsible canopy designed to protect a person against rainfall or intense sunlight',
    fakeCivClues: ['Pops open in downpour', 'Curved J-hook handle', 'Shaking rain droplets off', 'Flipped inside out in strong wind', 'Carried on stormy days'],
    fakeImposterClues: ['Used outdoors in bad weather', 'Collapsible cloth canopy', 'Keeps clothing dry from rain', 'Easily left behind in cafes', 'Held by a central stem'],
  },
  {
    id: 'obj_3',
    word: 'Bicycle',
    category: 'Everyday Objects & Tech',
    hint: 'A human-powered, pedal-driven single-track vehicle with two wheels attached to a metal frame',
    fakeCivClues: ['Pedaling up steep inclines', 'Ringing handlebar bell', 'Greased chain on gear sprockets', 'Wearing protective helmet', 'Locked to outdoor bike rack'],
    fakeImposterClues: ['Two wheeled eco transit', 'Pedaled with legs', 'Requires balance and steering', 'Good cardio exercise', 'Common urban transport'],
  },
  {
    id: 'obj_4',
    word: 'Telescope',
    category: 'Everyday Objects & Tech',
    hint: 'An optical instrument that gathers light to magnify distant celestial stars and planets',
    fakeCivClues: ['Gazing at craters on the moon', 'Focusing on rings of Saturn', 'Adjustable tripod legs', 'Stargazing dark sky eyepiece', 'Astronomy observatory tube'],
    fakeImposterClues: ['Magnifies far away objects', 'Used by astronomers at night', 'Aims at distant stars and planets', 'Long optical lens tube', 'Peeking through an eyepiece'],
  },
  {
    id: 'obj_5',
    word: 'Passport',
    category: 'Everyday Objects & Tech',
    hint: 'An official government travel booklet verifying identity and nationality for international border entry',
    fakeCivClues: ['Customs border officer ink stamp', 'Gold foil national crest on cover', 'Biometric chip page', 'Valid for ten years', 'Kept in carry-on bag'],
    fakeImposterClues: ['Essential booklet for foreign travel', 'Contains photo and nationality', 'Checked at airport gates', 'Stamped with entry visas', 'Official government document'],
  },
];

export function getRandomWord(enabledCategories?: string[], usedIds: string[] = []): GameWord {
  let pool = WORD_BANK;

  if (enabledCategories && enabledCategories.length > 0) {
    const filtered = WORD_BANK.filter((w) => enabledCategories.includes(w.category));
    if (filtered.length > 0) {
      pool = filtered;
    }
  }

  const unused = pool.filter((w) => !usedIds.includes(w.id));
  const selectionPool = unused.length > 0 ? unused : pool;
  const randomIndex = Math.floor(Math.random() * selectionPool.length);
  return selectionPool[randomIndex];
}
