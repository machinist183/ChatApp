const startMessageDate = new Date('2023-08-01');
const endMessageDate = new Date('2023-08-30');

const startUserDate = new Date('2023-06-01');
const endUserDate = new Date('2023-06-30');

const startGroupDate = new Date('2023-07-01');
const endGoupDate = new Date('2023-07-30');

// Function to generate a random timestamp between two dates
function getRandomTimestamp(startDate, endDate) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  
  // Generate a random timestamp within the specified range
  const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  
  return new Date(randomTimestamp);
}



function getRandomAvatar(){
    let id = Math.floor(Math.random()*1000)
    return `https://i.pravatar.cc/${id}`
}

function getRandomConverGenerator(){
    return "https://picsum.photos/200/300"
}
const usernames = [
    "TechSavvy123",
    "AdventureExplorer",
    "FoodieDelight",
    "ArtisticSoul",
    "FitnessFreak",
    "BookWorm99",
    "MovieBuff23",
    "MusicMaestro",
    "VolunteerHero",
    "WanderlustTraveler",
    "CreativeArtist",
    "GadgetGuru",
    "CulinaryConnoisseur",
    "NatureLover",
    "HikingEnthusiast",
    "CodeNinja",
    "YogaYogi",
    "FashionistaStyle",
    "HistoryBuff47",
    "GamerPro",
  ];
  
const meaningfulMessages = [
    "Hey, how's your day going?",
    "I just finished reading a great book!",
    "What's your favorite movie of all time?",
    "Let's catch up soon!",
    "Have you tried that new restaurant in town?",
    "I'm so excited for the weekend!",
    "Do you have any travel plans this year?",
    "What's your favorite hobby?",
    "I heard you got a promotion. Congratulations!",
    "How's your family doing?",
    "Remember to take breaks and relax!",
    "I'm working on a new project. It's challenging but fun!",
    "What's your secret to staying motivated?",
    "Let's plan a hike in the mountains.",
    "Have you been to any music concerts lately?",
    "I love spending time at the beach.",
    "What's your go-to comfort food?",
    "I'm learning to play the guitar. It's tough but rewarding!",
    "What's the best advice you've ever received?",
    "I'm trying out a new recipe tonight.",
    "How do you stay organized in your daily life?",
    "I'm thinking of redecorating my living room.",
    "Do you enjoy outdoor sports?",
    "What's your favorite type of music?",
    "I've started a new workout routine. It's challenging but worth it!",
    "Let's plan a weekend getaway.",
    "How's your latest project at work going?",
    "I can't believe it's already December!",
    "What's your favorite book genre?",
    "I'm taking a cooking class this weekend.",
    "Have you ever traveled to a foreign country?",
    "What's your favorite season of the year?",
    "I'm planning to run a marathon next year.",
    "Let's go for a coffee and chat.",
    "What's your dream vacation destination?",
    "I'm attending a conference next week.",
    "How do you unwind after a long day?",
    "Let's meet up for lunch soon.",
    "What's the most adventurous thing you've ever done?",
    "A technology enthusiast who's always tinkering with gadgets and exploring the latest tech trends. Passionate about coding and creating digital solutions that make a difference in the world.",
    "An adventurer at heart, I thrive on exploring new places, whether it's hiking in the wilderness, backpacking through Europe, or discovering hidden gems in my own city. My goal is to travel the world and experience different cultures.",
    "A food lover and culinary explorer on a mission to taste every cuisine the world has to offer. From street food stalls to Michelin-starred restaurants, I'm always in search of the perfect bite.",
    "A nature lover who finds peace in the great outdoors. Whether it's camping in the mountains, kayaking on serene lakes, or simply taking a leisurely hike, I'm happiest when surrounded by nature's beauty.",
    "An art enthusiast with a passion for creating and appreciating beauty. I'm always in my studio, experimenting with colors and textures to bring my artistic vision to life.",
    "A dedicated fitness freak, I believe in the power of a healthy body and mind. You'll often find me at the gym, on the yoga mat, or hitting the trails for a refreshing run.",
    "A bookworm with an insatiable appetite for reading. My shelves are filled with diverse genres, from classic literature to contemporary fiction. I love getting lost in a good book.",
    "A cinephile with a penchant for storytelling through film. I'm drawn to both the glamour of Hollywood blockbusters and the artistic depth of independent cinema.",
    "A music lover whose life has a soundtrack. I play multiple instruments and attend concerts religiously. Music is my solace and my celebration.",
    "A firm believer in giving back to the community. Volunteering is not just a hobby; it's a way of life. Whether it's mentoring youth or supporting local charities, making a positive impact is my mission.",
    "An aspiring photographer who captures life's moments one click at a time. I believe that every picture tells a story, and I'm on a visual journey to document the world's beauty.",
    "An entrepreneur with a vision to disrupt industries and create innovative solutions. Building the next big thing is my relentless pursuit.",
    "A fashionista with an eye for style and a closet full of curated fashion. I believe that what you wear is a reflection of who you are, and I express myself through fashion.",
    "A culinary enthusiast who spends hours experimenting in the kitchen. From mastering the art of French cuisine to creating exotic fusion dishes, my passion for cooking knows no bounds.",
    "A die-hard sports fan who lives for game day. Whether it's on the field or on the screen, I'm cheering for my favorite teams with unwavering loyalty.",
    "A devoted pet parent, my furry companions are my family. I'm passionate about animal welfare and strive to make the world a better place for our four-legged friends.",
    "A lifelong learner with an insatiable curiosity. I believe that knowledge is the key to growth, and I'm constantly seeking new skills and experiences.",
    "A history enthusiast fascinated by the stories of the past. Exploring ancient ruins, studying historical events, and visiting museums are my favorite pastimes.",
    "A sustainability advocate committed to eco-friendly living. I believe in conscious choices and strive to reduce my carbon footprint. Let's make the planet greener together.",
    "A hiking enthusiast with a wanderlust for mountains and trails. Exploring the great outdoors, one summit at a time, is my ultimate adventure.",
    "Happy",
    "Excited",
    "Relaxed",
    "Feeling at peace",
    "Energetic",
    "Calm and collected",
    "Joyful and content",
    "Motivated and determined",
    "Peaceful and serene",
    "Optimistic about the future",
    "Grateful for the little things",
    "Curious and inquisitive",
    "Confident and self-assured",
    "Inspired to create",
    "Lively and full of energy",
    "Fulfilled and satisfied",
    "Hopeful for what's to come",
    "Playful and carefree",
    "Tranquil and centered",
    "Content and at ease",
];

