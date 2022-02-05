<?php
session_start();

// POSTされたトークンを取得
$token = isset($_POST["token"]) ? $_POST["token"] : "";
// セッション変数のトークンを取得
$session_token = isset($_SESSION["token"]) ? $_SESSION["token"] : "";
// セッション変数のトークンを削除
unset($_SESSION["token"]);
// POSTされたトークンとセッション変数のトークンの比較
if ($token != "" && $token == $session_token) {
	require_once 'function.php';
	if (isset($_POST['checks'])) {
		define('POST_URL', 'https://script.google.com/macros/s/AKfycbygHrQVluiaon7vD7DgE2R5hAoTK_bQcDsGm0S9f7mUQq79piyA2_RBgZroRUfAFqVC/exec');
		$post_data = [
			'name' => $_POST['name'],
			'email' => $_POST['email'],
			'company' => $_POST['company'],
			'checks' => $_POST['checks'],
			'money' => number_format($_POST['money']),
			'answer' => $_POST['answer'],
		];

		$ch = curl_init();
		curl_setopt_array($ch, [
			CURLOPT_URL => POST_URL,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_POST => true,
			CURLOPT_POSTFIELDS => http_build_query($post_data),
		]);
		$response = curl_exec($ch);
		$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
		$header = substr($response, 0, $header_size);
		curl_close($ch);
	}





	/*スプレッドシートの設定終了*/

   //管理者のメールアドレスを入力してください。
   $admin_mail = '';

	$header =  null;
	$Body = null;
	$auto_reply_subject = null;
	$auto_reply_text = null;
	$admin_reply_subject = null;
	$admin_reply_text = null;
	date_default_timezone_set('Asia/Tokyo');

	//日本語の使用宣言
	mb_language("ja");
	mb_internal_encoding("UTF-8");

	//ヘッダー情報を設定
	$header = "MIME-Version: 1.0\n";
	$header = "Content-Type: multipart/mixed;boundary=\"__BOUNDARY__\"\n";
	$header .= "From: web幹事 <".$admin_mail.">"."\n";
	$header .= "Reply-to: web幹事<".$admin_mail.">"."\n";

	//件名を設定
	$auto_reply_subject = "【Web幹事料金シミュレーター】お問合せ内容確認:" . $_POST['name'] . "\n";

	//本文を設定

	$auto_reply_text = "送信日時:" . date("Y-m-d H:i") . "\n";
	$auto_reply_text .= "以下の内容でお問合せを受け付けました。内容をご確認下さい。\n\n";
	$auto_reply_text .= "お問合せ内容\n";
	$check = count($_POST['checks']);
	for ($i = 0; $i < $check; $i++) {
		$auto_reply_text .= "・" . $_POST['checks'][$i] . "\n";
	}
	$auto_reply_text .= "選択内容\n";
	$max = count($_POST['answer']);
	for ($i = 0; $i < $max; $i++) {
		$auto_reply_text .= "・" . $_POST['answer'][$i] . "\n";
	}
	$auto_reply_text .= "合計金額:" . number_format($_POST['money']) . "\n";
	$auto_reply_text .= "氏名:" . $_POST['name'] . "\n";
	$auto_reply_text .= "メールアドレス:" . $_POST['email'] . "\n";
	$auto_reply_text .= "会社名:" . $_POST['company'] . "\n";



	// テキストメッセージをセット
	$body = "--__BOUNDARY__\n";
	$body .= "Content-Type: text/plain; charset=\"ISO-2022-JP\"\n\n";
	$body .= $auto_reply_text . "\n";
	$body .= "--__BOUNDARY__\n";

	//メール送信
	mb_send_mail($_POST['email'], $auto_reply_subject, $body, $header);

	//運営側へ送るメールの件名
	$admin_reply_subject = "【Web幹事料金シミュレーター】お問合せ内容確認:" . $_POST['name'] . "\n";

	$admin_reply_text = "送信日時:" . date("Y-m-d H:i") . "\n";
	$admin_reply_text .= "下記の内容でお問合せがされました。\n\n";
	$admin_reply_text .= "お問合せ内容\n";
	$check = count($_POST['checks']);
	for ($i = 0; $i < $check; $i++) {
		$admin_reply_text .= "・" . $_POST['checks'][$i] . "\n";
	}
	$admin_reply_text .= "選択内容\n";
	$max = count($_POST['answer']);
	for ($i = 0; $i < $max; $i++) {
		$admin_reply_text .= "・" . $_POST['answer'][$i] . "\n";
	}
	$admin_reply_text .= "合計金額:" . number_format($_POST['money']) . "\n";
	$admin_reply_text .= "氏名:" . $_POST['name'] . "\n";
	$admin_reply_text .= "メールアドレス:" . $_POST['email'] . "\n";
	$admin_reply_text .= "会社名:" . $_POST['company'] . "\n";

	// テキストメッセージをセット
	$body = "--__BOUNDARY__\n";
	$body .= "Content-Type: text/plain; charset=\"ISO-2022-JP\"\n\n";
	$body .= $admin_reply_text . "\n";
	$body .= "--__BOUNDARY__\n";



	//運営側へ送るメール
	mb_send_mail($admin_mail, $admin_reply_subject, $body, $header);

    require('mail.html');
} else {
	echo "ERROR：不正な登録処理です";
}
?>


