const { db } = require('@vercel/postgres');
const {
  statements,
  vaultDocs,
  contributions,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function dropTables(client){
  try{
    await client.sql`
      DROP TABLE IF EXISTS
      users,statements,vaultdocs,contributions
    ;`
    console.log("Preparing for seeding..")
  } catch (error) {
    console.error('Error deleting tables ->', error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        member_id VARCHAR(255) NOT NULL,
        ssn VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        class VARCHAR(255) NOT NULL,
        isContractor BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "user" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, member_id, ssn, dob, name, email, password, class, isContractor)
          VALUES (${user.guid}, ${user.member_id}, ${user.ssn}, ${user.dob}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.class}, ${user.isContractor})
          ON CONFLICT (id) DO NOTHING;
        `;
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
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "statements" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS statements (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        benefit_from DATE NOT NULL,
        work_from DATE NOT NULL,
        payment_due DATE NOT NULL,
        total_contribution VARCHAR(255) NOT NULL,
        reserve VARCHAR(255) NOT NULL,
        amount_due VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "statements" table`);

    // Insert data into the "statements" table
    const insertedStatements = await Promise.all(
      statements.map(
        (statement) => client.sql`
          INSERT INTO statements (id, user_id, benefit_from, work_from, payment_due, total_contribution, reserve, amount_due)
          VALUES (${statement.uuid}, ${statement.user_id}, ${statement.benefit_from}, ${statement.work_from}, ${statement.payment_due}, ${statement.total_contribution}, ${statement.reserve}, ${statement.amount_due})
          ON CONFLICT (id) DO NOTHING;
        `,
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
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "vaultDocs" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS vaultDocs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        category VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "vaultDocs" table`);

    // Insert data into the "vaultDocs" table
    const insertedVaultDocs = await Promise.all(
      vaultDocs.map(
        (vaultDoc) => client.sql`
          INSERT INTO vaultDocs (id, user_id, category, url)
          VALUES (${vaultDoc.uuid}, ${vaultDoc.user_id}, ${vaultDoc.category}, ${vaultDoc.url})
          ON CONFLICT (id) DO NOTHING;
        `,
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
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "contributions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contributions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        amount VARCHAR(255) NOT NULL,
        hours VARCHAR(255) NOT NULL,
        period DATE NOT NULL
      );
    `;

    console.log(`Created "contributions" table`);

    // Insert data into the "contributions" table
    const insertedContributions = await Promise.all(
      contributions.map(
        (contribution) => client.sql`
          INSERT INTO contributions (id, user_id, amount, hours, period)
          VALUES (${contribution.uuid}, ${contribution.user_id}, ${contribution.amount}, ${contribution.hours}, ${contribution.period})
          ON CONFLICT (id) DO NOTHING;
        `,
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
    await dropTables(client)
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