const moods = [
    "Happy",
    "Excited",
    "Relaxed",
    "Feeling at peace",
    "Energetic",
    "Calm and collected",
    "Joyful and content",
    "Motivated and determined",
    "Peaceful and serene",
    "Optimistic about the future",
    "Grateful for the little things",
    "Curious and inquisitive",
    "Confident and self-assured",
    "Inspired to create",
    "Lively and full of energy",
    "Fulfilled and satisfied",
    "Hopeful for what's to come",
    "Playful and carefree",
    "Tranquil and centered",
    "Content and at ease",
];
  
const userProfileDescriptions = [
    "A technology enthusiast who's always tinkering with gadgets and exploring the latest tech trends. Passionate about coding and creating digital solutions that make a difference in the world.",
    "An adventurer at heart, I thrive on exploring new places, whether it's hiking in the wilderness, backpacking through Europe, or discovering hidden gems in my own city. My goal is to travel the world and experience different cultures.",
    "A food lover and culinary explorer on a mission to taste every cuisine the world has to offer. From street food stalls to Michelin-starred restaurants, I'm always in search of the perfect bite.",
    "A nature lover who finds peace in the great outdoors. Whether it's camping in the mountains, kayaking on serene lakes, or simply taking a leisurely hike, I'm happiest when surrounded by nature's beauty.",
    "An art enthusiast with a passion for creating and appreciating beauty. I'm always in my studio, experimenting with colors and textures to bring my artistic vision to life.",
    "A dedicated fitness freak, I believe in the power of a healthy body and mind. You'll often find me at the gym, on the yoga mat, or hitting the trails for a refreshing run.",
    "A bookworm with an insatiable appetite for reading. My shelves are filled with diverse genres, from classic literature to contemporary fiction. I love getting lost in a good book.",
    "A cinephile with a penchant for storytelling through film. I'm drawn to both the glamour of Hollywood blockbusters and the artistic depth of independent cinema.",
    "A music lover whose life has a soundtrack. I play multiple instruments and attend concerts religiously. Music is my solace and my celebration.",
    "A firm believer in giving back to the community. Volunteering is not just a hobby; it's a way of life. Whether it's mentoring youth or supporting local charities, making a positive impact is my mission.",
    "An aspiring photographer who captures life's moments one click at a time. I believe that every picture tells a story, and I'm on a visual journey to document the world's beauty.",
    "An entrepreneur with a vision to disrupt industries and create innovative solutions. Building the next big thing is my relentless pursuit.",
    "A fashionista with an eye for style and a closet full of curated fashion. I believe that what you wear is a reflection of who you are, and I express myself through fashion.",
    "A culinary enthusiast who spends hours experimenting in the kitchen. From mastering the art of French cuisine to creating exotic fusion dishes, my passion for cooking knows no bounds.",
    "A die-hard sports fan who lives for game day. Whether it's on the field or on the screen, I'm cheering for my favorite teams with unwavering loyalty.",
    "A devoted pet parent, my furry companions are my family. I'm passionate about animal welfare and strive to make the world a better place for our four-legged friends.",
    "A lifelong learner with an insatiable curiosity. I believe that knowledge is the key to growth, and I'm constantly seeking new skills and experiences.",
    "A history enthusiast fascinated by the stories of the past. Exploring ancient ruins, studying historical events, and visiting museums are my favorite pastimes.",
    "A sustainability advocate committed to eco-friendly living. I believe in conscious choices and strive to reduce my carbon footprint. Let's make the planet greener together.",
    "A hiking enthusiast with a wanderlust for mountains and trails. Exploring the great outdoors, one summit at a time, is my ultimate adventure.",
];

