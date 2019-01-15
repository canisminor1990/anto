const fs   = require("fs");
const path = require("path");
const _    = require("lodash");

const rootPath = "public/components";
const rootDirs = fs.readdirSync(rootPath);

const Tree = {};

_.forEach(rootDirs, rootDir => {
  if (rootDir === ".DS_Store") return;
  const dirPaths = fs.readdirSync(path.join(rootPath, rootDir));

  _.forEach(dirPaths, dirPath => {
    if (dirPath === ".DS_Store") return;
    const imgPaths = fs.readdirSync(path.join(rootPath, rootDir, dirPath));
    if (!Tree[rootDir]) Tree[rootDir] = {};
    const imgTree = [];

    _.forEach(imgPaths, img => {
      if (dirPath === ".DS_Store") return;
      const name  = img.replace(".png", "");
      const png   = path.join("components", rootDir, dirPath, img);
      const layer = [rootDir, dirPath, name].join(" / ");
      const type  = [rootDir, dirPath].join(" / ");
      imgTree.push({ name, png, layer, type });
    });

    Tree[rootDir][dirPath] = imgTree;
  });
});

fs.writeFileSync("panel/symbol.json", JSON.stringify(Tree));
console.log(JSON.stringify(Tree))

