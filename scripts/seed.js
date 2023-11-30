const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const relationalData = {
  users: [
    {
      guid: "d384f816-3321-4b6c-b88a-72d30ee6c815",
      member_id: "M001",
      ssn: "123-45-6789",
      dob: "1990-01-01",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "hashed_password1",
      class: "participant",
      isContractor: false,
    },
    {
      guid: "a7d76eb8-3e52-4a9a-bdd4-4c5f03ff9290",
      member_id: "M002",
      ssn: "987-65-4321",
      dob: "1985-05-15",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "hashed_password2",
      class: "admin",
      isContractor: false,
    },
    {
      guid: "ce63a6c8-9025-44f5-b41e-20a740fc39c5",
      member_id: "M003",
      ssn: "111-22-3333",
      dob: "1978-09-30",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "hashed_password3",
      class: "vault",
      isContractor: true,
    },
  ],
  statements: [
    {
      uuid: "87823b98-0eef-4a6c-aa34-915abb0b3a21",
      user_id: "d384f816-3321-4b6c-b88a-72d30ee6c815",
      benefit_from: "2023-01-01",
      work_from: "2023-01-15",
      payment_due: "2023-02-01",
      total_contribution: "1000.00",
      reserve: "200.00",
      amount_due: "800.00",
    },
    {
      uuid: "1f5ce671-b036-48f7-990a-6ac49d110927",
      user_id: "a7d76eb8-3e52-4a9a-bdd4-4c5f03ff9290",
      benefit_from: "2023-02-01",
      work_from: "2023-02-15",
      payment_due: "2023-03-01",
      total_contribution: "1200.00",
      reserve: "300.00",
      amount_due: "900.00",
    },
  ],
  vaultDocs: [
    {
      uuid: "d22e7b87-6f7c-47ce-85e6-58f6947fb6c3",
      user_id: "d384f816-3321-4b6c-b88a-72d30ee6c815",
      category: "todo",
      url: "https://example.com/todo-document",
    },
    {
      uuid: "b2efdb1a-5862-4b90-b24d-41b6f5c032f4",
      user_id: "a7d76eb8-3e52-4a9a-bdd4-4c5f03ff9290",
      category: "annuity",
      url: "https://example.com/annuity-document",
    },
  ],
  contributions: [
    {
      uuid: "b682e3a4-54fb-44d3-9867-317d29a5b014",
      user_id: "d384f816-3321-4b6c-b88a-72d30ee6c815",
      amount: "500.00",
      hours: "40",
      period: "2023-01-01",
    },
    {
      uuid: "ba2d34f9-5ad7-4b5d-89f1-d30e7a6e6ccf",
      user_id: "ce63a6c8-9025-44f5-b41e-20a740fc39c5",
      amount: "700.00",
      hours: "35",
      period: "2023-02-01",
    },
  ],
};

async function seedUsers(client) {
  try {
    await client.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        guid UUID NOT NULL,
        member_id VARCHAR(255) NOT NULL,
        ssn VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        class VARCHAR(255) NOT NULL,
        isContractor BOOLEAN NOT NULL
      );
    `);

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      relationalData.users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql(`
          INSERT INTO users (guid, member_id, ssn, dob, name, email, password, class, isContractor)
          VALUES ('${user.guid}', '${user.member_id}', '${user.ssn}', '${user.dob}', '${user.name}', '${user.email}', '${hashedPassword}', '${user.class}', ${user.isContractor})
          ON CONFLICT (guid) DO NOTHING;
        `);
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedStatements(client) {
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create the "statements" table if it doesn't exist
    const createTable = await client.sql(`
      CREATE TABLE IF NOT EXISTS statements (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        uuid UUID NOT NULL,
        user_id UUID NOT NULL,
        benefit_from DATE NOT NULL,
        work_from DATE NOT NULL,
        payment_due DATE NOT NULL,
        total_contribution VARCHAR(255) NOT NULL,
        reserve VARCHAR(255) NOT NULL,
        amount_due VARCHAR(255) NOT NULL
      );
    `);

    console.log(`Created "statements" table`);

    // Insert data into the "statements" table
    const insertedStatements = await Promise.all(
      relationalData.statements.map(
        (statement) => client.sql(`
          INSERT INTO statements (uuid, user_id, benefit_from, work_from, payment_due, total_contribution, reserve, amount_due)
          VALUES ('${statement.uuid}', '${statement.user_id}', '${statement.benefit_from}', '${statement.work_from}', '${statement.payment_due}', '${statement.total_contribution}', '${statement.reserve}', '${statement.amount_due}')
          ON CONFLICT (uuid) DO NOTHING;
        `),
      ),
    );

    console.log(`Seeded ${insertedStatements.length} statements`);

    return {
      createTable,
      statements: insertedStatements,
    };
  } catch (error) {
    console.error('Error seeding statements:', error);
    throw error;
  }
}

async function seedVaultDocs(client) {
  try {
    await client.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create the "vaultDocs" table if it doesn't exist
    const createTable = await client.sql(`
      CREATE TABLE IF NOT EXISTS vaultDocs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        uuid UUID NOT NULL,
        user_id UUID NOT NULL,
        category VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL
      );
    `);

    console.log(`Created "vaultDocs" table`);

    // Insert data into the "vaultDocs" table
    const insertedVaultDocs = await Promise.all(
      relationalData.vaultDocs.map(
        (vaultDoc) => client.sql(`
          INSERT INTO vaultDocs (uuid, user_id, category, url)
          VALUES ('${vaultDoc.uuid}', '${vaultDoc.user_id}', '${vaultDoc.category}', '${vaultDoc.url}')
          ON CONFLICT (uuid) DO NOTHING;
        `),
      ),
    );

    console.log(`Seeded ${insertedVaultDocs.length} vaultDocs`);

    return {
      createTable,
      vaultDocs: insertedVaultDocs,
    };
  } catch (error) {
    console.error('Error seeding vaultDocs:', error);
    throw error;
  }
}

async function seedContributions(client) {
  try {
    await client.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create the "contributions" table if it doesn't exist
    const createTable = await client.sql(`
      CREATE TABLE IF NOT EXISTS contributions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        uuid UUID NOT NULL,
        user_id UUID NOT NULL,
        amount VARCHAR(255) NOT NULL,
        hours VARCHAR(255) NOT NULL,
        period DATE NOT NULL
      );
    `);

    console.log(`Created "contributions" table`);

    // Insert data into the "contributions" table
    const insertedContributions = await Promise.all(
      relationalData.contributions.map(
        (contribution) => client.sql(`
          INSERT INTO contributions (uuid, user_id, amount, hours, period)
          VALUES ('${contribution.uuid}', '${contribution.user_id}', '${contribution.amount}', '${contribution.hours}', '${contribution.period}')
          ON CONFLICT (uuid) DO NOTHING;
        `),
      ),
    );

    console.log(`Seeded ${insertedContributions.length} contributions`);

    return {
      createTable,
      contributions: insertedContributions,
    };
  } catch (error) {
    console.error('Error seeding contributions:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect()

  
    await client.connect();

    await seedUsers(client);
    await seedStatements(client);
    await seedVaultDocs(client);
    await seedContributions(client);

    await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
