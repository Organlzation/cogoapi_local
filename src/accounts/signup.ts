import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export default async function accounts_signup(props: {
  id: string;
  password: string;
  academy: string;
  name: string;
  email: string;
  phone: string;
  description: string;
}) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  const id = props.id;
  const pw = props.password;
  const ac = props.academy;
  const na = props.name;
  const em = props.email;
  const ph = props.phone;
  const de = props.description;

  return new Promise<any>((resolve, reject) => {
    client({
      method: "post",
      url: "https://cogo.co.kr/api/auth/join",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: {
        email: decodeURI(id as string),
        password: decodeURI(pw as string),
        password_confirm: decodeURI(pw as string),
        mt_division: decodeURI(ac as string),
        name: decodeURI(na as string),
        mt_email: decodeURI(em as string),
        mt_ph: decodeURI(ph as string),
        describes: decodeURI(de as string),
        mt_level: "1",
        agreement: "true",
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
