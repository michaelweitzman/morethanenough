$(document).ready(function() {

    // Initialize Materialize Components

    $('.modal').modal();
    $('select').formSelect();


    // Campain Section Dropdowns

    $('.campaign i').click(function() {
        const dropdown = $(this).parent().next(),
              others = $('.dropdown:visible').not(dropdown);
        dropdown.slideToggle();
        others.slideToggle();
    });


    // On Click Event for Map Stats

    $('#map').click(function() {
        let x = '',
            y = '',
            z = '';

        if (event.target.attributes.class) {
            x = event.target.attributes.class.value;
            y = x.substr(x.length - 5);
            z = simplemaps_statemap_mapdata.state_specific[y].name.toUpperCase();
        }

        for (var i = 0; i < Object.keys(statsJson).length; i++) {
            if (statsJson[i]['County Name'] == z) {
                $('#statsmodal').html(
                    "<div class='modal-content'>" +
                        "<h2>Statistics for " + simplemaps_statemap_mapdata.state_specific[y].name + " County:</h2>" +
                        "<table class='striped'>" +
                            "<thead>" +
                                "<tr>" +
                                    "<th>Statistic</th>" +
                                    "<th class='center-align'>State</th>" +
                                    "<th class='center-align'>County</th>" +
                                "</tr>" +
                            "</thead>" +
                            "<tbody>" +
                                "<tr>" +
                                    "<td>In Out of Home Care</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['In Out of Home Care'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['In Out of Home Care'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Case Plan Goal - Adoption</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Case Plan Goal Adoption'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Case Plan Goal Adoption'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Legally Free for Adoption</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Legally Free for Adoption'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Legally Free for Adoption'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Quad 2 Rate</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Quad 2 Rate'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Quad 2 Rate'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Age 17</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Age 17'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Age 17'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Risk of Aging Out Rate</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Risk of Aging Out Rate'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Risk of Aging Out Rate'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>FC / TFC Shelter Children</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['FC/TFC/Shelter Children'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['FC/TFC/Shelter Children'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Placed Outside County</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Placed Outside County'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Placed Outside County'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Outside County Rate</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Outside County Rate'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Outside County Rate'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Placed in Shelter</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Placed in Shelter'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Placed in Shelter'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Shelter Rate</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Shelter Rate'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Shelter Rate'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>FCS Families for Month</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['FCS Families for Month'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['FCS Families for Month'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>FCS Children for Month</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['FCS Children for Month'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['FCS Children for Month'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Traditional Foster Homes</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Traditional Foster Homes'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Traditional Foster Homes'] + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Kinship Foster Homes</td>" +
                                    "<td class='center-align'>" + statsJson[statsJson.length - 1]['Kinship Foster Homes'] + "</td>" +
                                    "<td class='center-align'>" + statsJson[i]['Kinship Foster Homes'] + "</td>" +
                                "</tr>" +
                            "</tbody>" +
                        "</table>" +
                    "</div>"
                );
                $('#statsmodal').modal('open');
            }
        }
    });


    // Resource Multi Step Form Navigation and Actions

    var currentTab = 0;
    showTab(currentTab);

    function showTab(currentTab) {
        const allTabs = document.getElementsByClassName('tab');
        var previousText = '';
        var nextText = '';
        allTabs[currentTab].style.display = 'block';

        if (currentTab === 0) {
            document.getElementById('previous').style.display = 'none';
            document.getElementsByClassName('submitButton')[0].style.display = 'none';
        } else if (currentTab === allTabs.length - 1) {
            document.getElementById('next').style.display = 'none';
            document.getElementsByClassName('submitButton')[0].style.display = 'block';
        } else {
            document.getElementById('previous').style.display = 'inline-block';
            document.getElementById('next').style.display = 'inline-block';
            document.getElementsByClassName('submitButton')[0].style.display = 'none';
        }

        if (currentTab === 0) {
            nextText = 'Form Submitter Information';
        } else if (currentTab === 1) {
            previousText = 'Resource Information';
            nextText = 'Resource Champion Information';
        } else if (currentTab === 2) {
            previousText = 'Form Submitter Information';
            nextText = 'Resource Descriptions';
        } else if (currentTab === 3) {
            previousText = 'Resource Champion Information';
            nextText = 'Miscellaneous Questions';
        } else {
            previousText = 'Resource Descriptions';
        }

        document.getElementById('previous').innerHTML = 'Previous Section: ' + previousText;
        document.getElementById('next').innerHTML = 'Next Section: ' + nextText;
    }

    $('#previous').click(function() {
        previousNext(-1);
    });
    $('#next').click(function() {
        previousNext(1)
    })

    function previousNext(increment) {
        const allTabs = document.getElementsByClassName('tab');
        // Exit the function if any field in the current tab is invalid:
        // if (n == 1 && !validateForm()) return false;
        allTabs[currentTab].style.display = 'none';
        currentTab = currentTab + increment;
        showTab(currentTab);
    }

    $('#needVolunteers').hide();
    $('#areServicesProvided').click(function() {
        $('#needVolunteers').toggle();
    });

    let clickCount = 0;
    $('#isChampion').click(function() {
        clickCount += 1;
        if(clickCount % 2 === 1) {
            $('#championName').val('Hello World');
            $('#championRole').val('Hello World');
            $('#championPhone').val('Hello World');
            $('#championEmail').val('Hello World');
        } else {
            $('#championName').val('');
            $('#championRole').val('');
            $('#championPhone').val('');
            $('#championEmail').val('');
        }
    });
});
