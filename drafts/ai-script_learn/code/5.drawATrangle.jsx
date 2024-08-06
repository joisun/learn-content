/// <reference path="./types/index.d.ts" />

var newDoc = app.activeDocument;
// var newDoc = app.documents.add();
let background = newDoc.pathItems.add();
background.filled = true;
var bgFillColor = "#f40"
