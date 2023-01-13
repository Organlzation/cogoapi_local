import axios from "axios";
import FormData from "form-data";

export default function freeboard_save(
  cookie: string,
  title: string,
  body: string
) {
  return new Promise<any>(async (resolve, reject) => {
    let ct = `application/x-www-form-urlencoded; charset=UTF-8`;
    let ua = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36`;

    var data = new FormData();
    data.append("f_board_title", title);
    data.append("f_board_txt", body);
    data.append("f_id", "");

    axios("https://cogo.co.kr/api/freeboard/save", {
      data: data,
      headers: {
        Cookie: cookie,
        ...data.getHeaders(),
        accept: "application/json, text/javascript, */*; q=0.01",
        "sec-ch-ua": `"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"`,
        "user-agent": ua,
        userAgent: ua,
        contentType: ct,
        "content-type": ct,
      },
      method: "POST",
    })
      .then((upload) => {
        resolve(upload.data);
      })
      .catch((e) => {
        resolve(e.data);
      });
  });
}
