$(document).ready(function() {

    $('.modal').modal();

    $('.campaign i').click(function() {
        const dropdown = $(this).parent().next(),
              others = $('.dropdown:visible').not(dropdown);
        dropdown.slideToggle();
        others.slideToggle();
    });

    $('#map').click(function() {
        $('#modal').modal('open');
    });

});
