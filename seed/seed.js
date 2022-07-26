const {
  dropBehavioralQuestionsTableSQL,
  dropDreamCompaniesTableSQL,
  // dropDreamCompanyNotesTableSQL,
  dropDreamCompanyReferralsTableSQL,
  dropFlashCardDecksTableSQL,
  dropFlashCardsTableSQL,
  dropFlashCardTestsTableSQL,
  dropProjectQuestionsTableSQL,
  dropProjectsTableSQL,
  dropTechnicalQuestionsTableSQL,
  dropUsersTableSQL,
  createBehavioralQuestionsTableSQL,
  createDreamCompaniesTableSQL,
  addUniqueCompanyConstraint,
  // createDreamCompanyNotesTableSQL,
  createDreamCompanyReferralsTableSQL,
  createFlashCardDecksTableSQL,
  createFlashCardsTableSQL,
  createFlashCardTestsTableSQL,
  createProjectQuestionsTableSQL,
  createProjectsTableSQL,
  createTechnicalQuestionsTableSQL,
  createUsersTableSQL,
} = require("./sql");

const mysql = require("mysql2/promise");
require("dotenv").config();

const { DATABASE_URL } = process.env;

const seedSchema = async () => {
  const connection = await mysql.createConnection(DATABASE_URL);
  console.log("Connection to db successful!");

  try {
    await connection.query(dropBehavioralQuestionsTableSQL);
    console.log("***dropped behavioral_questions table***");

    await connection.query(dropDreamCompaniesTableSQL);
    console.log("***dropped dream_companies table***");

    // await connection.query(dropDreamCompanyNotesTableSQL);
    // console.log("***dropped dream_company_notes table***");

    await connection.query(dropDreamCompanyReferralsTableSQL);
    console.log("***dropped dream_company_refferals table***");

    await connection.query(dropFlashCardDecksTableSQL);
    console.log("***dropped flash_card_folders table***");

    await connection.query(dropFlashCardsTableSQL);
    console.log("***dropped flash_cards table***");

    await connection.query(dropFlashCardTestsTableSQL);
    console.log("***dropped flash_card_tests table***");

    await connection.query(dropProjectQuestionsTableSQL);
    console.log("***dropped project_questions table***");

    await connection.query(dropProjectsTableSQL);
    console.log("***dropped projects table***");

    await connection.query(dropTechnicalQuestionsTableSQL);
    console.log("***dropped technical_questions table***");

    await connection.query(dropUsersTableSQL);
    console.log("***dropped users table***");

    await connection.query(createBehavioralQuestionsTableSQL);
    console.log("***created behavioral_questions table***");

    await connection.query(createDreamCompaniesTableSQL);
    console.log("***created dream_companies table***");

    await connection.query(addUniqueCompanyConstraint);
    console.log("***add constraint to dream_companies table***");

    // await connection.query(createDreamCompanyNotesTableSQL);
    // console.log("***created dream_company_notes table***");

    await connection.query(createDreamCompanyReferralsTableSQL);
    console.log("***created dream_company_refferals table***");

    await connection.query(createFlashCardDecksTableSQL);
    console.log("***created flash_card_folders table***");

    await connection.query(createFlashCardsTableSQL);
    console.log("***created flash_cards table***");

    await connection.query(createFlashCardTestsTableSQL);
    console.log("***created flash_card_tests table***");

    await connection.query(createProjectQuestionsTableSQL);
    console.log("***created project_questions table***");

    await connection.query(createProjectsTableSQL);
    console.log("***created projects table***");

    await connection.query(createTechnicalQuestionsTableSQL);
    console.log("***created technical_questions table***");

    await connection.query(createUsersTableSQL);
    console.log("***created users table***");
  } catch (err) {
    console.log(err);
  }
};

seedSchema()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
