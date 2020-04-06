import request from "@/utils/request";

// 用户登录-手机登录
export async function loginByPhone(phone, password) {
  let results = request({
    url: `login/cellphone`,
    params: {
      phone: phone,
      password: password
    }
  });

  return results;
}
