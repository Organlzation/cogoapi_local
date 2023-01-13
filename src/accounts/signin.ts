import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export default async function accounts_signin(id: string, pw: string) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));

  return new Promise<any>((resolve, reject) => {
    client({
      method: "post",
      url: "https://cogo.co.kr/api/auth/login",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: {
        email: decodeURI(id as string),
        password: decodeURI(pw as string),
      },
    })
      .then((v) => {
        if (v.data.result == "success") {
          resolve({
            ...v.data,
            code: jar.getCookieStringSync("https://cogo.co.kr/"),
          });
          return;
        }
        resolve(v.data);
        return;
      })
      .catch((e) => {
        resolve(e.data);
      });
  });
}
