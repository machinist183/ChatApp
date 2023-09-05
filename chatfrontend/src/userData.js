const userData = [
  {
    "id": 1,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "TechSavvy123",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A technology enthusiast who's always tinkering with gadgets and exploring the latest tech trends. Passionate about coding and creating digital solutions that make a difference in the world.",
    "mood": "Happy"
  },
  {
    "id": 2,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "AdventureExplorer",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "An adventurer at heart, I thrive on exploring new places, whether it's hiking in the wilderness, backpacking through Europe, or discovering hidden gems in my own city. My goal is to travel the world and experience different cultures.",
    "mood": "Excited"
  },
  {
    "id": 3,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "FoodieDelight",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A food lover and culinary explorer on a mission to taste every cuisine the world has to offer. From street food stalls to Michelin-starred restaurants, I'm always in search of the perfect bite.",
    "mood": "Relaxed"
  },
  {
    "id": 4,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "ArtisticSoul",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A nature lover who finds peace in the great outdoors. Whether it's camping in the mountains, kayaking on serene lakes, or simply taking a leisurely hike, I'm happiest when surrounded by nature's beauty.",
    "mood": "Feeling at peace"
  },
  {
    "id": 5,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "FitnessFreak",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "An art enthusiast with a passion for creating and appreciating beauty. I'm always in my studio, experimenting with colors and textures to bring my artistic vision to life.",
    "mood": "Energetic"
  },
  {
    "id": 6,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "BookWorm99",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A dedicated fitness freak, I believe in the power of a healthy body and mind. You'll often find me at the gym, on the yoga mat, or hitting the trails for a refreshing run.",
    "mood": "Calm and collected"
  },
  {
    "id": 7,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "MovieBuff23",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A bookworm with an insatiable appetite for reading. My shelves are filled with diverse genres, from classic literature to contemporary fiction. I love getting lost in a good book.",
    "mood": "Joyful and content"
  },
  {
    "id": 8,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "MusicMaestro",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A cinephile with a penchant for storytelling through film. I'm drawn to both the glamour of Hollywood blockbusters and the artistic depth of independent cinema.",
    "mood": "Motivated and determined"
  },
  {
    "id": 9,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "VolunteerHero",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A music lover whose life has a soundtrack. I play multiple instruments and attend concerts religiously. Music is my solace and my celebration.",
    "mood": "Peaceful and serene"
  },
  {
    "id": 10,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "WanderlustTraveler",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A firm believer in giving back to the community. Volunteering is not just a hobby; it's a way of life. Whether it's mentoring youth or supporting local charities, making a positive impact is my mission.",
    "mood": "Optimistic about the future"
  },
  {
    "id": 11,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "CreativeArtist",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "An aspiring photographer who captures life's moments one click at a time. I believe that every picture tells a story, and I'm on a visual journey to document the world's beauty.",
    "mood": "Grateful for the little things"
  },
  {
    "id": 12,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "GadgetGuru",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "An entrepreneur with a vision to disrupt industries and create innovative solutions. Building the next big thing is my relentless pursuit.",
    "mood": "Curious and inquisitive"
  },
  {
    "id": 13,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "CulinaryConnoisseur",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A fashionista with an eye for style and a closet full of curated fashion. I believe that what you wear is a reflection of who you are, and I express myself through fashion.",
    "mood": "Confident and self-assured"
  },
  {
    "id": 14,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "NatureLover",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A culinary enthusiast who spends hours experimenting in the kitchen. From mastering the art of French cuisine to creating exotic fusion dishes, my passion for cooking knows no bounds.",
    "mood": "Inspired to create"
  },
  {
    "id": 15,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "HikingEnthusiast",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A die-hard sports fan who lives for game day. Whether it's on the field or on the screen, I'm cheering for my favorite teams with unwavering loyalty.",
    "mood": "Lively and full of energy"
  },
  {
    "id": 16,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "CodeNinja",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A devoted pet parent, my furry companions are my family. I'm passionate about animal welfare and strive to make the world a better place for our four-legged friends.",
    "mood": "Fulfilled and satisfied"
  },
  {
    "id": 17,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "YogaYogi",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A lifelong learner with an insatiable curiosity. I believe that knowledge is the key to growth, and I'm constantly seeking new skills and experiences.",
    "mood": "Hopeful for what's to come"
  },
  {
    "id": 18,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "FashionistaStyle",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A history enthusiast fascinated by the stories of the past. Exploring ancient ruins, studying historical events, and visiting museums are my favorite pastimes.",
    "mood": "Playful and carefree"
  },
  {
    "id": 19,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "HistoryBuff47",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A sustainability advocate committed to eco-friendly living. I believe in conscious choices and strive to reduce my carbon footprint. Let's make the planet greener together.",
    "mood": "Tranquil and centered"
  },
  {
    "id": 20,
    "avatar": "https://i.pravatar.cc/{id}",
    "username": "GamerPro",
    "cover_pic": "https://picsum.photos/200/300",
    "description": "A hiking enthusiast with a wanderlust for mountains and trails. Exploring the great outdoors, one summit at a time, is my ultimate adventure.",
    "mood": "Content and at ease"
  }
];

module.exports = userData;