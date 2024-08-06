// Get CSV file
/// <reference path="node_modules\.pnpm\types-for-adobe@7.0.12\node_modules\types-for-adobe\Illustrator\2015.3\index.d.ts" />

function readCsv(selectedFile) {
    // Read CSV file
    if (selectedFile) {
        if (selectedFile.open("r")) {
            var content = selectedFile.read();
            alert(content);
        }
        selectedFile.close();

        // Extract CSV into array
        var lines = content.split("\n");
        var headings = [];
        var data = [];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (i === 0) {
                headings = line.split(";");
            } else {
                var record = line.split(";");
                data.push(record);
            }
        }

        return data;
    }
}

// load file from path;
var path =
    "//wsl.localhost/Ubuntu/home/jayce/workspace_personal/learn-content/contents/ai-script_learn/code/mock_data/test.csv";
var csvFile = new File(path);

if (csvFile.exists) {
    var data = readCsv(csvFile);
    createRandomSquareTextFrame(data);
}

function createRandomSquareTextFrame(data) {
    // 新建文档
    var myDoc = documents.add();
    var myPathItem1 = myDoc.pathItems.rectangle(244, 64, 82, 76);
    var myTextFrame1 = myDoc.textFrames.areaText(myPathItem1);
    myTextFrame1.contents =
        "Temporibus consequatur aut laborum dicta ipsum natus amet assumenda.";

    return;
    for (var i = 0; i < data.length; i++) {
        var textFrame = myDoc.textFrames.add();
        textFrame.content = data[i][0];

        textFrame.textColor = new SolidColor(255, 0, 0);
        textFrame.textSize = 12;
        textFrame.textAlignment = TextFrameTextAlignment.CENTER;
        textFrame.textPosition = new Point(100, 100);
        textFrame.textStroke = new SolidColor(0, 0, 0);
        textFrame.textStrokeThickness = 1;

        myDoc.textFrames.add(textFrame);

        // alert(data[i])
    }
}
