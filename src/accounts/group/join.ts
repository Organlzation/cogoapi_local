import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import FormData from "form-data";

export default async function accounts_group_join(
  cookie: string,
  groupCode: string
) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  return new Promise<any>((resolve, reject) => {
    jar.setCookie(decodeURI(cookie as string), "https://cogo.co.kr/");
    var data = new FormData();
    data.append("gcode", groupCode.toString());
    client({
      url: "https://cogo.co.kr/api/group/join-group",
      method: "POST",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-ch-ua": `Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24`,
      },
      data: data,
    })
      .then((v) => {
        resolve(v.data);
      })
      .catch((e) => {
        resolve(e.data);
      });
  });
}
