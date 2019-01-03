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


    // Grid Description Modals and Flip Action

    $(function() {
        $(".flip").flip({
            trigger: 'hover'
        });
    });

    $('#row-1-col-1').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Prevention</h2>" +
                "<p><strong>Goal:</strong> To provide safety and keep a family together.</p>" +
                "<p><strong>Focus:</strong> At risk families.</p>" +
                "<p>This box encompasses opportunities to provide safety for children and meet state requirements in order to keep families together that would otherwise be in danger of losing custody of their children.</p>" +
                "<p><strong>Example Request:</strong> Parents of 5 are in danger of being evicted tomorrow. If this happens their children will be taken into state custody. Any help to pay their rent would be appreciated.</p>" +
                "<p><strong>Other Examples Include:</strong> Providing beds or cribs for children in homes that need to meet state standards; Paying electric or gas bills that would prevent power or heat from being shut off, and keeping a family in their home; providing car seats for a family who needs to keep their young children safe.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-1-col-2').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Foster Care</h2>" +
                "<p><strong>Goal:</strong> To stabilize a foster or kin placement or reunify a family.</p>" +
                "<p><strong>Focus:</strong> Children and Youth in the custody of the state with the goal of being reunified with their primary caregiver; Kinship Care Families; Licensed Foster Families.</p>" +
                "<p>This box encompasses opportunities to provide safety for children and meet state requirements in foster and/or kinship homes in order to help a child maintain a placement while their biological family works toward reunification.</p>" +
                "<p><strong>Example Request:</strong> 17-year-old female is able to be placed with family friend. However, they are in need of a bed for her to sleep in. They are asking for a full-sized mattress, box springs, and a frame for the bed. Any help would be appreciated!</p>" +
                "<p><strong>Other Examples Include:</strong> Providing beds or cribs for children in homes that need to meet state standards; paying a lease-breaking fee for a kinship family who needs to move in order to take a placement; providing car seats for a foster family who is taking in young children.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-1-col-3').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Restoration</h2>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-1-col-4').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Adoption</h2>" +
                "<p><strong>Goal:</strong> To preserve adoptive placement or finalize adoption.</p>" +
                "<p><strong>Focus:</strong> Children whose biological parents have had their parental rights terminated; Adoptive Families.</p>" +
                "<p>This box encompasses opportunities to provide support and resources for children whose biological parents’ rights have been terminated and now need a permanency plan (preferably adoption). This box also includes opportunities to provide support and resources for adoptive families and/or adoptive resources.</p>" +
                "<p><strong>Example Request:</strong> 15-year-old male has jumped from many different homes before this one. He has had some psychiatric stays as well as some behavioral issues. Since being in his current placement, he has done wonderful and has made a complete turn around. The home has a stabilization plan for him that does not allow him to be home alone during the summer for fear he will revert back. The male has found a church camp he would like to attend, however, the home needs help with payment.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-1-col-5').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Transition</h2>" +
                "<p><strong>Goal:</strong> To help prepare a youth for independence.</p>" +
                "<p><strong>Focus:</strong> Youth between the ages of 18-24 who have not been reunified or connected with an adoptive resource – those who have or will ‘age out’ of the state’s custody.</p>" +
                "<p>This box encompasses opportunities to provide support and resources for youth who are preparing to transition out of state care and into independent living.</p>" +
                "<p><strong>Example Request:</strong> 18-year-old female has obtained housing but is unable to furnish it at this time. She plans to ask out of custody and have her two daughters live with her after the apartment is furnished. She is looking for the following items for her apartment which will enable her to ask out of state custody as well as receive placement of her two daughters.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-1').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Prevention</h2>" +
                "<p><strong>Goal:</strong> To heal family and prevent removal.</p>" +
                "<p><strong>Focus:</strong> At-risk Children and Families.</p>" +
                "<p>This box encompasses opportunities to provide support and come alongside families that would otherwise be in danger of losing custody of their children, as well as opportunities to come alongside at-risk children to provide safe and healthy relationships and guidance.</p>" +
                "<p><strong>Examples:</strong> Parenting Classes/Support Groups, Mentorship, Tutoring, Supporting families in crisis.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-2').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Foster Care</h2>" +
                "<p><strong>Goal:</strong> To support foster and kin families and reunify.</p>" +
                "<p><strong>Focus:</strong> Children and Youth in the custody of the state with the goal of being reunified with their primary caregiver; Kinship Care Families; License Foster Families.</p>" +
                "<p>This box encompasses opportunities to provide support and come alongside children who are in state custody, along with the foster family who has taken the child into their home. This box also includes opportunities to come alongside biological families striving for reunification.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                    "<li>Court-Mandated Mentoring and Tutoring</li>" +
                    "<li>CASA</li>" +
                    "<li>Strengthening Families</li>" +
                    "<li>Respite Care</li>" +
                    "<li>WRAP Groups organized by churches to support foster families through meals, transportation, prayer, encouragement, babysitting, respite, etc.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-3').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Restoration</h2>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-4').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Adoption</h2>" +
                "<p><strong>Goal:</strong> To support adoptive parents and children.</p>" +
                "<p><strong>Focus:</strong> Children whose biological parents have had their parental rights terminated; Adoptive Families.</p>" +
                "<p>This box encompasses opportunities to provide support and come alongside children whose biological parents’ rights have been terminated and now need a permanency plan (preferably adoption). This box also includes opportunities to come alongside in support of adoptive families and/or adoptive resources.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                    "<li>Court-Mandated Mentoring and Tutoring</li>" +
                    "<li>CASA</li>" +
                    "<li>WRAP Groups organized by churches to support foster families through meals, transportation, prayer, encouragement, babysitting, respite, etc.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-5').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Transition</h2>" +
                "<p><strong>Goal:</strong> To build support network for youth.</p>" +
                "<p><strong>Focus:</strong> Youth between the ages of 18-24 who have not been reunified or connected with an adoptive resource; those who have or will ‘age out’ of the state’s custody.</p>" +
                "<p>This box encompasses opportunities to journey with youth who are preparing to transition out of state care and into independent living by being a friend, support system, and consistent relationship in their life.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                    "<li>Support Family (Youthrive)</li>" +
                    "<li>Helping with financial literacy</li>" +
                    "<li>Helping with college application/admission process</li>" +
                    "<li>Helping with adult transition, obtaining housing, opening bank account, etc.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-3-col-1').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Prevention</h2>" +
                "<p><strong>Goal:</strong> To provide relationships to heal and strengthen families.</p>" +
                "<p><strong>Focus:</strong> At-risk Children and Families.</p>" +
                "<p>This box encompasses opportunities to open your home in a time of crisis for children and families that would otherwise be in danger of losing custody of their children if there was no proactive intervention.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                    "<li>A single mother needs to have surgery and will be unable to work and care for her children for an extended period of time. With no family or friends to support her, she is need of support so her children do not have to come into the care of the state.</li>" +
                    "<li>A child needs a safe place for the 72-hour time period while a report is investigated.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-3-col-2').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Foster Care</h2>" +
                "<p><strong>Goal:</strong> To recruit safe, quality temporary homes.</p>" +
                "<p><strong>Focus:</strong> Children and Youth in the custody of the state with the goal of being reunified with their primary caregiver; Kinship Care Families; Licensed Foster Families.</p>" +
                "<p>This box encompasses opportunities to open your home temporarily for children whose biological parents have been determined by the state as unable to care for them at the current time (however, the goal of this time is reunification with biological family.)</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-3-col-3').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Restoration</h2>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-3-col-4').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Adoption</h2>" +
                "<p><strong>Goal:</strong> To find forever homes for children and youth.</p>" +
                "<p><strong>Focus:</strong> Children whose biological parents have had their parental rights terminated; Adoptive Families.</p>" +
                "<p>This box encompasses opportunities to open your home permanently for children whose biological parents’ rights have been terminated and now need a permanency plan (preferably adoption).</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-3-col-5').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Transition</h2>" +
                "<p><strong>Goal:</strong> To house and feed youth.</p>" +
                "<p><strong>Focus:</strong> Youth between the ages of 18-24 who have not been reunified or connected with an adoptive resource; those who have or will ‘age out’ of the state’s custody.</p>" +
                "<p>This box encompasses opportunities to journey with youth who are preparing to transition out of state care and into independent living by opening your home to be a safe and permanent place for them to come back to as they adjust to adult life.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });


    // Find Resources Result

    $('#findResourcesSubmitButton').click(function() {
        event.preventDefault();
        let resources = [];
        for (var i = 0; i < resourcesJson.length; i++) {
            if (resourcesJson[i]['Type'] === document.getElementById('findType').value) {
                resources.push(resourcesJson[i]);
            }
        }
        for (var i = 0; i < resources.length; i++) {
            console.log(resources[i]);
        }
    });


    // Resource Multi Step Form Navigation, Validation, and Actions

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
            $('#championName').val($('#formSubmitterName').val());
            $('#championRole').val($('#formSubmitterRole').val());
            $('#championPhone').val($('#formSubmitterPhone').val());
            $('#championEmail').val($('#formSubmitterEmail').val());
        } else {
            $('#championName').val('');
            $('#championRole').val('');
            $('#championPhone').val('');
            $('#championEmail').val('');
        }
    });
});
