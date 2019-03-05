const fs     = require("fs");
const _      = require("lodash");
const mdjson = require("md-2-json");

let doc = fs.readFileSync("docs/AFUX 话术.md", { encoding: "utf8" });
doc = mdjson.parse(doc.replace("：",': '))

class Doc {
  constructor(data) {
    this.data = data;
  }

  H1(data) {
    const Data = [];
    _.forEach(data, (obj, key) => Data.push({ title: key, group: this.H2(obj) }));
    return Data;
  }

  H2(data) {
    const Data = [];
    _.forEach(data, (obj, key) => Data.push({ title: key, group: this.H3(obj) }));
    return Data;
  }

  H3(data) {
    const Data = [];
    _.forEach(data, (obj, key) => Data.push({ title: key, group: this.H4(obj) }));
    return Data;
  }

  H4(data) {
    const Data = [];
    _.forEach(data, (obj, key) => Data.push({ title: this.handleTag(key), ...this.Content(obj.raw) }));
    return Data;
  }

  Content(data) {
    const Data =  data.split(/\n\n\n/g);
    const Example = Data[1].split("- 错误:")
    _.forEach(Example,(text,index) =>{
      text = text.replace("- 正确:","").replace(/\n/g,"")
      Example[index] = this.handleTag(text)
    })
    return {
      desc: Data[0],
      true:Example[0],
      wrong:Example[1]
    };
  }

  handleTag(tags) {
    return tags.replace(/ /g, "").split("|");
  }

  run() {
    return this.H1(this.data);
  }
}

const newDoc = (new Doc(doc)).run();

console.log(JSON.stringify(newDoc, null, 2));

fs.writeFileSync('panel/word.json',JSON.stringify(newDoc))
