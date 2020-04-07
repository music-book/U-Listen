import request from "@/utils/request";

// 获取专辑详情
export async function getAlbumDetail(id) {
  let results = request({
    url: "/album",
    params: {
      id: id,
      limit: 3
    }
  });
  return results;
}

// 获取专辑评论
export async function getAlbumComment(id, limit = 5) {
  let results = request({
    url: "/comment/album",
    params: {
      id: id,
      limit: limit
    }
  });
  return results;
}
