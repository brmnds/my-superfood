const foods = [
  {
    "id": "broccoli",
    "name": "Broccoli",
    "image": "assets/images/real/broccoli.jpg",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Fiber rich",
      "Vitamin C",
      "Supports gut health"
    ],
    "note": "Cruciferous vegetable with fiber, vitamin C, and plant compounds.",
    "x": "50%",
    "y": "47%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "chickpeas",
    "name": "Chickpeas",
    "image": "assets/images/real/chickpeas.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Plant protein",
      "Slow carbs",
      "High fiber"
    ],
    "note": "A practical base for bowls, hummus, and satisfying meals.",
    "x": "24%",
    "y": "20%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "lentils",
    "name": "Lentils",
    "image": "assets/images/real/lentils-uncooked.jpg",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Protein",
      "Iron",
      "Folate"
    ],
    "note": "A dense pantry staple for soups, salads, and meal prep.",
    "x": "39%",
    "y": "16%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "cauliflower",
    "name": "Cauliflower",
    "image": "assets/images/real/cauliflower.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Light fiber",
      "Vitamin C",
      "Cruciferous"
    ],
    "note": "Mild, flexible, and easy to use as a vegetable base.",
    "x": "63%",
    "y": "17%",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "banana",
    "name": "Banana",
    "image": "assets/images/real/banana.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Quick carbs",
      "Potassium",
      "Portable"
    ],
    "note": "A simple energy fruit for breakfast or training snacks.",
    "x": "79%",
    "y": "20%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "avocado",
    "name": "Avocado",
    "image": "assets/images/real/avocado.jpg",
    "categories": [
      "oils",
      "fiber"
    ],
    "benefits": [
      "Healthy fats",
      "Potassium",
      "Satisfying"
    ],
    "note": "Creamy fats and fiber that make simple meals feel complete.",
    "x": "18%",
    "y": "43%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "blueberries",
    "name": "Blueberries",
    "image": "assets/images/real/blueberries.jpg",
    "categories": [
      "carbs",
      "advanced",
      "fiber"
    ],
    "benefits": [
      "Polyphenols",
      "Vitamin C",
      "Fresh sweetness"
    ],
    "note": "A colorful fruit for breakfast bowls and snacks.",
    "x": "34%",
    "y": "38%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "spinach",
    "name": "Spinach",
    "image": "assets/images/real/spinach.jpg",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Leafy minerals",
      "Vitamin K",
      "Easy greens"
    ],
    "note": "Quick greens for bowls, eggs, smoothies, and soups.",
    "x": "17%",
    "y": "70%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "salmon",
    "name": "Salmon",
    "image": "assets/images/real/salmon.png",
    "categories": [
      "protein",
      "oils"
    ],
    "benefits": [
      "Protein",
      "Omega-3 fats",
      "Recovery"
    ],
    "note": "A protein-rich fish with naturally occurring omega-3 fats.",
    "x": "35%",
    "y": "69%",
    "dietType": "pescatarian",
    "tilmanProtocol": true
  },
  {
    "id": "oats",
    "name": "Oats",
    "image": "assets/images/real/oats.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Beta-glucan",
      "Slow carbs",
      "Breakfast base"
    ],
    "note": "A steady breakfast grain with soluble fiber.",
    "x": "28%",
    "y": "88%",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "olive-oil",
    "name": "Olive Oil",
    "image": "assets/images/real/olive-oil.png",
    "categories": [
      "oils",
      "advanced"
    ],
    "benefits": [
      "Monounsaturated fats",
      "Polyphenols",
      "Kitchen staple"
    ],
    "note": "A classic fat for salads, vegetables, and sauces.",
    "x": "48%",
    "y": "83%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "walnuts",
    "name": "Walnuts",
    "image": "assets/images/real/walnuts.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Healthy fats",
      "Minerals",
      "Crunch"
    ],
    "note": "A dense topping for breakfast bowls and salads.",
    "x": "62%",
    "y": "87%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "yogurt",
    "name": "Coconut Yogurt",
    "image": "assets/images/real/coconut-yogurt.png",
    "categories": [
      "protein",
      "advanced"
    ],
    "benefits": [
      "Fermented",
      "Plant-based",
      "Creamy base"
    ],
    "note": "A dairy-free fermented base for breakfast bowls, sauces, or snacks.",
    "x": "73%",
    "y": "72%",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "sweet-potato",
    "name": "Sweet Potato",
    "image": "assets/images/real/sweet-potato.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Slow carbs",
      "Beta carotene",
      "Comforting"
    ],
    "note": "A bright, filling carbohydrate for bowls and plates.",
    "x": "88%",
    "y": "62%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "cacao",
    "name": "Cacao",
    "image": "assets/images/real/cacao.png",
    "categories": [
      "advanced",
      "oils"
    ],
    "benefits": [
      "Polyphenols",
      "Magnesium",
      "Deep flavor"
    ],
    "note": "A rich ingredient for smoothies, yogurt, and warm drinks.",
    "x": "91%",
    "y": "38%",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "pumpkin-seeds",
    "name": "Pumpkin Seeds",
    "image": "assets/images/real/pumpkin-seeds.png",
    "categories": [
      "protein",
      "oils",
      "fiber"
    ],
    "benefits": [
      "Zinc",
      "Magnesium",
      "Protein"
    ],
    "note": "A small topping with useful minerals and texture.",
    "x": "86%",
    "y": "87%",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "black-beluga-lentils",
    "name": "Black Beluga Lentils",
    "image": "assets/images/real/black-beluga-lentils.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Plant protein",
      "Iron",
      "Dense fiber"
    ],
    "note": "Small dark lentils that hold their shape well in salads, bowls, and meal prep.",
    "x": "7%",
    "y": "12%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "black-beans",
    "name": "Black Beans",
    "image": "assets/images/real/black-beans.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Plant protein",
      "Slow carbs",
      "Polyphenols"
    ],
    "note": "A filling bean for bowls, soups, tacos, and simple batch cooking.",
    "x": "57%",
    "y": "7%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "kidney-beans",
    "name": "Kidney Beans",
    "image": "assets/images/real/kidney-beans.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Fiber",
      "Plant protein",
      "Potassium"
    ],
    "note": "A hearty bean for chilis, stews, salads, and mixed grain plates.",
    "x": "96%",
    "y": "12%",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "cannellini-beans",
    "name": "Cannellini Beans",
    "image": "assets/images/real/cannellini-beans.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Plant protein",
      "Creamy texture",
      "High fiber"
    ],
    "note": "Mild white beans that work well in soups, dips, salads, and vegetable plates.",
    "x": "7%",
    "y": "57%",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "green-peas",
    "name": "Green Peas",
    "image": "assets/images/real/green-peas.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Fiber",
      "Plant protein",
      "Vitamin K"
    ],
    "note": "A quick freezer-friendly vegetable legume for bowls, soups, and sides.",
    "x": "52%",
    "y": "57%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "edamame",
    "name": "Edamame",
    "image": "assets/images/real/edamame.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Complete protein",
      "Fiber",
      "Folate"
    ],
    "note": "Young soybeans that make a protein-rich snack or bowl topping.",
    "x": "101%",
    "y": "57%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "soybeans",
    "name": "Soybeans",
    "image": "assets/images/real/soybeans.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Plant protein",
      "Isoflavones",
      "Minerals"
    ],
    "note": "A versatile legume base behind tofu, tempeh, edamame, and other soy foods.",
    "x": "10%",
    "y": "102%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "tofu",
    "name": "Tofu",
    "image": "assets/images/real/tofu.png",
    "categories": [
      "protein"
    ],
    "benefits": [
      "Plant protein",
      "Calcium options",
      "Meal prep"
    ],
    "note": "A flexible soy protein for stir-fries, bowls, scrambles, and marinades.",
    "x": "38%",
    "y": "106%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "tempeh",
    "name": "Tempeh",
    "image": "assets/images/real/tempeh.png",
    "categories": [
      "protein",
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Fermented",
      "Plant protein",
      "Firm texture"
    ],
    "note": "Fermented soy with a firm bite for bowls, sandwiches, and high-protein plates.",
    "x": "67%",
    "y": "106%",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "miso",
    "name": "Miso",
    "image": "assets/images/real/miso.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Fermented",
      "Umami",
      "Flavor booster"
    ],
    "note": "A salty fermented soy paste that adds depth to broths, dressings, and sauces.",
    "x": "97%",
    "y": "102%",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "broccoli-sprouts",
    "name": "Broccoli Sprouts",
    "image": "assets/images/real/broccoli-sprouts.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Sulforaphane",
      "Cruciferous",
      "Vitamin C"
    ],
    "note": "Concentrated cruciferous sprouts that add a fresh, peppery crunch to bowls and salads.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "brussels-sprouts",
    "name": "Brussels Sprouts",
    "image": "assets/images/real/brussels-sprouts.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Fiber",
      "Vitamin K",
      "Cruciferous"
    ],
    "note": "A compact cruciferous vegetable for roasted sides, salads, and simple vegetable plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "kale",
    "name": "Kale",
    "image": "assets/images/real/kale.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Leafy greens",
      "Vitamin K",
      "Minerals"
    ],
    "note": "A sturdy leafy green for salads, soups, smoothies, and cooked vegetable sides.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "cabbage",
    "name": "Cabbage",
    "image": "assets/images/real/cabbage.png",
    "categories": [
      "fiber"
    ],
    "benefits": [
      "Fiber",
      "Vitamin C",
      "Budget friendly"
    ],
    "note": "A crisp cruciferous vegetable for slaws, soups, stir-fries, and fermented preparations.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "red-cabbage",
    "name": "Red Cabbage",
    "image": "assets/images/real/red-cabbage.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Anthocyanins",
      "Vitamin C",
      "Crunch"
    ],
    "note": "A colorful cruciferous vegetable that brings crunch and deep purple pigments to meals.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "watercress",
    "name": "Watercress",
    "image": "assets/images/real/watercress.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Peppery greens",
      "Vitamin K",
      "Nitrates"
    ],
    "note": "A peppery green for salads, sandwiches, soups, and nutrient-dense side plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "radishes",
    "name": "Radishes",
    "image": "assets/images/real/radishes.png",
    "categories": [
      "fiber"
    ],
    "benefits": [
      "Crunch",
      "Cruciferous",
      "Fresh bite"
    ],
    "note": "A crisp root vegetable that adds a sharp, refreshing bite to salads and snack plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "kohlrabi",
    "name": "Kohlrabi",
    "image": "assets/images/real/kohlrabi.png",
    "categories": [
      "fiber"
    ],
    "benefits": [
      "Fiber",
      "Vitamin C",
      "Crunch"
    ],
    "note": "A crunchy cruciferous vegetable that works raw in slaws or cooked in simple sides.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "swiss-chard",
    "name": "Swiss Chard",
    "image": "assets/images/real/swiss-chard.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Leafy minerals",
      "Colorful stems",
      "Vitamin K"
    ],
    "note": "A mineral-rich leafy green with colorful stems for sautees, soups, and grain bowls.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "romaine-lettuce",
    "name": "Romaine Lettuce",
    "image": "assets/images/real/romaine-lettuce.png",
    "categories": [
      "fiber"
    ],
    "benefits": [
      "Hydrating",
      "Folate",
      "Crunch"
    ],
    "note": "A crisp leafy green for salads, wraps, and fresh high-volume meal bases.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "beet-greens",
    "name": "Beet Greens",
    "image": "assets/images/real/beet-greens.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Leafy minerals",
      "Vitamin K",
      "Folate"
    ],
    "note": "Leafy beet tops that bring minerals and color to sautees, soups, and bowls.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "dandelion-greens",
    "name": "Dandelion Greens",
    "image": "assets/images/real/dandelion-greens.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Bitter greens",
      "Vitamin K",
      "Minerals"
    ],
    "note": "Bitter leafy greens for salads, sautees, and nutrient-dense vegetable plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "parsley",
    "name": "Parsley",
    "image": "assets/images/real/parsley.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Herb greens",
      "Vitamin K",
      "Fresh flavor"
    ],
    "note": "A fresh herb that works like a leafy green in salads, sauces, and bowls.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "cilantro",
    "name": "Cilantro",
    "image": "assets/images/real/cilantro.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Herb greens",
      "Fresh flavor",
      "Micronutrients"
    ],
    "note": "A bright herb for bowls, salsas, soups, and fresh vegetable plates.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "microgreens",
    "name": "Microgreens",
    "image": "assets/images/real/microgreens.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Young greens",
      "Micronutrients",
      "Fresh crunch"
    ],
    "note": "Young greens that add concentrated flavor, color, and texture to meals.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "carrots",
    "name": "Carrots",
    "image": "assets/images/real/carrots.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Beta carotene",
      "Crunch",
      "Fiber"
    ],
    "note": "A sweet root vegetable for snacks, soups, salads, and roasted plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "pumpkin",
    "name": "Pumpkin",
    "image": "assets/images/real/pumpkin.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Beta carotene",
      "Comforting carbs",
      "Potassium"
    ],
    "note": "An orange squash for soups, bowls, roasting, and seasonal meal prep.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "beets",
    "name": "Beets",
    "image": "assets/images/real/beets.png",
    "categories": [
      "carbs",
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Nitrates",
      "Colorful roots",
      "Folate"
    ],
    "note": "A deep red root vegetable for salads, bowls, juices, and roasted sides.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "tomatoes",
    "name": "Tomatoes",
    "image": "assets/images/real/tomatoes.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Lycopene",
      "Vitamin C",
      "Fresh acidity"
    ],
    "note": "A versatile vegetable fruit for salads, sauces, bowls, and snacks.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "bell-peppers",
    "name": "Bell Peppers",
    "image": "assets/images/real/bell-peppers.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Vitamin C",
      "Colorful crunch",
      "Antioxidants"
    ],
    "note": "Colorful peppers that add crunch, sweetness, and vitamin C to meals.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "red-onions",
    "name": "Red Onions",
    "image": "assets/images/real/red-onions.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Allium",
      "Polyphenols",
      "Sharp flavor"
    ],
    "note": "An allium vegetable for salads, sauces, cooked dishes, and quick pickles.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "garlic",
    "name": "Garlic",
    "image": "assets/images/real/garlic.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Allium",
      "Flavor base",
      "Plant compounds"
    ],
    "note": "A concentrated allium ingredient for sauces, soups, dressings, and cooked plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "leeks",
    "name": "Leeks",
    "image": "assets/images/real/leeks.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Allium",
      "Gentle sweetness",
      "Fiber"
    ],
    "note": "A mild allium vegetable for soups, braises, and vegetable sides.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "asparagus",
    "name": "Asparagus",
    "image": "assets/images/real/asparagus.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Fiber",
      "Folate",
      "Spring vegetable"
    ],
    "note": "A fiber-rich vegetable for quick sides, salads, and grain bowls.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "artichokes",
    "name": "Artichokes",
    "image": "assets/images/real/artichokes.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "High fiber",
      "Prebiotic",
      "Minerals"
    ],
    "note": "A fiber-dense vegetable for Mediterranean-style plates and salads.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "mushrooms",
    "name": "Mushrooms",
    "image": "assets/images/real/mushrooms.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Umami",
      "Minerals",
      "Savory base"
    ],
    "note": "A savory ingredient for soups, stir-fries, bowls, and vegetable plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "seaweed",
    "name": "Seaweed",
    "image": "assets/images/real/seaweed.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Minerals",
      "Iodine context",
      "Umami"
    ],
    "note": "A mineral-rich sea vegetable for soups, salads, bowls, and snacks.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "sauerkraut",
    "name": "Sauerkraut",
    "image": "assets/images/real/sauerkraut.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Fermented",
      "Cabbage",
      "Tangy crunch"
    ],
    "note": "Fermented cabbage that adds acidity and crunch to bowls and plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "kimchi",
    "name": "Kimchi",
    "image": "assets/images/real/kimchi.png",
    "categories": [
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Fermented",
      "Spicy cabbage",
      "Flavor booster"
    ],
    "note": "A spicy fermented vegetable for bowls, rice plates, soups, and sides.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "blackberries",
    "name": "Blackberries",
    "image": "assets/images/real/blackberries.png",
    "categories": [
      "carbs",
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Polyphenols",
      "Fiber",
      "Fresh sweetness"
    ],
    "note": "Dark berries for breakfast bowls, snacks, smoothies, and desserts.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "acai",
    "name": "Acai",
    "image": "assets/images/real/acai.png",
    "categories": [
      "carbs",
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Polyphenols",
      "Berry fruit",
      "Deep color"
    ],
    "note": "A dark berry-like fruit often used in smoothie bowls and low-sugar fruit blends.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "pomegranate",
    "name": "Pomegranate",
    "image": "assets/images/real/pomegranate.png",
    "categories": [
      "carbs",
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Polyphenols",
      "Juicy seeds",
      "Colorful"
    ],
    "note": "A bright fruit with tart seeds for salads, yogurt bowls, and snacks.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "lemons",
    "name": "Lemons",
    "image": "assets/images/real/lemons.png",
    "categories": [
      "carbs",
      "advanced"
    ],
    "benefits": [
      "Vitamin C",
      "Acidity",
      "Flavor lift"
    ],
    "note": "A citrus fruit for dressings, water, sauces, and bright finishing flavor.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "kiwi",
    "name": "Kiwi",
    "image": "assets/images/real/kiwi.png",
    "categories": [
      "carbs",
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Vitamin C",
      "Fiber",
      "Fresh sweetness"
    ],
    "note": "A vitamin-C-rich fruit for breakfast bowls, snacks, and smoothies.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "almonds",
    "name": "Almonds",
    "image": "assets/images/real/almonds.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Healthy fats",
      "Vitamin E",
      "Crunch"
    ],
    "note": "A versatile nut for snacks, toppings, nut butter, and baking.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "pistachios",
    "name": "Pistachios",
    "image": "assets/images/real/pistachios.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Healthy fats",
      "Protein",
      "Minerals"
    ],
    "note": "A colorful nut for snacks, toppings, salads, and desserts.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "hazelnuts",
    "name": "Hazelnuts",
    "image": "assets/images/real/hazelnuts.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Healthy fats",
      "Vitamin E",
      "Crunch"
    ],
    "note": "A rich nut for toppings, snacks, and cacao-forward recipes.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "cashews",
    "name": "Cashews",
    "image": "assets/images/real/cashews.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Healthy fats",
      "Creamy texture",
      "Minerals"
    ],
    "note": "A mild nut for snacks, sauces, creamy blends, and stir-fries.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "brazil-nuts",
    "name": "Brazil Nuts",
    "image": "assets/images/real/brazil-nuts.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Selenium",
      "Healthy fats",
      "Dense snack"
    ],
    "note": "A selenium-rich nut best used in small amounts as a snack or topping.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "pecans",
    "name": "Pecans",
    "image": "assets/images/real/pecans.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Healthy fats",
      "Crunch",
      "Rich flavor"
    ],
    "note": "A buttery nut for salads, oats, snacks, and low-sugar desserts.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "macadamia-nuts",
    "name": "Macadamia Nuts",
    "image": "assets/images/real/macadamia-nuts.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Monounsaturated fats",
      "Creamy crunch",
      "Dense energy"
    ],
    "note": "A creamy nut for snacks, toppings, and high-fat meal additions.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "chia-seeds",
    "name": "Chia Seeds",
    "image": "assets/images/real/chia-seeds.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Omega-3 ALA",
      "Gel fiber",
      "Minerals"
    ],
    "note": "Tiny seeds that thicken puddings, oats, smoothies, and breakfast bowls.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "flaxseeds",
    "name": "Flaxseeds",
    "image": "assets/images/real/flaxseeds.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Omega-3 ALA",
      "Fiber",
      "Lignans"
    ],
    "note": "Seeds often ground into oats, smoothies, and baked goods for fiber and fats.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "hemp-seeds",
    "name": "Hemp Seeds",
    "image": "assets/images/real/hemp-seeds.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Plant protein",
      "Healthy fats",
      "Soft texture"
    ],
    "note": "Soft seeds for smoothies, salads, yogurt bowls, and savory toppings.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "sunflower-seeds",
    "name": "Sunflower Seeds",
    "image": "assets/images/real/sunflower-seeds.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Vitamin E",
      "Crunch",
      "Minerals"
    ],
    "note": "A seed topping for salads, bowls, snacks, and homemade mixes.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "sesame-seeds",
    "name": "Sesame Seeds",
    "image": "assets/images/real/sesame-seeds.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Minerals",
      "Nutty flavor",
      "Crunch"
    ],
    "note": "Small seeds for toppings, dressings, tahini, and savory dishes.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "tahini",
    "name": "Tahini",
    "image": "assets/images/real/tahini.png",
    "categories": [
      "oils",
      "protein",
      "fiber"
    ],
    "benefits": [
      "Sesame paste",
      "Healthy fats",
      "Creamy sauces"
    ],
    "note": "A sesame seed paste for dressings, sauces, dips, and bowls.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "steel-cut-oats",
    "name": "Steel-Cut Oats",
    "image": "assets/images/real/steel-cut-oats.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Whole grain",
      "Slow carbs",
      "Breakfast base"
    ],
    "note": "A coarse oat grain for warm breakfasts and batch-prepped bowls.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "quinoa",
    "name": "Quinoa",
    "image": "assets/images/real/quinoa.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Pseudograin",
      "Plant protein",
      "Minerals"
    ],
    "note": "A quick-cooking pseudograin for bowls, salads, and meal prep.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "buckwheat",
    "name": "Buckwheat",
    "image": "assets/images/real/buckwheat.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Pseudograin",
      "Minerals",
      "Nutty flavor"
    ],
    "note": "A gluten-free pseudograin for porridge, salads, and savory bowls.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "brown-rice",
    "name": "Brown Rice",
    "image": "assets/images/real/brown-rice.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Whole grain",
      "Steady carbs",
      "Minerals"
    ],
    "note": "A whole grain rice for bowls, sides, soups, and meal prep.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "wild-rice",
    "name": "Wild Rice",
    "image": "assets/images/real/wild-rice.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Whole grain-like seed",
      "Chewy texture",
      "Minerals"
    ],
    "note": "A chewy grain-like seed for bowls, soups, and mixed grain salads.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "farro",
    "name": "Farro",
    "image": "assets/images/real/farro.png",
    "categories": [
      "protein",
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Whole grain",
      "Chewy texture",
      "Meal prep"
    ],
    "note": "A hearty wheat grain for salads, soups, bowls, and vegetable plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "bulgur",
    "name": "Bulgur",
    "image": "assets/images/real/bulgur.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Whole grain",
      "Quick cooking",
      "Fiber"
    ],
    "note": "A quick whole grain for salads, pilafs, bowls, and vegetable sides.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "millet",
    "name": "Millet",
    "image": "assets/images/real/millet.png",
    "categories": [
      "carbs",
      "fiber"
    ],
    "benefits": [
      "Whole grain",
      "Mild flavor",
      "Minerals"
    ],
    "note": "A small grain for porridge, bowls, sides, and gluten-free cooking.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "avocado-oil",
    "name": "Avocado Oil",
    "image": "assets/images/real/avocado-oil.png",
    "categories": [
      "oils",
      "advanced"
    ],
    "benefits": [
      "Monounsaturated fats",
      "Kitchen oil",
      "Neutral flavor"
    ],
    "note": "A mild oil for dressings, cooking, and adding fats to simple meals.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "olives",
    "name": "Olives",
    "image": "assets/images/real/olives.png",
    "categories": [
      "oils",
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Monounsaturated fats",
      "Polyphenols",
      "Savory"
    ],
    "note": "A savory fruit for salads, bowls, snacks, and Mediterranean-style plates.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "natto",
    "name": "Natto",
    "image": "assets/images/real/natto.png",
    "categories": [
      "protein",
      "fiber",
      "advanced"
    ],
    "benefits": [
      "Fermented soy",
      "Plant protein",
      "Distinct texture"
    ],
    "note": "A fermented soy food traditionally used with rice and savory bowls.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "kombucha",
    "name": "Kombucha",
    "image": "assets/images/real/kombucha.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Fermented tea",
      "Tangy drink",
      "Low sugar option"
    ],
    "note": "A fermented tea drink; choose low-sugar versions when possible.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "sardines",
    "name": "Sardines",
    "image": "assets/images/real/sardines.png",
    "categories": [
      "protein",
      "oils"
    ],
    "benefits": [
      "Omega-3 fats",
      "Protein",
      "Small fish"
    ],
    "note": "A small fatty fish with protein and omega-3 fats for simple savory meals.",
    "dietType": "pescatarian",
    "tilmanProtocol": false
  },
  {
    "id": "mackerel",
    "name": "Mackerel",
    "image": "assets/images/real/mackerel.png",
    "categories": [
      "protein",
      "oils"
    ],
    "benefits": [
      "Omega-3 fats",
      "Protein",
      "Fatty fish"
    ],
    "note": "A rich fatty fish for omega-3-forward meals and protein plates.",
    "dietType": "pescatarian",
    "tilmanProtocol": false
  },
  {
    "id": "trout",
    "name": "Trout",
    "image": "assets/images/real/trout.png",
    "categories": [
      "protein",
      "oils"
    ],
    "benefits": [
      "Protein",
      "Omega-3 fats",
      "Mild fish"
    ],
    "note": "A mild fish option for protein-rich meals and simple plates.",
    "dietType": "pescatarian",
    "tilmanProtocol": false
  },
  {
    "id": "herring",
    "name": "Herring",
    "image": "assets/images/real/herring.png",
    "categories": [
      "protein",
      "oils"
    ],
    "benefits": [
      "Omega-3 fats",
      "Protein",
      "Fatty fish"
    ],
    "note": "A fatty fish for savory meals, salads, and omega-3-rich plates.",
    "dietType": "pescatarian",
    "tilmanProtocol": false
  },
  {
    "id": "turmeric",
    "name": "Turmeric",
    "image": "assets/images/real/turmeric.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Curcumin context",
      "Golden spice",
      "Flavor"
    ],
    "note": "A golden spice or root for curries, drinks, sauces, and seasoning blends.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "ginger",
    "name": "Ginger",
    "image": "assets/images/real/ginger.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Spicy root",
      "Warming flavor",
      "Plant compounds"
    ],
    "note": "A sharp root for tea, dressings, stir-fries, sauces, and smoothies.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "cinnamon",
    "name": "Cinnamon",
    "image": "assets/images/real/cinnamon.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Sweet spice",
      "Warm flavor",
      "Polyphenols"
    ],
    "note": "A warming spice for oats, yogurt, smoothies, and low-sugar desserts.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "rosemary",
    "name": "Rosemary",
    "image": "assets/images/real/rosemary.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Herb",
      "Savory aroma",
      "Polyphenols"
    ],
    "note": "A woody herb for vegetables, potatoes, fish, sauces, and roasted plates.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "oregano",
    "name": "Oregano",
    "image": "assets/images/real/oregano.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Herb",
      "Mediterranean flavor",
      "Polyphenols"
    ],
    "note": "A savory herb for sauces, salads, vegetables, and Mediterranean dishes.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "thyme",
    "name": "Thyme",
    "image": "assets/images/real/thyme.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Herb",
      "Savory flavor",
      "Aromatic"
    ],
    "note": "A small-leaf herb for soups, vegetables, fish, and grain dishes.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "green-tea",
    "name": "Green Tea",
    "image": "assets/images/real/green-tea.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Tea polyphenols",
      "Light caffeine",
      "Drink"
    ],
    "note": "A tea ingredient for a light caffeinated drink with plant compounds.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "matcha",
    "name": "Matcha",
    "image": "assets/images/real/matcha.png",
    "categories": [
      "advanced"
    ],
    "benefits": [
      "Green tea powder",
      "Polyphenols",
      "Caffeine"
    ],
    "note": "A powdered green tea for drinks, smoothies, and occasional recipes.",
    "dietType": "vegan",
    "tilmanProtocol": false
  },
  {
    "id": "walnut-oil",
    "name": "Walnut Oil",
    "image": "assets/images/real/walnut-oil.png",
    "categories": [
      "oils",
      "advanced"
    ],
    "benefits": [
      "Omega-3 ALA",
      "Finishing oil",
      "Nutty flavor"
    ],
    "note": "A heat-sensitive finishing oil for salads, vegetables, and grain dishes.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "hemp-seed-oil",
    "name": "Hemp Seed Oil",
    "image": "assets/images/real/hemp-seed-oil.png",
    "categories": [
      "oils",
      "advanced"
    ],
    "benefits": [
      "Omega-3 ALA",
      "Cold finishing oil",
      "Nutty flavor"
    ],
    "note": "A heat-sensitive seed oil best used cold for salads, bowls, and dressings.",
    "dietType": "vegan",
    "tilmanProtocol": true
  },
  {
    "id": "wheat-germ-oil",
    "name": "Wheat Germ Oil",
    "image": "assets/images/real/wheat-germ-oil.png",
    "categories": [
      "oils",
      "advanced"
    ],
    "benefits": [
      "Vitamin E",
      "Finishing oil",
      "Rich flavor"
    ],
    "note": "A vitamin-E-rich oil best used in small amounts as a finishing oil.",
    "dietType": "vegan",
    "tilmanProtocol": false
  }
];

