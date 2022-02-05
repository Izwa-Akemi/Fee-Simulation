$(function () {
    let checkedsum;
    $(".money-step-form-submit").on("click", function () {
        checkedsum = $('.q1:checked').length; //チェックが入っているチェックボックスの取得
        if (checkedsum > 0) {
            $('.q1').prop("required", false); //required属性の解除
            $('#check-error').html('');
        } else {
            $('.q1').prop("required", true); //required属性の付与
            $('#check-error').html('いずれか一つをチェックしてください');
        }

        //名前のチェック

        if ($("#name").val() === "") {
            $('#name').prop("required", true); //required属性の付与
            $('#name-error').html('必須入力です。');
        } else {
            $('#name').prop("required", false); //required属性の解除
            $('#name-error').html('');
        }


        //メールのチェック

        if ($("#email").val() === "") {
            $('#email').prop("required", true); //required属性の付与
            $('#email-error').html('必須入力です。');

        } else if (!$("#email").val().match(/^[0-9a-z_.\/?-]+@([0-9a-z-]+\.)+[0-9a-z-]+$/)) {
            $('#email').prop("required", true); //required属性の付与
            $('#email-error').html('正しい形式で入力してください。');
           
        } else {
            $('#email').prop("required", false); //required属性の解除
            $('#email-error').html('');
        }


    })
})