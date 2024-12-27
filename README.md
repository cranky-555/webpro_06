# webpro_06のレポート

## 各機能の使用方法

1. ターミナルでapp5.jsが格納されているディレクトリーまで移動する
1. ```node app5.js``` を起動する
1. 新規ウィンドウでターミナルを開き、そこに```telnet localhost 8080```を打ちこむ
1. Webブラウザでhtml://localhost:8080/public/hoge.htmlにアクセス
(hogeは使いたいそれぞれの機能の名前を入力する)
1. 各機能で入力可能な箇所を、入力する


## ファイル一覧
ファイル名|説明
-|-
app5.js|プログラムの内容
janken.html|jankenの開始画面
kazuate.html|kazuateの開始画面
kisetu.html|kisetuの開始画面
test.html|htmlの基本的な型
Apple_logo_black.svg|Appleのロゴが格納されたファイル
janken.ejs|じゃんけんの結果と，次の手の候補を提供する
kazuate.ejs|数当ての結果と，次の数を打ち込むフォームを提供する
kisetu.ejs|選んだ季節の説明と，次の季節の選択肢を提供する
luck.ejs|おみくじの結果を提供する
show.ejs|英語と，フランス語の挨拶を提供する






## 各機能の説明
### hello1
実行すると"Hello"と，"Bon jour"を表示する
### hello2
実行すると"Hello"と，"Bon jour"を表示する
### icon
/iconにアクセスして，指定されたAppleのロゴ画像を表示する．画像が読み込めかった場合は，代替テキストとして"Apple Logo"を表示する
### luck
動作を開始すると，ランダムに6つの運勢から一つを選んで，今日の運勢として表示する
### janken
グー，チョキ，パーのうち一つを選んで入力すると，コンピューターとじゃんけんができる
### kazuate
1~10の整数のうち一つを選んで入力すると，コンピューターが選定した数字と合っているかでゲームができる
### kisetu
4つの指定された季節を選ぶと，その季節の説明を表示する

## 各機能の内部処理
### 初期設定
1. サーバーアプリケーションを立ち上げる
1. ejsファイルを使用することを宣言
1. publicファイルを使用できるようにする

### hello1
1. message1に"Hello"、message2に"Bon jour"を設定する
1. greet1と、greet2にそれぞれmessage1、message2を格納する
1. greet1と、greet2をshow.ejsファイルに送信する

### hello2
1. greet1と、greet2にそれぞれ直接"Hello"、"Bon jour"を設定する
1. greet1と、greet2をshow.ejsファイルに送信する

### icon
icon.ejsファイルに、filenameと、画像が表示されなかったときに、代わりとして表示されるalt属性のデータを送信する

### luck
1. numに1~6のランダムな整数を格納する
1. numの1~6に、それぞれの運勢(luck)を振り分ける
1. 運勢の結果を表示する
1. luck.ejsに、numと、luckのデータを送信する

### janken

```mermaid
flowchart TD;
a0[開始]-->a1[hand、win、totalを宣言]
a1-->a2[numに1~3のランダムな整数を代入し、手をそれぞれ割り振る]
a2-->a3{numとhandが一致するか}
a3-->|一致する|a4[引き分け]
a3-->|一致しない|a5{numにhandが勝ったか}
a5-->|勝った|a6[winに1を足す]
a5-->|それ以外|a7[負け]
a4-->a8[totalに1を足す]
a6-->a8
a7-->a8
a8-->a9[janken.ejsに送信するデータをdisplayに格納]
a9-->a10[janken.ejsにdisplayを送信]
a10-->a11[終了]
```
### kazuate

```mermaid
flowchart TD;
a0[開始]-->a1[入力されたnumberを取得]
a1-->a2[numberをvalueに格納]
a2-->a3[文字列であるvalueを数値であるnumに変換]
a3-->a4[randomNumberに1~10のランダムな整数を設定]
a4-->a5[resultを宣言]
a5-->a6{randomNumberと、numが一致するか}
a6-->|一致する|a7[resultに「あたり」を代入]
a6-->|一致しない|a8[resultに「はずれ」を代入]
a7-->a9[kazuate.ejsに送信するデータを、displayに格納]
a8-->a9
a9-->a10[kazuate.ejsにdisplayを送信]
a10-->a11[終了]

```
### kisetu

```mermaid
flowchart TD;
a0[開始]-->a1[入力されたradioを取得]
a1-->a2[radioをvalueに格納]
a2-->a3[文字列であるvalueを数値であるnumに変換]
a3-->a4[resultと、inoを宣言]
a4-->|numが1|a5[resultに春の説明、inoに春という文字列を代入]
a4-->|numが2|a6[resultに夏の説明、inoに夏という文字列を代入]
a4-->|numが3|a7[resultに秋の説明、inoに秋という文字列を代入]
a4-->|numが1~3以外|a8[resultに冬の説明、inoに冬という文字列を代入]
a5-->a9[result,inoをdisplayに格納]
a6-->a9[result,inoをdisplayに格納]
a7-->a9[result,inoをdisplayに格納]
a8-->a9[result,inoをdisplayに格納]
a9-->a10[displayをkisetu.ejsに送信]
a10-->a11[終了]
```
2024/11/16