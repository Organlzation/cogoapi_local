import axios from "axios";
import FormData from "form-data";
import cheerio from "cheerio";

let langName: { [key: string]: string } = {
  "1": "c",
  "2": "cpp",
  "3": "java",
  "4": "py2",
  "5": "py3",
  "6": "php7",
  "7": "jsc",
  "8": "go",
  "9": "csharp",
  "10": "ruby",
  "11": "rust",
  "12": "haskell",
  "13": "pascal",
  "14": "plaintext",
  "15": "basic",
  "16": "c11",
  "17": "cpp14",
  "18": "cpp17",
};

export default function problems_submit(
  cookie: string,
  lang: string,
  pid: string,
  code: string
) {
  return new Promise<any>(async (resolve, reject) => {
    let dtx = await axios.get(`https://cogo.co.kr/problem/${pid}/editor`, {
      headers: {
        Cookie: cookie,
      },
    });
    let checkV = dtx.data as string;
    checkV = checkV.split('check_value: "')[1];
    checkV = checkV.split('",')[0];

    var data = new FormData();

    data.append("pcode", pid);
    data.append("cid", "");
    data.append("vcid", "");
    data.append("lid", "");
    data.append("iid", "");
    data.append("oj", "noj");
    data.append("coid", lang);
    data.append("lang", langName[lang as any as string] as string);
    data.append("solution", code);
    data.append("check_value", checkV);

    let ct = `application/x-www-form-urlencoded; charset=UTF-8`;
    let ua = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36`;

    const $ = cheerio.load(dtx.data);
    let xsrf = $('meta[name="csrf-token"]').attr("content");
    let pidx = dtx.data.split("pid:")[1].split(",")[0];
    data.append("pid", pidx);

    axios({
      method: "post",
      url: "https://cogo.co.kr/ajax/submitSolution",
      headers: {
        "X-CSRF-TOKEN": xsrf,
        Cookie: cookie,
        ...data.getHeaders(),
        accept: "application/json, text/javascript, */*; q=0.01",
        "sec-ch-ua": `"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"`,
        "user-agent": ua,
        userAgent: ua,
        contentType: ct,
        "content-type": ct,
      },
      data: data,
    })
      .then(function (d) {
        resolve({ ...d.data, ...{ xsrf: xsrf } });
        return;
      })
      .catch((e) => {
        resolve(e.data);
        return;
      });
  });
}
