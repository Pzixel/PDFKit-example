import express from 'express';
import PDFDocument from "pdfkit";

const app = express();
const doc = new PDFDocument();
const port = 7788;

app.get('/', async (req, res, next) => {
    res.send("Hello");
});

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`server is listening on ${port}`);
    }
});
