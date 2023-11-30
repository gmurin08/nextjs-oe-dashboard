// Users
const users = [
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
  ];
  
  // Statements
  const statements = [
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
  ];
  
  // VaultDocs
  const vaultDocs = [
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
  ];
  
  // Contributions
  const contributions = [
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
  ];
  
  // Combine all tables into a single object
  module.exports = {
    users,
    statements,
    vaultDocs,
    contributions,
  };
  
  //console.log(JSON.stringify(relationalData, null, 2));
  