const groupData = [
    {
      name: "Tech Enthusiasts",
      description: "A group for technology enthusiasts to discuss the latest tech trends, gadgets, and innovations."
    },
    {
      name: "Foodies Unite",
      description: "Join us in exploring the culinary world, from sharing recipes to discovering the best restaurants in town."
    },
    {
      name: "Adventure Seekers",
      description: "For those who live for adrenaline, outdoor adventures, and exploring the great unknown."
    },
    {
      name: "Artists' Corner",
      description: "Connect with fellow artists and creators, share your work, and find inspiration in the world of art."
    },
    {
      name: "Fitness Fanatics",
      description: "A community dedicated to fitness, workouts, and leading a healthy lifestyle. Get motivated and stay active."
    },
    {
      name: "Book Lovers Club",
      description: "Dive into the world of literature, exchange book recommendations, and discuss your favorite novels."
    },
    {
      name: "Movie Buffs Society",
      description: "Join us for movie nights, reviews, and discussions about everything related to the silver screen."
    },
    {
      name: "Music Vibes Collective",
      description: "For music lovers of all genres, from jazz aficionados to rock enthusiasts. Share your favorite tunes and discover new ones."
    },
    {
      name: "Volunteers Network",
      description: "Make a positive impact by joining our volunteer community. We organize events and projects to give back to the community."
    },
    {
      name: "Travel Explorers",
      description: "Embark on journeys near and far with fellow travel enthusiasts. Share travel tips, itineraries, and unforgettable experiences."
    }
  ];
  
const groupNames = groupData.map(group => group.name);
const groupDescriptions = groupData.map(group => group.description);

import fs from 'fs'

// Your data generation code
const userData = [];
for (let i = 1; i <= 20; i++) {
    userData.push({
        'id': i,
        'avatar': getRandomAvatar(),
        'username': usernames[i - 1], // Adjust the index to match the usernames array
        'cover_pic': "https://picsum.photos/200/300",
        'description': userProfileDescriptions[i - 1], // Adjust the index to match the descriptions array
        'mood': moods[i - 1], // Adjust the index to match the moods array
        'created_at': getRandomTimestamp(startUserDate , endUserDate)
    });
}

// Convert userData to a JavaScript string
const userDataString = JSON.stringify(userData, null, 2);

// Write the data to a JavaScript file
fs.writeFileSync('./data/userData.js', `const userData = ${userDataString};\n\nmodule.exports = userData;`, 'utf-8');

console.log('Data saved to userData.js');

const grouData = [];
for (let i = 1; i <= 10; i++) {
    let members = new Set()
    let numberofMembers = Math.ceil(Math.random()*7) + 3
    while(members.size < numberofMembers){
      members.add(Math.ceil(Math.random()*20))
    }
    const membersArray = [...members]
    grouData.push({
        'id': i,
        'avatar': getRandomAvatar(),
        'username': groupData[i-1].name , // Adjust the index to match the usernames array
        'cover_pic': "https://picsum.photos/200/300",
        'description': groupData[i-1].description, // Adjust the index to match the descriptions array
        'mood': moods[i - 1], // Adjust the index to match the moods array
        'members':membersArray,
        'created_at': getRandomTimestamp(startGroupDate ,endGoupDate)
    });
  }

