const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
    let token = req.get("cookie");
    if(token) {
        token = token.slice(6);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err) {
                return res.status(400).json({
                    success: 400,
                    data: null,
                    message: "Хүчингүй хандалт, Нэвтэрнэ үү.",
                })  
            }else {
                next();
            }
        })
    }else {
        return res.status(400).json({
            success: 400,
            data: null,
            message: "Хүчингүй хандалт, Нэвтэрнэ үү.",
        })  
    }
}

exports.checkAuthorToken = (req, res, next) => {
    let token = req.get("cookie");
    if(token) {
        token = token.slice(6);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err) {
                return res.status(400).json({
                    success: 400,
                    data: null,
                    message: "Хүчингүй хандалт, Нэвтэрнэ үү.",
                })  
            }else {
                if(decoded.role === "author" || decoded.role === "admin"){
                    next();
                }else {
                    return res.status(400).json({
                        success: 400,
                        data: null,
                        message: "Хүчингүй хандалт, Нэвтэрнэ үү.",
                    })
                }
            }
        })
    }else {
        return res.status(400).json({
            success: 400,
            data: null,
            message: "Хүчингүй хандалт, Нэвтэрнэ үү.",
        })  
    }
}

exports.checkAdminToken = (req, res, next) => {
    let token = req.get("cookie");
    if(token) {
        token = token.slice(6);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err) {
                return res.status(400).json({
                    success: 400,
                    data: null,
                    message: "Хүчингүй хандалт, Нэвтэрнэ үү.",
                })  
            }else {
                if(decoded.role === "admin"){
                    next();
                }else {
                    return res.status(400).json({
                        success: 400,
                        data: null,
                        message: "Хүчингүй хандалт, Нэвтэрнэ үү.",
                    })
                }
            }
        })
    }else {
        return res.status(400).json({
            success: 400,
            data: null,
            message: "Хүчингүй хандалт, Нэвтэрнэ үү.",
        })  
    }
}



