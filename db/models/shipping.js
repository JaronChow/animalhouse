const client = require('../client');

async function createShippingInfo({ customerId, address, city, state, zipcode }) {
    try {
        const { rows: [ shipping ] } = await client.query(`
            INSERT INTO shipping("customerId", address, city, state, zipcode)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `, [customerId, address, city, state, zipcode]);
        return shipping;
    } catch (error) {
        console.error(error);
    }
}

async function getShippingInfoById(id) {
    try {
        const { rows: [ shipping ] } = await client.query(`
            SELECT *
            FROM shipping
            WHERE id=${id};
        `)
        return shipping;
    } catch (error) {
        console.error(error);
    }
}

async function attachShippingInfoToUsers(user) {
    const usersCopy = [...user];
    const userIds = user.map(user => user.id);
    const insertValues = user.map((element, index) => `$${index + 1}`).join(', ');

    try {
        const { rows: [ shipping ] } = await client.query(`
            SELECT shipping.*, users.*
            FROM shipping
            JOIN users ON users.id=shipping."customerId"
            WHERE users.id IN (${insertValues});
        `, userIds);

        for (let i = 0; i < usersCopy.length; i++) {
            const addShippingInfo = usersCopy.filter(user => user.id === usersCopy[i].id);
            usersCopy[i].shipping = addShippingInfo;
        }

        return usersCopy;
    } catch (error) {
        console.error(error);
    }
}

async function updateShippingInfo({id, ...fields}) {
    const setString = Object.keys(fields).map(
        (key, index) => `'${key}'=$${index + 1}`
    ).join(', ');

    if(setString.length === 0) {
        return;
    }

    try {
        const { rows: [ shipping ] } = await client.query(`
            UPDATE shipping
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields))
        return shipping;
    } catch (error) {
        console.error(error, 'Error updating shipping information');
    }
}


module.exports = {
    createShippingInfo,
    getShippingInfoById,
    attachShippingInfoToUsers,
    updateShippingInfo
};