const connection = require("../config/database");
const {
  CREATE_DREAM_COMPANY,
  SELECT_DREAM_COMPANY_BY_NAME_AND_UID,
  DELETE_DREAM_COMPANY_BY_ID,
  SELECT_ALL_DREAM_COMPANIES_BY_UID,
  SELECT_DREAM_COMPANY_BY_ID,
  UPDATE_MD_TEXT_BY_ID,
  UPDATE_REFERRAL_MSG_BY_ID,
} = require("../services/dreamCompanyServices");
const internalServerError = require("../utils/internalServerError");

exports.createDreamCompany = (req, res) => {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({
      success: false,
      message: "Please send dream company name & user id",
    });
  }
  try {
    connection.query(CREATE_DREAM_COMPANY, [name, user_id], (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            success: false,
            message: `${name} already exists.`,
          });
        }
        return res.status(400).json({
          success: false,
          message: `An internal server error occured`,
        });
      }
      connection.query(
        SELECT_DREAM_COMPANY_BY_NAME_AND_UID,
        [user_id, name],
        (err, results) => {
          return res.status(200).json({
            success: true,
            message: "Dream company successfully added",
            dreamCompany: results[0],
          });
        }
      );
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.deleteDreamCompany = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send user ID to fetch all dream companies.",
    });
  }
  try {
    connection.query(DELETE_DREAM_COMPANY_BY_ID, [id], (err, results) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: `An internal server error occured`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Dream company successfully deleted",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getAllDreamCompanies = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send user ID to fetch all dream companies.",
    });
  }
  try {
    connection.query(
      SELECT_ALL_DREAM_COMPANIES_BY_UID,
      [id],
      (err, results) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: `An internal server error occured`,
          });
        }
        return res.status(200).json({
          success: true,
          message: "Dream companies fetched successfully.",
          dreamCompanies: results,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getDreamCompany = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send dream company unique ID to delete.",
    });
  }
  try {
    connection.query(SELECT_DREAM_COMPANY_BY_ID, [id], (err, results) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: `An internal server error occured`,
        });
      }
      return res.status(200).json({
        success: true,
        message: `${results[0].name} fetched successfully.`,
        dreamCompany: results[0],
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateMdText = (req, res) => {
  const { id, text } = req.body;
  if (!id || !text) {
    return res.status(400).json({
      success: false,
      message: "Please send company ID and Md Text.",
    });
  }
  try {
    connection.query(UPDATE_MD_TEXT_BY_ID, [text, id], (err, results) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: `An internal server error occured`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Md text successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateReferralMsg = (req, res) => {
  const { id, msg } = req.body;
  if (!id || !msg) {
    return res.status(400).json({
      success: false,
      message: "Please send company ID and Referral Message.",
    });
  }
  try {
    connection.query(UPDATE_REFERRAL_MSG_BY_ID, [msg, id], (err, results) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: `An internal server error occured`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Referral message successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};