const supplements = [
  { id: "vitamin-d3-k2", name: "Vitamin D3 + K2", image: "assets/images/vitamin-d3-k2.svg", labels: ["Taking: Tilman Resch", "Generally recommended"], note: "Often discussed for vitamin D status and bone-support context. Use with personal lab context." },
  { id: "creatine", name: "Creatine", image: "assets/images/creatine.svg", labels: ["Taking: Tilman Resch", "Recommended by: Bryan Johnson"], note: "Commonly used for strength, power, and muscle-support routines." },
  { id: "omega-3", name: "Omega-3", image: "assets/images/omega-3.svg", labels: ["Recommended by: Bryan Johnson", "Generally recommended"], note: "A supplement category often used when fatty fish intake is low." },
  { id: "magnesium", name: "Magnesium Glycinate", image: "assets/images/magnesium.svg", labels: ["Taking: Tilman Resch", "Recommended by: Bryan Johnson"], note: "Often used in evening routines; tolerance and dosage are individual." }
];

const recipes = [
  {
    id: "green-recovery-bowl",
    name: "Green recovery bowl with citrus tahini",
    image: "assets/images/real/recipe-bowl.jpg",
    components: ["Greens", "Quinoa", "Avocado", "Chickpeas", "Citrus tahini"],
    focus: ["Fiber", "Plant protein", "Minerals", "Healthy fats"],
    note: "A bright recovery bowl built around greens, quinoa, avocado, chickpeas, and citrus tahini."
  }
];

