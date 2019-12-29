// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { content } = event;
  console.log('event', event);
  console.log('content', content);
  try {
    await cloud.openapi.security.msgSecCheck({content});
    return true;
  } catch (err) {
    console.log(err);
    return false;
  };
}