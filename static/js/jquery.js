$(document).ready(function() {

    $('.campaign i').click(function() {
        const dropdown = $(this).parent().next(),
              others = $('.dropdown:visible').not(dropdown);
        dropdown.slideToggle();
        others.slideToggle();
    });

});
