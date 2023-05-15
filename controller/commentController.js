//#region Controller
const commentModel = require("../model/commentModel");
const { responseData, responseSetData } = require("../utils/responseData");
//#endregion

exports.index = async (req, res) => {
    const result = await commentModel.findAll();
    responseData(result, res, 200, 400);
  };

exports.show = async (req, res) => {
    const result = await commentModel.findById(req.params.id);
    responseData(result, res, 200, 400);
};

exports.create = async (req, res) => {
    const id = await commentModel.create(req.body);
    responseData(id, res, 200, 401, "Амжилттай", "Бүртгэхэд алдаа гарлаа.");
};
  
exports.updated = async (req, res) => {
    const affectedRows = await commentModel.update(req.params.id, req.body);
    responseSetData(affectedRows, res, 200, 404, "Амжилттай", "Өөрчлөхөд алдаа гарлаа.");
};
  
exports.deleted = async (req, res) => {
    const affectedRows = await commentModel.delete(req.params.id);
    responseSetData(affectedRows, res, 200, 404, "Амжилттай", "Устгахад алдаа гарлаа.");
};
// Addition
exports.findByNovelId = async (req, res) => {
    const affectedRows = await commentModel.findByNovelId(req.params.id);
    responseData(affectedRows, res, 200, 404, "Амжилттай", "Хайхад алдаа гарлаа.");
};