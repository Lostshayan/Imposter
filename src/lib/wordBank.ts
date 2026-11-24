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
    hint: 'Cold Voyage',
    fakeCivClues: ['Jack and Rose', 'Iceberg collision', 'Cold ocean waters', 'Blue diamond necklace', 'Door floating scene', 'Violin players on deck', 'Shipwreck tragedy'],
    fakeImposterClues: ['Deep emotional drama', 'Classic romantic story', 'Massive box office hit', 'Epic historic journey', 'Tragic open waters', 'Heartbreaking ending'],
  },
  {
    id: 'mov_2',
    word: 'Inception',
    category: 'Movies & Cinema',
    hint: 'Mind Heist',
    fakeCivClues: ['Spinning metal top', 'Dream within dream', 'City folding over', 'Subconscious elevator', 'Waking up kick', 'Totem test', 'Christopher Nolan twist'],
    fakeImposterClues: ['Mind-bending plot', 'Psychological thriller', 'Complicated storyline', 'High stakes mission', 'Action with deeper meaning', 'Very trippy visuals'],
  },
  {
    id: 'mov_3',
    word: 'Jurassic Park',
    category: 'Movies & Cinema',
    hint: 'Prehistoric Island',
    fakeCivClues: ['T-Rex rain roar', 'Water cup ripples', 'Amber mosquito fossil', 'Raptors in kitchen', 'Electric fence failure', 'Life finds a way', 'Isla Nublar safari'],
    fakeImposterClues: ['Survival adventure', 'Creatures running wild', 'Island theme park', 'Pure 90s nostalgia', 'Dangerous scientific mistake', 'Iconic monster thrill'],
  },
  {
    id: 'mov_4',
    word: 'Star Wars',
    category: 'Movies & Cinema',
    hint: 'Cosmic Conflict',
    fakeCivClues: ['Glowing lightsaber duel', 'May the Force', 'Death Star trench', 'Millennium Falcon ship', 'Heavy breathing mask', 'Jedi vs Sith', 'Wookiee roar'],
    fakeImposterClues: ['Epic space franchise', 'Timeless good vs evil', 'Huge galactic battle', 'Beloved space heroes', 'Laser battles and ships', 'Legendary pop culture'],
  },
  {
    id: 'mov_5',
    word: 'The Matrix',
    category: 'Movies & Cinema',
    hint: 'Digital Illusion',
    fakeCivClues: ['Red or blue pill', 'Falling green code', 'Dodging bullets in slowmo', 'Black leather shades', 'Wake up Neo', 'Agent Smith fight', 'There is no spoon'],
    fakeImposterClues: ['Questioning reality', 'Cyberpunk action classic', 'Fierce martial arts', 'Dystopian machine rebellion', 'Mind-opening plot', 'Super slick style'],
  },
  {
    id: 'mov_6',
    word: 'The Lion King',
    category: 'Movies & Cinema',
    hint: 'Savannah Royalty',
    fakeCivClues: ['Pride Rock sunrise', 'Hakuna Matata song', 'Wildebeest stampede', 'Evil uncle Scar', 'Circle of Life anthem', 'Baboon forehead mark', 'Savannah kingdom'],
    fakeImposterClues: ['Heartwarming animated classic', 'Royal animal journey', 'Beloved childhood music', 'Coming of age story', 'Tragic family loss', 'Golden African setting'],
  },
  {
    id: 'mov_7',
    word: 'Avengers',
    category: 'Movies & Cinema',
    hint: 'Hero Assembly',
    fakeCivClues: ['Assemble rallying call', 'Infinity gauntlet snap', 'New York sky portal', 'Green rage smash', 'Vibranium shield bounce', 'Hammer of thunder', 'Billionaire iron suit'],
    fakeImposterClues: ['Huge superhero team', 'Saving planet Earth', 'Massive crossover event', 'Big action explosions', 'All-star cast lineup', 'Billion dollar blockbuster'],
  },

  // ===================== BOOKS & LITERATURE =====================
  {
    id: 'book_1',
    word: 'Sherlock Holmes',
    category: 'Books & Literature',
    hint: 'Victorian Sleuth',
    fakeCivClues: ['221B Baker Street', 'Magnifying glass clues', 'Faithful Dr Watson', 'Elementary deduction', 'Deerstalker cap pipe', 'Violin at midnight', 'London fog mystery'],
    fakeImposterClues: ['Master detective mind', 'Unraveling strange crimes', 'British literary classic', 'Sharp observation skills', 'Famous Victorian era', 'Classic mystery sleuth'],
  },
  {
    id: 'book_2',
    word: 'Harry Potter',
    category: 'Books & Literature',
    hint: 'Hidden Magic',
    fakeCivClues: ['Lightning bolt forehead', 'Platform 9 3/4', 'Sorting Hat ceremony', 'Golden Snitch broom', 'Magic wand duels', 'Feather quill owl', 'Hogwarts castle feast'],
    fakeImposterClues: ['Wizard fantasy boarding', 'Young chosen hero', 'Fighting dark spells', 'Beloved worldwide books', 'Magical student life', 'Secret hidden world'],
  },
  {
    id: 'book_3',
    word: 'Romeo & Juliet',
    category: 'Books & Literature',
    hint: 'Tragic Romance',
    fakeCivClues: ['Balcony midnight talk', 'Montague Capulet feud', 'Poison vial drama', 'Star crossed lovers', 'Rose by other name', 'Verona tomb duel', 'Shakespeare tragedy'],
    fakeImposterClues: ['Forbidden secret love', 'Ancient family hatred', 'Dramatic poetic classic', 'Heartbreaking young romance', 'Written in verse', 'Historic Italian setting'],
  },
  {
    id: 'book_4',
    word: 'Frankenstein',
    category: 'Books & Literature',
    hint: 'Created Monster',
    fakeCivClues: ['Lightning lab spark', 'Stitched graveyard limbs', 'Mary Shelley original', 'Monster fearing fire', 'Mad doctor regret', 'Creature demanding bride', 'Tormented misunderstood beast'],
    fakeImposterClues: ['Gothic horror pioneer', 'Playing god gone wrong', 'Artificial life awakening', 'Tragic lonely creature', 'Early science fiction', 'Dark stormy atmosphere'],
  },
  {
    id: 'book_5',
    word: 'Lord of the Rings',
    category: 'Books & Literature',
    hint: 'Cursed Ring',
    fakeCivClues: ['Mount Doom lava', 'One Ring inscription', 'Barefoot hairy hobbit', 'Elven bread lembas', 'My precious whisper', 'Wizard grey staff', 'Fellowship journey'],
    fakeImposterClues: ['Grand fantasy saga', 'Dangerous epic quest', 'Mythical medieval races', 'Corrupted magical relic', 'Battle for kingdoms', 'Rich fictional world'],
  },
  {
    id: 'book_6',
    word: 'Alice in Wonderland',
    category: 'Books & Literature',
    hint: 'Rabbit Hole',
    fakeCivClues: ['Mad Hatter tea party', 'Grinning Cheshire cat', 'White rabbit watch', 'Drink me shrink potion', 'Queen of Hearts croquet', 'Tweedle twins riddle', 'Falling down tunnel'],
    fakeImposterClues: ['Surreal dreamlike story', 'Curious young traveler', 'Nonsense talking animals', 'Whimsical weird fantasy', 'Bizarre royal court', 'Classic childhood wonder'],
  },

  // ===================== FAMOUS PERSONALITIES =====================
  {
    id: 'pers_1',
    word: 'Albert Einstein',
    category: 'Famous Personalities',
    hint: 'Relative Genius',
    fakeCivClues: ['E equals mc squared', 'Wild uncombed hair', 'Tongue sticking out', 'General relativity chalk', 'Nobel physics prize', 'Patent office thinker', 'Spacetime curvature'],
    fakeImposterClues: ['History famous genius', 'Theoretical physics icon', 'Revolutionized modern science', 'Brilliant German thinker', 'Synonym for brainy', 'Changed our cosmos'],
  },
  {
    id: 'pers_2',
    word: 'Taylor Swift',
    category: 'Famous Personalities',
    hint: 'Stadium Anthem',
    fakeCivClues: ['The Eras stadium tour', 'Friendship bracelets trade', 'Taylor Version masters', 'Red lipstick guitar', 'Number 13 hand sketch', 'Catchy breakup songs', 'Midnight album hype'],
    fakeImposterClues: ['Huge pop superstar', 'Massive loyal fanbase', 'Sells out giant arenas', 'Prolific songwriter', 'Chart topping records', 'Modern music titan'],
  },
  {
    id: 'pers_3',
    word: 'Cristiano Ronaldo',
    category: 'Famous Personalities',
    hint: 'Pitch Legend',
    fakeCivClues: ['Siu jump spin', 'Number 7 jersey', 'Incredible header vertical', 'Portuguese captain striker', 'Champions League trophies', 'Sculpted athletic physique', 'Knuckleball freekick'],
    fakeImposterClues: ['Elite soccer icon', 'Record goal scorer', 'Worldwide sports hero', 'Ruthless winning drive', 'Famous celebratory shout', 'Global athletic brand'],
  },
  {
    id: 'pers_4',
    word: 'Leonardo da Vinci',
    category: 'Famous Personalities',
    hint: 'Renaissance Vision',
    fakeCivClues: ['Mona Lisa smile', 'The Last Supper mural', 'Vitruvian Man sketch', 'Backwards mirror notes', 'Early helicopter blueprints', 'Florentine polymath', 'Louvre museum treasure'],
    fakeImposterClues: ['Italian Renaissance master', 'Painter and inventor', 'Centuries ahead thinker', 'Classic museum painter', 'Brilliant historic mind', 'Universal creative genius'],
  },
  {
    id: 'pers_5',
    word: 'Michael Jackson',
    category: 'Famous Personalities',
    hint: 'Pop Royalty',
    fakeCivClues: ['Gliding moonwalk glide', 'Single sparkling glove', 'Red Thriller leather jacket', 'Anti-gravity lean stunt', 'Fedora hat stage tip', 'King of Pop crown', 'Smooth Criminal bass'],
    fakeImposterClues: ['Unbelievable stage dancer', 'Music industry legend', 'Unforgettable stage outfit', 'Record breaking albums', 'Iconic pop vocals', 'Electrifying entertainer'],
  },
  {
    id: 'pers_6',
    word: 'Elon Musk',
    category: 'Famous Personalities',
    hint: 'Tech Visionary',
    fakeCivClues: ['Landing booster rockets', 'Cybertruck angular steel', 'Black X logo rebrand', 'Mars colony obsession', 'Electric battery gigafactory', 'Neuralink brain chip', 'Twitter takeover buzz'],
    fakeImposterClues: ['High profile billionaire', 'Electric cars and rockets', 'Very active on social media', 'Futuristic tech pioneer', 'Commercial space travel', 'Always in headlines'],
  },
  {
    id: 'pers_7',
    word: 'William Shakespeare',
    category: 'Famous Personalities',
    hint: 'Classic Quill',
    fakeCivClues: ['Globe Theatre London', 'To be or not to be', 'Feather quill parchment', 'Ruff collar portrait', 'Avon town playwright', 'Hamlet Macbeth tragedy', 'Romantic sonnet verses'],
    fakeImposterClues: ['Master English dramatist', 'Endless famous quotes', 'Timeless theatrical plays', 'Elizabethan literary giant', 'Studied in every school', 'Greatest historic poet'],
  },

  // ===================== FOOD & CULINARY =====================
  {
    id: 'food_1',
    word: 'Pizza',
    category: 'Food & Culinary',
    hint: 'Hot Slice',
    fakeCivClues: ['Melted mozzarella pull', 'Triangular slice fold', 'Wood fired brick oven', 'Square delivery box', 'Pepperoni topping rings', 'Crust dipping sauce', 'Friday movie dinner'],
    fakeImposterClues: ['Late night comfort food', 'Baked oven favorite', 'Shared with whole group', 'Italian originated dish', 'Always hits the spot', 'Cheese and carb heaven'],
  },
  {
    id: 'food_2',
    word: 'Espresso',
    category: 'Food & Culinary',
    hint: 'Morning Roast',
    fakeCivClues: ['Golden crema top', 'Tiny ceramic cup', 'Steam wand high pressure', 'Double shot morning boost', 'Dark roasted aroma', 'Barista portafilter tamp', 'Quick bitter sip'],
    fakeImposterClues: ['High caffeine kick', 'Small concentrated cup', 'Bitter dark flavor', 'Coffee shop essential', 'Starts the workday', 'Quick energy jolt'],
  },
  {
    id: 'food_3',
    word: 'Sushi',
    category: 'Food & Culinary',
    hint: 'Fresh Roll',
    fakeCivClues: ['Dark nori seaweed wrap', 'Soy sauce dipping bowl', 'Spicy wasabi punch', 'Pickled ginger palate', 'Fresh raw salmon slice', 'Wooden chopstick bites', 'Vinegared sticky rice'],
    fakeImposterClues: ['Japanese dining staple', 'Fresh seafood delicacy', 'Eaten with chopsticks', 'Clean artistic plating', 'Healthy dinner choice', 'Cold seafood bite'],
  },
  {
    id: 'food_4',
    word: 'Popcorn',
    category: 'Food & Culinary',
    hint: 'Cinema Crunch',
    fakeCivClues: ['Striped cinema tub', 'Melted golden butter', 'Unpopped hard kernels', 'Microwave bag popping', 'Light airy crunch', 'Movie theater smell', 'Salty finger snack'],
    fakeImposterClues: ['Classic movie snack', 'Warm salty crunch', 'Light fluffy bite', 'Sold in big buckets', 'Essential film companion', 'Addictive bowl munch'],
  },
  {
    id: 'food_5',
    word: 'Ice Cream',
    category: 'Food & Culinary',
    hint: 'Sweet Scoop',
    fakeCivClues: ['Melting waffle cone', 'Two scoops with sprinkles', 'Mint chocolate chip flavor', 'Brain freeze sensation', 'Cold summer treat', 'Sundae cherry on top', 'Licking melting drips'],
    fakeImposterClues: ['Chilled sweet dessert', 'Popular in hot weather', 'Lots of sweet flavors', 'Served in cup or cone', 'Freezer aisle favorite', 'Creamy sugary treat'],
  },
  {
    id: 'food_6',
    word: 'Croissant',
    category: 'Food & Culinary',
    hint: 'Flaky Baker',
    fakeCivClues: ['Golden buttery layers', 'Crescent moon curve', 'French bakery aroma', 'Flaky crumbly texture', 'Morning coffee pairing', 'Laminated dough puff', 'Paris breakfast basket'],
    fakeImposterClues: ['European morning pastry', 'Rich buttery flavor', 'Crispy exterior crunch', 'Light fluffy interior', 'Bakery display staple', 'Warm breakfast bite'],
  },
  {
    id: 'food_7',
    word: 'Tacos',
    category: 'Food & Culinary',
    hint: 'Folded Street',
    fakeCivClues: ['Lime wedge squeeze', 'Chopped onion cilantro', 'Corn tortilla fold', 'Spicy salsa verde drip', 'Tuesday dinner feast', 'Seasoned grilled beef', 'Handheld street feast'],
    fakeImposterClues: ['Mexican street favorite', 'Handheld wrapped meal', 'Spicy savory meats', 'Topped with fresh herbs', 'Casual party food', 'Zesty flavorful bite'],
  },

  // ===================== ANIMALS & WILDLIFE =====================
  {
    id: 'anim_1',
    word: 'Penguin',
    category: 'Animals & Wildlife',
    hint: 'Tuxedo Waddle',
    fakeCivClues: ['Antarctic ice sheet', 'Black white tuxedo fur', 'Belly sliding on snow', 'Huddling against blizzard', 'Torpedo swim speed', 'Waddling on icy rocks', 'Ocean fish hunter'],
    fakeImposterClues: ['Cold climate animal', 'Flightless bird swimmer', 'Distinctive cute walk', 'Survives freezing snow', 'Black and white coloring', 'Polar coastal wildlife'],
  },
  {
    id: 'anim_2',
    word: 'Kangaroo',
    category: 'Animals & Wildlife',
    hint: 'Outback Jumper',
    fakeCivClues: ['Outback red dirt', 'Joey peeking from pouch', 'High bouncing bounds', 'Heavy muscular tail', 'Boxer leaning posture', 'Australian bush grazer', 'Powerful hind feet'],
    fakeImposterClues: ['Iconic Australian mammal', 'Hops at high speeds', 'Front belly pocket baby', 'Strong jumping legs', 'Unique native wildlife', 'Famous marsupial herbivore'],
  },
  {
    id: 'anim_3',
    word: 'Chameleon',
    category: 'Animals & Wildlife',
    hint: 'Shifting Colors',
    fakeCivClues: ['Shifting skin shades', 'Independent 360 eyes', 'Fast sticky tongue shot', 'Prehensile curling tail', 'Reptile on forest branch', 'Blending into foliage', 'Catching flies midair'],
    fakeImposterClues: ['Master of camouflage', 'Small arboreal reptile', 'Eyes moving independently', 'Hunts resting insects', 'Changes color to mood', 'Creeps along branches'],
  },
  {
    id: 'anim_4',
    word: 'Octopus',
    category: 'Animals & Wildlife',
    hint: 'Ocean Ink',
    fakeCivClues: ['Eight suction arms', 'Dark ink defensive cloud', 'Three hearts blue blood', 'Squeezing tiny bottle', 'Master reef mimicry', 'Boneless marine hunter', 'Beak in the center'],
    fakeImposterClues: ['Super smart sea dweller', 'Multiple suction limbs', 'Swims without skeleton', 'Shoots dark defense cloud', 'Hides inside coral cracks', 'Deep ocean predator'],
  },
  {
    id: 'anim_5',
    word: 'Sloth',
    category: 'Animals & Wildlife',
    hint: 'Canopy Nap',
    fakeCivClues: ['Hanging upside down limbs', 'Extreme slow climbing', 'Green algae in fur', 'Sleeping 20 hours', 'Canopy rainforest tree', 'Curved branch claws', 'Slowest forest mammal'],
    fakeImposterClues: ['Known for super slow pace', 'Lives high in trees', 'Spends day sleeping', 'Peaceful herbivore mammal', 'Tropical forest dweller', 'Rarely visits the ground'],
  },
  {
    id: 'anim_6',
    word: 'Dolphin',
    category: 'Animals & Wildlife',
    hint: 'Ocean Acrobat',
    fakeCivClues: ['Echolocation clicking chatter', 'Leaping boat wake waves', 'Dorsal fin blowhole breath', 'Playful pod pack', 'Grey streamlined marine', 'High ocean intelligence', 'Flipper waving greeting'],
    fakeImposterClues: ['Friendly marine mammal', 'Breathes air above water', 'High jumping acrobatics', 'Swims in ocean groups', 'Communicates with clicks', 'Beloved ocean creature'],
  },

  // ===================== WORLD PLACES & TRAVEL =====================
  {
    id: 'place_1',
    word: 'Eiffel Tower',
    category: 'World Places & Travel',
    hint: 'Iron Monument',
    fakeCivClues: ['Parisian skyline silhouette', 'Sparkling midnight lights', 'Champ de Mars lawn', 'Gustave iron lattice', 'Observation deck view', 'Seine river backdrop', 'Romantic European icon'],
    fakeImposterClues: ['Famous European landmark', 'Made of metal lattice', 'Millions of tourists visit', 'Icon of romance and love', 'Tall historic spire', 'Must see city view'],
  },
  {
    id: 'place_2',
    word: 'Pyramids of Giza',
    category: 'World Places & Travel',
    hint: 'Desert Tombs',
    fakeCivClues: ['Pharaoh Khufu tomb', 'Sphinx stone guardian', 'Limestone desert blocks', 'Geometric triangular points', 'Ancient wonder survivor', 'Sahara golden sands', 'Thousands of years old'],
    fakeImposterClues: ['Ancient world wonder', 'Massive stone monuments', 'Desert archaeology site', 'Built by royal dynasties', 'Historic burial structures', 'Immense ancient feat'],
  },
  {
    id: 'place_3',
    word: 'Statue of Liberty',
    category: 'World Places & Travel',
    hint: 'Harbor Torch',
    fakeCivClues: ['Green oxidized copper', 'Raised golden torch', 'Spiked radiate crown', 'Broken foot chains', 'Gift from France', 'New York harbor beacon', 'Immigrant welcome symbol'],
    fakeImposterClues: ['Famous harbor monument', 'Holds torch in the sky', 'Symbol of freedom', 'Weathered green patina', 'Historic American sight', 'Seen from boat tours'],
  },
  {
    id: 'place_4',
    word: 'Colosseum',
    category: 'World Places & Travel',
    hint: 'Gladiator Arena',
    fakeCivClues: ['Roman gladiator battle', 'Travertine stone arches', 'Underground cage tunnels', 'Emperor thumbs up down', 'Ruins in central Rome', 'Ancient combat crowd', 'Massive stone stadium'],
    fakeImposterClues: ['Ancient Roman ruins', 'Huge circular arena', 'Historic fighter battles', 'Famous Italian monument', 'Thousands seated spectators', 'Dramatic historic site'],
  },
  {
    id: 'place_5',
    word: 'Taj Mahal',
    category: 'World Places & Travel',
    hint: 'Marble Tribute',
    fakeCivClues: ['Ivory white marble dome', 'Reflecting pool in garden', 'Shah Jahan love tribute', 'Four corner minarets', 'Floral gemstone inlays', 'Agra riverbank sunrise', 'Monument of true devotion'],
    fakeImposterClues: ['Breathtaking white palace', 'World famous love tomb', 'Priceless Indian architecture', 'Reflected in calm waters', 'Stunning marble symmetry', 'Timeless cultural treasure'],
  },

  // ===================== VIDEO GAMES & GAMING =====================
  {
    id: 'game_1',
    word: 'Super Mario',
    category: 'Video Games & Gaming',
    hint: 'Mushroom Kingdom',
    fakeCivClues: ['Red cap with M', 'Stomping brown goombas', 'Green warp pipes gold coins', 'Red super mushroom grow', 'Rescuing Princess Peach', 'Mustache in blue overalls', 'Bowser lava castle'],
    fakeImposterClues: ['Most famous gaming mascot', 'Jumping across platforms', 'Classic Nintendo world', 'Iconic gaming childhood', 'Colorful fantasy worlds', 'Legendary arcade hero'],
  },
  {
    id: 'game_2',
    word: 'Minecraft',
    category: 'Video Games & Gaming',
    hint: 'Block World',
    fakeCivClues: ['Punching wooden trees', 'Hissing green creeper boom', 'Diamond pickaxe mining', 'Nether obsidian portal', 'Voxel pixelated cubes', 'Crafting table recipes', 'Surviving the first night'],
    fakeImposterClues: ['Endless blocky sandbox', 'Gathering and building', 'Surviving hostile nights', 'Massive global gaming hit', 'Everything made of cubes', 'Total creative freedom'],
  },
  {
    id: 'game_3',
    word: 'Pokémon',
    category: 'Video Games & Gaming',
    hint: 'Pocket Monsters',
    fakeCivClues: ['Gotta catch em all', 'Red white ball toss', 'Yellow electric mouse', 'Gym badge collection', 'Turn based battle moves', 'Grass fire water starter', 'Professor handing starter'],
    fakeImposterClues: ['Catching and training pets', 'Battling rival trainers', 'Cute elemental creatures', 'Huge anime and game world', 'Turn based tactical combat', 'Trading with friends'],
  },
  {
    id: 'game_4',
    word: 'Tetris',
    category: 'Video Games & Gaming',
    hint: 'Falling Blocks',
    fakeCivClues: ['Four block shapes falling', 'Clearing horizontal rows', 'Classic Russian melody', 'Rotating tetromino quickly', 'Stacking to the top ceiling', 'Waiting for long bar piece', 'Fast frantic reflexes'],
    fakeImposterClues: ['Addictive arcade puzzle', 'Fitting geometric blocks', 'Clearing filled lines', 'Speeds up over time', 'Timeless simple gameplay', 'Legendary puzzle classic'],
  },
  {
    id: 'game_5',
    word: 'Pac-Man',
    category: 'Video Games & Gaming',
    hint: 'Chomp Maze',
    fakeCivClues: ['Waka waka eating sound', 'Chasing blue scared ghosts', 'Corner power pellet glow', 'Blinky Pinky Inky Clyde', 'Cherry bonus fruit reward', 'Yellow circle pizza wedge', 'Classic arcade joystick'],
    fakeImposterClues: ['Retro arcade maze runner', 'Dodging colorful ghosts', 'Chomping glowing dots', 'Early video game pioneer', 'Yellow mascot character', 'Vintage coin-op favorite'],
  },

  // ===================== MUSIC & INSTRUMENTS =====================
  {
    id: 'mus_1',
    word: 'Electric Guitar',
    category: 'Music & Instruments',
    hint: 'Six Strings',
    fakeCivClues: ['Six steel strings pick', 'Distortion amplifier loud', 'Blistering rock solos', 'Whammy bar pitch dives', 'Wood neck with frets', 'Plugged with heavy cable', 'Screaming overdrive pedal'],
    fakeImposterClues: ['Core rock band instrument', 'Played with pick or fingers', 'Connected to loud amps', 'Symbol of rock rebellion', 'Famous guitar riffs', 'Lead stage instrument'],
  },
  {
    id: 'mus_2',
    word: 'Piano',
    category: 'Music & Instruments',
    hint: 'Ivory Keys',
    fakeCivClues: ['88 black white keys', 'Sustain foot pedals', 'Grand curved polished lid', 'Felt hammers hitting strings', 'Classical concert stage', 'Two handed chord melodies', 'Sheet music on stand'],
    fakeImposterClues: ['Grand acoustic keyboard', 'Played with both hands', 'Essential classical sound', 'Expressive musical melodies', 'Found in concert halls', 'Elegant timeless instrument'],
  },
  {
    id: 'mus_3',
    word: 'Vinyl Record',
    category: 'Music & Instruments',
    hint: 'Grooved Disc',
    fakeCivClues: ['Needle stylus in groove', '33 and 45 RPM speeds', 'Analog warm vinyl crackle', 'Spinning black turntable disc', 'Cardboard album jacket art', 'Flipping to side B', 'Collector retro music shelf'],
    fakeImposterClues: ['Vintage music player format', 'Spins on a turntable', 'Physical analog sound', 'Beloved collector format', 'Warm organic audio', 'Retro physical album'],
  },
  {
    id: 'mus_4',
    word: 'DJ Turntable',
    category: 'Music & Instruments',
    hint: 'Beat Mixer',
    fakeCivClues: ['Crossfader beat switch', 'Scratching vinyl back forth', 'One ear on headphones', 'Nightclub booth mixer', 'Pitch tempo beatmatch', 'Dropping the heavy bass', 'Spinning the club decks'],
    fakeImposterClues: ['Nightclub music gear', 'Mixes dance songs live', 'Scratching audio tricks', 'Controls party energy', 'Electronic live setup', 'Essential DJ equipment'],
  },

  // ===================== SPORTS & FITNESS =====================
  {
    id: 'sport_1',
    word: 'Basketball',
    category: 'Sports & Fitness',
    hint: 'Hoop Court',
    fakeCivClues: ['Orange pebbled bouncy ball', 'Swishing through the net', 'Three point arc jumper', 'Dribbling hardwood floor', 'Slam dunk on the rim', 'Squeaking sneaker soles', 'Five on five fastbreak'],
    fakeImposterClues: ['Fast paced court game', 'Shooting through high hoop', 'Bouncing orange ball', 'High flying athletic plays', 'Five players each side', 'Indoor gym crowd cheers'],
  },
  {
    id: 'sport_2',
    word: 'Chess',
    category: 'Sports & Fitness',
    hint: '64 Squares',
    fakeCivClues: ['Checkmate trapped king', 'Knight jumping L shape', 'Black white checkered board', 'Queen commanding board moves', 'Pawn promotion rank', 'Clock tapping blitz game', 'Grandmaster foresight'],
    fakeImposterClues: ['Classic strategic duel', 'Requires intense foresight', 'Black and white armies', 'Protecting royal leader', 'Ultimate mind contest', 'Ancient thinking game'],
  },
  {
    id: 'sport_3',
    word: 'Formula 1',
    category: 'Sports & Fitness',
    hint: 'Pit Speed',
    fakeCivClues: ['Two second tire pitstop', 'Checkered flag finish', 'Screaming hybrid turbo roar', 'Monaco tight street circuit', 'Podium champagne shower', 'Open cockpit carbon halo', 'Overtaking at 200mph'],
    fakeImposterClues: ['Extreme speed car racing', 'High tech race cars', 'Worldwide Grand Prix circuits', 'Celebrity racing drivers', 'Rapid tire pit stops', 'Elite motorsport drama'],
  },
  {
    id: 'sport_4',
    word: 'Scuba Diving',
    category: 'Sports & Fitness',
    hint: 'Deep Tank',
    fakeCivClues: ['Compressed tank on back', 'Clearing dive glass mask', 'Exploring vibrant coral reef', 'Kicking rubber water fins', 'Underwater regulator bubbles', 'Monitoring pressure gauge', 'Deep ocean descent'],
    fakeImposterClues: ['Deep water exploration', 'Breathing with gas cylinder', 'Wearing wetsuit and flippers', 'Swimming with marine life', 'Certified aquatic adventure', 'Submerged silent world'],
  },

  // ===================== EVERYDAY OBJECTS & TECH =====================
  {
    id: 'obj_1',
    word: 'Smartphone',
    category: 'Everyday Objects & Tech',
    hint: 'Pocket Screen',
    fakeCivClues: ['Cracked screen protector', '1% battery red panic', 'Front camera selfie notch', 'Vibrating silent pocket buzz', 'Infinite feed doomscroll', 'Wireless charging pad', 'Fast typing thumbs'],
    fakeImposterClues: ['In everyone’s pocket daily', 'Recharged every single night', 'Glass screen with apps', 'Used for texting and photos', 'Essential modern device', 'Can’t leave home without it'],
  },
  {
    id: 'obj_2',
    word: 'Umbrella',
    category: 'Everyday Objects & Tech',
    hint: 'Rain Shield',
    fakeCivClues: ['Pops open in downpour', 'Curved J shaped handle', 'Shaking rain droplets off', 'Flipped inside out in wind', 'Carried on stormy days', 'Fabric waterproof canopy', 'Left behind in cafe bin'],
    fakeImposterClues: ['Used outdoors in bad weather', 'Collapsible fabric canopy', 'Keeps you dry from rain', 'Easily forgotten somewhere', 'Held by central shaft', 'Saves you on stormy days'],
  },
  {
    id: 'obj_3',
    word: 'Bicycle',
    category: 'Everyday Objects & Tech',
    hint: 'Two Wheels',
    fakeCivClues: ['Pedaling up steep hills', 'Handlebar bell ding ding', 'Greased chain gear sprockets', 'Wearing protective helmet', 'Locked to outdoor bike rack', 'Pumping tire air pressure', 'Cruising city bike lane'],
    fakeImposterClues: ['Two wheeled eco commute', 'Powered by foot pedals', 'Great cardio exercise', 'Common urban transport', 'Requires balance and steering', 'Clean green transportation'],
  },
  {
    id: 'obj_4',
    word: 'Telescope',
    category: 'Everyday Objects & Tech',
    hint: 'Stargazer Lens',
    fakeCivClues: ['Gazing at moon craters', 'Focusing rings of Saturn', 'Adjustable tripod legs', 'Dark sky night eyepiece', 'Long optical tube lens', 'Observing distant galaxies', 'Stargazing in backyard'],
    fakeImposterClues: ['Magnifies far away skies', 'Used by astronomers at night', 'Aims at stars and planets', 'Long optical lens tube', 'Peeking through an eyepiece', 'Unlocks distant cosmos'],
  },
  {
    id: 'obj_5',
    word: 'Passport',
    category: 'Everyday Objects & Tech',
    hint: 'Border Stamp',
    fakeCivClues: ['Customs officer ink stamp', 'Gold foil crest on cover', 'Biometric chip page', 'Valid for ten years', 'Kept in airport carry on', 'Boarding pass inside pages', 'Checked at immigration gate'],
    fakeImposterClues: ['Essential book for travel', 'Shows photo and nationality', 'Checked at airport borders', 'Stamped with foreign visas', 'Official government booklet', 'Needed to fly abroad'],
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