const page = document.body.dataset.page;
const listApiUrl = "https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws";
const accountApiBaseUrl = localStorage.getItem("my-superfood-account-api-base") || (["my-superfood.com", "www.my-superfood.com"].includes(location.hostname) ? "/api" : "");
const catalogApiUrl = "https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws";
const listStorageKey = "my-superfood-list";
const accountListCacheStorageKey = "my-superfood-account-list-cache";
const clientStorageKey = "my-superfood-client-id";
const authState = {
  ready: false,
  authenticated: false,
  user: null,
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseStoredList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.warn(`Ignoring invalid saved list data for ${key}.`, error);
    return [];
  }
}

function getList() {
  return parseStoredList(listStorageKey);
}

function setList(list) {
  localStorage.setItem(listStorageKey, JSON.stringify(list));
}

function getAccountListCache() {
  return parseStoredList(accountListCacheStorageKey);
}

function setAccountListCache(list) {
  localStorage.setItem(accountListCacheStorageKey, JSON.stringify(list));
}

function visibleList() {
  return authState.authenticated ? getAccountListCache() : getList();
}

function setVisibleList(list) {
  if (authState.authenticated) {
    setAccountListCache(list);
  } else {
    setList(list);
  }
}

function itemKey(item) {
  return `${item.type}#${item.id}`;
}