// const uniquepairs = grouData.map((group)=>{
//   const membersArray = group.membersArray
//   let numOfMessages = 
// })



// Convert userData to a JavaScript string
const groupDataString = JSON.stringify(grouData, null, 2);

// Write the data to a JavaScript file
fs.writeFileSync('./data/groupData.js', `const groupData = ${groupDataString};\n\nmodule.exports = groupData;`, 'utf-8');

console.log('Data saved to groupData.js');

const messagesLength = meaningfulMessages.length
const privatemessagesData =  []
for(let i = 0 ; i<=4000 ; i++){
  let senderId = Math.ceil(Math.random()*20)
  let receiverId = Math.ceil(Math.random()*20)
  if(senderId === receiverId){
    continue
  }
  privatemessagesData.push({
    'id': i,
    'senderId':senderId,
    'receiverId':receiverId,
    'content': meaningfulMessages[Math.ceil(Math.random()*messagesLength)],
    'created_at': getRandomTimestamp(startMessageDate , endMessageDate)
  })
}
// Convert userData to a JavaScript string
const privateMessageDataString = JSON.stringify(privatemessagesData, null, 2);

// Write the data to a JavaScript file
fs.writeFileSync('./data/privateMessageData.js', `const privateMessageData = ${privateMessageDataString};\n\nmodule.exports = privateMessageData;`, 'utf-8');

console.log('Data saved to privateMessageData.js');

const groupmessagesData =  []
for(let i = 0 ; i<=100; i++){
  let senderId = Math.ceil(Math.random()*20)
  groupmessagesData.push({
    'id': i,
    'senderId':senderId,
    'receiverId':null,
    'content': meaningfulMessages[Math.ceil(Math.random()*messagesLength)],
    'created_at': getRandomTimestamp(startMessageDate , endMessageDate)
  })
}

const groupMessageDataString = JSON.stringify(groupmessagesData, null, 2);

// Write the data to a JavaScript file
fs.writeFileSync('./data/groupMessageData.js', `const groupMessageData = ${groupMessageDataString};\n\nmodule.exports = groupMessageData;`, 'utf-8');

console.log('Data saved to groupMessageData.js');


const converssationData = []
const grouplist = [1,2,3,4, 5,6, 7, 8,9,10]
for(let i=1 ; i<=100; i++ ){
  const conversationType = Math.random() < 0.5 ? 'group' : 'private'
  const grouprandom = grouplist[0]
  let groupId = undefined
  let privateSender = conversationType === "private" ? Math.ceil(Math.random()*20) : undefined
  let privateReceiver = conversationType === "private" ? Math.ceil(Math.random()*20) : undefined
  if((conversationType==='private') && (privateSender ===privateReceiver)){
    i = i - 1 
    continue
  }
  if(conversationType === 'group'){
    if (grouplist.length === 0){
      i = i- 1 
      continue
    }
    groupId = grouprandom
    grouplist.shift()
  }
  console.log(groupId)
  function createMessageList() {
    let messageList = [];
    if (conversationType === 'group') {
        const groupMembers = grouData[groupId-1]?.members;
        const validMessages = groupmessagesData.filter((message) => {
            return groupMembers?.includes(message.senderId);
        });
        const validMessagesIds = validMessages.map((message) => message.id);
        let numOfMessages = Math.ceil(Math.random() * 12) + 10;
        while (messageList.length < numOfMessages) {
            let randomId = Math.floor(Math.random() * validMessagesIds.length);
            if (!messageList.includes(randomId)) {
                messageList.push(validMessagesIds[randomId]);
            }
        }
    } else {
        const validMessages = privatemessagesData.filter((message) => {
            return ((message.receiverId === privateReceiver) && (message.senderId === privateSender) ||
            (message.receiverId === privateSender) && (message.senderId === privateReceiver));
        });
        if (validMessages.length > 0) {
            messageList = validMessages.map((message) => message.id);
        }
    }

    return messageList;
}

  converssationData.push({
    'id': i ,
    'conversation_type':conversationType,
    'messages': createMessageList(),
    'sender':privateSender,
    'receiver':privateReceiver,
    'group_id':groupId
  })
}

const conversationDataString = JSON.stringify(converssationData, null, 2);

// Write the data to a JavaScript file
fs.writeFileSync('./data/conversationData.js', `const conversationData = ${conversationDataString};\n\nmodule.exports = conversationData;`, 'utf-8');

console.log('Data saved to conversationData.js');
