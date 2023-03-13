import axios from 'axios';
// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function fetchAllAnimals() {
  try {
    const { data: animals } = await axios.get('/api/animals')
    return animals;
  } catch(err) {
    console.error(err)
  }
}

export async function fetchAllAnimalsByCategoryId(id) {
  try {
    const { data: animals } = await axios.get(`/api/animal_categories/${id}`)
    return animals;
  } catch(err) {
    console.error(err)
  }
}

export async function addNewAnimal (animal, token) {
  try {
    const response = await axios.post('/api/animals', JSON.stringify(animal),
    {
      headers: { 
        "content-type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editAnimal (animal, id, token) {
  try {
  const response = await axios.patch(`/api/animals/${id}`, JSON.stringify(animal),
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAnimal (id, token) {
  try {
  const response = await axios.delete(`/api/animals/${id}`, 
  {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  });
  return response;
} catch (error) {
    console.log(error);
  }
}

export async function fetchAllCategories() {
  try {
    const { data: categories } = await axios.get('/api/animal_categories')
    return categories;
  } catch(err) {
    console.error(err)
  }
}

export async function addNewCategory (category, token) {
  try {
    const response = await axios.post('/api/animal_categories', JSON.stringify(category),
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    return response;
  } catch(err) {
    console.error(err)
  }
}

export async function editCategory (category, id, token) {
  try {
    const response = await axios.patch(`/api/animal_categories/${id}`, JSON.stringify(category),
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch(err) {
    console.error(err)
  }
}

export async function deleteCategory (id, token) {
  try {
    const response = await axios.delete(`/api/animal_categories/${id}`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  } catch(err) {
    console.error(err)
  }
}

export async function fetchAllUsers() {
  try {
    const { data: users } = await axios.get('/api/users')
    return users;
  } catch(err) {
    console.error(err)
  }
}

export async function registerCustomer(user) {
  try {
    const response = await axios.post('/api/users/register/customer', JSON.stringify(user), 
    {
      headers: { 
        "content-type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loginCustomer(user) {
  try {
    const response = await axios.post('/api/users/login/customer', JSON.stringify(user), 
    {
      headers: { 
        "content-type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function registerAdmin(user) {
  try {
    const response = await axios.post('/api/users/register/admin', JSON.stringify(user), 
    {
      headers: { 
        "content-type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loginAdmin(user) {
  try {
    const response = await axios.post('/api/users/login/admin', JSON.stringify(user), 
    {
      headers: { 
        "content-type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function createCheckoutInfo(checkoutInfo, token) {
  try {
    const response = await axios.post('/checkout', JSON.stringify(checkoutInfo),
    {
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function addAnimalsToCart (animal,token) {
  try {
    const response = await axios.post('/api/animals/addtocart', JSON.stringify(animal),
    {
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error(error)
  }
}

export async function getCartByCustomerId(token, customerId) {
  try {
    const response = await axios.get(`/api/order_items/${customerId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log(response.data, 'api.js call ');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrderItemsByCustomerId(customerId, token) {
  console.log(customerId, 'this customerId from API');
  console.log(token, 'this token from API');
  try {
    const response = await axios.get(`/api/users/${customerId}`,
    {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response, 'this response');
    return response;
  } catch (error) {
    console.error(error)
  }
}

export async function deleteProduct(orderId, token) {
  try {
    const response = await axios.delete(`/api/order_history/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}