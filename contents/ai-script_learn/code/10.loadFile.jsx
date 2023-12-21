// More info at https://javascript-tools-guide.readthedocs.io/file-system-access/using-file-and-folder-objects.html

// Access an image on your given the path
// open image in adobe illustrator
var repoDir =
  "/f/Desktop/";
var repoDirFolder = new Folder(repoDir);
var image1URI = repoDirFolder.absoluteURI + "/支付证明.jpg";
var image1File = new File(image1URI);
if (image1File.exists) {
    // Create a new document (you can also use the activeDocument if you want to place the image in the current document)
    var doc = app.documents.add();
    
    // Place the image in the document
    var placedItem = doc.placedItems.add();
    placedItem.file = image1File;
    
    // Optional: Set the position and size of the placed image
    placedItem.position = [0, 200]; // X and Y coordinates
    placedItem.width = 100; // Width in points
    placedItem.height = 200; // Height in points
} else {
    alert("Image file not found!");
}



