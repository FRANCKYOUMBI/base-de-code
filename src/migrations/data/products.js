const fs = require('fs');
const { v4 } = require('uuid');

const products = JSON.parse(fs.readFileSync('./good_products.json', 'utf8'));

const newProducts = [];

const previousImages = {};

for (const product of products) {
  const imageName = product.image.replace('./images/', '');
  if (product.image && !fs.existsSync(product.image)) {
    console.log(product.image);
  }
  if (imageName) {
    // console.log(imageName, v4());
    let ext = 'jpeg';
    if (imageName.includes('.png')) {
      ext = 'png';
    } else if (imageName.includes('.jpg')) {
      ext = 'jpg';
    } else if (imageName.includes('.webp')) {
      ext = 'webp';
    }
    const newImageName = previousImages[product.image]
      ? previousImages[product.image]
      : `${v4()}.${ext}`;
    // rename image name
    if (!previousImages[product.image]) {
      fs.renameSync(product.image, `./images/${newImageName}`);
    }
    newProducts.push({ ...product, image: newImageName, uuid: v4() });
    previousImages[product.image] = newImageName;
  } else {
    newProducts.push({ ...product, uuid: v4() });
  }
}

// save new products in other json
fs.writeFileSync('./good_products.json', JSON.stringify(newProducts, null, 2));
