
//proxy server
// https://cors-anywhere.herokuapp.com/
// var settings = {
//     "url": `http://api.avatardata.cn/Constellation/Query?key=79eb4e3002294ac782c3a0a1aa1be343&consName=%E7%8B%AE%E5%AD%90%E5%BA%A7&type=today`,
//     "method": "GET",
//     "headers": {}
// }

// $.ajax(settings).done(function (response) {
//     console.log("hello ");
//     console.log(response);
// });

// var src = url + `$callback=hello`
// var script = `<script src ="${src}"></script>`;

// $(document).ready(function () {
//     $('body').append(script);
// });

$(document).ready(function () {



    //layout
    var hors = ["白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座", "水瓶座", "双鱼座"];
    var bornMonth = ["(3.21-4.19)", "(4.20-5.20)", "(5.21-6.21)", "(6.22-7.22)", "(7.23-8.22)", "(8.23-9.22)", "(9.23-10.23)", "(10.24-11.22)", "(11.23-12.21)", "(12.22-1.19)", "(1.20-2.18)", "(2.19-3.20)"];
    for (let i = 0; i < hors.length; i++) {
        $('.constellation').append(`
        <div class="col-lg-1 col-sm-2 col-3 ">
            <a href="#" class="box">
              <h3>${hors[i]}</h3>
              <img src="images/${hors[i]}.jpg" alt="">
              <p>${bornMonth[i]}</p>
            </a>
          </div>
        `);
    }

    //get data
    console.log("what's up");
    //https://cors-anywhere.herokuapp.com/
    var consName = `白羊座`; //狮子座   %E7%8B%AE%E5%AD%90%E5%BA%A7
    var date = `today`; //	运势类型：today,tomorrow,week,nextweek,month,year
    var url = `http://api.avatardata.cn/Constellation/Query?key=af95f014708e4c78a9c78be9008112dc&consName=${consName}&type=${date}`;


    //set the default content of page layout 
    $(".box:first").addClass("active");
    $(".dateSelection div:first").addClass("active");
    $(".consHeader").append(`<span>${consName}</span> <span>${date}</span>`);  //${data.name}
    getData(consName);


    //get data from api by using jquery ajax
    function getData(consName, date = "today") {
        var url = `http://api.avatardata.cn/Constellation/Query?key=af95f014708e4c78a9c78be9008112dc&consName=${consName}&type=${date}`;
        $.ajax({
            url: url,
            type: "GET",
            // headers: { "Access-Control-Allow-Origin": "*" },
            dataType: "json",
            // crossDomain: true,
            // contentType: "application/json",
            timeout: 5000,
            success: function (data, status, xhr) {
                console.log(`success: ${data.result1.name}, ${data.result1.number}`);
                console.log(data.result1);
                //console.log(status);
                // console.log(data);
                displayData(data.result1, consName);


            },

            error: function (xhr, status, error) {

                //enable click events
                $(".box").css("pointer-events", "auto");
                $(".dateSelection").css("pointer-events", "auto");
            },
        });
    }

    function displayData(data, consName) {
        //$(".consHeader").append(`<p>${consName}</p>`); //${data.name}
        $(".luckyIndex").append(`<div class ="apiData "></div>`);//${data.all}
        $(".luckyColor").append(`<p class ="apiData noCicle" id="getLuckyColor">${data.color}</p>`);//${data.color}
        $(".luckyNumber").append(`<p class ="apiData noCicle" >${data.number}</p>`);//
        $(".luckyLove").append(`<div class ="apiData" ></div>`);//${data.love}
        $(".luckyWork").append(`<div class ="apiData" ></div>`);//${data.work}
        $(".luckyFortune").append(`<div class ="apiData" ></div>`);//${data.money}
        $(".sumContent").append(`<p class ="apiData" >${data.summary}</p>`);//

        //enable click events
        $(".box").css("pointer-events", "auto");
        $(".dateSelection").css("pointer-events", "auto");

        //circle progress invoke after 
        //circle will attach to the parent tag
        circleProgress(".luckyIndex .apiData", data.all);
        circleProgress(".luckyLove .apiData", data.love, "#ce516b");
        circleProgress(".luckyWork .apiData", data.work, "#594e86");
        circleProgress(".luckyFortune .apiData", data.money, "#ff8844");

        $(".luckyIndex .apiData ").append(`<p class ="circleWord">${data.all}</p>`);
        $(".luckyLove .apiData ").append(`<p class ="circleWord">${data.love}</p>`);
        $(".luckyWork .apiData ").append(`<p class ="circleWord">${data.work}</p>`);
        $(".luckyFortune .apiData ").append(`<p class ="circleWord">${data.money}</p>`);

        //round circle color but the input data is in Chinese so...   
        // $('#getLuckyColor').css({
        //     "height": "120px", "width": "120px", "display": " table-cell", "text-align": "center",
        //     "vertical-align": "middle", "border-radius": "50%;", "background": `${data.color}`
        // });

    }


    function clearDisplay() {
        //$(".consHeader").empty();
        // $(".apiData .circular-progress-bar ").empty();
        //$(".circular-progress-bar").css("border", "3px solid red");

        $('.consHeader ').empty();
        $(".circular-progress-bar").remove(); //delete the div class
        $(".luckyColor .apiData").empty();
        $(".luckyNumber .apiData").empty();;
        $(".sumContent .apiData").empty();


    }


    // 
    $(".box").on("click", function (event) {
        //alert($(this).children(":first").text());;
        console.log("after click constellation: ");
        // console.log(this);
        //active effect
        $(".box").removeClass("active");
        $(this).addClass("active");
        //disable the clik event to prevent sending multiple requests
        $(".box").css("pointer-events", "none");
        $(".dateSelection").css("pointer-events", "none");

        clearDisplay();
        consName = $(this).children(":first").text();
        getData(consName);
        $(".consHeader").append(`<span>${consName}</span> <span> ${date}</span>`); //${data.name}
    });

    // date click event
    $(".dateSelection").on("click", "div", function (event) {
        console.log("after click date: ");
        // console.log(this);

        //active effect
        $(".dateSelection div").removeClass("active");
        $(this).addClass("active");


        //disable the clik event to prevent sending multiple requests
        $(".box").css("pointer-events", "none");
        $(".dateSelection").css("pointer-events", "none");

        date = $(this).attr("value");
        //console.log("date:");
        console.log(date);
        clearDisplay();
        getData(consName, date);
        $(".consHeader").append(`<span>${consName}</span> <span>${date}</span>`); //${data.name}
    });


    //circle progress 



    function circleProgress(targetTag, percent, circleColor = "#fcde9f") {
        // console.log('percent' + percent);
        // let percentage = percent;
        $(targetTag).circularProgress({
            line_width: 8,
            color: circleColor,  //circle color   "#fcde9f"
            starting_position: 25, // 12.00 o' clock position, 25 stands for 3.00 o'clock (clock-wise)
            percent: 0, // percent starts from
            percentage: true,
            height: "120px",
            width: "120px",

        }).circularProgress('animate', percent, 2000);
        //css
        //parent container tag and circle position
        $(targetTag).css({ "position": "relative", "background-color": "", "left": "28px" });

    }

    //#testCircle
    // circleProgress("#testCircle", 50);
    // circleProgress("#testCircle2", 10);


});