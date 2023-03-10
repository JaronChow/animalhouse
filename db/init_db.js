const {
  client,
  // declare your model imports here
  // for example, User
  createUser,
  createAnimal,
  createOrderItem,
  createSale,
  createCategory,
  getUser,
  getUserByUsername,
  // attachCustomerToCustomerSales,
  // attachCustomerSaleToOrderItem,
  attachAnimalsToOrderItem,
  getAllorderItemsByCustomerId
} = require("./");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS shipping cascade;
    DROP TABLE IF EXISTS order_items cascade;
    DROP TABLE IF EXISTS customer_orders cascade;
    DROP TABLE IF EXISTS users;
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
      breed_name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255),
      "categoryId" INTEGER REFERENCES animal_categories(id),
      description TEXT NOT NULL,
      inventory_count INTEGER,
      price NUMERIC(10,2) NOT NULL,
      gender TEXT NOT NULL
    );
    CREATE TABLE customer_orders(
      id SERIAL PRIMARY KEY, 
      "customerId" INTEGER REFERENCES users(id),
      total_item_amount NUMERIC(10,2) NOT NULL,
      shipping_fee NUMERIC(5,2) NOT NULL,
      order_total_amount NUMERIC(10,2) NOT NULL,
      order_date DATE NOT NULL,
      order_status VARCHAR (25) NOT NULL,
    );
    CREATE TABLE order_items(
      id SERIAL PRIMARY KEY, 
      "animalId" INTEGER REFERENCES animals(id),
      "customerId" INTEGER REFERENCES users(id),
      "orderId" INTEGER REFERENCES customer_orders(id),
      quantity INTEGER NOT NULL,
      UNIQUE ("animalId", "orderId")
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
    throw error;
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
        zipcode: 34689,
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
        zipcode: 95128,
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
        zipcode: 94538,
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
        category_name: "dog",
      },
      {
        category_name: "cat",
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
          "https://www.akc.org/wp-content/uploads/2017/11/Siberian-Husky-Illo.jpg",
        categoryId: 1,
        description: "Sibes are friendly, fastidious, and dignified.",
        inventory_count: 10,
        price: 2000.2,
        gender: "male",
      },
      {
        breed_name: "German Shepherd",
        image_url:
          "https://www.akc.org/wp-content/uploads/2017/11/German-Shepherd-Dog-Illo-2.jpg",
        categoryId: 1,
        description:
          "Loyal, confident, courageous, and steady, the German Shepherd is truly a dog lover's delight.",
        inventory_count: 2,
        price: 1500,
        gender: "female",
      },
      {
        breed_name: "British Shorthair",
        image_url:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/59164749/1/?bust=1671099259&width=720",
        categoryId: 2,
        description:
          "The British Shorthair is a compact, well-balanced, and powerful cat, with a short, very dense coat. They often convey an overall impression of balance and proportion in which no feature is exaggerated.",
        inventory_count: 50,
        price: 5000,
        gender: "female",
      },
    ];

    const animals = await Promise.all(
      animalsToCreate.map((animal) => createAnimal(animal))
    );
    console.log(animals);

    console.log("Finished creating animals!");
    console.log("Starting to create customer orders");

    console.log("Starting to create inital customer orders");
    const ordersToCreate = [
      {
        customerId: 1,
        animalId: 1,
        total_item_amount: 7000,
        shipping_fee: 100,
        sales_total_amount: 7747.5,
        sales_date: "2023-02-26",
      },
      {
        customerId: 2,
        animalId: 2,
        total_item_amount: 1500.1,
        shipping_fee: 200,
        sales_total_amount: 1838.86,
        sales_date: "2023-01-01",
      },
      {
        customerId: 3,
        animalId: 3,
        total_item_amount: 30,
        shipping_fee: 50,
        sales_total_amount: 36.99,
        sales_date: "2023-02-25",
      },
      {
        customerId: 3,
        animalId: 3,
        total_item_amount: 34,
        shipping_fee: 10,
        sales_total_amount: 44.0,
        sales_date: "2023-02-25",
      },
    ];

    const order = await Promise.all(
      ordersToCreate.map((sale) => createSale(sale))
    );
    console.log(order);
    console.log("Order item created");

    console.log("Finished creating customer order items!");

    console.log("Starting to create order items...");
    const orderItemsToCreate = [
      {
        animalId: 1,
        customerId:1,
        orderId: 1,
        quantity: 1,
      },
      {
        animalId: 3,
        customerId: 2, 
        orderId: 2,
        quantity: 1,
      },

      {
        animalId: 2,
        customerId: 2, 
        orderId: 3,
        quantity: 2,
      },
      {
        animalId: 2,
        customerId: 1,
        orderId: 4,
        quantity: 1,
      },
    ];
    const orderItems = await Promise.all(
      orderItemsToCreate.map(createOrderItem)
    );
    console.log(orderItems);
    console.log("Finished creating sales items!");
    console.log(await getUserByUsername('michael'));
    console.log(await getUser('michael',"iampass1"), 'michael')
    // console.log(await attachCustomerToCustomerSales(sales), "customer to customer sale");
    // console.log(await attachAnimalsToorderItem(orderItems), "animals to sales_items");
    // console.log(await getAllorderItemsByCustomerId(3), "all sales items by customer ");

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
