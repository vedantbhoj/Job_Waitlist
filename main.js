

function populateJobs() {
    var h_range = [90, 360];
    var s_range = [90, 100];
    var l_range = [0, 60];
    var a_range = [0.7, 0.7];

    function getRandomColor(h, s, l, a) {
        var hue = getRandomNumber(h[0], h[1]);
        var saturation = getRandomNumber(s[0], s[1]);
        var lightness = getRandomNumber(l[0], l[1]);
        var alpha = getRandomNumber(a[0] * 100, a[1] * 100) / 100;
        return getHSLAColor(hue, saturation, lightness, alpha);

    }

    function getRandomNumber(low, high) {
        var r = Math.floor(Math.random() * (high - low + 1)) + low;
        return r;
    }

    function getHSLAColor(h, s, l, a) {
        return `hsl(${h}, ${s}%, ${l}%, ${a})`;
    }


    if (typeof (Storage) !== "undefined") {

        var job_list = JSON.parse(localStorage.getItem('job_list'));
        $(".card-container").html('');

        function iterate(item, index) {
            var cardHtml = '<div class="card pr-card" style="background-color:' + getRandomColor(h_range, s_range, l_range, a_range) + '">' +
                '    <div class="card-body pr-card-body">' +
                '        <h5 class="card-title">' + item.name + ' <span class="delete-job" id="'+index+'" ><i class="fa fa-trash"></i></span> </h5> ' +
                '        <p class="card-text">' + item.title + '</p>' +
                '        <p class="card-text pr-card-updates"><small>Last updated 3 mins ago</small></p>' +
                '    </div> ' +
                '    </div>';

            //console.log(getRandomColor(h_range, s_range, l_range, a_range));
            $(".card-container").append(cardHtml);
        }


        job_list.forEach(iterate);

        if (job_list.length > 0) {
            $(".delete-job").click(function () {
                $('#delete_btn').attr('data-jobid',$(this).data('id'));
                $('#deletejob_dialog').modal('show');
            });
        }
        $('.job-count').html(job_list.length + ' JOBS')

    }
}

$('#addJobForm').submit(function (e) {
    e.preventDefault();
    var companyname = $("#company-name").val().trim();
    var jobtitle = $("#job-title").val().trim();
    var job_obj =
    {
        "name": companyname,
        "title": jobtitle,
        "date_added": Date.now()
    };

    if (typeof (Storage) !== "undefined") {

        var job_list = JSON.parse(localStorage.getItem('job_list'));
        job_list.push(job_obj);
        $('.pr-text').val('');
        localStorage.setItem('job_list', JSON.stringify(job_list));
        populateJobs();
        $('#addjob').modal('hide');
    }

});

function deleteJob() {
    var id = $(this).attr("data-jobid");
    var job_list = JSON.parse(localStorage.getItem('job_list'));
    job_list.splice(id, 1);
    localStorage.setItem('job_list', JSON.stringify(job_list));
    populateJobs();
    $('#deletejob_dialog').modal('hide');
}


if (typeof (Storage) !== "undefined") {
    var initial_list = [];
    // var initial_list = [
    //     {
    //         "name": "Pathrise",
    //         "title": "Web Developer",
    //         "date_added": ""
    //     },
    //     {
    //         "name": "Airbnb",
    //         "title": "Web Developer",
    //         "date_added": ""
    //     },
    //     {
    //         "name": "Google",
    //         "title": "Software Engineer",
    //         "date_added": ""
    //     },
    //     {
    //         "name": "Facebook",
    //         "title": "Software Engineer",
    //         "date_added": ""
    //     }
    // ];

    localStorage.setItem('job_list', JSON.stringify(initial_list));
    populateJobs();
}
else {
    alert("Sorry, your browser does not support web storage...");
}






