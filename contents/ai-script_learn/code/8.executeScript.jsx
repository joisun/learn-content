var repoDir =
  "/f/Desktop/";
var repoDirFolder = new Folder(repoDir);
var image1URI = repoDirFolder.absoluteURI + "/支付证明.jpg";
var image1File = new File(image1URI);
// equal to double click on os system
image1File.execute()