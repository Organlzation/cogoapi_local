import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import FormData from "form-data";

export default async function accounts_profile_set(props: {
  cookie: string;
  pw: string;
  email: string;
  name: string;
  academy: string;
  phone: string;
}) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  const cookie = props.cookie;
  const pw = props.pw;
  const email = props.email;
  const name = props.name;
  const ac = props.academy;
  const pn = props.phone;
  return new Promise<any>((resolve, reject) => {
    jar.setCookie(decodeURI(cookie as string), "https://cogo.co.kr/");
    var data = new FormData();
    data.append("password", pw.toString());
    data.append("mt_email", email.toString());
    data.append("name", name.toString());
    data.append("mt_division", ac.toString());
    data.append("mt_ph", pn.toString());

    client({
      url: "https://cogo.co.kr/api/user/modify-myinfo",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-ch-ua": `Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24`,
      },
      method: "POST",
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
