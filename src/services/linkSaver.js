"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs = void 0;
exports.fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "..", "..", "client/src/shared//constants/data.ts");
const addImagePath = () => {
    exports.fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Ошибка чтения файла:", err);
            return;
        }
        try {
            const json = JSON.parse(data);
            console.log(json);
            //   json.imagePaths.push(newPath);
            // Записываем обновленные данные обратно в файл
            //   fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf8", (err) => {
            //     if (err) {
            //       console.error("Ошибка записи в файл:", err);
            //     } else {
            //       console.log("Путь успешно добавлен!");
            //     }
            //   });
        }
        catch (err) {
            console.error("Ошибка парсинга JSON:", err);
        }
    });
};
module.exports = { addImagePath };
