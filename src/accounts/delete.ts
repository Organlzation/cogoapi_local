import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export default async function accounts_delete(cookie: string) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  return new Promise<any>((resolve, reject) => {
    jar.setCookie(decodeURI(cookie as string), "https://cogo.co.kr/");

    client({
      method: "DELETE",
      url: "https://cogo.co.kr/api/auth/leave-app",
      headers: {},
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
