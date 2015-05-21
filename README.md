#iframeを利用したモーダルについてのサンプル

作成しました。
アプリケーションを動かすには、

```
npm install
bower install
grunt server
```

をすると http://localhost:9000
にて動作確認できると思います。

---

単純なコードですが、app/scripts/main.js L:24あたりに記述してあります。
aタグのdata属性にて、iframeのsrcにgetパラメータなど付加できるようにしています。
また、一応負荷を図るためのテスト用のコードも追記しましたが、chromeのdevツールとにらめっこしながら
問題がないかはよく確認いたします。