function addUniqueItem(list, item) {
  if (list.some((entry) => itemKey(entry) === itemKey(item))) return list;
  return [...list, item];
}

function getClientId() {
  let clientId = localStorage.getItem(clientStorageKey);
  if (!clientId) {
    clientId = crypto.randomUUID ? crypto.randomUUID() : `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(clientStorageKey, clientId);
  }
  return clientId;
}

function hasListApi() {
  return listApiUrl.startsWith("https://");
}

function hasAccountApi() {
  return accountApiBaseUrl.length > 0;
}

function accountApiPath(path) {
  return `${accountApiBaseUrl}${path}`;
}

async function loadAuthSession() {
  if (!hasAccountApi()) {
    authState.ready = true;
    return authState;
  }

  try {
    const response = await fetch(accountApiPath("/auth/session"), {
      credentials: "include",
      headers: { accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Auth session returned ${response.status}`);
    const payload = await response.json();
    authState.authenticated = Boolean(payload.authenticated);
    authState.user = payload.user || null;
    if (!authState.authenticated) localStorage.removeItem(accountListCacheStorageKey);
  } catch (error) {
    authState.authenticated = false;
    authState.user = null;
    localStorage.removeItem(accountListCacheStorageKey);
    console.warn("LuminaOS session check failed; staying in browser-local mode.", error);
  } finally {
    authState.ready = true;
  }

  return authState;
}

async function mergeLocalListIntoAccount() {
  if (!hasAccountApi() || !authState.authenticated || !authState.user?.userId) return;

  const mergeKey = `my-superfood-merged-${authState.user.userId}`;
  if (localStorage.getItem(mergeKey) === "true") return;

  const items = getList();
  if (items.length === 0) {
    localStorage.setItem(mergeKey, "true");
    return;
  }

  const response = await fetch(accountApiPath("/list/merge"), {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!response.ok) throw new Error(`List merge returned ${response.status}`);

  const payload = await response.json();
  if (Array.isArray(payload.items)) setAccountListCache(payload.items);
  localStorage.setItem(mergeKey, "true");
}

function clearAccountSessionState() {
  authState.authenticated = false;
  authState.user = null;
  localStorage.removeItem(accountListCacheStorageKey);
}

async function fetchRemoteList() {
  if (hasAccountApi() && authState.authenticated) {
    const response = await fetch(accountApiPath("/list"), {
      credentials: "include",
      headers: { accept: "application/json" },
    });
    if (response.status === 401 || response.status === 403) {
      clearAccountSessionState();
      renderAuthControls();
      return fetchRemoteList();
    }
    if (!response.ok) throw new Error(`Account list API returned ${response.status}`);

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  }

  if (!hasListApi()) return [];

  const url = `${listApiUrl}/?clientId=${encodeURIComponent(getClientId())}`;
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`List API returned ${response.status}`);

  const payload = await response.json();
  return Array.isArray(payload.items) ? payload.items : [];
}

