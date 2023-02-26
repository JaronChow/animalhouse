const {
  client,
  // declare your model imports here
  // for example, User
  createAdmin,
  createCustomer,
  createAnimal,
  createSaleItem,
  createSale,
  createCategory
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query (`
    DROP TABLE IF EXISTS sale_items cascade;
    DROP TABLE IF EXISTS customer_sales cascade;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS animals cascade;
    DROP TABLE IF EXISTS animal_categories;
    DROP TABLE IF EXISTS admins;
    `)

    // build tables in correct order
    await client.query(`
    CREATE TABLE admins(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR (255) NOT NULL,
      lastname VARCHAR (255) NOT NULL,      
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL,
      phone_number INTEGER UNIQUE NOT NULL,
      email_address VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE customers(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR (255) NOT NULL,
      lastname VARCHAR (255) NOT NULL,      
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL,
      phone_number VARCHAR(10) UNIQUE NOT NULL,
      email_address VARCHAR(255) UNIQUE NOT NULL,
      address VARCHAR(32) NOT NULL,
      city VARCHAR(20) NOT NULL,
      state VARCHAR(2) NOT NULL,
      zipcode INTEGER NOT NULL
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

    CREATE TABLE customer_sales(
      id SERIAL PRIMARY KEY, 
      "customerId" INTEGER REFERENCES customers(id),
      total_item_amount NUMERIC(10,2) NOT NULL,
      shipping_fee NUMERIC(5,2) NOT NULL,
      sales_total_amount NUMERIC(10,2) NOT NULL,
      sales_date DATE NOT NULL
    );

    CREATE TABLE sale_items(
      id SERIAL PRIMARY KEY, 
      "animalId" INTEGER REFERENCES animals(id),
      "orderId" INTEGER REFERENCES customer_sales(id),
      quantity INTEGER NOT NULL
    );
 `)
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
    // const user1 = await User.createUser({ ...user info goes here... })
    const admin1 = await createAdmin({
      firstname: 'Winnie',
      lastname: 'Liu',
      username: 'winnie66',
      password: '51isTheKey',
      phone_number: '123456789',
      email_address: 'winnieliu@gmail.com'
    });

    const admin2 = await createAdmin({
      firstname: 'Adam',
      lastname: 'Lu',
      username: 'adam77',
      password: '77isTheKey',
      phone_number: '345678912',
      email_address: 'adamluu@gmail.com'
    });

    const admin3 = await createAdmin({
      firstname: 'Jaron',
      lastname: 'Chow',
      username: 'jaronchow',
      password: 'qazwsxedc',
      phone_number: '987654321',
      email_address: 'jaronchow@gmail.com'
    })

    const customer1 = await createCustomer({
      firstname: 'Michael',
      lastname: 'Pas',
      username: 'michael',
      password: 'iampass',
      phone_number: '7273830367',
      email_address: 'michaelpass@gmail.com',
      address: '735 Dodecanese Blvd',
      city: 'Tarpon Springs,',
      state: 'FL',
      zipcode: 34689
    });

    const customer2 = await createCustomer({
      firstname: 'Smitten',
      lastname: 'Staff',
      username: 'smittenicecream',
      password: '2to11business',
      phone_number: '4085085460',
      email_address: 'smittenstaff@164.com',
      address: '3055 Olin Ave #1055',
      city: 'San Jose,',
      state: 'CA',
      zipcode: 95128
    });

    const customer3 = await createCustomer({
      firstname: 'Seung-wan',
      lastname: 'Shon',
      username: 'todayis_wendy',
      password: 'redvelvetmember',
      phone_number: '4089233502',
      email_address: 'wendys@gmail.com',
      address: '5535 Auto Mall Pkwy',
      city: 'Fremont,',
      state: 'CA',
      zipcode: 94538
    })

    const category1 = await createCategory({
      category_name: 'dog'
    });

    const category2 = await createCategory({
      category_name: 'cat'
    });

    const animal1 = await createAnimal({
      breed_name: 'Siberian Husky',
      image_url: 'https://www.akc.org/wp-content/uploads/2017/11/Siberian-Husky-Illo.jpg',
      categortId: 1,
      description: 'Sibes are friendly, fastidious, and dignified.',
      inventory_count: 10,
      price: 2000.20,
      gender: 'male'
    });

    const animal2 = await createAnimal({
      breed_name: 'German Shepherd',
      image_url: 'https://www.akc.org/wp-content/uploads/2017/11/German-Shepherd-Dog-Illo-2.jpg',
      categortId: 1,
      description: 'Loyal, confident, courageous, and steady, the German Shepherd is truly a dog lover\'s delight.',
      inventory_count: 2,
      price: 1500,
      gender: 'female'
    });

    const animal3 = await createAnimal({
      breed_name: 'British Shorthair',
      image_url: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/59164749/1/?bust=1671099259&width=720',
      categortId: 2,
      description: 'The British Shorthair is a compact, well-balanced, and powerful cat, with a short, very dense coat. They often convey an overall impression of balance and proportion in which no feature is exaggerated.',
      inventory_count: 50,
      price: 5000,
      gender: 'female'
    })

    const saleItem1 = await createSaleItem({
      customerId: 1,
      animalId: 1,
      orderId: 6,
      quantity: 1
    });

    const saleItem2 = await createSaleItem({
      customerId: 1,
      animalId: 3,
      orderId: 3,
      quantity: 1
    });

    const saleItem3 = await createSaleItem({
      customerId: 2,
      animalId: 2,
      orderId: 2,
      quantity: 2
    })

    const sale1 = await createSale({
      customerId: 1,
      total_item_amount: 7000,
      shipping_fee: 100,
      sales_total_amount: 7747.5,
      sales_date: 2023-02-26
    });

    const sale2 = await createSale({
      customerId: 5,
      total_item_amount: 1500.10,
      shipping_fee: 200,
      sales_total_amount: 1838.86,
      sales_date: 2023-01-01
    });

    const sale3 = await createSale({
      customerId: 4,
      total_item_amount: 30,
      shipping_fee: 50,
      sales_total_amount: 36.99,
      sales_date: 2023-02-25
    })

    return [
      admin1, admin2, admin3, customer1, customer2, customer3, 
      category1, category2, animal1, animal2, animal3, 
      saleItem1, saleItem2, saleItem3, sale1, sale2, sale3
    ]
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
