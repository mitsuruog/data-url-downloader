import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const $form = document.querySelector("form");
  const $input = document.querySelector("input");
  const $textarea = document.querySelector("textarea");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dataURL = $textarea.value;
    const fileName = $input.value ?? "download.zip";

    // Data URLからメディアタイプとBase64エンコードされたデータを分離
    var parts = dataURL.split(";base64,");
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    // Blobオブジェクトを作成
    var blob = new Blob([uInt8Array], { type: contentType });

    // Blobからダウンロードリンクを作成
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // 後処理
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  });
});
