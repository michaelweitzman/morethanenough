$(document).ready(function() {

    // ------ Materialize ------ //

    $('.sidenav').sidenav();
    $('.modal').modal();
    $('select').formSelect();
    $('.collapsible').collapsible();


    // ------ Navigation ------ //

    $('#learnMore').click(function() {
        if (! $('.dropdown-section-content.one:visible').length > 0) {
            $('.dropdown-section-header.one i').click();
        };
        $('html,body').animate({
            scrollTop: $('.dropdown-section-content.one').offset().top - 56
        }, 1000);
    });

    $('.sidenav-close').click(function() {
        if (! $('.dropdown-section-content.one:visible').length > 0) {
            $('.dropdown-section-header.one i').click();
        };
        $('html,body').animate({
            scrollTop: $('.dropdown-section-content.one').offset().top - 56
        }, 1000);
    });


    // ------ Banner ------ //

    $('#commit-church-button').click(function() {
        $('html,body').animate({
            scrollTop: $('#church-form').offset().top - 56
        }, 1000);
    });

    $('#commit-family-button').click(function() {
        $('html,body').animate({
            scrollTop: $('#family-form').offset().top - 56
        }, 1000);
    });

    $('#bottom-banner i').click(function() {
        $('html, body').animate({
            scrollTop: $('#current-stats').offset().top - 56
        }, 700);
    });


    // ------ Current Stats ------ //

    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $('#current-stats').offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            $('#churchStat').numerator({
                easing: 'linear',
                duration: 3500,
                delimiter: ',',
                toValue: churchJson
            });
            $(document).unbind('scroll');
        }
    });
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $('#current-stats').offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            $('#familyStat').numerator({
                easing: 'linear',
                duration: 3500,
                delimiter: ',',
                toValue: familyJson
            });
            $(document).unbind('scroll');
        }
    });
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $('#current-stats').offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            $('#childrenStat').numerator({
                easing: 'linear',
                duration: 3500,
                delimiter: ',',
                toValue: Number(statsJson[0]['Children Served'])
            });
            $(document).unbind('scroll');
        }
    });
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $('#current-stats').offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            $('#economicStat').numerator({
                easing: 'linear',
                duration: 3500,
                delimiter: ',',
                toValue: Number(statsJson[0]['Economic Impact']),
            });
            $(document).unbind('scroll');
        }
    });


    // ------ Sponsors ------ //

    for (let sponsor of sponsorsJson) {
        $('.sponsors').append(
            "<div class='center-align'>" +
                "<a href='" + sponsor['Company Website'] + "' target='_blank'>" +
                    "<img src='" + sponsor['Company Logo Link'] + "'/>" +
                "</a>" +
            "</div>"
        );
    }

    $('.sponsors').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 650,
                settings: {
                    dots: false,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 350,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    // ------ Dropdown Sections ------ //

    $('.dropdown-section-header .learn-more i').click(function() {
        const dropdown = $(this).parent().parent().next(),
              others = $('.dropdown-section-content:visible').not(dropdown);
        dropdown.slideToggle();
        others.slideToggle();
    });


    // ------ Own Your County's Stats ------ //

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
                        "<a class='btn' href='https://drive.google.com/file/d/1NgxRbadXHNcs653cMUBkOCnmnUJEvCnu/view' target='_blank'>Understand the Stats</a>" +
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


    // ------ Places You Can Help ------ //
    $(function() {
        $(".flip").flip({
            trigger: 'hover'
        });
    });

    function countResources(string) {
        count = 0;
        for (var i = 0; i < resourcesJson.length; i++) {
            if (resourcesJson[i]['Grid Areas'].includes(string)) {
                count += 1;
            }
        }
        return count;
    }

    $('#row-1-col-1 .flip .back h3').text(countResources('One_Prevention') + ' Resources');
    $('#row-1-col-2 .flip .back h3').text(countResources('One_Foster Care') + ' Resources');
    $('#row-1-col-3 .flip .back h3').text(countResources('One_Reunification') + ' Resources');
    $('#row-1-col-4 .flip .back h3').text(countResources('One_Adoption') + ' Resources');
    $('#row-1-col-5 .flip .back h3').text(countResources('One_Transition') + ' Resources');
    $('#row-2-col-1 .flip .back h3').text(countResources('Two_Prevention') + ' Resources');
    $('#row-2-col-2 .flip .back h3').text(countResources('Two_Foster') + ' Resources');
    $('#row-2-col-3 .flip .back h3').text(countResources('Two_Reunification') + ' Resources');
    $('#row-2-col-4 .flip .back h3').text(countResources('Two_Adoption') + ' Resources');
    $('#row-2-col-5 .flip .back h3').text(countResources('Two_Transition') + ' Resources');
    $('#row-3-col-1 .flip .back h3').text(countResources('Three_Prevention') + ' Resources');
    $('#row-3-col-2 .flip .back h3').text(countResources('Three_Foster') + ' Resources');
    $('#row-3-col-3 .flip .back h3').text(countResources('Three_Reunification') + ' Resources');
    $('#row-3-col-4 .flip .back h3').text(countResources('Three_Adoption') + ' Resources');
    $('#row-3-col-5 .flip .back h3').text(countResources('Three_Transition') + ' Resources');

    $('#row-1-col-1 .flip .back h3').click(function() {
        findResources(event, 'One_Prevention');
    });
    $('#row-1-col-2 .flip .back h3').click(function() {
        findResources(event, 'One_Foster Care');
    });
    $('#row-1-col-3 .flip .back h3').click(function() {
        findResources(event, 'One_Reunification');
    });
    $('#row-1-col-4 .flip .back h3').click(function() {
        findResources(event, 'One_Adoption');
    });
    $('#row-1-col-5 .flip .back h3').click(function() {
        findResources(event, 'One_Transition');
    });
    $('#row-2-col-1 .flip .back h3').click(function() {
        findResources(event, 'Two_Prevention');
    });
    $('#row-2-col-2 .flip .back h3').click(function() {
        findResources(event, 'Two_Foster');
    });
    $('#row-2-col-3 .flip .back h3').click(function() {
        findResources(event, 'Two_Reunification');
    });
    $('#row-2-col-4 .flip .back h3').click(function() {
        findResources(event, 'Two_Adoption');
    });
    $('#row-2-col-5 .flip .back h3').click(function() {
        findResources(event, 'Two_Transition');
    });
    $('#row-3-col-1 .flip .back h3').click(function() {
        findResources(event, 'Three_Prevention');
    });
    $('#row-3-col-2 .flip .back h3').click(function() {
        findResources(event, 'Three_Foster');
    });
    $('#row-3-col-3 .flip .back h3').click(function() {
        findResources(event, 'Three_Reunification');
    });
    $('#row-3-col-4 .flip .back h3').click(function() {
        findResources(event, 'Three_Adoption');
    });
    $('#row-3-col-5 .flip .back h3').click(function() {
        findResources(event, 'Three_Transition');
    });

    $('#row-1-col-1 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Prevention</h2>" +
                "<p><strong>Goal:</strong> To provide safety and keep a family together.</p>" +
                "<p><strong>Focus:</strong> At risk families.</p>" +
                "<p>This box highlights organizations that assist by providing resources for safety of children. The goal of these organizations and needs is to assist in keeping families together that would otherwise be in danger of losing custody of their children.</p>" +
                "<p><strong>Example Request:</strong> Parents of 5 are in danger of being evicted tomorrow. If this happens their children will be taken into state custody. Any help to pay their rent would be appreciated.</p>" +
                "<p><strong>Other Examples Include:</strong></p>" +
                "<ul>" +
                "<li>Providing beds or cribs for children in homes that need to meet state standard.</li>" +
                "<li>Paying electric or gas bills that would prevent power or heat from being shut off, and keeping a family in their home.</li>" +
                "<li>Providing car seats for a family who needs to keep their young children safe.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-1-col-2 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Foster Care</h2>" +
                "<p><strong>Goal:</strong> To stabilize a foster or kin placement</p>" +
                "<p><strong>Focus:</strong> Kinship Care Families; Licensed Foster Families and the children they are caring for.</p>" +
                "<p>This box encompasses organizations and opportunities that support foster or kinship families. They assist in helping these families meet state requirements and assist in helping children maintain stable placement while their biological family works toward reunification.</p>" +
                "<p><strong>Example Request:</strong> 17-year-old female is able to be placed with family friend. However, they are in need of a bed for her to sleep in. They are asking for a full-sized mattress, box springs, and a frame for the bed. Any help would be appreciated!</p>" +
                "<p><strong>Other Examples Include:</strong></p>" +
                "<ul>" +
                "<li>Providing beds or cribs for children in homes that need to meet state standards.</li>" +
                "<li>Paying a lease-breaking fee for a kinship family who needs to move in order to take a placement.</li>" +
                "<li>Providing car seats for a foster family who is taking in young children.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-1-col-3 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Reunification</h2>" +
                "<p><strong>Goal:</strong> reunifying children with family.</p>" +
                "<p><strong>Focus:</strong> Children and Youth in the custody of the state with the goal of being reunified with their primary caregiver. Biological families that are working towards reunification.</p>" +
                "<p>This box encompasses organizations and opportunities that seek to help children in traditional foster and/or kinship homes reunify with their biological family. This box also highlights organizations and resources that serve incarcerated parents in local communities.</p>" +
                "<p><strong>Example Request:</strong> Natural mother is working towards reunification with her children. She has identified housing but needs household items to be able to begin unsupervised visitations and overnight stays of her children in state care.</p>" +
                "<p><strong>Other Examples Include:</strong></p>" +
                "<ul>" +
                "<li>Providing beds and household items to assist biological families.</li>" +
                "<li>Paying for parking tickets or fees incurred by bio families that slow their cases legally.</li>" +
                "<li>Assisting with rent deposits or utilities.</li>" +
                "<li>Providing resources that help bio families with obtaining employment.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-1-col-4 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Adoption</h2>" +
                "<p><strong>Goal:</strong> To preserve adoptive placement or finalize adoption.</p>" +
                "<p><strong>Focus:</strong> Children whose biological parents have had their parental rights terminated; Adoptive Families.</p>" +
                "<p>This box encompasses organizations and opportunities that provide support and resources for children whose biological parents’ rights have been terminated and now need a permanency plan (preferably adoption). This box also includes opportunities to provide support and resources for adoptive families and/or adoptive resources.</p>" +
                "<p><strong>Example Request:</strong> 15-year-old male has jumped from many different homes before this one. He has had some psychiatric stays as well as some behavioral issues. Since being in his current placement, he has done wonderful and has made a complete turn around. The home has a stabilization plan for him that does not allow him to be home alone during the summer for fear he will revert back. The male has found a church camp he would like to attend, however, the home needs help with payment.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-1-col-5 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier One, Transition</h2>" +
                "<p><strong>Goal:</strong> To help prepare a youth for independence.</p>" +
                "<p><strong>Focus:</strong> Youth between the ages of 18-24 who have not been reunified or connected with an adoptive resource – those who have or will ‘age out’ of the state’s custody.</p>" +
                "<p>This box encompasses organizations and opportunities that provide support and resources for youth who are preparing to transition out of state care and into independent living.</p>" +
                "<p><strong>Example Request:</strong> 18-year-old female has obtained housing but is unable to furnish it at this time. She plans to ask out of custody and have her two daughters live with her after the apartment is furnished. She is looking for the following items for her apartment which will enable her to ask out of state custody as well as receive placement of her two daughters.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-1 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Prevention</h2>" +
                "<p><strong>Goal:</strong> To heal family and prevent removal.</p>" +
                "<p><strong>Focus:</strong> At-risk Children and Families.</p>" +
                "<p>This box encompasses organizations and opportunities that provide support and come alongside families that would otherwise be in danger of losing custody of their children, as well as opportunities to come alongside at-risk children to provide safe and healthy relationships and guidance.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                "<li>Parenting Classes/Support Groups</li>" +
                "<li>Mentorship</li>" +
                "<li>Tutoring</li>" +
                "<li>Supporting families in crisis</li>" +
                "<li>Transportation Assistance</li>" +
                "<li>Share a Skill</li>" +
                "<li>Translation Services</li>" +
                "<li>Resource Support</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-2 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Foster Care</h2>" +
                "<p><strong>Goal:</strong> To support foster and kin families and reunify.</p>" +
                "<p><strong>Focus:</strong> Children and Youth in the custody of the state with the goal of being reunified with their primary caregiver; Kinship Care Families; License Foster Families.</p>" +
                "<p>This box encompasses organizations and opportunities to provide support and come alongside children who are in state custody, along with the foster family who has taken the child into their home.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                "<li>Court-Mandated Mentoring and Tutoring</li>" +
                "<li>CASA</li>" +
                "<li>Strengthening Families</li>" +
                "<li>Respite Care</li>" +
                "<li>WRAP Groups organized by churches to support foster families through meals, transportation, prayer, encouragement, babysitting, respite, etc.</li>" +
                "<li>Counselors</li>" +
                "<li>Legal support services</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-3 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Reunification</h2>" +
                "<p><strong>Goal:</strong> To support families seeking reunification.</p>" +
                "<p><strong>Focus:</strong> Children and Youth in the custody of the state with the goal of being reunified with their primary caregiver.</p>" +
                "<p>This box encompasses opportunities to provide support and come alongside children and families who are in state custody working towards being reunified with their children</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                "<li>Services to incarcerated parents</li>" +
                "<li>Legal support services</li>" +
                "<li>Transportation</li>" +
                "<li>Share a skill</li>" +
                "<li>CASA</li>" +
                "<li>Parenting Classes</li>" +
                "<li>Addiction rehabilitation and support services</li>" +
                "<li>Employment services</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-4 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Two, Adoption</h2>" +
                "<p><strong>Goal:</strong> To support adoptive parents and children.</p>" +
                "<p><strong>Focus:</strong> Children whose biological parents have had their parental rights terminated; or have been orphaned due to death or abandonment of children, Adoptive Families.</p>" +
                "<p>This box encompasses organizations and opportunities to provide support and come alongside children whose biological parents’ rights have been terminated need or desire adoption. This box also includes opportunities to come alongside in support of adoptive families relationally.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                "<li>Mentoring and Tutoring</li>" +
                "<li>CASA</li>" +
                "<li>WRAP Groups organized by churches to support foster families through meals, transportation, prayer, encouragement, babysitting, respite, etc.</li>" +
                "<li>Support groups</li>" +
                "<li>Transracial education and mentorship for transracial adoptive families</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-2-col-5 .flip .back h6').click(function() {
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
    $('#row-3-col-1 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Prevention</h2>" +
                "<p><strong>Goal:</strong> To provide familial support to families seeking to keep children out of foster care.</p>" +
                "<p><strong>Focus:</strong> At-risk Children and Families.</p>" +
                "<p>This box encompasses opportunities and organizations that desire to support biological families in crisis through familial and housing support. This could include opening your home or church to assist with housing crisis or helping a family connect to resources that assist with housing. These families could otherwise be in danger of losing custody of their children if there was no proactive intervention.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                "<li>A single mother needs to have surgery and will be unable to work and care for her children for an extended period of time. With no family or friends to support her, she is need of support so her children do not have to come into the care of the state.</li>" +
                "<li>A mother has committed to working a drug rehab program. She is needing a family to assist with her children while she goes through this program.</li>" +
                "<li>A family is experiencing homelessness that is creating instable living conditions. Assistance with housing could help this family get back on their feet.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-3-col-2 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Foster Care</h2>" +
                "<p><strong>Goal:</strong> To recruit safe, loving, quality temporary homes.</p>" +
                "<p><strong>Focus:</strong> Children and Youth in the custody of the state with the goal of being reunified with their primary caregiver; Kinship Care Families; Licensed Foster Families.</p>" +
                "<p>This box encompasses organizations and opportunities that assist in opening homes temporarily for children whose biological parents have been determined by the state as unable to care for them at the current time (the goal of this time is reunification with biological family.)</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                "<li>Foster Care</li>" +
                "<li>Therapeutic Foster Care</li>" +
                "<li>Kinship Foster Care</li>" +
                "<li>DDSD Foster Care</li>" +
                "<li>Residential treatment centers</li>" +
                "<li>Group homes</li>" +
                "<li>Temporary children’s shelters</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-3-col-3 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Reunification</h2>" +
                "<p><strong>Goal:</strong> To provide familial support to families seeking to reunify with their children in state care.</p>" +
                "<p><strong>Focus:</strong> At-risk Children and Families Seeking Reunification.</p>" +
                "<p>This box encompasses opportunities and organizations that desire to support biological families seeking reunification through familial support. This could include opening your home or church to assist with housing crisis or helping a family connect to resources that assist with housing. These families due to housing concerns could be limited in their ability to reunify with their children.</p>" +
                "<p><strong>Examples:</strong></p>" +
                "<ul>" +
                "<li>A single mother due to a domestic violence situation is needing housing before reunification efforts can occur.</li>" +
                "<li>We have a set of young parents that are needing a host family to assist them with reunification efforts. The parents need to see a healthy family like setting while they raise their child.</li>" +
                "<li>A formally incarcerated mom of 3 is looking for transitionary housing. She is seeking a family that would sponsor her due to her desire to be in healthy community.</li>" +
                "</ul>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });
    $('#row-3-col-4 .flip .back h6').click(function() {
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
    $('#row-3-col-5 .flip .back h6').click(function() {
        $('#gridmodal').html(
            "<div class='modal-content'>" +
                "<h2>Tier Three, Transition</h2>" +
                "<p><strong>Goal:</strong> To house and feed youth helping them transition into adulthood.</p>" +
                "<p><strong>Focus:</strong> Youth between the ages of 16-24 who have not been reunified or connected with an adoptive resource; those who have or will ‘age out’ of the state’s custody.</p>" +
                "<p>This box encompasses opportunities and organizations to journey with youth who are preparing to transition out of state care and into independent living by opening your home to be a safe and permanent place for them to come back to as they adjust to adult life.</p>" +
                "<p><strong>Examples:</strong> Homes that have a desire and capacity to assist youth and young adults that have a desire to transition. Garage apartments, or guest rooms that could provide a transitionary setting for youth. Willingness to provide a place for youth and young adults to have a family like setting on holidays or as needed. Becoming a host family to youth that have aged out of foster care while they are in college or in early work place engagement.</p>" +
            "</div>"
        );
        $('#gridmodal').modal('open');
    });


    // ------ Find Partners ------ //

    $('#findResourcesSubmitButton').click(findResources);

    function findResources(event, gridArea) {
        event.preventDefault();
        $('#resourcesmodal').html('');
        let form = $('#findResources').serializeArray();
        let selectedCounties = [];
        let selectedGridAreas = gridArea ? [gridArea] : [];
        let typeResources = [];
        let countyResources = [];
        let gridResources = [];
        let filteredResources = [];
        let finalResources = [];
        for (var i = 0; i < form.length; i++) {
            if (form[i]['name'] === 'Counties') {
                selectedCounties.push(form[i]['value']);
            } else if (form[i]['name'] === 'Grid Areas') {
                selectedGridAreas.push(form[i]['value']);
            }
        }
        for (var i = 0; i < resourcesJson.length; i++) {
            if (document.getElementById('findType').value !== 'Resource Type') {
                if (resourcesJson[i]['Type'] === document.getElementById('findType').value) {
                    typeResources.push(resourcesJson[i]);
                }
            } else {
                typeResources.push(resourcesJson[i]);
            }
            if (selectedCounties.length === 0 || selectedCounties.includes('All Counties')) {
                countyResources.push(resourcesJson[i]);
            } else {
                for (var a = 0; a < selectedCounties.length; a++) {
                    if (resourcesJson[i]['Counties'].includes('All Counties') || resourcesJson[i]['Counties'].includes(selectedCounties[a])) {
                        countyResources.push(resourcesJson[i]);
                        break;
                    }
                }
            }
            if (selectedGridAreas.length === 0) {
                gridResources.push(resourcesJson[i]);
            } else {
                for (var b = 0; b < selectedGridAreas.length; b++) {
                    if (resourcesJson[i]['Grid Areas'].includes(selectedGridAreas[b])) {
                        gridResources.push(resourcesJson[i]);
                        break;
                    }
                }
            }
        }
        filteredResources = (typeResources.concat(countyResources)).concat(gridResources);
        for (var i = 0; i < filteredResources.length; i++) {
            let count = 0;
            for (var a = 0; a < filteredResources.length; a++) {
                if (filteredResources[i] === filteredResources[a]) {
                    count += 1;
                }
            }
            if (count === 3) {
                finalResources.push(filteredResources[i]);
            }
        }
        finalResources = finalResources.filter(function(resource, index) {
            return finalResources.indexOf(resource) === index;
        });
        $('#resourcesmodal').html(
            "<div class='modal-content'>" +
                "<h2>Selected Resources:</h2>" +
                "<table class='striped'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th>Name</th>" +
                            "<th>Website</th>" +
                            "<th>Description</th>" +
                            "<th>Contact</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                    "</tbody>" +
                "</table>" +
            "</div>"
        );
        for (var i = 0; i < finalResources.length; i++) {
            console.log(finalResources);
            $(
                "<tr>" +
                    "<td>" + finalResources[i]['Name'] + "</td>" +
                    "<td>" + finalResources[i]['Website'] + "</td>" +
                    "<td>" + finalResources[i]['Description'] + "</td>" +
                    "<td>" + contactLink(finalResources[i]) + "</td>" +
                "</tr>"
            ).appendTo('#resourcesmodal tbody');
        }
        $('#resourcesmodal').modal('open');
        $('#findResources').trigger('reset');
    }

    function contactLink(resource) {
        if (resource['Open to Contact?'] === 'Yes') {
            return "<a class='contactLink' data-name='"+ resource['Name'] + "' data-email='" + resource['Champion Email'] + "'>Contact</a>";
        } else {
            return '';
        }
    }

    $('body').on('click', 'a.contactLink', function() {
        $('#contact-form').modal('open');
        $('#contact-form h4').text('Contact ' + this.dataset.name);
        $('#contact-form form input[name="receiver"]').val(this.dataset.email);
        $('#contact-button').text('Contact ' + this.dataset.name);
    });


    // ------ Become A Partner ------ //

    var currentTab = 0;
    showTab(currentTab);

    function showTab(currentTab) {
        const allTabs = document.getElementsByClassName('step');
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
            previousText = 'Partner Information';
            nextText = 'Partner Champion Information';
        } else if (currentTab === 2) {
            previousText = 'Form Submitter Information';
            nextText = 'Partner Descriptions';
        } else if (currentTab === 3) {
            previousText = 'Partner Champion Information';
            nextText = 'Miscellaneous Questions';
        } else {
            previousText = 'Partner Descriptions';
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
        const allTabs = document.getElementsByClassName('step');
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
            $('#championFirstName').val($('#formSubmitterFirstName').val());
            $('#championLastName').val($('#formSubmitterLastName').val());
            $('#championRole').val($('#formSubmitterRole').val());
            $('#championPhone').val($('#formSubmitterPhone').val());
            $('#championEmail').val($('#formSubmitterEmail').val());
        } else {
            $('#championFirstName').val('');
            $('#championLastName').val('');
            $('#championRole').val('');
            $('#championPhone').val('');
            $('#championEmail').val('');
        }
    });

    $('#terms-of-service-open').click(function() {
        $('#termsofservice').modal('open');
    });

    $('#terms-of-service-close').click(function() {
        $('#termsofservice').modal('close');
    });


    // ------ Message Handling ------ //
    if (success || errors) {
        $('#message-modal').modal('open');
    }
});
