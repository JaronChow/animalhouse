const {
  client,
  // declare your model imports here
  // for example, User
  createUser,
  createAnimal,
  createOrderItem,
  createOrder,
  createCategory,
  createShippingInfo,
  getAllOrderItemsByCustomerId,
  getAllCustomerOrdersByCustomerId,
  attachAnimalsToOrderItems
} = require("./");
const { getUserById } = require("./models/users");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS shipping cascade;
    DROP TABLE IF EXISTS order_items cascade;
    DROP TABLE IF EXISTS customer_orders cascade;
    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS animals cascade;
    DROP TABLE IF EXISTS animal_categories;
    `);

    // build tables in correct order
    await client.query(`

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      role VARCHAR (10) NOT NULL,
      firstname VARCHAR (255) NOT NULL,
      lastname VARCHAR (255) NOT NULL,      
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL,
      phone_number VARCHAR(10) NOT NULL,
      email_address VARCHAR(255) UNIQUE NOT NULL,
      address VARCHAR(32),
      city VARCHAR(20),
      state VARCHAR(2),
      zipcode INTEGER
    );
    CREATE TABLE animal_categories( 
      id SERIAL PRIMARY KEY,
      category_name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE animals(
      id SERIAL PRIMARY KEY,
      breed_name VARCHAR(255) UNIQUE NOT NULL,
      image_url VARCHAR(255),
      "categoryId" INTEGER REFERENCES animal_categories(id),
      gender VARCHAR(6) NOT NULL,
      description TEXT NOT NULL,
      male_inventory INTEGER,
      female_inventory INTEGER,
      price NUMERIC(10,2) NOT NULL,
      quantity INTEGER NOT NULL
    );
    CREATE TABLE customer_orders(
      id SERIAL PRIMARY KEY, 
      "customerId" INTEGER REFERENCES users(id),
      total_item_amount NUMERIC(10,2) NOT NULL,
      shipping_fee NUMERIC(5,2) NOT NULL,
      order_total_amount NUMERIC(10,2) NOT NULL,
      order_date DATE NOT NULL,
      order_status VARCHAR (25) NOT NULL
    );
    CREATE TABLE order_items(
      id SERIAL PRIMARY KEY, 
      "animalId" INTEGER REFERENCES animals(id),
      "customerId" INTEGER REFERENCES users(id),
      "orderId" INTEGER REFERENCES customer_orders(id)
    );
    CREATE TABLE shipping(
      id SERIAL PRIMARY KEY,
      "customerId" INTEGER REFERENCES users(id),
      address VARCHAR(32),
      city VARCHAR(20),
      state VARCHAR(2),
      zipcode INTEGER
    );
 `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... }

    const initialUsersToCreate = [
      {
        role: "admin",
        firstname: "Michael",
        lastname: "Pas",
        username: "michael",
        password: "iampass1",
        phone_number: "7273830367",
        email_address: "michaelpass@gmail.com",
        address: "735 Dodecanese Blvd",
        city: "Tarpon Springs,",
        state: "FL",
        zipcode: 34689
      },
      {
        role: "customer",
        firstname: "Smitten",
        lastname: "Staff",
        username: "smittenicecream",
        password: "2to11business",
        phone_number: "4085085460",
        email_address: "smittenstaff@164.com",
        address: "3055 Olin Ave #1055",
        city: "San Jose,",
        state: "CA",
        zipcode: 95128
      },
      {
        role: "customer",
        firstname: "Seung-wan",
        lastname: "Shon",
        username: "todayis_wendy",
        password: "redvelvetmember",
        phone_number: "4089233502",
        email_address: "wendys@gmail.com",
        address: "5535 Auto Mall Pkwy",
        city: "Fremont,",
        state: "CA",
        zipcode: 94538
      },
    ];
    const users = await Promise.all(
      initialUsersToCreate.map((user) => createUser(user))
    );
    console.log(users);
    console.log("Finished creating users!");
    console.log("Starting to create animal categories...");

    const animalCategoryToCreate = [
      {
        category_name: "Dogs"
      },
      {
        category_name: "Cats"
      },
      {
        category_name: "Rabbits"
      },
      {
        category_name: "Horses"
      },
      {
        category_name: "Birds"
      },
      {
        category_name: "Fish"
      },
      {
        category_name: "Lizards"
      },
      {
        category_name: "Snakes"
      },
      {
        category_name: "Turtles"
      },
      {
        category_name: "Exotic Animals"
      },
    ];
    const category_name = await Promise.all(
      animalCategoryToCreate.map((category) => createCategory(category))
    );
    console.log(category_name);

    console.log("Finished creating animal categories!");
    console.log("Starting to create animals...");

    const animalsToCreate = [
      {
        breed_name: "Siberian Husky",
        image_url:
          "https://images.pexels.com/photos/2853422/pexels-photo-2853422.jpeg?auto=compress&cs=tinysrgb&w=800",
        categoryId: 1,
        description: "Siberian Husky, a thickly coated, compact sled dog of medium size and great endurance, was developed to work in packs, pulling light loads at moderate speeds over vast frozen expanses. Sibes are friendly, fastidious, and dignified.",
        gender: "male",
        male_inventory: 10,
        female_inventory: 8,
        quantity:1,
        price: 2000
      },
      {
        breed_name: "German Shepherd",
        image_url:
          "https://images.pexels.com/photos/3709026/pexels-photo-3709026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        categoryId: 1,
        description:
          "Generally considered dogkind's finest all-purpose worker, the German Shepherd Dog is a large, agile, muscular dog of noble character and high intelligence. Loyal, confident, courageous, and steady, the German Shepherd is truly a dog lover's delight.",
        gender: "male",
        male_inventory: 1,
        female_inventory: 4,
        quantity:1,
        price: 1500
      },
      {
        breed_name: "French Bulldog",
        image_url:
          "https://images.pexels.com/photos/4452259/pexels-photo-4452259.jpeg?auto=compress&cs=tinysrgb&w=800",
        categoryId: 1,
        description:
          "The French Bulldog resembles a Bulldog in miniature, except for the large, erect 'bat ears' that are the breed's trademark feature. The head is large and square, with heavy wrinkles rolled above the extremely short nose. The body beneath the smooth, brilliant coat is compact and muscular.",
        gender: "male",
        male_inventory: 5,
        female_inventory: 5,
        quantity:0,
        price: 2500
      },
      {
        breed_name: "Shiba Inu",
        image_url:
          "https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg?auto=compress&cs=tinysrgb&w=800",
        categoryId: 1,
        description:
          "An ancient Japanese breed, the Shiba Inu is a little but well-muscled dog once employed as a hunter. Today, the spirited, good-natured Shiba is the most popular companion dog in Japan. The adaptable Shiba is at home in town or country.",
        gender: "male",
        male_inventory: 7,
        female_inventory: 2,
        quantity:0,
        price: 2000
      },
      {
        breed_name: "Dachshund",
        image_url:
          "https://images.pexels.com/photos/1975516/pexels-photo-1975516.jpeg?auto=compress&cs=tinysrgb&w=800",
        categoryId: 1,
        description:
          "The famously long, low silhouette, ever-alert expression, and bold, vivacious personality of the Dachshund have made him a superstar of the canine kingdom. Dachshunds come in two sizes and in three coat types of various colors and patterns. The word 'icon' is terribly overworked, but the Dachshund with his unmistakable long-backed body, little legs, and big personality is truly an icon of purebred dogdom.",
        gender: "male",
        male_inventory: 3,
        female_inventory: 4,
        quantity:0,
        price: 1000
      },
      {
        breed_name: "British Shorthair",
        image_url:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/59164749/1/?bust=1671099259&width=720",
        categoryId: 2,
        description:
          "The British Shorthair is a compact, well-balanced, and powerful cat, with a short, very dense coat. They often convey an overall impression of balance and proportion in which no feature is exaggerated.",
        gender: "female",
        male_inventory: 20,
        female_inventory: 30,
        quantity:0,
        price: 1000
      },
      {
        breed_name: "Siamese",
        image_url:
          "https://images.pexels.com/photos/11049668/pexels-photo-11049668.jpeg?auto=compress&cs=tinysrgb&w=800",
        categoryId: 2,
        description:
          "The Siamese cat is not only beautiful, but also she is highly intelligent. She can be trained to walk on a lead. This intelligence does not mean, however, that she can be trained to do everything you might wish. Like most other highly intelligent breeds, the Siamese has her own desires.",
        gender: "female",
        male_inventory: 2,
        female_inventory: 5,
        quantity:1,
        price: 1500
      },
      {
        breed_name: "Persian",
        image_url:
          "https://images.pexels.com/photos/7082278/pexels-photo-7082278.jpeg?auto=compress&cs=tinysrgb&w=800",
        categoryId: 2,
        description:
          "The Persian is a placid cat that exhibits bursts of kitten-like activity. She will be sleeping in the sun when she suddenly explodes, running around the room and rolling around. The Persian will stretch out next to you, sleep in your bed, and sit on your lap when she is in the mood. She does not mind changes in routine and is generally friendly with anyone and everyone.",
        gender: "female",
        male_inventory: 5,
        female_inventory: 1,
        quantity:1,
        price: 1750
      },
      {
        breed_name: "Sphynx",
        image_url:
          "https://images.pexels.com/photos/3472158/pexels-photo-3472158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        categoryId: 2,
        description:
          "The sphynx cat is an energetic, acrobatic performer who loves to show off for attention. She has an unexpected sense of humor that is often at odds with her dour expression. Friendly and loving, this is a loyal breed who will follow you around the house and try to involve herself in whatever you're doing, grabbing any opportunity to perch on your shoulder or curl up in your lap. As curious and intelligent as she is energetic, these traits can make her a bit of a handful. For her own safety, the sphynx does best as an exclusively indoor cat, and generally gets along well with children other pets.",
        gender: "male",
        male_inventory: 2,
        female_inventory: 8,
        quantity:1,
        price: 2000
      },
      {
        breed_name: "Maine Coon",
        image_url:
          "https://images.pexels.com/photos/9751991/pexels-photo-9751991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        categoryId: 2,
        description:
          "Despite her size and history, the Maine Coon cat is sweet tempered and gentle. She loves her parents and adapts to any environment as long as she has some exercise room. When she runs, she can be quite loud but her soft, quiet voice reassures you that this lion is truly a lamb.",
        gender: "male",
        male_inventory: 3,
        female_inventory: 3,
        quantity:1,
        price: 2250
      },
      {
        breed_name: "Angora",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/8/88/Fluffy_white_bunny_rabbit.jpg",
        categoryId: 3,
        description:
          "Angoras are intelligent, gentle rabbits who love to play, especially with cat toys. Although they like to snuggle up to their handlers, they dislike being picked up and can become aggressive when frightened. Extra care must be taken when handling them as their spines are easily damaged.",
        gender: "male",
        male_inventory: 15,
        female_inventory: 8,
        quantity:1,
        price: 500
      },
      {
        breed_name: "Netherland Dwarf",
        image_url:
          "https://petkeen.com/wp-content/uploads/2020/10/Brown-Netherland-dwarf-rabbit_RATT_ANARACH_Shutterstock.jpg",
        categoryId: 3,
        description:
          "Netherland Dwarf rabbits are a true dwarf breed, which means they carry the dwarf gene. They have a compact body, large head, short face, short ears, and large eyes. It's a distinctive look, especially the short, upright ears on the large head.",
        gender: "male",
        male_inventory: 8,
        female_inventory: 4,
        quantity:1,
        price: 200
      },
      {
        breed_name: "English Lop",
        image_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzMeuWIVyyx5a9ZWWI0NJ-1Ld3p08ZwxRskA&usqp=CAU",
        categoryId: 3,
        description:
          "A breed who's known for its large size, droopy ears and docile personality. Known as the King of the Fancy, the English Lop Rabbit is one of the oldest domestic breeds. Due to their long, droopy ears, they've been popular in rabbit shows for centuries, despite the introduction of newer, smaller breeds.",
        gender: "male",
        male_inventory: 3,
        female_inventory: 6,
        quantity:1,
        price: 800
      },
      {
        breed_name: "Arabian",
        image_url:
          "https://equineworld.co.uk/images/arab-horse.jpg",
        categoryId: 4,
        description:
          "The Arabian horse has contributed its qualities to most of the modern breeds of light horses. The Arabian breed is a compact, relatively small horse with a small head, protruding eyes, wide nostrils, marked withers, and a short back.",
        gender: "male",
        male_inventory: 2,
        female_inventory: 3,
        quantity:1,
        price: 10000
      },
      {
        breed_name: "Friesian",
        image_url:
          "https://s3-eu-west-1.amazonaws.com/fei-fan-production/s3fs-public/120320-friesian-2.jpg",
        categoryId: 4,
        description:
          "The Friesian breed originated in Friesland, a province in the Netherlands, where they served as medieval war horses and work horses. Famous for its luxurious mane, tail, and forelock, the Friesian has an expressive face, high-set neck, and powerful legs and hindquarters.",
        gender: "male",
        male_inventory: 5,
        female_inventory: 1,
        quantity:1,
        price: 12500
      },
      {
        breed_name: "Mustang",
        image_url:
          "https://breeds.okstate.edu/horses/site-files/images/mustang-horse/mustang4.jpg",
        categoryId: 4,
        description:
          "The mustang is known for being very hardy and surefooted, thanks to its wild heritage. These qualities make mustangs ideal as working horses and trail horses, since they can navigate terrain that other breeds might struggle with.",
        gender: "male",
        male_inventory: 1,
        female_inventory: 2,
        quantity:1,
        price: 12500
      },
      {
        breed_name: "Dutch Warmblood",
        image_url:
          "https://www.horsebreedspictures.com/wp-content/uploads/2015/08/Dutch-Warmblood-Images.jpg",
        categoryId: 4,
        description:
          "The Dutch Warmblood is a middleweight sports horse that's well-known in the competitive sphere. Champions in show jumping, dressage and even carriage driving, this is a highly versatile and athletic breed with an even temperament and kind nature.",
        gender: "male",
        male_inventory: 3,
        female_inventory: 3,
        quantity:1,
        price: 15000
      },
      {
        breed_name: "Parakeets",
        image_url:
          "https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Parakeet.jpg",
        categoryId: 5,
        description:
          "The Parakeet is often thought of as a “beginner bird,” however, this social, outgoing little bird deserves just as much care and attention as larger parrots. Parakeets are playful, love food and they can rival any parrot in terms of talking ability.",
        gender: "male",
        male_inventory: 15,
        female_inventory: 15,
        quantity:1,
        price: 35
      },
      {
        breed_name: "Cockatiels",
        image_url:
          "https://facts.net/wp-content/uploads/2021/04/Adult-male-cockatiel.jpg",
        categoryId: 5,
        description:
          "The Cockatiel is an unusual member of the cockatoo family. It is small in size, and has a slender body and long pointed tail, which is more characteristic of the smaller parrots. Its plumage is mostly grey, paler below, with a white wing patch, orange cheeks and a distinctive pointed crest.",
        gender: "male",
        male_inventory: 7,
        female_inventory: 6,
        quantity:1,
        price: 50
      },
      {
        breed_name: "Lovebirds",
        image_url:
          "https://petkeen.com/wp-content/uploads/2021/02/Lovebird-parrots-sitting-together_BravissimoS_Shutterstock.jpg",
        categoryId: 5,
        description:
          "Lovebirds are a small type of parrot that are green in the wild but have many color mutations in varieties that are bred as pets. They have a long, hooked beak and a short, blunt tail. Lovebirds get their name from their tendency to form monogamous bonds that can last their entire lifetime.",
        gender: "male",
        male_inventory: 21,
        female_inventory: 14,
        quantity:1,
        price: 40
      },
      {
        breed_name: "African Grey Parrot",
        image_url:
          "https://lafeber.com/pet-birds/wp-content/uploads/2013/06/African-Grey.jpg",
        categoryId: 5,
        description:
          "The African grey parrot is one of the most talented talking/ mimicking birds on the planet, giving it quite a reputation among bird enthusiasts. Not only do bird keepers love this intelligent bird, it is one of the most recognizable species to bird novices as well — everyone knows the African grey parrot.",
        gender: "male",
        male_inventory: 5,
        female_inventory: 11,
        quantity:1,
        price: 95
      },
      {
        breed_name: "Betta",
        image_url:
          "https://storage.googleapis.com/scratchpay-com-assets/images/10%20Popular%20Types%20of%20Pet%20Fish/types_of_pet_fish_betta_opt.jpg",
        categoryId: 6,
        description:
          "Also known as Siamese fighting fish, bettas require separation from most other species, which means these brilliantly colored swimmers do well in small fish bowls. While keeping male bettas separate is imperative, some female bettas can live in tanks with other fish. Bettas are a cold-water species.",
        gender: "male",
        male_inventory: 12,
        female_inventory: 5,
        quantity:1,
        price: 20
      },
      {
        breed_name: "Goldfish",
        image_url:
          "https://storage.googleapis.com/scratchpay-com-assets/images/10%20Popular%20Types%20of%20Pet%20Fish/types_of_pet_fish_goldfish_opt.jpg",
        categoryId: 6,
        description:
          "Another cold-water fish, goldfish belong to the carp family. Because they enjoy cool water temperatures, keep goldfish in a separate tank from warm water fish. Avoid keeping goldfish in a bowl, as they can grow quite long and need sufficient swimming room. Because they do grow so large, don’t overcrowd your goldfish tank. Well-kept goldfish can live for many years.",
        gender: "male",
        male_inventory: 46,
        female_inventory: 37,
        quantity:1,
        price: 5
      },
      {
        breed_name: "Angelfish",
        image_url:
          "https://storage.googleapis.com/scratchpay-com-assets/images/10%20Popular%20Types%20of%20Pet%20Fish/types_of_pet_fish_angelfish_opt.jpg",
        categoryId: 6,
        description:
          "Large, lovely and graceful, angelfish appear in various color patterns. Because of their size when full-grown, angelfish require at least a 55-gallon tank. Angelfish do well with other fish species (although they may eat very small fish) but can fight with each other. Provide plenty of plants in the aquarium, as angelfish like to hide beneath them.",
        gender: "male",
        male_inventory: 10,
        female_inventory: 7,
        quantity:1,
        price: 30
      },
      {
        breed_name: "Guppies",
        image_url:
          "https://storage.googleapis.com/scratchpay-com-assets/images/10%20Popular%20Types%20of%20Pet%20Fish/types_of_pet_fish_guppies-min_opt.jpg",
        categoryId: 6,
        description:
          "These easy-care aquarium fish appear in a variety of colors. There is one drawback to guppies: They breed constantly, so if you have male and females together, the offspring can soon overwhelm a tank. For best results, choose all males or all females.",
        gender: "male",
        male_inventory: 35,
        female_inventory: 30,
        quantity:1,
        price: 20
      },
      {
        breed_name: "Zebra Danios",
        image_url:
          "https://storage.googleapis.com/scratchpay-com-assets/images/10%20Popular%20Types%20of%20Pet%20Fish/types_of_pet_fish_zebra_danio_opt.jpg",
        categoryId: 6,
        description:
          "Named for their striped bodies, zebra danios are tough fish. They can thrive in a variety of water temperatures, even into the low 60s. Unlike many species, zebra danios mate for life. These active fish are perhaps the easiest of the egg-laying species, if you want to breed them. Zebra danios swim all over the tank, and make good community fish due to their peaceful nature.",
        gender: "male",
        male_inventory: 20,
        female_inventory: 20,
        quantity:1,
        price: 35
      },
      {
        breed_name: "Red-Eyed Crocodile Skink",
        image_url:
          "https://www.reptiledirect.com/wp-content/uploads/2020/10/red-eye-crocodile-skink-lizard-climbing.webp",
        categoryId: 7,
        description:
          "Despite their somewhat intimidating appearance, red-eyed crocodile skinks are very shy. They are a docile reptile that will spend most of its time in hiding. Even once it gets comfortable in its new home, do not expect to see a ton of activity throughout the day. As a crepuscular species, they reserve activity for dusk and dawn.",
        gender: "male",
        male_inventory: 2,
        female_inventory: 3,
        quantity:1,
        price: 115
      },
      {
        breed_name: "Bearded Dragon",
        image_url:
          "https://www.reptiledirect.com/wp-content/uploads/2020/10/bearded-dragon-lizard.webp",
        categoryId: 7,
        description:
          "One of the most iconic and best pet lizards to grace the herpetology world, bearded dragons are a joy to raise. These reptiles are quite tame, beginner-friendly and can develop strong relationships with humans. They are always down to play and do not mind being handled once they develop some trust in their caretakers.",
        gender: "male",
        male_inventory: 4,
        female_inventory: 7,
        quantity:1,
        price: 100
      },
      {
        breed_name: "Corn Snake",
        image_url:
          "https://allanspetcenter.com/wp-content/uploads/2020/10/corn-snake-768x628.jpg",
        categoryId: 8,
        description:
          "One number one choice for the best snake pet is the corn snake. Of the bunch, corn snakes are considered the most docile and gentle. They are also known for being easy to handle and easy to feed. They are nocturnal and love to burrow.",
        gender: "male",
        male_inventory: 3,
        female_inventory: 5,
        quantity:1,
        price: 85
      },
      {
        breed_name: "California Kingsnake",
        image_url:
          "https://allanspetcenter.com/wp-content/uploads/2020/10/california-kingsnake-1773047_1280-768x506.jpg",
        categoryId: 8,
        description:
          "Native to western U.S. and northern Mexico, this hardy snake is a subspecies of the king snake, like the milk snake. Also like the milk snake, the California kingsnake can eat one another, so keep them separated. California kingsnakes are mostly known as escape artists; their cages need escape-proof openings. Other than that, they are easy to handle and have basic care requirements.",
        gender: "male",
        male_inventory: 1,
        female_inventory: 3,
        quantity:1,
        price: 80
      },
      {
        breed_name: "Gopher Snake",
        image_url:
          "https://allanspetcenter.com/wp-content/uploads/2020/10/milk-snake-764x430.jpg",
        categoryId: 8,
        description:
          "Gopher snakes can sometimes be confused with rattlesnakes, as they can shake their tails when threatened, but these non-venomous snakes do not have fangs. They love to bask in the sun, so provide a basking lamp. Gopher snakes can live up to 20 years.",
        gender: "male",
        male_inventory: 7,
        female_inventory: 2,
        quantity:1,
        price: 70
      },
      {
        breed_name: "Milk Snake",
        image_url:
          "https://allanspetcenter.com/wp-content/uploads/2020/10/great-basin-gopher-snake-956700_1920-768x512.jpg",
        categoryId: 8,
        description:
          "Native to the U.S. and Mexico, this snake has rings of red, orange, yellow, white and black, which sometimes gets them confused with the venomous coral snake. Like the gopher snake, though, milk snakes are non-venomous and are actually praised for their docile temperament.",
        gender: "male",
        male_inventory: 4,
        female_inventory: 4,
        quantity:1,
        price: 70
      },
      {
        breed_name: "Red-Eared Slider",
        image_url:
          "https://www.thesprucepets.com/thmb/9LtUvXIgC4pBFboPjteDPTSgGio=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-979443084-0adb9494f2dc49e08ce04f28af117be2.jpg",
        categoryId: 9,
        description:
          "Red-eared sliders are one of the most popular of all aquatic turtle species. They tend to be friendlier and more sociable than some of their relatives, they're pretty active, and they're widely available.",
        gender: "male",
        male_inventory: 10,
        female_inventory: 12,
        quantity:1,
        price: 35
      },
      {
        breed_name: "African Sideneck Turtle",
        image_url:
          "https://www.thesprucepets.com/thmb/XCLcNrCF88J-lpE0JAWu_VxfGe4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1094092102-7cd8c6ad71fd4c81ab05d74768f09a37.jpg",
        categoryId: 9,
        description:
          "These unique little aquatic turtles have distinctive long necks that can't be retracted fully into their shell, and their anatomy differs from traditional water-based turtles. Because of their unique appearance and size, they're often a popular choice, but they have more complex care requirements than some other turtles.",
        gender: "male",
        male_inventory: 8,
        female_inventory: 9,
        quantity:1,
        price: 50
      },
      {
        breed_name: "Eastern Box Turtle",
        image_url:
          "https://www.thesprucepets.com/thmb/jMgKAwcPjYBJeWsUXZn_SKuN654=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-986739564-ac1c2e89821b4be08845caa631222249.jpg",
        categoryId: 9,
        description:
          "Eastern box turtles need a lot of space, but they're adaptable and, with the right housing, they can live in or outdoors. They prefer a humid environment, need a shallow pool of water in their enclosure, a moist substrate, and they will need a UVB basking light if they're kept indoors.",
        gender: "male",
        male_inventory: 13,
        female_inventory: 4,
        quantity:1,
        price: 55
      },
      {
        breed_name: "Bengal Tiger",
        image_url:
          "https://animalsafari.com/wp-content/uploads/2022/01/bengal-tiger-1.jpeg",
        categoryId: 10,
        description:
          "The Bengal tiger, also called the Indian tiger or the Royal Bengal tiger is native to the Indian subcontinent. Although it once roamed a much larger area, the Bengal is currently found in India, Bangladesh, Nepal and Bhutan. It is the most well-known breed of tiger and the largest tiger found in the wild. A male Bengal weighs between 397 and 569 pounds. The female is smaller, weighing between 220 and 350 pounds.",
        gender: "male",
        male_inventory: 1,
        female_inventory: 2,
        quantity:1,
        price: 50000
      },
      {
        breed_name: "Kordofan Giraffe",
        image_url:
          "https://animalia-bio.us-east-1.linodeobjects.com/animals/photos/full/1x1/zoo-de-vincennes-paris-france-april-2014-8jpg.webp",
        categoryId: 10,
        description:
          "Kordofan giraffes are found in northern Cameroon, southern Chad, the Central African Republic, and possibly western Sudan. These beautiful animals live in savanna woodlands and brushland with sparse trees.",
        gender: "male",
        male_inventory: 2,
        female_inventory: 2,
        quantity:1,
        price: 40000
      },
      {
        breed_name: "Red Panda",
        image_url:
          "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQJf7shtWhhyHsVcDHolvYP4YTODzJhudkj_ETH6eB3mDsnLNU5LnvH8dbEUtJE4UW0GKD6klPmWQAx4fk",
        categoryId: 10,
        description:
          "The red panda, also known as the lesser panda, is a small mammal native to the eastern Himalayas and southwestern China. It has dense reddish-brown fur with a black belly and legs, white-lined ears, a mostly white muzzle and a ringed tail.",
        gender: "male",
        male_inventory: 3,
        female_inventory: 3,
        quantity:1,
        price: 35000
      },
      {
        breed_name: "Silverback Gorilla",
        image_url:
          "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/msnbc/Components/Photos/060219/060219_CinGorilla_vmed.jpg",
        categoryId: 10,
        description:
          "Silverback gorillas live high in the mountains in two protected parks in Africa. They are also referred to as mountain gorillas. Silverback gorillas continually wander through their home ranges of 10 to 15 square miles, feeding and resting throughout the day.",
        gender: "male",
        male_inventory: 1,
        female_inventory: 1,
        quantity:1,
        price: 80000
      },
      {
        breed_name: "Platypus",
        image_url:
          "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRUulMYcKqSndCjsXfJuxzxbzDvb5HVrCLOYAgUnv0izrWiGS3FpMRWzRYOqU8iL07QeNJUDe9pj1bA5gE",
        categoryId: 10,
        description:
          "The platypus is common in waterways of eastern Australia, where it generally feeds on bottom-dwelling invertebrates but also takes an occasional frog, fish, or insect. This shy creature forages most actively from dusk to dawn, sheltering during the day in burrows dug into stream banks. It is exquisitely adapted for its aquatic lifestyle, having a flattened torpedo-like body, dense waterproof fur, and strong front limbs used for swimming as well as digging.",
        gender: "male",
        male_inventory: 5,
        female_inventory: 2,
        quantity:1,
        price: 12000
      },
      {
        breed_name: "Jaron",
        image_url:
          "https://media.licdn.com/dms/image/D5603AQGs4ce--25wHg/profile-displayphoto-shrink_800_800/0/1676340010866?e=2147483647&v=beta&t=W-SVKH8g9O-8FzbVaTF2YVCfQZ3_AAEDJ19ZwH8NfSI",
        categoryId: 10,
        description:
          "The Jaron is a special breed of human, with only one of these in existence in the world. He often spends most of his time at work, staying long hours and testing fake meats. When provoked he will emit a very high-pitched screech and nasty farts to steer predators away. If the Jaron feels comfortable in your home, he will eventually purchase expensive household objects that will benefit everyone in the household. He is also a great Software Developer. This is a once in a lifetime purchase!",
        gender: "male",
        male_inventory: 1,
        female_inventory: 0,
        quantity:1,
        price: 65000
      },
    ];

    const animals = await Promise.all(
      animalsToCreate.map((animal) => createAnimal(animal))
    );
    console.log(animals);
    console.log("Finished creating animals!");

    console.log("Starting to create inital customer orders");
    const ordersToCreate = [
      {
        customerId: 1,
        total_item_amount: 7000,
        shipping_fee: 100,
        order_total_amount: 7747.5,
        order_date: "2023-02-26",
        order_status: "Pending"
      },
      {
        customerId: 3,
        total_item_amount: 1500.1,
        shipping_fee: 200,
        order_total_amount: 1838.86,
        order_date: "2023-01-01",
        order_status: "Pending"
      },
      {
        customerId: 3,
        total_item_amount: 30,
        shipping_fee: 50,
        order_total_amount: 36.99,
        order_date: "2023-02-25",
        order_status: "Pending"
      },
      {
        customerId: 3,
        total_item_amount: 34,
        shipping_fee: 10,
        order_total_amount: 44.0,
        order_date: "2023-02-25",
        order_status: "Completed"
      }
    ];

    const order = await Promise.all(
      ordersToCreate.map((order) => createOrder(order))
    );
    console.log(order);
    console.log("Finished creating customer order");

    console.log("Starting to create initial order items (add to cart) ");
    const orderItemsToCreate = [
      {
        animalId: 1,
        customerId: 1,
        orderId: 1,
      },
      {
        animalId: 3,
        customerId: 3, 
        orderId: 2,
      },

      {
        animalId: 2,
        customerId: 3, 
        orderId: 3,
      }
    ];
    const orderItems = await Promise.all(
      orderItemsToCreate.map(createOrderItem)
    );
    console.log(orderItems);

    // console.log(await getUserByUsername('michael'));
    // console.log(await getUser('michael',"iampass1"), 'michael')
    // console.log(await attachCustomerToCustomerSales(sales), "customer to customer sale");
    console.log(await attachAnimalsToOrderItems(2,2,1), "animals to order_item");
    // console.log(await getAllOrderItemsByCustomerId(3), "orders added to cart by customerId");
    // console.log(await getUserById(3), 'this is getUserById');
    // const shippingToCreate = [
    //   {
    //     customerId: 1,
    //     address: "1234 Test Ave",
    //     city: "San Jose",
    //     state: "CA",
    //     zipcode: "123456"
    //   },
    //   {
    //     customerId: 2,
    //     address: "4321 Test Blvd",
    //     city: "San Diego",
    //     state: "CA",
    //     zipcode: "654321"
    //   }
    // ];
    // const shippingInfo = await Promise.all(
    //   shippingToCreate.map((shipping) => createShippingInfo(shipping))
    // );
    // console.log(shippingInfo, "Shipping Information Completed");
  } catch (error) {
    console.error (error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
