//#region Controller
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const { responseData, responseSetData } = require("../utils/responseData");
//#endregion

exports.index = async (req, res) => {
    const result = await userModel.findAll();
    responseData(result, res, 200, 400);
  };

exports.show = async (req, res) => {
    const result = await userModel.findById(req.params.id);
    responseData(result, res, 200, 400);
};

exports.create = async (req, res) => {
    const id = await userModel.create(req.body);
    responseData(id, res, 201, 401, "Амжилттай", "Бүртгэхэд алдаа гарлаа.");
};
  
exports.updated = async (req, res) => {
    const affectedRows = await userModel.update(req.params.id, req.body);
    responseSetData(affectedRows, res, 200, 404, "Амжилттай", "Өөрчлөхөд алдаа гарлаа.");
};
  
exports.deleted = async (req, res) => {
    const affectedRows = await userModel.delete(req.params.id);
    responseSetData(affectedRows, res, 200, 404, "Амжилттай", "Устгахад алдаа гарлаа.");
};
//Addition
exports.register = async (req, res) => {
    const user = req.body;

    if(user.password === "" || user.username === "" || user.email === ""){
        responseData(null, res, 201, 401, "Амжилттай", "Дутуу мэдээлэл - алдаа гарлаа.");
        return;
    }
    const result = await userModel.findByEmail(user.email);
    if(result){
        responseData(null, res, 201, 401, "Амжилттай", "Аль хэдийн бүртгэлтэй майл байна.");
        return;
    }

    const createUser = await userModel.create(user);
    responseData(createUser, res, 201, 401, "Амжилттай", "Бүртгэхэд алдаа гарлаа.");
}
exports.login = async (req, res) => {
    const user = req.body;
    if(user.password === "" || user.email === ""){
        responseData(null, res, 200, 400, "Ажилттай", "Дутуу мэдээлэл - алдаа гарлаа.");
        return;
    }

    const result = await userModel.findByEmail(user.email);
    if(!result){
        responseData(null, res, 201, 401, "Амжилттай", "Майл эсвэл нууц үг буруу байна.");
        return;
    }

    const match = await userModel.comparePassword(user.password, result.password);

    if(!match){
        responseData(null, res, 201, 401, "Амжилттай", "Майл эсвэл нууц үг буруу байна.");
        return;
    }
    result.password = null;

    const token = jwt.sign(result, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRESIN} )
    const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    }
    
    res.status(200).cookie("token", token, cookieOptions).json({
        success: 200,
        data: result,
        message: "Амжилттай",
        token,
    }); 
} 