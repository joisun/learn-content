var _prompt = "Select videos";
var _filter = "*.mp4";
var _multiSelect = true;
// Using the built-in Open Dialog
var selectedFiles = File.openDialog(_prompt, _filter, _multiSelect);
alert(selectedFiles)

var commonFiles = Folder.commonFiles;
var desktop = Folder.desktop;
var myDocuments = Folder.myDocuments;
var filesInMyDocs = myDocuments.getFiles();
alert(commonFiles)
alert(desktop)
alert(myDocuments)
alert(filesInMyDocs)

