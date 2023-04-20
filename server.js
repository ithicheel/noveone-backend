const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors')
const app = express();


//#region Config
dotenv.config({ path: './config/config.env' });
//#endregion

//#region Router
const userRouter = require('./router/userRouter');
const novelRouter = require("./router/novelRouter");
const chapterRouter = require("./router/chapterRouter");
const commentRouter = require("./router/commentRouter");
const categoryRouter = require("./router/categoryRouter");
//#endregion
//#region Auth
const {checkToken} = require("./auth/authorization");
//#endregion


//#region App use
app.use(express.json())
app.use(cors());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/novel', checkToken, novelRouter);
app.use("/api/v1/chapter", checkToken, chapterRouter);
app.use("/api/v1/comment", checkToken, commentRouter);
app.use("/api/v1/category", checkToken, categoryRouter);
//#endregion


// Server Listen
const port = process.env.PORT || 3001;
const host = process.env.HOST || '127.0.0.1';
const server = app.listen(port, host, () => {
    console.log(`Сэрвэр ${host}:${port} порт дээр аслаа...`.cyan.underline.bold);
  })
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Aldaa garlaa : ${err.message}`.red.underline.bold);
    server.close(() => {
      process.exit(1);
    });
  })