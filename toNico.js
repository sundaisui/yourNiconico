"use strict";
const userNameInput = document.getElementById("username");
const searchButton = document.getElementById("search");
const resultDivision = document.getElementById("result");
const niconicoLink = document.getElementById("niconico");

searchButton.addEventListener("click", () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時は処理を行わない
        return;
    }

    userNameInput.addEventListener(
  'keydown',
  (event) => {
    if (event.code === 'Enter') {
      searchButton.dispatchEvent(new Event('click'))
    }
  }
)


    // 動画番号を取得
    const movieNum = search(userName);
    // console.log(movieNum);

    // 検索結果エリアを作成
    resultDivision.innerText = "";

    // headerDivision の作成
    const headerDivision = document.createElement("div");
    headerDivision.setAttribute("class", "card-header text-bg-dark text-center");
    headerDivision.innerText = "私のニコニコ動画";

    // bodyDivision の作成
    const bodyDivision = document.createElement("div");
    bodyDivision.setAttribute("class", "card-body text-center");

    // ニコニコプレーヤーの埋め込みその1
    const scriptEl = document.createElement("script");
    scriptEl.setAttribute("class", "card-text text-center");
    const source = scriptUrl(movieNum)
    scriptEl.type = 'application/javascript';
    scriptEl.src = source;
    
    // ニコニコプレーヤーの埋め込みその2
    const noscriptEl = document.createElement('noscript');

    // ニコニコプレーヤーの埋め込みその3
    const movieEl = document.createElement("a");
    const link = aUrl(movieNum);
    movieEl.href = link;

    // ニコニコプレーヤーの埋め込みその5
    noscriptEl.appendChild(movieEl);
    resultDivision.appendChild(scriptEl);
    resultDivision.appendChild(noscriptEl);


    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute("class", "card text-center");

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // ニコニコ動画へのリンクの作成
    niconicoLink.innerHTML = "";
    const niconicoEl = document.createElement("a");
    niconicoEl.target = "_blank";
    niconicoEl.href = link;
    niconicoEl.textContent = `ニコニコ動画で開く`;
    niconicoEl.setAttribute("class", "btn btn-dark mt-3");
    niconicoLink.appendChild(niconicoEl);


});



/**
 * 名前の文字列を渡すと動画番号を返す関数
 * @param {string} userName
 * @return {string} 結果
 */
function search(userName) {
    // 全文字のコード番号を取得してそれを掛け合わせる
    let productOfCharCode = 1;
    for(let i=0; i<userName.length; i++){
        productOfCharCode *= userName.charCodeAt(i);
    }
    const lastMovie = 44489567; //2024年内最後の動画の動画番号
    const result = (productOfCharCode % lastMovie) + 1;
    return result;
}

// scriptタグに入れるリンクの生成
function scriptUrl(movieNum) {
    const scriptUrl = `https://embed.nicovideo.jp/watch/sm${movieNum}/script?w=800&h=450`;
    return scriptUrl;
}

// aタグに入れるリンクの生成
function aUrl(movieNum) {
    const aUrl = `https://www.nicovideo.jp/watch/sm${movieNum}`
    return aUrl;
}