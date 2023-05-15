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
const historyRouter = require("./router/historyRouter");
const chapterhistoryRouter = require("./router/chapterhistoryRouter");
const reportRouter = require("./router/reportRouter");
// const reportRouter = require("./router/repor")
//#endregion
//#region Auth
// const {checkToken} = require("./auth/authorization");
//#endregion


//#region App use
app.use(express.json())
app.use(cors());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/novel', novelRouter);
app.use("/api/v1/chapter", chapterRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/history",  historyRouter);
app.use("/api/v1/chapterhistory", chapterhistoryRouter);
app.use("/api/v1/report", reportRouter);
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