var myDoc = documents.add();
var myPathItem1 = myDoc.pathItems.rectangle(244, 64, 82, 76);
var myTextFrame1 = myDoc.textFrames.areaText(myPathItem1);
var myPathItem2 = myDoc.pathItems.rectangle(144, 144, 42, 116);
var myTextFrame2 = myDoc.textFrames.areaText(myPathItem2);

// 使用nextFrame属性连接文本框
myTextFrame1.nextFrame = myTextFrame2;
var sText = "This is two text frames linked together as one story, with text flowing from the first to the last. This is two text frames linked together as one story, with text flowing from the first to the last. This is two text frames linked together as one story. ";
myTextFrame1.contents = sText;
redraw();

var myDoc = app.activeDocument;
alert("There are " + myDoc.textFrames.length + " text frames.");
alert("There are " + myDoc.stories.length + " stories.");