async function saveRemoteItem(item) {
  if (hasAccountApi() && authState.authenticated) {
    const response = await fetch(accountApiPath("/list"), {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ item }),
    });

    if (response.status === 401 || response.status === 403) {
      clearAccountSessionState();
      setList(addUniqueItem(getList(), item));
      renderAuthControls();
      return saveRemoteItem(item);
    }
    if (!response.ok) throw new Error(`Account list API returned ${response.status}`);
    return;
  }

  if (!hasListApi()) return;

  const response = await fetch(listApiUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: getClientId(), item }),
  });

  if (!response.ok) throw new Error(`List API returned ${response.status}`);
}

function saveItem(item) {
  setVisibleList(addUniqueItem(visibleList(), item));

  saveRemoteItem(item).catch((error) => {
    console.warn("Remote list save failed; local list still saved.", error);
  });
}

function authStatusText() {
  if (authState.authenticated) {
    return `Synced with LuminaOS${authState.user?.displayName ? ` as ${authState.user.displayName}` : ""}.`;
  }
  if (hasAccountApi()) return "Saved in this browser. Sign in with LuminaOS to sync.";
  return "Saved in this browser. Account sync activates on the My Superfood production domain.";
}

function renderAuthControls() {
  document.querySelectorAll("[data-auth-status]").forEach((target) => {
    target.textContent = authStatusText();
  });

  document.querySelectorAll("[data-auth-actions]").forEach((target) => {
    if (!hasAccountApi()) {
      target.innerHTML = `<span class="tag">LuminaOS sync available after API deployment</span>`;
      return;
    }

    if (authState.authenticated) {
      target.innerHTML = `<button class="button ghost auth-logout" type="button">Sign out</button>`;
    } else {
      target.innerHTML = `<a class="button primary" href="${accountApiPath("/auth/start")}">Sign in with LuminaOS</a>`;
    }
  });

  document.querySelectorAll(".auth-logout").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!hasAccountApi()) return;
      await fetch(accountApiPath("/auth/logout"), { method: "POST", credentials: "include" });
      clearAccountSessionState();
      renderAuthControls();
      if (page === "lists") renderSavedList();
    });
  });
}

function renderHome() {
  const orbit = document.querySelector("#food-orbit");
  const detailTitle = document.querySelector("#detail-title");
  const detailImage = document.querySelector("#detail-image");
  const detailBenefits = document.querySelector("#detail-benefits");
  const addButton = document.querySelector("#add-to-list");
  const openDetail = document.querySelector("#open-detail");
  const savedNote = document.querySelector("#saved-note");
  const detailCard = document.querySelector("#detail-card");
  const closeDetail = document.querySelector(".close-detail");
  if (!orbit || !detailTitle || !detailImage || !detailBenefits || !addButton || !openDetail || !detailCard || !closeDetail) return;
  let selected = foods[0];
  let activeFilter = "all";
  let activeDiet = "pescatarian";
  let cloudX = 0;
  let cloudY = 0;
  let didPan = false;
  let clickToOpenOnly = true;
  let panBlockUntil = 0;

  function hideDetail() {
    clickToOpenOnly = true;
    detailCard.classList.add("is-hidden");
    document.querySelectorAll(".food-bubble").forEach((button) => button.classList.remove("is-selected"));
  }

  function updateDetail(food, options = {}) {
    if (clickToOpenOnly && !options.fromClick) return;
    selected = food;
    detailTitle.textContent = food.name;
    detailImage.src = food.image;
    detailImage.alt = food.name;
    detailImage.draggable = false;
    detailBenefits.innerHTML = food.benefits.map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join("");
    openDetail.href = `/foods#${food.id}`;
    savedNote.textContent = "";
    detailCard.classList.remove("is-hidden");
    document.querySelectorAll(".food-bubble").forEach((button) => button.classList.toggle("is-selected", button.dataset.food === food.id));
  }

  function setCloudPosition(x, y) {
    const cloud = orbit.querySelector(".food-cloud");
    if (!cloud) return;

    const orbitRect = orbit.getBoundingClientRect();
    const cloudRect = cloud.getBoundingClientRect();
    const minX = Math.min(0, orbitRect.width - cloudRect.width);
    const minY = Math.min(0, orbitRect.height - cloudRect.height);

    cloudX = Math.min(0, Math.max(minX, x));
    cloudY = Math.min(0, Math.max(minY, y));
    cloud.style.transform = `translate3d(${cloudX}px, ${cloudY}px, 0)`;
  }

  function layoutCloud() {
    const cloud = orbit.querySelector(".food-cloud");
    if (!cloud) return;

    const orbitRect = orbit.getBoundingClientRect();
    const orbitWidth = orbitRect.width;
    const orbitHeight = orbitRect.height;
    const bubbles = Array.from(cloud.querySelectorAll(".food-bubble"));
    const isFullCloud = activeFilter === "all" && bubbles.length > 60;
    const widthScale = isFullCloud ? (orbitWidth < 560 ? 3.1 : 3.2) : (orbitWidth < 560 ? 2.15 : 1.52);
    const heightScale = isFullCloud ? (orbitWidth < 560 ? 1.9 : 1.72) : (orbitWidth < 560 ? 1.65 : 1.38);
    const cloudWidth = Math.round(Math.max(orbitWidth * widthScale, orbitWidth + (isFullCloud ? 920 : 420)));
    const cloudHeight = Math.round(Math.max(orbitHeight * heightScale, orbitHeight + (isFullCloud ? 340 : 210)));
    const edgePadding = orbitWidth < 560 ? 88 : 120;
    const rowCount = orbitWidth < 560 ? 7 : 5;
    const usableWidth = cloudWidth - edgePadding * 2;
    const usableHeight = cloudHeight - edgePadding * 2;
    const cellHeight = usableHeight / rowCount;
    const baseBubbleSize = orbitWidth < 560 ? 82 : orbitWidth < 900 ? 100 : 112;

    cloud.style.width = `${cloudWidth}px`;
    cloud.style.height = `${cloudHeight}px`;

    const rowBuckets = Array.from({ length: rowCount }, () => []);
    bubbles
      .slice()
      .sort((a, b) => seededFraction(`food:${a.dataset.food}`) - seededFraction(`food:${b.dataset.food}`))
      .forEach((button, index) => {
        rowBuckets[index % rowCount].push(button);
      });

    rowBuckets.forEach((row, rowIndex) => {
      row
        .slice()
        .sort((a, b) => seededFraction(`row:${rowIndex}:${a.dataset.food}`) - seededFraction(`row:${rowIndex}:${b.dataset.food}`))
        .forEach((button, slotIndex) => {
          const foodId = button.dataset.food || "";
          const bubbleSize = Math.round(baseBubbleSize * (0.84 + seededFraction(`${foodId}:size`) * 0.2));
          const slotWidth = usableWidth / row.length;
          const rowOffset = (seededFraction(`row-offset:${rowIndex}`) - 0.5) * slotWidth * 0.42;
          const jitterX = (seededFraction(`${foodId}:x`) - 0.5) * Math.max(20, slotWidth - bubbleSize - 24);
          const jitterY = (seededFraction(`${foodId}:y`) - 0.5) * Math.max(12, cellHeight - bubbleSize - 34);
          const x = edgePadding + slotIndex * slotWidth + (slotWidth - bubbleSize) / 2 + rowOffset + jitterX;
          const y = edgePadding + rowIndex * cellHeight + (cellHeight - bubbleSize) / 2 + jitterY;
          button.style.setProperty("--bubble-size", `${bubbleSize}px`);
          button.style.setProperty("--bubble-x", `${Math.max(edgePadding, Math.min(cloudWidth - bubbleSize - edgePadding, x))}px`);
          button.style.setProperty("--bubble-y", `${Math.max(edgePadding, Math.min(cloudHeight - bubbleSize - edgePadding, y))}px`);
        });
    });

    setCloudPosition(cloudX, cloudY);
  }

  function seededFraction(value) {
    let hash = 2166136261;
    const input = `my-superfood:${value}`;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0) / 4294967295;
  }

  function filteredFoods() {
    const dietFoods = foods.filter((food) => matchesDiet(food));
    if (activeFilter === "all") return dietFoods;
    if (activeFilter === "tilman") return dietFoods.filter((food) => food.tilmanProtocol);
    return dietFoods.filter((food) => food.categories.includes(activeFilter));
  }

  function matchesDiet(food) {
    const dietType = food.dietType || "vegan";
    if (activeDiet === "vegan") return dietType === "vegan";
    if (activeDiet === "pescatarian") return dietType === "vegan" || dietType === "pescatarian";
    if (activeDiet === "vegetarian") return dietType === "vegan" || dietType === "vegetarian";
    return true;
  }

  function renderBubbles() {
    const visibleFoods = filteredFoods();
    if (!visibleFoods.some((food) => food.id === selected.id)) {
      selected = visibleFoods[0] || foods[0];
    }

    orbit.innerHTML = `
      <div class="food-cloud" id="food-cloud">
        ${visibleFoods.map((food, index) => `
          <button class="food-bubble" type="button" data-food="${escapeHtml(food.id)}" style="--delay:${index * -0.43}s; --float:13px;" aria-label="${escapeHtml(food.name)}">
            <img src="${escapeHtml(food.image)}" alt="" draggable="false">
            <span class="bubble-label">${escapeHtml(food.name)}</span>
          </button>
        `).join("")}
      </div>
    `;

    document.querySelectorAll(".food-bubble").forEach((button) => {
      const food = foods.find((entry) => entry.id === button.dataset.food);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        if (didPan || Date.now() < panBlockUntil) {
          event.preventDefault();
          return;
        }
        clickToOpenOnly = false;
        updateDetail(food, { fromClick: true });
      });
    });

    layoutCloud();
    updateDetail(selected);
  }

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((entry) => entry.classList.toggle("active", entry === button));
      renderBubbles();
      hideDetail();
    });
  });

  document.querySelectorAll(".diet-toggle-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeDiet = button.dataset.diet;
      document.querySelectorAll(".diet-toggle-button").forEach((entry) => entry.classList.toggle("active", entry === button));
      renderBubbles();
      hideDetail();
    });
  });

  addButton.addEventListener("click", () => {
    saveItem({ type: "Food", id: selected.id, name: selected.name, image: selected.image, note: selected.note });
    savedNote.textContent = `${selected.name} added to your list.`;
  });

  closeDetail.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    hideDetail();
  });

  document.addEventListener("pointerdown", (event) => {
    if (detailCard.classList.contains("is-hidden")) return;
    if (event.target.closest(".detail-card, .food-bubble")) return;
    hideDetail();
  });

  detailCard.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 780px)").matches) return;
    if (event.target.closest("button, a")) return;

    const stage = document.querySelector(".bubble-stage");
    const stageRect = stage.getBoundingClientRect();
    const cardRect = detailCard.getBoundingClientRect();
    const offsetX = event.clientX - cardRect.left;
    const offsetY = event.clientY - cardRect.top;

    detailCard.classList.add("is-dragging");
    detailCard.setPointerCapture(event.pointerId);

    const moveCard = (moveEvent) => {
      const nextX = Math.min(
        Math.max(8, moveEvent.clientX - stageRect.left - offsetX),
        stageRect.width - cardRect.width - 8
      );
      const nextY = Math.min(
        Math.max(8, moveEvent.clientY - stageRect.top - offsetY),
        stageRect.height - cardRect.height - 8
      );

      detailCard.style.left = `${nextX}px`;
      detailCard.style.top = `${nextY}px`;
      detailCard.style.right = "auto";
      detailCard.style.bottom = "auto";
    };

    const stopDrag = () => {
      detailCard.classList.remove("is-dragging");
      detailCard.removeEventListener("pointermove", moveCard);
      detailCard.removeEventListener("pointerup", stopDrag);
      detailCard.removeEventListener("pointercancel", stopDrag);
    };

    detailCard.addEventListener("pointermove", moveCard);
    detailCard.addEventListener("pointerup", stopDrag);
    detailCard.addEventListener("pointercancel", stopDrag);
  });

  orbit.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary) return;

    const startX = event.clientX;
    const startY = event.clientY;
    const originX = cloudX;
    const originY = cloudY;
    const startBubble = event.target.closest(".food-bubble");
    didPan = false;

    orbit.classList.add("is-panning");
    orbit.setPointerCapture(event.pointerId);

    const moveCloud = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const hasMovedEnoughToPan = Math.hypot(deltaX, deltaY) > 12;
      if (!hasMovedEnoughToPan && !didPan) return;
      didPan = true;
      setCloudPosition(originX + deltaX, originY + deltaY);
    };

    const stopPan = () => {
      orbit.classList.remove("is-panning");
      orbit.removeEventListener("pointermove", moveCloud);
      orbit.removeEventListener("pointerup", stopPan);
      orbit.removeEventListener("pointercancel", stopPan);
      if (didPan) panBlockUntil = Date.now() + 180;
      if (!didPan && startBubble) {
        const food = foods.find((entry) => entry.id === startBubble.dataset.food);
        if (food) {
          clickToOpenOnly = false;
          updateDetail(food, { fromClick: true });
        }
      }
      window.setTimeout(() => {
        didPan = false;
      }, 180);
    };

    orbit.addEventListener("pointermove", moveCloud);
    orbit.addEventListener("pointerup", stopPan);
    orbit.addEventListener("pointercancel", stopPan);
  });

  window.addEventListener("resize", layoutCloud);
  renderBubbles();
  updateDetail(selected);
}

