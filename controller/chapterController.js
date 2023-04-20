//#region Controller
const chapterModel = require("../model/chapterModel");
const { responseData, responseSetData } = require("../utils/responseData");
//#endregion

exports.index = async (req, res) => {
    const result = await chapterModel.findAll();
    responseData(result, res, 200, 400);
  };

exports.show = async (req, res) => {
    const result = await chapterModel.findById(req.params.id);
    responseData(result, res, 200, 400);
};

exports.create = async (req, res) => {
    const id = await chapterModel.create(req.body);
    responseData(id, res, 200, 401, "Амжилттай", "Бүртгэхэд алдаа гарлаа.");
};
  
exports.updated = async (req, res) => {
    const affectedRows = await chapterModel.update(req.params.id, req.body);
    responseSetData(affectedRows, res, 200, 404, "Амжилттай", "Өөрчлөхөд алдаа гарлаа.");
};
  
exports.deleted = async (req, res) => {
    const affectedRows = await chapterModel.delete(req.params.id);
    responseSetData(affectedRows, res, 200, 404, "Амжилттай", "Устгахад алдаа гарлаа.");
};
// Addition
exports.findByNovelId = async (req, res) => {
    const affectedRows = await chapterModel.findByNovelId(req.params.id);
    responseData(affectedRows, res, 200, 404, "Амжилттай", "ID хайхад алдаа гарлаа.");
};
exports.findByNovelIdCount = async (req, res) => {
    const affectedRows = await chapterModel.findByNovelIdCount(req.params.id);
    responseData(affectedRows, res, 200, 404, "Амжилттай", "ID хайхад алдаа гарлаа.");
};
exports.findByCateNovel = async (req, res) => {
    const affectedRows = await chapterModel.findByCateNovel();
    responseData(affectedRows, res, 200, 404, "Амжилттай", "Хайхад алдаа гарлаа.");
};
exports.findByPageNumBer = async (req, res) => {
    const affectedRows = await chapterModel.findByPageNumBer(req.params.id, req.params.pageNumber);
    responseData(affectedRows, res, 200, 404, "Амжилттай", "Хайхад алдаа гарлаа.");
};
