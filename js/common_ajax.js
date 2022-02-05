$(function () {

    let currentFirstQuizNo = 0;//最初の問題番号
    let currentQuizNo = -1;//2問目以降取り出す際の変数
    let total;
    let jsonData = [];
    loadFirst();//最初の問題のJSONを読み込み[0]
    loadcompany();//企業情報の問題のJSONを読み込み[1]
    loadRecruit();//採用情報の問題のJSONを読み込み[2]
    loadgoods();//商品・サービスの問題のJSONを読み込み[3]
    loadlanding();//ランディングの問題のJSONを読み込み[4]
    loadecsite();//ecサイトの問題のJSONを読み込み[5]
    loadmedia();//オウンドメディの問題のJSONを読み込み[6]
    let displayCompanyQuizNo = jsonData[1].question.length;//企業情報の表示問題数
    let displayRecruitQuizNo = jsonData[2].question.length;//採用情報の表示問題数
    let displayGoodsQuizNo = jsonData[3].question.length;//企業情報の表示問題数
    let displayLandingQuizNo = jsonData[4].question.length;//採用情報の表示問題数
    let displayECsiteQuizNo = jsonData[5].question.length;//企業情報の表示問題数
    let displayMediaQuizNo = jsonData[6].question.length;//採用情報の表示問題数
    let totalMoney = new Array();//回答した際の金額を保存する配列
    let subMoney = new Array();//合計金額を保存するための配列
    var a;//金額を計算する用の変数
    var cal;
    var quiz_title = new Array();//クイズの問題文を保存する配列
    var select_answer = new Array();//クイズの回答を保存する配列

    /*==========オープニング画面を読み込む======*/
    loadOPpage();
    function loadOPpage() {
        var header = '<header class="money-header is-step">';
        header += '<div class="money-header-inner">';
        header += '<img src="./img/logo.png" class="money-header-logo">';
        header += '</div>';
        header += '</header>';
        var ins = '<div class="money">';
        ins += '<main class="money-content">';
        ins += '<div class="money-content-inner">';
        ins += '<div class="money-step">'
        ins += '<p class="money-step-lead">';
        ins += '<img src="./img/balloon.png">';
        ins += "国内約";
        ins += '<span>' + '5' + ',' + '000' + '</span>' + "社の" + '<br class="display-sp">' + "料金相場から算出" + '</p>';
        ins += '<h1 class="money-step-title">';
        ins += "ホームページ料金" + '<br class="display-sp">' + "シミュレーター" + '</h1>';
        ins += '<p class="money-step-desc">';
        ins += '右も左も分からないホームページ制作、結局のところ、まず費用はどれくらいかかるのか？を';
        ins += '<br class="display-pc">' + "サクッと知りたくありませんか？Web幹事のホームページ料金シミュレーターなら";
        ins += '<br class="display-pc">' + "約5,000社の相場から算出された費用が、たった60秒でわかります！" + '</p>'
        ins += '<img src="./img/preview.png" alt="ホームページ料金シミュレーター" class="money-step-preview">';
        ins += '<button class="money-step-start">';
        ins += '<i class="fas fa-arrow-alt-circle-right">';
        ins += '</i>';
        ins += "シミュレーションしてみる";
        ins += '</button>';
        ins += '</div>';
        ins += '</div>';
        ins += '</main>';
        ins += '</div>';
        $('header').html(header);
        $('#content').html(ins);
    }
    /*==========シミュレーションしてみるのボタンを押下したときの動作======*/
    $('.money-step-start').on('click', function () {
        $("header").removeClass("is-step");
        loadFirstQuestion();
        nextQuiz();
    })
    /*==========ヘッダーを読み込む======*/

    /*===企業情報ヘッダー===*/
    function loadCompanyHeader() {
        var header = '<div class="money-header-inner">';
        header += '<img src="./img/logo.png" class="money-header-logo" alt="">';
        header += '<div class="money-indicator">';
        header += '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + displayCompanyQuizNo + '</span>' + "問" + '</div>';
        header += '<ul class="money-indicator-list">';
        for (var i = 0; i < jsonData[1].question.length; i++) {
            header += '<li class="money-indicator-list-item">';
            header += '</li>';
        }
        header += '</ul>';
        header += '</div>';
        header += '</div>';
        $('header').html(header);
    }
     /*===採用ヘッダー===*/
    function loadRecruitHeader() {
        var header = '<div class="money-header-inner">';
        header += '<img src="./img/logo.png" class="money-header-logo" alt="">';
        header += '<div class="money-indicator">';
        header += '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + displayRecruitQuizNo + '</span>' + "問" + '</div>';
        header += '<ul class="money-indicator-list">';
        for (var i = 0; i < jsonData[2].question.length; i++) {
            header += '<li class="money-indicator-list-item">';
            header += '</li>';
        }
        header += '</ul>';
        header += '</div>';
        header += '</div>';
        $('header').html(header)
    }
      /*===商品・サービスヘッダー===*/
    function loadGoodsHeader() {
        var header = '<div class="money-header-inner">';
        header += '<img src="./img/logo.png" class="money-header-logo" alt="">';
        header += '<div class="money-indicator">';
        header += '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + displayGoodsQuizNo + '</span>' + "問" + '</div>';
        header += '<ul class="money-indicator-list">';
        for (var i = 0; i < jsonData[3].question.length; i++) {
            header += '<li class="money-indicator-list-item">';
            header += '</li>';
        }
        header += '</ul>';
        header += '</div>';
        header += '</div>';
        $('header').html(header);
    }
      /*===LPヘッダー===*/
      function loadLPHeader() {
        var header = '<div class="money-header-inner">';
        header += '<img src="./img/logo.png" class="money-header-logo" alt="">';
        header += '<div class="money-indicator">';
        header += '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + displayLandingQuizNo + '</span>' + "問" + '</div>';
        header += '<ul class="money-indicator-list">';
        for (var i = 0; i < jsonData[4].question.length; i++) {
            header += '<li class="money-indicator-list-item">';
            header += '</li>';
        }
        header += '</ul>';
        header += '</div>';
        header += '</div>';
        $('header').html(header);
    }

      /*===ECヘッダー===*/
      function loadECHeader() {
        var header = '<div class="money-header-inner">';
        header += '<img src="./img/logo.png" class="money-header-logo" alt="">';
        header += '<div class="money-indicator">';
        header += '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + displayECsiteQuizNo + '</span>' + "問" + '</div>';
        header += '<ul class="money-indicator-list">';
        for (var i = 0; i < jsonData[5].question.length; i++) {
            header += '<li class="money-indicator-list-item">';
            header += '</li>';
        }
        header += '</ul>';
        header += '</div>';
        header += '</div>';
        $('header').html(header);
    }
     /*===ECヘッダー===*/
     function loadMediaHeader() {
        var header = '<div class="money-header-inner">';
        header += '<img src="./img/logo.png" class="money-header-logo" alt="">';
        header += '<div class="money-indicator">';
        header += '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + displayMediaQuizNo + '</span>' + "問" + '</div>';
        header += '<ul class="money-indicator-list">';
        for (var i = 0; i < jsonData[6].question.length; i++) {
            header += '<li class="money-indicator-list-item">';
            header += '</li>';
        }
        header += '</ul>';
        header += '</div>';
        header += '</div>';
        $('header').html(header);
    }
    /*======最初の問題画面=======*/
    function loadFirstQuestion() {
        var ins = '<main class="money-content">';
        ins += '<div class="money-content-inner">';
        ins += '<div class="money-step">';
        ins += '<p class="money-step-title">' + jsonData[0].question[currentFirstQuizNo].title + '</p>';
        ins += '<div class="money-step-select">';
        for (var i = 0; i < jsonData[0].question[currentFirstQuizNo].answer.length; i++) {
            ins += '<div class="money-step-select-item">';
            ins += '<div class="money-step-select-item-help">';
            ins += jsonData[0].question[currentFirstQuizNo].subtitle[i];
            ins += '</div>';
            ins += '<button question="' + i + '" value ="' + jsonData[0].question[currentFirstQuizNo].money[i] + ','+ jsonData[0].question[currentFirstQuizNo].title + ','+ jsonData[0].question[currentFirstQuizNo].answer[i] + '" class="money-step-select-item-btn question-choice">';
            ins += '<img src="' + jsonData[0].question[currentFirstQuizNo].img[i] + '" alt="">';
            ins += '<span class="money-step-select-item-btn-text">' + jsonData[0].question[currentFirstQuizNo].answer[i] + '</span>';
            ins += '</button>';
            ins += '</div>';
        }
        ins += '</div>';
        ins += '<div class="money-select-amount">'
        ins += "現在の概算料金"
        ins += '<span>' + 0 + '</span>';
        ins += '円（税込み）';
        ins += '</div>';
        ins += '</div>';

        ins += '</div>';
        ins += '</main>';
        $('#content').html(ins);

    }
    /*======企業情報の問題画面=======*/
    function loadCompanyQuestion() {
        var ins = '<main class="money-content">';
        ins += '<div class="money-content-inner">';
        ins += '<div class="money-step">';
        ins += '<h1 class="money-step-title" id="title" category="company">' + jsonData[1].question[currentQuizNo].title + '</h1>';
        ins += '<div class="money-step-select">';
        for (var i = 0; i < jsonData[1].question[currentQuizNo].answer.length; i++) {
            ins += '<div class="money-step-select-item">';
            a = (jsonData[1].question[currentQuizNo].money[i] * total) - subMoney[currentQuizNo];

            if (jsonData[1].question[currentQuizNo].img.length == 0) {
                if (currentQuizNo ==6) {
                    ins += '<button question="' + 0 + '" value ="' + a +','+ jsonData[1].question[currentQuizNo].title + ',' + jsonData[1].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[1].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 0 + '" value ="' + jsonData[1].question[currentQuizNo].money[i] +','+ jsonData[1].question[currentQuizNo].title +',' + jsonData[1].question[currentQuizNo].answer[i] +  '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[1].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            } else {
                if (currentQuizNo ==6) {
                    ins += '<button question="' + 0 + '" value ="' + a + ','+ jsonData[1].question[currentQuizNo].title +',' + jsonData[1].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[1].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[1].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 0 + '" value ="' + jsonData[1].question[currentQuizNo].money[i] +','+ jsonData[1].question[currentQuizNo].title +',' + jsonData[1].question[currentQuizNo].answer[i] +  '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[1].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[1].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            }
            ins += '</div>';
        }
        ins += '</div>';
        ins += '<div class="money-select-explanation">';
        ins += '<img src="./img/info.png" alt="">'
        ins += '<span>';
        ins += jsonData[1].question[currentQuizNo].explanation;
        ins += '</span>';
        ins += '</div>';
        ins += '<div id="money">'
        ins += '</div>';
        if ((currentQuizNo + 2) > 2 && (currentQuizNo + 2) < jsonData[1].question.length + 2) {
            ins += '<div class="money-select-bar">'
            ins += '<button class="money-select-bar-back back" type="button">';
            ins += '<i class="fas fa-chevron-left"></i>';
            ins += '前の質問に戻る';
            ins += '</button>';
            ins += '</div>'
        }
        ins += '</div>';
        ins += '</div>';

        ins += '</main>';
        $('#content').html(ins);

    }
    /*======採用情報の問題画面=======*/
    function loadRecruitQuestion() {
        var ins = '<main class="money-content">';
        ins += '<div class="money-content-inner">';
        ins += '<div class="money-step">';
        ins += '<h1 class="money-step-title" id="title" category="recruit">' + jsonData[2].question[currentQuizNo].title + '</h1>';
        ins += '<div class="money-step-select">';
        for (var i = 0; i < jsonData[2].question[currentQuizNo].answer.length; i++) {
            ins += '<div class="money-step-select-item">';
            a = (jsonData[2].question[currentQuizNo].money[i] * total) - subMoney[currentQuizNo];

            if (jsonData[2].question[currentQuizNo].img.length == 0) {
                if (currentQuizNo ==6) {
                    ins += '<button question="' + 1 + '" value ="' + a +','+ jsonData[2].question[currentQuizNo].title +',' + jsonData[2].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[2].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 1 + '" value ="' + jsonData[2].question[currentQuizNo].money[i] +','+ jsonData[2].question[currentQuizNo].title +',' + jsonData[2].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[2].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            } else {
                if (currentQuizNo ==6) {
                    ins += '<button question="' + 1 + '" value ="' + a + ','+ jsonData[2].question[currentQuizNo].title +',' + jsonData[2].question[currentQuizNo].answer[i] +'" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[2].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[2].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 1 + '" value ="' + jsonData[2].question[currentQuizNo].money[i] +','+ jsonData[2].question[currentQuizNo].title +',' + jsonData[2].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[2].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[2].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            }
            ins += '</div>';
        }
        ins += '</div>';
        ins += '<div class="money-select-explanation">';
        ins += '<img src="./img/info.png" alt="">'
        ins += '<span>';
        ins += jsonData[2].question[currentQuizNo].explanation;
        ins += '</span>';
        ins += '</div>';
        ins += '<div id="money">'
        ins += '</div>';
        if ((currentQuizNo + 2) > 2 && (currentQuizNo + 2) < jsonData[2].question.length + 2) {
            ins += '<div class="money-select-bar">'
            ins += '<button class="money-select-bar-back back" type="button">';
            ins += '<i class="fas fa-chevron-left"></i>';
            ins += '前の質問に戻る';
            ins += '</button>';
            ins += '</div>'
        }
        ins += '</div>';
        ins += '</div>';

        ins += '</main>';
        $('#content').html(ins);

    }

    /*======商品サービスサイトの問題画面=======*/
    function loadGoodsQuestion() {
        var ins = '<main class="money-content">';
        ins += '<div class="money-content-inner">';
        ins += '<div class="money-step">';
        ins += '<h1 class="money-step-title" id="title" category="goods">' + jsonData[3].question[currentQuizNo].title + '</h1>';
        ins += '<div class="money-step-select">';
        for (var i = 0; i < jsonData[3].question[currentQuizNo].answer.length; i++) {
            ins += '<div class="money-step-select-item">';
            a = (jsonData[3].question[currentQuizNo].money[i] * total) - subMoney[currentQuizNo];

            if (jsonData[3].question[currentQuizNo].img.length == 0) {
                if (currentQuizNo ==6) {
                    ins += '<button question="' + 2 + '" value ="' + a +',' + jsonData[3].question[currentQuizNo].title +',' + jsonData[3].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[3].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 2 + '" value ="' + jsonData[3].question[currentQuizNo].money[i] +',' + jsonData[3].question[currentQuizNo].title +',' + jsonData[3].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[3].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            } else {
                if (currentQuizNo ==6) {
                    ins += '<button question="' + 2 + '" value ="' + a +',' + jsonData[3].question[currentQuizNo].title + ',' + jsonData[3].question[currentQuizNo].answer[i] +'" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[3].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[3].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 2 + '" value ="' + jsonData[3].question[currentQuizNo].money[i] +',' + jsonData[3].question[currentQuizNo].title +',' + jsonData[3].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[3].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[3].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            }
            ins += '</div>';
        }
        ins += '</div>';
        ins += '<div class="money-select-explanation">';
        ins += '<img src="./img/info.png" alt="">'
        ins += '<span>';
        ins += jsonData[3].question[currentQuizNo].explanation;
        ins += '</span>';
        ins += '</div>';
        ins += '<div id="money">'
        ins += '</div>';
        if ((currentQuizNo + 2) > 2 && (currentQuizNo + 2) < jsonData[3].question.length + 2) {
            ins += '<div class="money-select-bar">'
            ins += '<button class="money-select-bar-back back" type="button">';
            ins += '<i class="fas fa-chevron-left"></i>';
            ins += '前の質問に戻る';
            ins += '</button>';
            ins += '</div>'
        }
        ins += '</div>';
        ins += '</div>';

        ins += '</main>';
        $('#content').html(ins);

    }

     /*======LPの問題画面=======*/
     function loadLPQuestion() {
        var ins = '<main class="money-content">';
        ins += '<div class="money-content-inner">';
        ins += '<div class="money-step">';
        ins += '<h1 class="money-step-title" id="title" category="LP">' + jsonData[4].question[currentQuizNo].title + '</h1>';
        ins += '<div class="money-step-select">';
        for (var i = 0; i < jsonData[4].question[currentQuizNo].answer.length; i++) {
            ins += '<div class="money-step-select-item">';
            a = (jsonData[4].question[currentQuizNo].money[i] * total) - subMoney[currentQuizNo];

            if (jsonData[4].question[currentQuizNo].img.length == 0) {
                if (currentQuizNo ==4 || currentQuizNo ==5) {
                    ins += '<button question="' + 3 + '" value ="' + a + ','+ jsonData[4].question[currentQuizNo].title + ','+ jsonData[4].question[currentQuizNo].answer[i] +'" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[4].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 3 + '" value ="' + jsonData[4].question[currentQuizNo].money[i] + ','+ jsonData[4].question[currentQuizNo].title +','+ jsonData[4].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[4].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            } else {
                if (currentQuizNo ==4 || currentQuizNo ==5) {
                    ins += '<button question="' + 3 + '" value ="' + a + ','+ jsonData[4].question[currentQuizNo].title +','+ jsonData[4].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[4].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[4].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 3 + '" value ="' + jsonData[4].question[currentQuizNo].money[i] + ','+ jsonData[4].question[currentQuizNo].title +','+ jsonData[4].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[4].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[4].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            }
            ins += '</div>';
        }
        ins += '</div>';
        ins += '<div class="money-select-explanation">';
        ins += '<img src="./img/info.png" alt="">'
        ins += '<span>';
        ins += jsonData[4].question[currentQuizNo].explanation;
        ins += '</span>';
        ins += '</div>';
        ins += '<div id="money">'
        ins += '</div>';
        if ((currentQuizNo + 2) > 2 && (currentQuizNo + 2) < jsonData[4].question.length + 2) {
            ins += '<div class="money-select-bar">'
            ins += '<button class="money-select-bar-back back" type="button">';
            ins += '<i class="fas fa-chevron-left"></i>';
            ins += '前の質問に戻る';
            ins += '</button>';
            ins += '</div>'
        }
        ins += '</div>';
        ins += '</div>';

        ins += '</main>';
        $('#content').html(ins);

    }

     /*======ECの問題画面=======*/
     function loadECQuestion() {
        var ins = '<main class="money-content">';
        ins += '<div class="money-content-inner">';
        ins += '<div class="money-step">';
        ins += '<h1 class="money-step-title" id="title" category="EC">' + jsonData[5].question[currentQuizNo].title + '</h1>';
        ins += '<div class="money-step-select">';
        for (var i = 0; i < jsonData[5].question[currentQuizNo].answer.length; i++) {
            ins += '<div class="money-step-select-item">';
            a = (jsonData[5].question[currentQuizNo].money[i] * total) - subMoney[currentQuizNo];

            if (jsonData[5].question[currentQuizNo].img.length == 0) {
                if (currentQuizNo ==7) {
                    ins += '<button question="' + 4 + '" value ="' + a +','+ jsonData[5].question[currentQuizNo].title +','+ jsonData[5].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[5].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 4 + '" value ="' + jsonData[5].question[currentQuizNo].money[i] +','+ jsonData[5].question[currentQuizNo].title +','+ jsonData[5].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[5].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            } else {
                if (currentQuizNo ==7) {
                    ins += '<button question="' + 4 + '" value ="' + a +','+ jsonData[5].question[currentQuizNo].title +','+ jsonData[5].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[5].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[5].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                } else {
                    ins += '<button question="' + 4 + '" value ="' + jsonData[5].question[currentQuizNo].money[i] +','+ jsonData[5].question[currentQuizNo].title +','+ jsonData[5].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                    ins += '<img src="' + jsonData[5].question[currentQuizNo].img[i] + '" alt="">';
                    ins += '<span class="money-step-select-item-btn-text">' + jsonData[5].question[currentQuizNo].answer[i] + '</span>';
                    ins += '</button>';
                }
            }
            ins += '</div>';
        }
        ins += '</div>';
        ins += '<div class="money-select-explanation">';
        ins += '<img src="./img/info.png" alt="">'
        ins += '<span>';
        ins += jsonData[5].question[currentQuizNo].explanation;
        ins += '</span>';
        ins += '</div>';
        ins += '<div id="money">'
        ins += '</div>';
        if ((currentQuizNo + 2) > 2 && (currentQuizNo + 2) < jsonData[5].question.length + 2) {
            ins += '<div class="money-select-bar">'
            ins += '<button class="money-select-bar-back back" type="button">';
            ins += '<i class="fas fa-chevron-left"></i>';
            ins += '前の質問に戻る';
            ins += '</button>';
            ins += '</div>'
        }
        ins += '</div>';
        ins += '</div>';

        ins += '</main>';
        $('#content').html(ins);

    }

  /*======オウンドメディの問題画面=======*/
  function loadMediaQuestion() {
    var ins = '<main class="money-content">';
    ins += '<div class="money-content-inner">';
    ins += '<div class="money-step">';
    ins += '<h1 class="money-step-title" id="title" category="media">' + jsonData[6].question[currentQuizNo].title + '</h1>';
    ins += '<div class="money-step-select">';
    for (var i = 0; i < jsonData[6].question[currentQuizNo].answer.length; i++) {
        ins += '<div class="money-step-select-item">';
        a = (jsonData[6].question[currentQuizNo].money[i] * total) - subMoney[currentQuizNo];

        if (jsonData[6].question[currentQuizNo].img.length == 0) {
            if (currentQuizNo ==6) {
                ins += '<button question="' + 5 + '" value ="' + a +','+ jsonData[6].question[currentQuizNo].title +',' + jsonData[6].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                ins += '<span class="money-step-select-item-btn-text">' + jsonData[6].question[currentQuizNo].answer[i] + '</span>';
                ins += '</button>';
            } else {
                ins += '<button question="' + 5 + '" value ="' + jsonData[6].question[currentQuizNo].money[i] +','+ jsonData[6].question[currentQuizNo].title +',' + jsonData[6].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                ins += '<span class="money-step-select-item-btn-text">' + jsonData[6].question[currentQuizNo].answer[i] + '</span>';
                ins += '</button>';
            }
        } else {
            if (currentQuizNo ==6) {
                ins += '<button question="' + 5 + '" value ="' + a +','+ jsonData[6].question[currentQuizNo].title +',' + jsonData[6].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                ins += '<img src="' + jsonData[6].question[currentQuizNo].img[i] + '" alt="">';
                ins += '<span class="money-step-select-item-btn-text">' + jsonData[6].question[currentQuizNo].answer[i] + '</span>';
                ins += '</button>';
            } else {
                ins += '<button question="' + 5 + '" value ="' + jsonData[6].question[currentQuizNo].money[i] +','+ jsonData[6].question[currentQuizNo].title +',' + jsonData[6].question[currentQuizNo].answer[i] + '" id="' + i + '" class="money-step-select-item-btn question-choice">';
                ins += '<img src="' + jsonData[6].question[currentQuizNo].img[i] + '" alt="">';
                ins += '<span class="money-step-select-item-btn-text">' + jsonData[6].question[currentQuizNo].answer[i] + '</span>';
                ins += '</button>';
            }
        }
        ins += '</div>';
    }
    ins += '</div>';
    ins += '<div class="money-select-explanation">';
    ins += '<img src="./img/info.png" alt="">'
    ins += '<span>';
    ins += jsonData[6].question[currentQuizNo].explanation;
    ins += '</span>';
    ins += '</div>';
    ins += '<div id="money">'
    ins += '</div>';
    if ((currentQuizNo + 2) > 2 && (currentQuizNo + 2) < jsonData[6].question.length + 2) {
        ins += '<div class="money-select-bar">'
        ins += '<button class="money-select-bar-back back" type="button">';
        ins += '<i class="fas fa-chevron-left"></i>';
        ins += '前の質問に戻る';
        ins += '</button>';
        ins += '</div>'
    }
    ins += '</div>';
    ins += '</div>';

    ins += '</main>';
    $('#content').html(ins);

}

    /*======次の問題のロジック=======*/
    nextQuiz();
    function nextQuiz() {
        //.question-choice'のクラスがついているボタンをクリックしたら
        $('.question-choice').on('click', function () {
            //.question-choice'のvalue値をtotalMoneyの配列に入れる
            cal = $(this).val().split(',');//value値が3つあるため、カンマを目印に内容を区切る
            totalMoney.push(parseInt(cal[0]));
            quiz_title.push(cal[1]);
            select_answer.push(cal[2]);
            total = totalMoney.reduce(function (sum, element) {
                return sum + element;
            }, 0);
            subMoney.push(total);
            var int = '<div class="money-select-amount">'
            int += "現在の概算料金"
            int += '<span>' + String(total).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") + '</span>';
            int += '円（税込み）';
            int += '</div>'
            if ($(this).attr("question") == "0") {
                if (currentQuizNo + 1 < jsonData[1].question.length) {
                    currentQuizNo++;
                    loadCompanyHeader()
                    displayCompanyQuizNo--;
                    for (var i = 0; i < currentQuizNo + 1; i++) {
                        $('.money-indicator-list-item').eq(i).addClass('is-answering');
                        $('.money-indicator-list-item').eq(i - (jsonData[1].question.length + 1)).addClass('is-answered');
                    }
                    loadCompanyQuestion();
                    nextQuiz();
                    $('#money').append(int);
                } else {
                    var url = "inquiry.php";
                    // パラメータを付与する場合
                    var inputs = '<input type="hidden" name="money" value="' + total + '" />';
                        for(var i =0; i<select_answer.length; i++){
                            inputs+='<input type="hidden" name="answer[]" value="'  + quiz_title[i] +':'+ select_answer[i]+'" />';
                        }
                      
                    // POST遷移
                    $("#content").append('<form action="' + url + '" method="post" id="post">' + inputs + '</form>');
                    $("#post").submit();
                }
            } else if ($(this).attr("question") == "1") {
                if (currentQuizNo + 1 < jsonData[2].question.length) {
                    currentQuizNo++;
                    loadRecruitHeader()
                    displayRecruitQuizNo--;
                    for (var i = 0; i < currentQuizNo + 1; i++) {
                        $('.money-indicator-list-item').eq(i).addClass('is-answering');
                        $('.money-indicator-list-item').eq(i - (jsonData[2].question.length + 1)).addClass('is-answered');
                    }
                    loadRecruitQuestion();
                    nextQuiz();
                    $('#money').append(int);
                } else {
                    var url = "inquiry.php";
                    // パラメータを付与する場合
                    var inputs = '<input type="hidden" name="money" value="' + total + '" />';
                        for(var i =0; i<select_answer.length; i++){
                            inputs+='<input type="hidden" name="answer[]" value="'  + quiz_title[i] +':'+ select_answer[i]+'" />';
                        }
                      
                    // POST遷移
                    $("#content").append('<form action="' + url + '" method="post" id="post">' + inputs + '</form>');
                    $("#post").submit();
                }
            } else if($(this).attr("question") == "2"){
                if (currentQuizNo + 1 < jsonData[3].question.length) {
                    currentQuizNo++;
                    loadGoodsHeader()
                    displayGoodsQuizNo--;
                    for (var i = 0; i < currentQuizNo + 1; i++) {
                        $('.money-indicator-list-item').eq(i).addClass('is-answering');
                        $('.money-indicator-list-item').eq(i - (jsonData[3].question.length + 1)).addClass('is-answered');
                    }
                   loadGoodsQuestion();
                    nextQuiz();
                    $('#money').append(int);
                } else {
                    var url = "inquiry.php";
                    // パラメータを付与する場合
                    var inputs = '<input type="hidden" name="money" value="' + total + '" />';
                        for(var i =0; i<select_answer.length; i++){
                            inputs+='<input type="hidden" name="answer[]" value="'  + quiz_title[i] +':'+ select_answer[i]+'" />';
                        }
                      
                    // POST遷移
                    $("#content").append('<form action="' + url + '" method="post" id="post">' + inputs + '</form>');
                    $("#post").submit();
                }
            } else if($(this).attr("question") == "3"){
                if (currentQuizNo + 1 < jsonData[4].question.length) {
                    currentQuizNo++;
                    loadLPHeader()
                    displayLandingQuizNo--;
                    for (var i = 0; i < currentQuizNo + 1; i++) {
                        $('.money-indicator-list-item').eq(i).addClass('is-answering');
                        $('.money-indicator-list-item').eq(i - (jsonData[4].question.length + 1)).addClass('is-answered');
                    }
                   loadLPQuestion();
                    nextQuiz();
                    $('#money').append(int);
                } else {
                    var url = "inquiry.php";
                    // パラメータを付与する場合
                    var inputs = '<input type="hidden" name="money" value="' + total + '" />';
                        for(var i =0; i<select_answer.length; i++){
                            inputs+='<input type="hidden" name="answer[]" value="'  + quiz_title[i] +':'+ select_answer[i]+'" />';
                        }
                      
                    // POST遷移
                    $("#content").append('<form action="' + url + '" method="post" id="post">' + inputs + '</form>');
                    $("#post").submit();
                }
            }else if($(this).attr("question") == "4"){
                if (currentQuizNo + 1 < jsonData[5].question.length) {
                    currentQuizNo++;
                    loadECHeader()
                    displayECsiteQuizNo--;
                    for (var i = 0; i < currentQuizNo + 1; i++) {
                        $('.money-indicator-list-item').eq(i).addClass('is-answering');
                        $('.money-indicator-list-item').eq(i - (jsonData[5].question.length + 1)).addClass('is-answered');
                    }
                   loadECQuestion();
                    nextQuiz();
                    $('#money').append(int);
                } else {
                    var url = "inquiry.php";
                    // パラメータを付与する場合
                    var inputs = '<input type="hidden" name="money" value="' + total + '" />';
                        for(var i =0; i<select_answer.length; i++){
                            inputs+='<input type="hidden" name="answer[]" value="'  + quiz_title[i] +':'+ select_answer[i]+'" />';
                        }
                      
                    // POST遷移
                    $("#content").append('<form action="' + url + '" method="post" id="post">' + inputs + '</form>');
                    $("#post").submit();
                }
            }else if($(this).attr("question") == "5"){
                if (currentQuizNo + 1 < jsonData[6].question.length) {
                    currentQuizNo++;
                    loadMediaHeader()
                    displayMediaQuizNo--;
                    for (var i = 0; i < currentQuizNo + 1; i++) {
                        $('.money-indicator-list-item').eq(i).addClass('is-answering');
                        $('.money-indicator-list-item').eq(i - (jsonData[6].question.length + 1)).addClass('is-answered');
                    }
                   loadMediaQuestion();
                    nextQuiz();
                    $('#money').append(int);
                } else {
                    var url = "inquiry.php";
                    // パラメータを付与する場合
                    var inputs = '<input type="hidden" name="money" value="' + total + '" />';
                        for(var i =0; i<select_answer.length; i++){
                            inputs+='<input type="hidden" name="answer[]" value="'  + quiz_title[i] +':'+ select_answer[i]+'" />';
                        }
                      
                    // POST遷移
                    $("#content").append('<form action="' + url + '" method="post" id="post">' + inputs + '</form>');
                    $("#post").submit();
                }
            }
        })
    }
    //*===戻るボタンを押したときの挙動=====*/
   
    $(document).on('click', '.back', function () {
        if ($('h1').attr('category') == "company") {
            if (currentQuizNo == 6 || currentQuizNo == 7) {
                total = subMoney[currentQuizNo - 1];
            }
            currentQuizNo--;
            loadCompanyHeader();
            displayCompanyQuizNo++;
            for (var i = 0; i < currentQuizNo + 1; i++) {
                $('.money-indicator-list-item').eq(i).addClass('is-answering');
                $('.money-indicator-list-item').eq(i - (jsonData[1].question.length + 1)).addClass('is-answered');
            }
            loadCompanyQuestion();
            var header = '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + (displayCompanyQuizNo + 1) + '</span>' + "問" + '</div>';
            $('#remaining').replaceWith(header);
            nextQuiz();
            totalMoney.pop();
            subMoney.pop();
            quiz_title.pop();
            select_answer.pop();
        }else if ($('h1').attr('category') == "recruit") {
           
            if (currentQuizNo == 6 || currentQuizNo == 7) {
                total = subMoney[currentQuizNo - 1];
            }
            currentQuizNo--;
            loadRecruitHeader();
            displayRecruitQuizNo++;
            for (var i = 0; i < currentQuizNo + 1; i++) {
                $('.money-indicator-list-item').eq(i).addClass('is-answering');
                $('.money-indicator-list-item').eq(i - (jsonData[1].question.length + 1)).addClass('is-answered');
            }
            loadRecruitQuestion();
            var header = '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + (displayRecruitQuizNo + 1) + '</span>' + "問" + '</div>';
            $('#remaining').replaceWith(header);
            nextQuiz();
            totalMoney.pop();
            subMoney.pop();
            quiz_title.pop();
            select_answer.pop();
        }else if ($('h1').attr('category') == "goods") {
            if (currentQuizNo == 6 || currentQuizNo == 7) {
                total = subMoney[currentQuizNo - 1];
            }
            currentQuizNo--;
            loadGoodsHeader();
            displayGoodsQuizNo++;
            for (var i = 0; i < currentQuizNo + 1; i++) {
                $('.money-indicator-list-item').eq(i).addClass('is-answering');
                $('.money-indicator-list-item').eq(i - (jsonData[1].question.length + 1)).addClass('is-answered');
            }
            loadGoodsQuestion();
            var header = '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + (displayGoodsQuizNo + 1) + '</span>' + "問" + '</div>';
            $('#remaining').replaceWith(header);
            nextQuiz();
            totalMoney.pop();
            subMoney.pop();
            quiz_title.pop();
            select_answer.pop();
        }else if ($('h1').attr('category') == "LP") {
            if (currentQuizNo == 4 ||currentQuizNo == 5 || currentQuizNo == 6) {
                total = subMoney[currentQuizNo - 1];
            }
            currentQuizNo--;
            loadLPHeader();
            displayLandingQuizNo++;
            for (var i = 0; i < currentQuizNo + 1; i++) {
                $('.money-indicator-list-item').eq(i).addClass('is-answering');
                $('.money-indicator-list-item').eq(i - (jsonData[4].question.length + 1)).addClass('is-answered');
            }
            loadLPQuestion();
            var header = '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + (displayLandingQuizNo + 1) + '</span>' + "問" + '</div>';
            $('#remaining').replaceWith(header);
            nextQuiz();
            totalMoney.pop();
            subMoney.pop();
            quiz_title.pop();
            select_answer.pop();
        }else if ($('h1').attr('category') == "EC") {
            if (currentQuizNo == 7 ||currentQuizNo == 8) {
                total = subMoney[currentQuizNo - 1];
            }
            currentQuizNo--;
            loadECHeader();
            displayECsiteQuizNo++;
            for (var i = 0; i < currentQuizNo + 1; i++) {
                $('.money-indicator-list-item').eq(i).addClass('is-answering');
                $('.money-indicator-list-item').eq(i - (jsonData[5].question.length + 1)).addClass('is-answered');
            }
            loadECQuestion();
            var header = '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + (displayECsiteQuizNo + 1) + '</span>' + "問" + '</div>';
            $('#remaining').replaceWith(header);
            nextQuiz();
            totalMoney.pop();
            subMoney.pop();
            quiz_title.pop();
            select_answer.pop();
        }
        else if ($('h1').attr('category') == "media") {
            if (currentQuizNo == 6 ||currentQuizNo == 7) {
                total = subMoney[currentQuizNo - 1];
            }
            currentQuizNo--;
            loadMediaHeader();
            displayMediaQuizNo++;
            for (var i = 0; i < currentQuizNo + 1; i++) {
                $('.money-indicator-list-item').eq(i).addClass('is-answering');
                $('.money-indicator-list-item').eq(i - (jsonData[6].question.length + 1)).addClass('is-answered');
            }
            loadMediaQuestion();
            var header = '<div class="money-indicator-remaining" id="remaining">' + "残り" + '<span>' + (displayMediaQuizNo + 1) + '</span>' + "問" + '</div>';
            $('#remaining').replaceWith(header);
            nextQuiz();
            totalMoney.pop();
            subMoney.pop();
            quiz_title.pop();
            select_answer.pop();
        }
        /*=========-合計金額========*/
        total = totalMoney.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        var ins = '<div class="money-select-amount">'
        ins += "現在の概算料金"
        ins += '<span>' + String(total).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") + '</span>';
        ins += '円（税込み）';
        ins += '</div>'
        $('#content').append(ins);
    });


    /*====最初の問題のjsonファイルのデータを jsonData[]配列に入れる======*/
    function loadFirst() {
        $.ajax({
            type: 'GET',
            url: './json/first.json',
            dataType: 'json',
            async: false, //追加
            success: function (data1) {
                jsonData.push(data1);
            },
            error: function () {
                alert('error');
            }
        });
    }
    /*====企業の問題のjsonファイルのデータを jsonData[]配列に入れる======*/
    function loadcompany() {
        $.ajax({
            type: 'GET',
            url: './json/company.json',
            dataType: 'json',
            async: false, //追加
            success: function (data2) {
                jsonData.push(data2)
            },
            error: function () {
                alert('error');
            }
        });

    }
    /*====採用の問題のjsonファイルのデータを jsonData[]配列に入れる======*/
    function loadRecruit() {
        $.ajax({
            type: 'GET',
            url: './json/recruit.json',
            dataType: 'json',
            async: false, //追加
            success: function (data3) {
                jsonData.push(data3)
            },
            error: function () {
                alert('error');
            }
        });
    }
    /*====商品・サービスの問題のjsonファイルのデータを jsonData[]配列に入れる======*/
    function loadgoods() {
        $.ajax({
            type: 'GET',
            url: './json/goods.json',
            dataType: 'json',
            async: false, //追加
            success: function (data3) {
                jsonData.push(data3)
            },
            error: function () {
                alert('error');
            }
        });
    }
    /*====LPの問題のjsonファイルのデータを jsonData[]配列に入れる======*/
    function loadlanding() {
        $.ajax({
            type: 'GET',
            url: './json/landing.json',
            dataType: 'json',
            async: false, //追加
            success: function (data4) {
                jsonData.push(data4)
            },
            error: function () {
                alert('error');
            }
        });
    }
    /*====ECサイトの問題のjsonファイルのデータを jsonData[]配列に入れる======*/
    function loadecsite() {
        $.ajax({
            type: 'GET',
            url: './json/ecsite.json',
            dataType: 'json',
            async: false, //追加
            success: function (data5) {
                jsonData.push(data5)
            },
            error: function () {
                alert('error');
            }
        });
    }
    /*====オウンドメディアの問題のjsonファイルのデータを jsonData[]配列に入れる======*/
    function loadmedia() {
        $.ajax({
            type: 'GET',
            url: './json/media.json',
            dataType: 'json',
            async: false, //追加
            success: function (data6) {
                jsonData.push(data6)
            },
            error: function () {
                alert('error');
            }
        });
    }



});