function renderFoods() {
  const catalog = document.querySelector("#food-catalog");
  catalog.innerHTML = foods.map((food) => `
    <article class="catalog-card" id="${escapeHtml(food.id)}">
      <img src="${escapeHtml(food.image)}" alt="${escapeHtml(food.name)}" loading="lazy" decoding="async">
      <h2>${escapeHtml(food.name)}</h2>
      <p>${escapeHtml(food.note)}</p>
      <div class="tag-row">${food.benefits.map((benefit) => `<span class="tag">${escapeHtml(benefit)}</span>`).join("")}</div>
      <button class="button ghost save-food-card" type="button" data-food-id="${escapeHtml(food.id)}">Add to list</button>
    </article>
  `).join("");

  catalog.querySelectorAll(".save-food-card").forEach((button) => {
    button.addEventListener("click", () => {
      const food = foods.find((entry) => entry.id === button.dataset.foodId);
      if (!food) return;
      saveItem({ type: "Food", id: food.id, name: food.name, image: food.image, note: food.note });
      button.textContent = "Added";
    });
  });
}

function renderRecipes() {
  document.querySelectorAll(".save-recipe").forEach((button) => {
    button.addEventListener("click", () => {
      const recipe = recipes.find((entry) => entry.id === button.dataset.recipe);
      if (!recipe) return;
      saveItem({
        type: "Recipe",
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        note: recipe.note,
      });
      button.textContent = "Added";
      const savedNote = document.querySelector("#recipe-saved-note");
      if (savedNote) savedNote.textContent = `${recipe.name} added to your recipe list.`;
    });
  });
}

