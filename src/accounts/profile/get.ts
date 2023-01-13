import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export default async function accounts_profile_get(cookie: string) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  return new Promise<any>((resolve, reject) => {
    jar.setCookie(decodeURI(cookie as string), "https://cogo.co.kr/");

    client({
      url: "https://cogo.co.kr/my/profile",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-ch-ua": `Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24`,
      },
    })
      .then((v) => {
        let lvSt = `Lv.`;
        let rkSt = `등수`;
        let rlSt = `<span class="ff_tit">`;
        let svSt = `맞춘 문제수</span>`;
        let smSt = `제출수</span>`;
        let ceSt = `컴파일 에러</span>`;
        let acSt = `학교/학원</span>`;
        let vd = v.data.toString() as string;
        let lv1 = vd.substring(vd.indexOf(lvSt) + lvSt.length);
        let level = lv1.substring(0, lv1.indexOf("</span>"));
        let lv2 = lv1.substring(lv1.indexOf("<span>") + "<span>".length);
        let name = lv2.substring(0, lv2.indexOf("</span>") - 1);
        let lv3 = lv2.substring(lv2.indexOf(rkSt));
        let lv4 = lv3.substring(lv3.indexOf(rlSt) + rlSt.length);
        let rank = lv4.substring(0, lv4.indexOf("</span>"));
        let lv5 = lv4.substring(lv4.indexOf(svSt) + svSt.length);
        let lv6 = lv5.substring(lv5.indexOf(">") + 1);
        let solvedProblem = lv6.substring(0, lv6.indexOf("</span>"));
        let lv7 = lv6.substring(lv6.indexOf(smSt) + smSt.length);
        let lv8 = lv7.substring(lv7.indexOf(">") + 1);
        let submittedCount = lv8.substring(0, lv8.indexOf("</span>"));
        let lv9 = lv8.substring(lv8.indexOf(ceSt) + ceSt.length);
        let lv10 = lv9.substring(lv9.indexOf(">") + 1);
        let compileErrorCount = lv10.substring(0, lv10.indexOf("</span>"));
        let lv11 = lv10.substring(lv10.indexOf(acSt) + acSt.length);
        let lv12 = lv11.substring(lv11.indexOf(">") + 1);
        let academy = lv12.substring(0, lv12.indexOf("</span>"));
        resolve({
          name: name,
          level: level,
          rank: rank,
          solvedProblem: solvedProblem,
          submittedCount: submittedCount,
          compileErrorCount: compileErrorCount,
          academy: academy,
        });
        return;
      })
      .catch((e) => {
        resolve(e.data);
      });
  });
}
