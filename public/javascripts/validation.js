$('#addReview').submit(function (e) {
    $('.alert.alert-danger').hide();
    if(!$('input#name').val() || !$('select#rating').val() || !$('textare#review').val()) {
        if (!$('.alert.alert-danger').length){
            $('.alert.alert-danger').show();
        }else{
            $(this).prepend('<div role="alert" class="alert alert-danger"> All fileds required, \ please try again </div>');
        }
        return false;
    }
});