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
  getAllCustomerOrdersByCustomerId
} = require("./");
const { attachAnimalsToOrderItems } = require("./models/animals");

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
      description TEXT NOT NULL,
      male_inventory INTEGER,
      female_inventory INTEGER,
      price NUMERIC(10,2) NOT NULL
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
      "orderId" INTEGER REFERENCES customer_orders(id),
      quantity INTEGER NOT NULL
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
        category_name: "dog"
      },
      {
        category_name: "cat"
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
        male_inventory: 10,
        female_inventory: 8,
        price: 2000.2
      },
      {
        breed_name: "German Shepherd",
        image_url:
          "https://www.akc.org/wp-content/uploads/2017/11/German-Shepherd-Dog-Illo-2.jpg",
        categoryId: 1,
        description:
          "Loyal, confident, courageous, and steady, the German Shepherd is truly a dog lover's delight.",
        male_inventory: 1,
        female_inventory: 4,
        price: 1500
      },
      {
        breed_name: "British Shorthair",
        image_url:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/59164749/1/?bust=1671099259&width=720",
        categoryId: 2,
        description:
          "The British Shorthair is a compact, well-balanced, and powerful cat, with a short, very dense coat. They often convey an overall impression of balance and proportion in which no feature is exaggerated.",
        male_inventory: 0,
        female_inventory: 30,
        price: 5000
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
        quantity: 1
      },
      {
        animalId: 3,
        customerId: 3, 
        orderId: 2,
        quantity: 1
      },

      {
        animalId: 2,
        customerId: 3, 
        orderId: 3,
        quantity: 2
      }
    ];
    const orderItems = await Promise.all(
      orderItemsToCreate.map(createOrderItem)
    );
    console.log(orderItems);

    // console.log(await getUserByUsername('michael'));
    // console.log(await getUser('michael',"iampass1"), 'michael')
    // console.log(await attachCustomerToCustomerSales(sales), "customer to customer sale");
    console.log(await attachAnimalsToOrderItems(2,2,3,1), "animals to order_item");
    console.log(await getAllOrderItemsByCustomerId(3), "orders added to cart by customerId");
    console.log(await getAllCustomerOrdersByCustomerId(3), "order cart summary by customerId");
    
    const shippingToCreate = [
      {
        customerId: 1,
        address: "1234 Test Ave",
        city: "San Jose",
        state: "CA",
        zipcode: "123456"
      },
      {
        customerId: 2,
        address: "4321 Test Blvd",
        city: "San Diego",
        state: "CA",
        zipcode: "654321"
      }
    ];
    const shippingInfo = await Promise.all(
      shippingToCreate.map((shipping) => createShippingInfo(shipping))
    );
    console.log(shippingInfo, "Shipping Information Completed");
  } catch (error) {
    console.error (error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
