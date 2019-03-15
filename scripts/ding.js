const fetch   = require("node-fetch");
const fs      = require("fs");
const _       = require("lodash");
const webhook = require("./webhook.json");

fetch("https://api.github.com/repos/canisminor1990/anto/releases/latest")
  .then(res => res.json())
  .then(json => {
    const { name, body, assets } = json;
    const title                  = `${name} 现已发布 🚀`;
    const cover                  = "https://raw.githubusercontent.com/canisminor1990/anto/master/docs/banner.png";
    const feedback               = "- 意见反馈：@倏昱 (钉钉群: 21941480)";
    const postData               = {
      actionCard: {
        title         : title,
        text          : `![screenshot](${cover}) \n\n ## ${title} \n\n ${body} \n\n ${feedback}`,
        btnOrientation: "0",
        btns          : [
          {
            title    : "查看更新说明",
            actionURL: "https://www.yuque.com/canisminor/anto/changelog"
          },
          {
            title    : "下载插件",
            actionURL: assets[0].browser_download_url
          }
        ]
      },
      msgtype   : "actionCard"
    };

    _.forEach(webhook, url => fetchPost(url, JSON.stringify(postData)));
  });

function fetchPost(url, body) {
  const config = {
    method : "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body   : body
  };
  fetch(url, config)
    .then((response) => {
      console.log(url);
    });
}



