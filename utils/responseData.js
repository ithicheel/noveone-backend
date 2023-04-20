exports.responseData = (result, response, code = 200, errorCode = 400, message = "Амжилттай", errorMessage = "Амжилтгүй") => {
    if(result){
        response.status(200).json({
            success: code,
            data: result,
            message,
        })       
    }else {
        response.status(200).json({
            success: errorCode,
            data: null,
            message: errorMessage,
        }) 
    }
}

exports.responseSetData = (result, response, code = 200, errorCode = 400, message = "Амжилттай", errorMessage = "Амжилтгүй") => {
    if(result > 0){
        response.status(200).json({
            success: code,
            data: result,
            message,
        })       
    }else {
        response.status(200).json({
            success: errorCode,
            data: null,
            message: errorMessage,
        }) 
    }
}