
$(document).ready(function(){
    $('div.form-group :input').prop('readonly', true).css("background-color","transparent");
    $('#edit-profile').click(function(){
        $('#edit-profile').css('display', 'none');
        $('#update-profile').css('display', 'inline');
        $('div.form-group :input').prop('readonly', false).css("background-color","transparent");
    });
    $('#update-profile').click(function(){
        $('#edit-profile').show();
        $('#update-profile').hide();
        $('div.form-group :input').prop('readonly', true).css("background-color","transparent");
    })
    
})