const express = require("express");
const path = require("path");
const { brotliCompressSync } = require("zlib");
const server = express();
const port = 4000;

//this allows our server to be able to read raw(json) form content
server.use(express.json());

//this allows our server to read urlencoded forms
server.use(express.urlencoded({ extended: true }));

const products = [
  {
    id: 1,
    name: "garri",
    quantity: 100,
    price: 300,
    imageUrl:
      "https://media.istockphoto.com/id/1166536178/photo/bowl-of-nigerian-garri-close-up.webp?s=612x612&w=is&k=20&c=Iwb2ZEX3gtGKUPKcXHt5iyUSuZsrRc3cYMu00qxF15U=",
  },
  {
    id: 2,
    name: "beans",
    quantity: 300,
    price: 50,
    imageUrl:
      "https://pixabay.com/link/?ua=cd3%3Dimage%26cd7%3Den%253Ablack%2Beyed%2Bpeas%253ANGA%26ec%3Dapi_ad%26ea%3Dnavigate%26el%3Dgetty%26tid%3DUA-20223345-1%26dr%3Dhttps%253A%252F%252Fpixabay.com%252Fimages%252Fsearch%252Fbeans%252F&next=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fblack-eyed-beans-gm1302956598-394545601%3Futm_source%3Dpixabay%26utm_medium%3Daffiliate%26utm_campaign%3DSRP_image_sponsored%26utm_content%3Dhttp%253A%252F%252Fpixabay.com%252Fimages%252Fsearch%252Fblack%252520eyed%252520peas%252F%26utm_term%3Dblack%2Beyed%2Bpeas&hash=1244b57206306961ccf17df00466438dfef9d4ff&=",
  },
  {
    id: 3,
    name: "cassava",
    quantity: 1000,
    price: 300,
    imageUrl:
      "https://pixabay.com/link/?ua=cd3%3Dimage%26cd7%3Den%253Acasava%253ANGA%26ec%3Dapi_ad%26ea%3Dnavigate%26el%3Dgetty%26tid%3DUA-20223345-1%26dr%3Dhttps%253A%252F%252Fpixabay.com%252F&next=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fmanihot-esculenta-in-the-traditional-colombian-market-gm1407205251-458496113%3Futm_source%3Dpixabay%26utm_medium%3Daffiliate%26utm_campaign%3DSRP_image_sponsored%26utm_content%3Dhttp%253A%252F%252Fpixabay.com%252Fimages%252Fsearch%252Fcasava%252F%26utm_term%3Dcasava&hash=0460fbd206d3d01214d621e48c3147c6afae4ce6&=",
  },
  { id: 4, name: "corn", quantity: 500, price: 20, imageUrl: "" },
  { id: 5, name: "agbado", quantity: 80, price: 200, imageUrl: "" },
];

let users = [
  {
    id: 1,
    email: "boye@gmail.com",
    firstName: "Olanrewaju",
    lastName: "Olaboye",
    password: "1234567",
  },
  {
    id: 2,
    email: "jamal@gmail.com",
    firstName: "Olajide",
    lastName: "Ibrahim",
    password: "1234567",
  },
  {
    id: 3,
    email: "dayo@gmail.com",
    firstName: "Olajide",
    lastName: "Longe",
    password: "1234567",
  },
];

//creating a controller/handler to the base/index url : localhost:4000
server.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World");
});

//renders all product page
server.get("/product", (req, res) => {
  // res.send({products : products});
  // console.log(__dirname);
  return res.sendFile(__dirname + "/views/products.html");
  // res.sendFile(process.cwd() + '/views/products.html');
  // res.sendFile(path.join(__dirname,  '/views/products.html'));
  // res.sendFile(path.join(__dirname,  '/views/products.html'));
});

//send all products data to all products page
server.get("/api/product", (req, res) => {
  res.send({ products });
});

server.get("/product/:id/", (req, res) => {
  console.log(req.params);
  return res.sendFile(__dirname + "/views/single-product.html");
});

server.get("/api/product/:id", (req, res) => {
  const productExist = products.find(
    (product) => product.id === Number(req.params.id)
  );
  if (productExist) {
    return res.status(200).send({ product: productExist });
  }
  return res.status(404).send({ message: "product not found" });
});

server.get("/login", (req, res) => {
  // console.log(__dirname);
  return res.sendFile(path.join(__dirname + "/views/login.html"));
});

server.post("/api/login", (req, res) => {
  console.log("form data submitted", req.body);
  const userExist = users.find((user) => user.email === req.body.email);
  if (userExist) {
    if (userExist.password === req.body.password) {
      return res.send({ user: userExist });
    } else {
      return res.status(400).send("incorrect password");
    }
  } else {
    return res.status(404).send("you dont have an account, signup");
  }
  return res.sendFile(path.join(__dirname + "/views/login.html"));
});

server.all("*", (req, res) => {
  return res.status(404).sendFile(path.join(__dirname, "views/not-found.html"));
});

server.listen(port, () =>
  console.log("server started and running on port " + port)
);
