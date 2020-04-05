import request from "../utils/request";

// 获取 top mv 列表
export async function getPopularList(limit = 10) {
  let results = request({
    url: `top/mv`,
    params: {
      limit: limit
    }
  });

  return results;
}

// 获取 mv url
export async function getMvURL(id) {
  let results = request({
    url: "/mv/url",
    params: {
      id: id
    }
  });

  return results;
}
