const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;
  let total = Number( req.query.total ) || 0;

  console.log( {hand, win, total});

  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (hand == cpu) {
    judgement = '引き分け';
  } else if (
    (hand == 'グー' && cpu == 'チョキ') ||
    (hand == 'チョキ' && cpu == 'パー') ||
    (hand == 'パー' && cpu == 'グー') 
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }

  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('janken', display);
});

//数当てゲーム
app.get("/kazuate", (req, res) => {
const value = req.query.number;
const num = Number( value );
const randomNumber = Math.floor(Math.random() * 10 + 1);
let result = '';
if (num === randomNumber) {
  result = '当たりやで、やるやん';
} else {
  result = `ハズレですよ^^(草)`;
}
const display = {
  value: value,
  randomNumber: randomNumber,
  result: result
};
res.render('kazuate',display);
});

//季節の説明
app.get("/kisetu", (req, res) => {
  const value = req.query.radio;
  const num = Number(value);
  let result = '';
  let ino = '';
  if (num === 1) {
    result = '春は桜が咲き、暖かくなります。';
    ino = '春';
  } else if(num ===2 ){
    result = `夏は暑く、晴れの日が多いです。`;
    ino = '夏';
  } else if(num === 3){
    result = `秋は紅葉が美しく、涼しい季節です。`;
    ino = '秋';
  }else{
    result = '冬は寒く、雪が降ることもあります。';
    ino = '冬';
  }
  const display = {
    ino: ino,
    result: result
  };
  res.render('kisetu',display);
  });


app.listen(8080, () => console.log("Example app listening on port 8080!"));