import { getDateScope, getYearMonthDay } from '@/common/utils';

let db;

try {
  db = wx.cloud.database();
} catch (error) {
  if (error.errCode === -1) {
    wx.cloud.init({
      env: 'release-r3j3z',
      traceUser: true
    });
    db = wx.cloud.database();
  } else {
    throw error;
  }
}

const _ = db.command

export async function queryAll(collection, where, orderBy) {  
  const target = db.collection(collection)
    .where(where)
    .orderBy(...orderBy);
  
  const MAX_LIMIT = 20;
  const { total } = await target.count();
  const batchTimes = Math.ceil(total / MAX_LIMIT);
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = target.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
    tasks.push(promise)
  }

  const batchResult = await Promise.all(tasks);

  const data = batchResult.reduce((result, current) => result.concat(current.data), []);
  return data;
}

export async function getAllRecord() {
  return await queryAll('record', {}, ['time', 'desc']);
}

export async function getRecordListByDate(yearMonthDay) {
  if (!Array.isArray(yearMonthDay)) {
    yearMonthDay = getYearMonthDay(new Date());
  }

  const { start, end } = getDateScope(...yearMonthDay);
  const result = await queryAll('record', { time: _.gte(start).or(_.lte(end)) }, ['time', 'desc']);
  
  return result;
}

export async function getRecordList(page = 1) {
  const MAX_LIMIT = 20;
  const { data } = await db
    .collection('record')
    .orderBy('time', 'desc')
    .skip(MAX_LIMIT * (page - 1))
    .limit(MAX_LIMIT)
    .get();
  return data;
}

export async function addRecord({ time, type='', amount=1, cate='', remark = '' }) {
  return await db.collection('record').add({
    data: {
      time,
      type,
      amount,
      remark,
      cate,
    }
  })
}

export async function updateRecord({ _id, time, type, amount, cate, remark = '' }) {
  return await db.collection('record')
    .doc(_id)
    .update({
      data: {
        time,
        type,
        cate,
        amount,
        remark,
      }
    });
}

export async function deleteRecord(_id) {
  return await db.collection('record')
    .doc(_id)
    .remove();
}

