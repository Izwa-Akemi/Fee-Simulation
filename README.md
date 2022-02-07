##WEB幹事料金シミュレーションを模写
## 動作確認
本コードを実行した際の動作は下記のURLを参照下さい

http://rootcox.sakura.ne.jp/money-sumirate/index.html

## ダウンロード方法

git clone https://github.com/Izwa-Akemi/Fee-Simulation

zipファイルでダウンロードしてください
## システム概要
このシステムは、web幹事料金シミュレーションを模写したものです。該当箇所を入力後、「無料で相談する」ボタンを押下すると、管理者と入力者両方にメールが飛ぶと同時に、入力内容がスプレッドシートにも入力されます。そのため、初期設定時に管理者様のメールアドレスを設定していただく必要があります。　　
## 初期設定
　inquiry_mail.phpの43行目のメールアドレスを入力してください
 
 　43行目に下記の記載があるため、例を基にこの部分にメールアドレスの記載をお願いします。　　
　`//管理者のメールアドレスを入力してください。`  
   `$admin_mail = '';`  
   例） `$admin_mail = 'test@test.co.jp';`  


## スプレッドシート　URL
https://docs.google.com/spreadsheets/d/1Sh4sd_01QbX37daW919FYHgJPad92GeNI2v7o4Oy70c/edit?usp=sharing

