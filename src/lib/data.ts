export type Review = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
};

export type Dish = {
  id: number;
  slug: string;
  name: string;
  nameUrdu: string;
  description: string;
  longDescription: string;
  image: string;
  aiHint: string;
  price: number;
  ingredients: string[];
  occasion?: "eid";
  reviews: Review[];
};

export const dishes: Dish[] = [
  {
    id: 1,
    slug: "chicken-karahi",
    name: "Chicken Karahi",
    nameUrdu: "چکن کڑاہی",
    description:
      "A rich and spicy chicken curry cooked in a traditional karahi (wok).",
    longDescription:
      "A classic Pakistani dish, Chicken Karahi is known for its robust and spicy flavor, cooked with tomatoes, ginger, garlic, and green chilies in a traditional wok-like pan called a karahi. It's a staple in Pakistani households and restaurants alike, loved for its simple yet profound taste.",
    image: "https://placehold.co/600x400.png",
    aiHint: "chicken karahi",
    price: 1250.00,
    ingredients: [
      "Chicken",
      "Tomatoes",
      "Ginger",
      "Garlic",
      "Green Chilies",
      "Coriander",
      "Spices",
    ],
    reviews: [
      {
        id: 1,
        name: "Ahmed Khan",
        avatar: "https://placehold.co/40x40.png",
        rating: 5,
        text: "The best chicken karahi I've had outside of Pakistan! Perfectly spiced.",
      },
      {
        id: 2,
        name: "Fatima Ali",
        avatar: "https://placehold.co/40x40.png",
        rating: 4,
        text: "Very delicious and authentic. Could be a little less oily, but the taste was superb.",
      },
    ],
  },
  {
    id: 2,
    slug: "beef-biryani",
    name: "Beef Biryani",
    nameUrdu: "بیف بریانی",
    description:
      "Fragrant basmati rice cooked with tender beef and aromatic spices.",
    longDescription:
      "Beef Biryani is a celebratory dish made with layers of fragrant basmati rice, tender, marinated beef, and a blend of aromatic spices like saffron, cardamom, and cloves. Garnished with fried onions and fresh herbs, it's a complete meal that's both hearty and incredibly flavorful.",
    image: "https://placehold.co/600x400.png",
    aiHint: "beef biryani",
    price: 1500.00,
    ingredients: [
      "Basmati Rice",
      "Beef",
      "Yogurt",
      "Onions",
      "Saffron",
      "Aromatic Spices",
      "Mint",
    ],
    reviews: [
      {
        id: 1,
        name: "Usman Tariq",
        avatar: "https://placehold.co/40x40.png",
        rating: 5,
        text: "Absolutely phenomenal biryani. The beef was so tender and the rice was perfectly cooked.",
      },
    ],
  },
  {
    id: 3,
    slug: "chana-chaat",
    name: "Chana Chaat",
    nameUrdu: "چنا چاٹ",
    description: "A refreshing and tangy chickpea salad with spices and chutneys.",
    longDescription:
      "Chana Chaat is a popular Pakistani street food snack. It's a vibrant and refreshing salad made with boiled chickpeas, potatoes, onions, and tomatoes, tossed in a mix of spices and tangy tamarind chutney. It's the perfect light meal or appetizer.",
    image: "https://placehold.co/600x400.png",
    aiHint: "chana chaat",
    price: 450.00,
    ingredients: [
      "Chickpeas",
      "Potatoes",
      "Onion",
      "Tomato",
      "Tamarind Chutney",
      "Yogurt",
      "Spices",
    ],
    reviews: [],
  },
  {
    id: 4,
    slug: "samosa",
    name: "Samosa",
    nameUrdu: "سموسہ",
    description: "Crispy pastry filled with spiced potatoes, peas, and minced meat.",
    longDescription:
      "A beloved snack across South Asia, the samosa is a fried or baked pastry with a savory filling, such as spiced potatoes, onions, peas, or minced meat. Its triangular shape is iconic, and it's often served with a side of mint or tamarind chutney.",
    image: "https://placehold.co/600x400.png",
    aiHint: "samosas",
    price: 300.00,
    ingredients: ["Potatoes", "Peas", "Spices", "Flour Pastry", "Minced Meat (optional)"],
    reviews: [
      {
        id: 1,
        name: "Ayesha Malik",
        avatar: "https://placehold.co/40x40.png",
        rating: 5,
        text: "Crispy, hot, and perfectly filled. The chutneys were amazing too!",
      },
    ],
  },
];

export const eidSpecialDishes: Dish[] = [
  {
    id: 101,
    slug: "sheer-khurma",
    name: "Sheer Khurma",
    nameUrdu: "شیر خورمہ",
    description:
      "A rich vermicelli pudding made with milk, dates, and nuts.",
    longDescription:
      "Sheer Khurma is a traditional festive breakfast and dessert for celebrations like Eid. It's a rich and creamy vermicelli pudding made with milk, sweetened with sugar, and flavored with dates, pistachios, almonds, and saffron. It's a dish that symbolizes joy and togetherness.",
    image: "https://placehold.co/600x400.png",
    aiHint: "sheer khurma",
    price: 750.00,
    ingredients: ["Vermicelli", "Milk", "Sugar", "Dates", "Pistachios", "Almonds", "Saffron"],
    occasion: "eid",
    reviews: [
      {
        id: 1,
        name: "Hassan Raza",
        avatar: "https://placehold.co/40x40.png",
        rating: 5,
        text: "Just like my mother makes it for Eid. Brought back so many memories. Delicious!",
      },
    ],
  },
  {
    id: 102,
    slug: "mutton-korma",
    name: "Mutton Korma",
    nameUrdu: "مٹن قورمہ",
    description:
      "A luxurious mutton curry with a yogurt and spice-based sauce.",
    longDescription:
      "Mutton Korma is a quintessential celebratory dish, often gracing tables during Eid and other special occasions. Tender pieces of mutton are slow-cooked in a creamy, fragrant sauce made from yogurt, fried onions, and a delicate blend of whole and ground spices. The result is a rich, aromatic curry with a velvety texture that pairs perfectly with naan or rice.",
    image: "https://placehold.co/600x400.png",
    aiHint: "mutton korma",
    price: 1800.00,
    ingredients: [
      "Mutton",
      "Yogurt",
      "Onions",
      "Ginger-Garlic Paste",
      "Whole Spices",
      "Kewra Water",
    ],
    occasion: "eid",
    reviews: [
      {
        id: 1,
        name: "Zainab Iqbal",
        avatar: "https://placehold.co/40x40.png",
        rating: 5,
        text: "The korma was out of this world! So rich and flavorful, the mutton just melted in my mouth.",
      },
    ],
  },
];
