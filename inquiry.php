<?php
session_start();

// 二重送信防止用トークンの発行
$token = uniqid('', true);;

//トークンをセッション変数にセット
$_SESSION['token'] = $token;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/result.css">
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
</head>

<body>

    <header class="money-header">
        <div class="money-header-inner">
            <img class="money-header-log" src="./img/logo.png" alt="">
            <p>web幹事</p>
        </div>
    </header>

    <main class="money-content">
        <div class="money-content-inner">
            <div class="money-step">
                <div class="money-step-inner">
                    <div class="money-step-summary">
                        <div>
                            <p>シミュレーション結果は<br class="display-sp"><span class="money-result"><?php echo number_format($_POST['money']); ?></span>円（税別）<br class="display-sp">でした！</p>
                        </div>
                        <div>
                            web幹事に登録されている5,000社の料金データから算出
                        </div>
                    </div>
                    <p class="money-step-text">
                        <span>ちょっと高い…</span>と感じたあなた！<br>
                        その料金<span>もっと安くできるかも</span>！？<br>
                        プロに相談して適正価格で発注しましょう！<br>
                    </p>
                    <img src="./img/web.jpeg" alt="" class="money-step-img">
                    <p class="money-step-heading">
                        無料相談受付中！お問い合わせはこちらから↓</p>
                    <form class="money-step-form" action="inquiry_mail.php" method="POST">
                        <div class="money-step-form-inner">
                            <div class="money-step-form-content">
                                <div class="money-step-form-row">
                                    <div class="money-step-form-col">
                                        <label class="money-step-form-label">
                                            お問い合わせ内容
                                        </label>
                                        <span class="money-step-form-badge badge-required">
                                            必須
                                        </span>
                                    </div>
                                    <div class="money-step-form-col">
                                        <div class="col-contents">
                                            <label for="tmpContents-1" class="money-step-form-checkbox">
                                                <input id="tmpContents-1" class="q1" type="checkbox" name="checks[]" value="制作会社の紹介" required> 制作会社の紹介
                                            </label>
                                            <label for="tmpContents-2" class="money-step-form-checkbox">
                                                <input id="tmpContents-2" class="q1" type="checkbox" name="checks[]"" value=" 相場の情報" required> 相場の情報
                                            </label>
                                            <label for="tmpContents-3" class="money-step-form-checkbox">
                                                <input id="tmpContents-3" class="q1" type="checkbox" name="checks[]"" value=" リニューアルの相談" required> リニューアルの相談
                                            </label>
                                            <label id="check-error" for="check" class="error"></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="money-step-form-row">
                                    <div class="money-step-form-col">
                                        <label class="money-step-form-label">お名前</label>
                                        <span class="money-step-form-badge badge-required">必須</span>
                                    </div>
                                    <div class="money-step-form-col">
                                        <input id="name" class="money-step-form-input" type="text" name="name" placeholder="田中太郎" value="" required>
                                        <label id="name-error" for="name" class="error">

                                        </label>
                                    </div>
                                </div>
                                <div class="money-step-form-row">
                                    <div class="money-step-form-col">
                                        <label class="money-step-form-label">会社名</label>
                                        <span class="money-step-form-badge badge-optional">任意</span>
                                    </div>
                                    <div class="money-step-form-col">
                                        <input class="money-step-form-input" type="text" name="company" placeholder="株式会社 example" value="">
                                    </div>
                                </div>
                                <div class="money-step-form-row">
                                    <div class="money-step-form-col">
                                        <label class="money-step-form-label">メールアドレス</label>
                                        <span class="money-step-form-badge badge-required">必須</span>
                                    </div>
                                    <div class="money-step-form-col">
                                        <input id="email" class="money-step-form-input" id="email" type="email" name="email" placeholder="example@mail.com" value="" required>
                                        <label id="email-error" for="email" class="error">
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" name="money" value="<?php echo $_POST['money']; ?>">


                            <?php $max = count($_POST['answer']); ?>
                            <?php for ($i = 0; $i < $max; $i++) { ?>
                                <?php echo '<input type ="hidden" name="answer[]" value="' . $_POST['answer'][$i] . '">'; ?>
                            <?php } ?>

                            <div class="money-step-form-present">
                                <img src="./img/present.png" alt="今なら制作会社選びに役立つ2冊をプレゼント！">
                            </div>
                            <input type="hidden" name="token" value="<?php echo $token;?>">
                        </div>
                        <button class="money-step-form-submit" type="submit" data-sending-text="送信中..." data-js-agree-submit="">
                            <i class="fas fa-arrow-alt-circle-right"></i>
                            無料で相談する
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main>
    <footer class="money-step-footer">
        <div class="money-step-footer-copyright">
            Copyright© Web幹事. All Rights Researved.
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="./js/validate.js"></script>
</body>

</html>