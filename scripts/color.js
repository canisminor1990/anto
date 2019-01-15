const { parseFile } = require("kactus-cli");
const path          = require("path");
const fs            = require("fs");
const _             = require("lodash");
const { rgbaToHex } = require("hex-and-rgba");
const { rgb }       = require("polished");
const RootPath      = path.resolve("docs", "AFUX 色彩库", "Page 1");

const FormatColor = (color) => Math.floor(color * 255);

const HexColor = (color) => {
  if (color.alpha < 1) {
    return rgbaToHex(FormatColor(color.red), FormatColor(color.green), FormatColor(color.blue), color.alpha);
  } else {
    return rgb(FormatColor(color.red), FormatColor(color.green), FormatColor(color.blue));
  }
};

const BuildData = () => {
  console.log("[start] build");
  const Data    = [];
  const RootDir = fs.readdirSync(RootPath);
  _.forEach(RootDir, a => {
    if (a === "page.json") return;
    const Artboard     = JSON.parse(fs.readFileSync(path.join(RootPath, a, "artboard.json")));
    const ArtboardName = Artboard.name.split("-");
    const ArtboardData = {
      key   : ArtboardName[0],
      name  : ArtboardName[1],
      colors: []
    };
    const Dir          = fs.readdirSync(path.join(RootPath, a));
    _.forEach(Dir, s => {
      if (s === "artboard.json") return;
      const Shape     = JSON.parse(fs.readFileSync(path.join(RootPath, a, s)));
      const ShapeName = Shape.name.split("-");
      if (!Shape.style.fills || Shape.style.fills.length === 0) return;
      const Fill = Shape.style.fills[0];

      const ShapeData = {
        key : ShapeName[0],
        name: ShapeName[1],
        type: Fill.fillType === 0 ? "Color" : "Gradient"
      };

      if (Fill.fillType === 0) {
        ShapeData.color = HexColor(Fill.color);
      } else {
        const Setting = {
          gradientType: "Linear",
          from        : {
            x: 0,
            y: 0
          },
          to          : {
            x: 50,
            y: 50
          },
          stops       : []
        };
        _.forEach(Fill.gradient.stops, stop => {
          Setting.stops.push({
                               color   : HexColor(stop.color),
                               position: stop.position
                             });
        });
        ShapeData.color = Setting;
      }

      ArtboardData.colors.push(ShapeData);
    });
    Data.push(ArtboardData);
  });
  fs.writeFileSync("panel/color.json", JSON.stringify(Data));
};

parseFile(path.resolve("docs", "AFUX 色彩库.sketch")).then(BuildData());