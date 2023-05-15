//#region Controller
const reportModel = require("../model/reportModel");
const { responseData, responseSetData } = require("../utils/responseData");
//#endregion

exports.index = async (req, res) => {
    const result = await reportModel.findAll();
    responseData(result, res, 200, 400);
  };

exports.show = async (req, res) => {
    const result = await reportModel.findById(req.params.id);
    responseData(result, res, 200, 400);
};

exports.create = async (req, res) => {
    const id = await reportModel.create(req.body);
    responseData(id, res, 200, 401, "Амжилттай", "Бүртгэхэд алдаа гарлаа.");
};
  
exports.updated = async (req, res) => {
    const affectedRows = await reportModel.update(req.params.id, req.body);
    responseSetData(affectedRows, res, 200, 404, "Амжилттай", "Өөрчлөхөд алдаа гарлаа.");
};

exports.deleted = async (req, res) => {
    const affectedRows = await reportModel.delete(req.params.id);
    responseSetData(affectedRows, res, 200, 404, "Амжилттай", "Устгахад алдаа гарлаа.");
};