function renderSupplements() {
  const table = document.querySelector("#supplement-catalog-table");
  const tabs = document.querySelectorAll(".tab-button");
  const filters = document.querySelectorAll("[data-catalog-filter]");
  let activeTab = "ingredients";
  let activeFilter = "all";
  let catalog = { supplements: [], products: [] };
  const expandedProducts = new Set();
  let highlightedSupplementId = "";
  let highlightedProductId = "";

  const referenceSources = {
    "vitamin-c": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/" },
    "magnesium": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/" },
    "creatine-monohydrate": { label: "ISSN", url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0173-z" },
    "omega-3": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/" },
    "epa": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/" },
    "dha": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/" },
    "vitamin-d3": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/" },
    "vitamin-e": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/" },
    "vitamin-k1": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/" },
    "vitamin-k2-mk4": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/" },
    "vitamin-k2-mk7": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/" },
    "thiamin": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Thiamin-HealthProfessional/" },
    "riboflavin": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Riboflavin-HealthProfessional/" },
    "niacin": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Niacin-HealthProfessional/" },
    "vitamin-b6": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminB6-HealthProfessional/" },
    "folate": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/" },
    "vitamin-b12": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/" },
    "biotin": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/" },
    "pantothenic-acid": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/PantothenicAcid-HealthProfessional/" },
    "calcium": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/" },
    "iodine": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Iodine-HealthProfessional/" },
    "zinc": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/" },
    "selenium": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/" },
    "manganese": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Manganese-HealthProfessional/" },
    "curcumin": { label: "NCCIH", url: "https://www.nccih.nih.gov/health/turmeric/ataglance.htm" },
    "ginger-extract": { label: "NCCIH", url: "https://www.nccih.nih.gov/health/ginger" },
    "ashwagandha": { label: "NCCIH", url: "https://www.nccih.nih.gov/health/ashwagandha" },
    "rhodiola-rosea": { label: "NCCIH", url: "https://www.nccih.nih.gov/health/rhodiola" },
  };

  const defaultReferenceSource = {
    label: "FDA DV",
    url: "https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels",
  };

  const officialSourceUrls = {
    "website-longevity-mix": "https://blueprint.bryanjohnson.com/products/longevity-blend-multinutrient-drink-mix-blood-orange-flavor",
    "website-essential-capsules": "https://blueprint.bryanjohnson.com/products/essentials-capsules",
    "website-omega-3": "https://blueprint.bryanjohnson.com/products/omega-3",
    "website-collagen": "https://blueprint.bryanjohnson.com/products/collagen",
    "website-nac-ginger-curcumin": "https://blueprint.bryanjohnson.com/products/nac-ginger-capsules",
    "website-ashwagandha-rhodiola": "https://blueprint.bryanjohnson.com/products/ashwagandha-rhodiola-120mg",
    "website-advanced-antioxidants": "https://blueprint.bryanjohnson.com/products/advanced-antioxidants",
  };

  function formatCategories(categories) {
    return (categories || []).map((category) => `<span class="tag">${escapeHtml(category)}</span>`).join("");
  }

  function formatAmount(amount) {
    if (!amount) return "Needs review";
    const values = [amount.min, amount.medium, amount.max].filter((value) => value !== null && value !== undefined);
    if (values.length === 0) return "Needs review";
    const uniqueValues = [...new Set(values)];
    let numberText = uniqueValues[0];
    if (uniqueValues.length > 1) {
      if (amount.min === null || amount.min === undefined) numberText = `Up to ${amount.max}`;
      else if (amount.max === null || amount.max === undefined) numberText = `${amount.min}+`;
      else numberText = `${amount.min}-${amount.max}`;
    }
    return `${numberText} ${amount.unit || ""}`.trim();
  }

  function sourceById(sourceId) {
    const source = catalog.sources?.find((entry) => entry.id === sourceId);
    if (!source?.url) return null;
    return source;
  }

  function blueprintSourcesForSupplement(supplementId) {
    const sources = [];
    catalog.products.forEach((product) => {
      (product.ingredients || [])
        .filter((ingredient) => ingredient.supplementId === supplementId)
        .forEach((ingredient) => {
          (ingredient.sourceIds || []).forEach((sourceId) => {
            const source = sourceById(sourceId);
            const sourceUrl = source?.url || officialSourceUrls[sourceId];
            if (sourceUrl) {
              sources.push({
                label: product.provider.includes("Blueprint") ? "Blueprint" : product.provider,
                url: sourceUrl,
                amount: ingredient.amount === null ? "" : `${ingredient.amount} ${ingredient.unit}`,
                product: product.name,
              });
            }
          });
        });
    });
    return sources;
  }

  function amountSources(supplement) {
    const blueprintSources = blueprintSourcesForSupplement(supplement.id);
    const reference = referenceSources[supplement.id] || defaultReferenceSource;
    const uniqueBlueprintSources = [];
    const seen = new Set();
    blueprintSources.forEach((source) => {
      const key = `${source.url}-${source.amount}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueBlueprintSources.push(source);
      }
    });
    return [...uniqueBlueprintSources.slice(0, 2), reference];
  }

  function amountWithSources(supplement) {
    const amountText = formatAmount(supplement.recommendedDailyAmount);
    const sources = amountSources(supplement);
    const sourceLinks = sources.map((source) => {
      const prefix = source.amount ? `${source.label}: ${source.amount}` : source.label;
      return `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(prefix)}</a>`;
    }).join("");
    const basis = supplement.recommendedDailyAmount?.basis || "Informational amount; not medical advice.";

    return `
      <div class="amount-source-cell">
        <div class="amount-main">
          <strong>${escapeHtml(amountText)}</strong>
          <button class="amount-info" type="button" title="${escapeHtml(basis)}" aria-label="${escapeHtml(basis)}">i</button>
        </div>
        <div class="amount-sources" aria-label="Amount sources">${sourceLinks}</div>
      </div>
    `;
  }

  function productIngredientItems(product) {
    return (product.ingredients || []).map((ingredient) => {
      const supplement = catalog.supplements.find((entry) => entry.id === ingredient.supplementId);
      const name = supplement?.name || ingredient.supplementId;
      const amount = ingredient.amount === null ? "needs review" : `${ingredient.amount} ${ingredient.unit}`;
      return { ...ingredient, name, amount };
    });
  }

  function productIngredientList(product) {
    const ingredients = productIngredientItems(product);
    const expanded = expandedProducts.has(product.id);
    const visibleIngredients = expanded ? ingredients : ingredients.slice(0, 3);
    const hiddenCount = Math.max(ingredients.length - visibleIngredients.length, 0);

    return `
      <div class="ingredient-link-list" data-product-ingredients="${escapeHtml(product.id)}">
        ${visibleIngredients.map((ingredient) => `
          <button class="ingredient-entity-link" type="button" data-supplement-id="${escapeHtml(ingredient.supplementId)}">
            <span>${escapeHtml(ingredient.name)}</span>
            <small>${escapeHtml(ingredient.amount)}</small>
          </button>
        `).join("")}
        ${hiddenCount > 0 ? `
          <button class="ingredient-show-more" type="button" data-expand-product="${escapeHtml(product.id)}">
            Show more
          </button>
        ` : ""}
      </div>
    `;
  }

  function productsForSupplement(supplementId) {
    return catalog.products
      .filter((product) => (product.contains || []).includes(supplementId))
      .map((product) => product.name)
      .join(", ") || "Not in current products";
  }

  function matchesFilter(entry) {
    if (activeFilter === "all") return true;
    if (activeFilter === "needs review") return entry.sourceStatus === "needs_review" || entry.categories.includes("needs review");
    return entry.categories.includes(activeFilter);
  }

  function renderProducts() {
    const products = catalog.products.filter(matchesFilter);
    table.innerHTML = `
      <thead>
        <tr>
          <th>Supplement Kit</th>
          <th>Provider</th>
          <th>Purpose</th>
          <th>Categories</th>
          <th>Key ingredients</th>
          <th>Add to list</th>
        </tr>
      </thead>
      <tbody>
        ${products.map((product) => `
          <tr id="product-${escapeHtml(product.id)}" class="${product.id === highlightedProductId ? "row-highlight" : ""}">
            <td><strong>${escapeHtml(product.name)}</strong><span>${escapeHtml(product.productType)}</span></td>
            <td>${escapeHtml(product.provider)}</td>
            <td>${escapeHtml(product.purpose)}</td>
            <td><div class="tag-row">${formatCategories(product.categories)}</div></td>
            <td>${productIngredientList(product)}</td>
            <td><button class="button ghost table-action save-catalog-item" type="button" data-kind="Supplement Product" data-id="${escapeHtml(product.id)}">Add</button></td>
          </tr>
        `).join("") || `<tr><td colspan="6">No products match this filter.</td></tr>`}
      </tbody>
    `;
  }

  function renderIngredients() {
    const ingredients = catalog.supplements.filter(matchesFilter);
    table.innerHTML = `
      <thead>
        <tr>
          <th>Supplement</th>
          <th>Purpose</th>
          <th>Recommended daily amount</th>
          <th>Included in products</th>
        </tr>
      </thead>
      <tbody>
        ${ingredients.map((supplement) => `
          <tr id="supplement-${escapeHtml(supplement.id)}" class="${supplement.id === highlightedSupplementId ? "row-highlight" : ""}">
            <td><strong>${escapeHtml(supplement.name)}</strong><span>${escapeHtml((supplement.aliases || []).join(", "))}</span></td>
            <td>${escapeHtml(supplement.purpose)}</td>
            <td>${amountWithSources(supplement)}</td>
            <td>${escapeHtml(productsForSupplement(supplement.id))}</td>
          </tr>
        `).join("") || `<tr><td colspan="4">No supplements match this filter.</td></tr>`}
      </tbody>
    `;
  }

  function bindSaveButtons() {
    document.querySelectorAll(".save-catalog-item").forEach((button) => {
      button.addEventListener("click", () => {
        const product = catalog.products.find((entry) => entry.id === button.dataset.id);
        if (!product) return;
        saveItem({
          type: button.dataset.kind,
          id: product.id,
          name: product.name,
          image: product.image,
          note: product.purpose,
        });
        button.textContent = "Added";
      });
    });
  }

  function setActiveTab(nextTab) {
    activeTab = nextTab;
    tabs.forEach((entry) => {
      const selected = entry.dataset.tab === nextTab;
      entry.classList.toggle("active", selected);
      entry.setAttribute("aria-selected", selected ? "true" : "false");
    });
  }

  function setActiveFilter(nextFilter) {
    activeFilter = nextFilter;
    filters.forEach((entry) => entry.classList.toggle("active", entry.dataset.catalogFilter === nextFilter));
  }

  function bindIngredientLinks() {
    document.querySelectorAll(".ingredient-entity-link").forEach((button) => {
      button.addEventListener("click", () => {
        highlightedSupplementId = button.dataset.supplementId || "";
        setActiveTab("ingredients");
        setActiveFilter("all");
        render();
        document.getElementById(`supplement-${highlightedSupplementId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });

    document.querySelectorAll("[data-expand-product]").forEach((button) => {
      button.addEventListener("click", () => {
        expandedProducts.add(button.dataset.expandProduct);
        render();
      });
    });
  }

  function openProduct(productId) {
    highlightedProductId = productId;
    highlightedSupplementId = "";
    setActiveTab("products");
    setActiveFilter("all");
    render();
    document.getElementById(`product-${productId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function render() {
    if (activeTab === "products") renderProducts();
    if (activeTab === "ingredients") renderIngredients();
    bindSaveButtons();
    bindIngredientLinks();
  }

  async function fetchCatalog() {
    async function fetchSeedCatalog() {
      const seedResponse = await fetch("data/supplement-catalog.seed.json", { headers: { accept: "application/json" } });
      if (!seedResponse.ok) throw new Error("Local catalog seed could not be loaded.");
      return seedResponse.json();
    }

    async function fetchSeedSources() {
      try {
        const seed = await fetchSeedCatalog();
        return seed.sources || [];
      } catch (error) {
        console.warn("Catalog source metadata could not be loaded.", error);
        return [];
      }
    }

    if (catalogApiUrl) {
      try {
        const [supplementsResponse, productsResponse] = await Promise.all([
          fetch(`${catalogApiUrl}/supplements`, { headers: { accept: "application/json" } }),
          fetch(`${catalogApiUrl}/products`, { headers: { accept: "application/json" } }),
        ]);
        if (!supplementsResponse.ok || !productsResponse.ok) throw new Error("Catalog API returned an error.");
        const [supplementsPayload, productsPayload] = await Promise.all([supplementsResponse.json(), productsResponse.json()]);
        return {
          supplements: supplementsPayload.supplements || [],
          products: productsPayload.products || [],
          sources: await fetchSeedSources(),
        };
      } catch (error) {
        console.warn("Catalog API failed; loading local seed fallback.", error);
      }
    }

    const seed = await fetchSeedCatalog();
    return { supplements: seed.supplements || [], products: seed.supplementProducts || [], sources: seed.sources || [] };
  }

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab);
      render();
    });
  });

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      highlightedSupplementId = "";
      highlightedProductId = "";
      setActiveFilter(button.dataset.catalogFilter);
      render();
    });
  });

  document.querySelectorAll("[data-protocol-product]").forEach((button) => {
    button.addEventListener("click", () => {
      openProduct(button.dataset.protocolProduct);
    });
  });

  fetchCatalog()
    .then((loadedCatalog) => {
      catalog = loadedCatalog;
      render();
    })
    .catch((error) => {
      console.error(error);
      table.innerHTML = `<tbody><tr><td>Catalog could not be loaded.</td></tr></tbody>`;
    });
}

function renderSavedList() {
  const target = document.querySelector("#saved-list");
  const intro = document.querySelector("#saved-list-intro");
  const tabs = document.querySelectorAll("[data-list-tab]");
  let activeTab = "foods";
  if (intro) intro.textContent = authStatusText();

  function listGroups(list) {
    return {
      foods: list.filter((item) => item.type === "Food"),
      supplements: list.filter((item) => item.type === "Supplement" || item.type === "Supplement Product"),
      recipes: list.filter((item) => item.type === "Recipe"),
    };
  }

  function foodDetails(item) {
    return foods.find((food) => food.id === item.id) || {};
  }

  function recipeDetails(item) {
    return recipes.find((recipe) => recipe.id === item.id) || {};
  }

  function formatTags(values) {
    return (values || []).map((value) => `<span class="tag">${escapeHtml(value)}</span>`).join("");
  }

  function updateCounts(groups) {
    Object.entries(groups).forEach(([key, items]) => {
      document.querySelectorAll(`[data-list-count="${key}"]`).forEach((target) => {
        target.textContent = items.length;
      });
    });
  }

  function emptyRow(label) {
    return `<tbody><tr><td colspan="5" class="empty-table-cell">No saved ${label} yet.</td></tr></tbody>`;
  }

  function renderFoodTable(items) {
    if (items.length === 0) return emptyRow("foods");
    return `
      <thead>
        <tr>
          <th>Food</th>
          <th>Categories</th>
          <th>Benefits</th>
          <th>Note</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => {
          const detail = foodDetails(item);
          return `
            <tr>
              <td><div class="list-item-cell"><img src="${escapeHtml(item.image)}" alt=""><div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.id)}</span></div></div></td>
              <td><div class="tag-row">${formatTags(detail.categories)}</div></td>
              <td>${escapeHtml((detail.benefits || []).join(", ") || "Saved food")}</td>
              <td>${escapeHtml(item.note)}</td>
              <td>${authState.authenticated ? "LuminaOS sync" : "Browser list"}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;
  }

  function renderSupplementTable(items) {
    if (items.length === 0) return emptyRow("supplements");
    return `
      <thead>
        <tr>
          <th>Supplement product</th>
          <th>Type</th>
          <th>Purpose</th>
          <th>List note</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => `
          <tr>
            <td><div class="list-item-cell"><img src="${escapeHtml(item.image)}" alt=""><div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.id)}</span></div></div></td>
            <td>${escapeHtml(item.type)}</td>
            <td>${escapeHtml(item.note || "Saved supplement")}</td>
            <td>${escapeHtml(item.note)}</td>
            <td>${authState.authenticated ? "LuminaOS sync" : "Browser list"}</td>
          </tr>
        `).join("")}
      </tbody>
    `;
  }

  function renderRecipeTable(items) {
    if (items.length === 0) return emptyRow("recipes");
    return `
      <thead>
        <tr>
          <th>Recipe</th>
          <th>Components</th>
          <th>Focus</th>
          <th>Note</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => {
          const detail = recipeDetails(item);
          return `
            <tr>
              <td><div class="list-item-cell"><img src="${escapeHtml(item.image)}" alt=""><div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.id)}</span></div></div></td>
              <td>${escapeHtml((detail.components || []).join(", ") || "Saved recipe")}</td>
              <td><div class="tag-row">${formatTags(detail.focus)}</div></td>
              <td>${escapeHtml(item.note)}</td>
              <td>${authState.authenticated ? "LuminaOS sync" : "Browser list"}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;
  }

  function render(list) {
    const groups = listGroups(list);
    updateCounts(groups);

    if (activeTab === "foods") target.innerHTML = renderFoodTable(groups.foods);
    if (activeTab === "supplements") target.innerHTML = renderSupplementTable(groups.supplements);
    if (activeTab === "recipes") target.innerHTML = renderRecipeTable(groups.recipes);
  }

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.listTab;
      tabs.forEach((entry) => {
        entry.classList.toggle("active", entry === button);
        entry.setAttribute("aria-selected", entry === button ? "true" : "false");
      });
      render(visibleList());
    });
  });

  render(visibleList());
  renderAuthControls();

  const remoteLoad = authReady
    .then(() => mergeLocalListIntoAccount().catch((error) => {
      console.warn("LuminaOS list merge failed; local list still works.", error);
    }))
    .then(fetchRemoteList);

  remoteLoad
    .then((remoteList) => {
      if (remoteList.length === 0) return;
      setVisibleList(remoteList);
      render(remoteList);
      if (intro) intro.textContent = authStatusText();
    })
    .catch((error) => {
      console.warn("Remote list load failed; showing local list.", error);
    });
}

const authReady = loadAuthSession().then(() => {
  renderAuthControls();
  return authState;
});

if (page === "home") renderHome();
if (page === "foods") renderFoods();
if (page === "recipes") renderRecipes();
if (page === "supplements") renderSupplements();
if (page === "lists") renderSavedList();
if (page === "luminaos") authReady.then(renderAuthControls);
