import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import axios from "axios";
import cheerio from "cheerio";

export default function xsrfToken(cookie: string) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));

  return new Promise<any>((resolve, reject) => {
    jar.setCookieSync(cookie as string, "https://cogo.co.kr/");
    client({
      method: "GET",
      url: "https://cogo.co.kr/problem/0000148/editor",
      headers: {
        "sec-ch-ua": `Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24`,
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      },
    })
      .then((v) => {
        const $ = cheerio.load(v.data);
        resolve({
          xsrf: $('meta[name="csrf-token"]').attr("content"),
        });
        return;
      })
      .catch((e) => {
        resolve(e.data);
      });
  });
}
