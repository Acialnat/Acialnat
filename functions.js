javascript2_check_func = true;

var how_to_use_num = 0;
var theme = "light";
var theme_button = document.getElementById("theme_button");
var theme_button2 = document.getElementById("theme_button2");
var speak_button = document.getElementsByClassName("speak_button")
var input_message = document.getElementById("message");
const luck = ['【大吉】今日は良いことがたくさんあります。', '【中吉】今日はちょっとした良いことがあります', '【吉】今日は小さな良いことがあります。良いことに気付けるように、慎重に過ごしましょう。', '【末吉】今日は些細な良いことがありますポジティブに過ごしましょう。', '【凶】今日は良くないことがあります。気をつけて過ごしましょう。', '【大凶】今日は良くないことがたくさんあります。気をつけて過ごしましょう。'];
var birthDate;
var y2;
var m2;
var d2;
var today;
var y1;
var m1;
var d1;
var sitename;
var ua = window.navigator.userAgent;
var now_how_to_use = false;

if (ua.indexOf('Trident') != -1 || ua.indexOf('MSIE') != -1) {
    document.getElementById("cover2").style.display = "block";
}

window.addEventListener('load', function() {
    if (localStorage.getItem('catalina_theme') === 'dark') {
        themetoggle()
    }

    if (localStorage.getItem('catalina_speak') === 'off') {
        speakonoff()
    }

    if (localStorage.getItem('catalina_speed') !== undefined && localStorage.getItem('catalina_speed') !== null) {
        speedchange(localStorage.getItem('catalina_speed'));
        document.getElementById("speed_r").value = localStorage.getItem('catalina_speed');
    }
    if (localStorage.getItem('catalina_pitch') !== undefined && localStorage.getItem('catalina_speed') !== null) {
        pitchchange(localStorage.getItem('catalina_pitch'));
        document.getElementById("pitch_r").value = localStorage.getItem('catalina_pitch');
    }
    if (localStorage.getItem('catalina_volume') !== undefined && localStorage.getItem('catalina_speed') !== null) {
        volumechange(localStorage.getItem('catalina_volume'));
        document.getElementById("volume_r").value = localStorage.getItem('catalina_volume');
    }
});


function tellthetime() {
    now = new Date();
    newmessage("今の時刻は、" + now.getHours() + "時 " + now.getMinutes() + "分 " + now.getSeconds() + "秒 です", 1, false, "sentiment_very_satisfied", false, true);
}

function yes_buttonclick() {
    $(".proposal_button").last().click();
}

/*
a=1 曜日
a=2 月
*/
function tellthedate(a) {
    now = new Date();
    if (now.getDay() == 0) {
        day = "日";
    } else if (now.getDay() == 1) {
        day = "月";
    } else if (now.getDay() == 2) {
        day = "火";
    } else if (now.getDay() == 3) {
        day = "水";
    } else if (now.getDay() == 4) {
        day = "木";
    } else if (now.getDay() == 5) {
        day = "金";
    } else if (now.getDay() == 6) {
        day = "土";
    }
    if (a == 1) {
        newmessage("今日は、" + day + "曜日です。", 1, false, "sentiment_very_satisfied", false, true);
    } else if (a == 2) {
        newmessage("今月は、" + (now.getMonth() + 1) + "月です。", 1, false, "sentiment_very_satisfied", false, true);
    } else {
        newmessage("今日の日付は、" + now.getFullYear() + "年 " + (now.getMonth() + 1) + "月 " + now.getDate() + "日 (" + day + ") です", 1, false, "sentiment_very_satisfied", false, "今日の日付は、" + now.getFullYear() + "年 " + (now.getMonth() + 1) + "月 " + now.getDate() + "日 " + day + " 曜日です。");
    }
}


function uranai() {
    newmessage("乱数を利用した占いなので、あまり気にしないでくださいね。外れることも多いです。<br>" + luck[Math.floor(Math.random() * luck.length)], 1, false, "sentiment_satisfied_alt", false, "乱数を利用した占いなので、あまり気にしないでくださいね。外れることも多いです。" + luck[Math.floor(Math.random() * luck.length)]);
}

function age() {
    // 年齢
    birthDate = new Date(2021, 7 - 1, 19);
    y2 = birthDate.getFullYear().toString().padStart(4, '0');
    m2 = (birthDate.getMonth() + 1).toString().padStart(2, '0');
    d2 = birthDate.getDate().toString().padStart(2, '0');
    today = new Date();
    y1 = today.getFullYear().toString().padStart(4, '0');
    m1 = (today.getMonth() + 1).toString().padStart(2, '0');
    d1 = today.getDate().toString().padStart(2, '0');
    newmessage('私はプログラムなので、年齢という概念がありませんが、私が作られてから' + Math.floor((Number(y1 + m1 + d1) - Number(y2 + m2 + d2)) / 10000) + '年経ちました。', 1, false, "sentiment_very_satisfied", false, true);
}

function how_to_use() {
    if (now_how_to_use) { return; }
    now_how_to_use = true;
    newmessage("Catalinaの使い方を説明します。", 1, null, 'sentiment_very_satisfied', true, true, false);
    $("#message").css('border', 'dotted 5px #0371ff');
    $("#how_to_use1").show();
    messagetype = "robot_message";

    input_message.value = "あなたのメッセージ";
    input_message.disabled = true;
    document.getElementById("send_button").disabled = true;
    document.getElementById("voice").disabled = true;

    new_speak("Catalinaの使い方を説明します。まず、こちらのボックスに自由にメッセージを入力します。", false);
}

function how_to_use_next(n) {
    how_to_use_num++;
    switch (n) {
        case 1:
            $("#message").css('border', 'none');
            $("#send_button").css('border', 'dotted 5px #0371ff');
            $("#how_to_use1").hide();
            if (window.innerWidth <= 750) {
                $("#how_to_use2").css({ 'right': '0', 'left': 'auto' });
            } else {
                $("#how_to_use2").css({ 'right': 'auto', 'left': ($("#send_button").offset().left - 82.5) + 'px' });
            }
            $("#how_to_use2").show();
            new_speak("こちらのボタンをクリックして送信します。 ", false);



            break;
        case 2:
            $("#send_button").css('border', 'none');
            $("#how_to_use2").hide();
            newmessage("あなたのメッセージ", 0, false, null, true, true);
            new_speak("あなたのメッセージが表示されたあと、Catalinaの返答が表示されます。", false);

            setTimeout(function() {
                input_message.disabled = false;
                document.getElementById("voice").disabled = false;
                document.getElementById("send_button").disabled = false;
                newmessage("Catalinaの返答", 1, null, 'sentiment_very_satisfied', false, true, false);
                input_message.value = "";
                now_how_to_use = true;
            }, Math.floor(Math.random() * (2001 - 100) + 100));

            break;
    }
}


function themetoggle() {
    if (theme === "light") {
        darkmode()
    } else if (theme === "dark") {
        lightmode()
    }
}

function darkmode() {
    theme = "dark";
    document.body.setAttribute('id', 'dark');
    theme_button.innerHTML = "<span>light_mode</span>ライトテーマ";
    theme_button2.innerHTML = "ライトテーマ";
    localStorage.setItem('catalina_theme', 'dark');
}

function lightmode() {
    theme = "light";
    document.body.removeAttribute('id');
    theme_button.innerHTML = "<span>dark_mode</span>ダークテーマ";
    theme_button2.innerHTML = "ダークテーマ";
    localStorage.setItem('catalina_theme', 'light');
}

function speakonoff() {
    if (speak == true) {
        speak = false;
        speechSynthesis.cancel();
        $("#speak_button").html("<span>voice_over_off</span>音声読み上げ機能をONにする")
        $("#speak_button2").html("音声読み上げ機能をONにする");
        localStorage.setItem('catalina_speak', 'off');
    } else {
        speak = true;
        $("#speak_button").html("<span>record_voice_over</span>音声読み上げ機能をOFFにする")
        $("#speak_button2").html("音声読み上げ機能をOFFにする")
        localStorage.setItem('catalina_speak', 'on');
    }

}

function pageopen(a) {
    switch (a) {
        case 1:
            window.open("https://www.google.com/");
            sitename = "Google";
            break;
        case 2:
            window.open("https://www.yahoo.co.jp/");
            sitename = "Yahoo! Japan";
            break;
        case 3:
            window.open("https://www.youtube.com/");
            sitename = "YouTube";
            break;
        case 4:
            window.open("https://tools.kamerakun.com/tools/camera/");
            sitename = "カメラ";
            break;
        case 5:
            window.open("https://tools.kamerakun.com/tools/time/timer.html");
            sitename = "タイマー";
            break;
        case 6:
            window.open("https://tools.kamerakun.com/tools/time/alarm.html");
            sitename = "アラーム";
            break;
        case 7:
            window.open("https://tools.kamerakun.com/tools/time/stopwatch.html");
            sitename = "ストップウォッチ";
            break;
        default:
            return false;
    }
    newmessage("はい、" + sitename + "を開きます", 1, false, "sentiment_very_satisfied", false, true);
}

window.addEventListener('load', function() {
    $(function() {
        var contextmenu = $('#contextmenu');

        $("#menu div button").click(function() {
            $('#menu').stop(true).animate({ 'width': 'toggle' }, 'fast');
            $('#cover').css('pointer-events', 'none').fadeToggle('fast');
        });

        $(window).on('contextmenu', function(e) {
            e.preventDefault();

            if (e.clientX >= $(document).width() - contextmenu.outerWidth()) {
                contextmenu.css('left', (e.clientX - contextmenu.outerWidth()) + 'px');
            } else {
                contextmenu.css('left', e.clientX + 'px');
            }

            if (e.clientY >= $(document).height() - contextmenu.outerHeight()) {
                contextmenu.css('top', (e.clientY - contextmenu.outerHeight()) + 'px');
            } else {
                contextmenu.css('top', e.clientY + 'px');
            }
            contextmenu.show();
        });

        $(window).on('click', function() {
            contextmenu.hide();
        });

        $("#message_area").scroll(function() {
            contextmenu.hide();
        });

    });
    (function($) {
        $.fn.wavebutton = function(options) {

            this.wrapInner('<span />').prepend('<div class="wave"></div>');

            var settings = $.extend({
                duration: "300",
                wavecolor: "#0047ba"
            }, options);



            this.on("mousedown", function(event) {
                $('.wave').css('background', settings.wavecolor);
                var wave = $(this).find('.wave');
                var clickX = event.pageX;
                var clickY = event.pageY;

                var widthheight = Math.hypot($(this).outerHeight(), $(this).outerWidth()) * 4;

                var clientRect = this.getBoundingClientRect();
                var positionX = clientRect.left + window.pageXOffset;
                var positionY = clientRect.top + window.pageYOffset;

                var x = (clickX - positionX);
                var y = (clickY - positionY);
                wave.css({
                    "left": x + "px",
                    "top": y + "px"
                }).show().animate({
                    "left": x - (widthheight / 2) + "px",
                    "top": y - (widthheight / 2) + "px",
                    "width": widthheight + "px",
                    "height": widthheight + "px"
                }, settings.duration);
            });

            this.on("mouseup mouseout", function(event) {
                var wave = $(this).find('.wave');
                wave.fadeOut('fast', function() {
                    wave.css({
                        "width": "0",
                        "height": "0"
                    });
                })
            });
            return this;
        };
    })(jQuery);
    $('.robot_message button').wavebutton({
        duration: 400,
        wavecolor: "rgba(0, 0, 0, 0.3)"
    });

    $('.how_to_use button').wavebutton({
        duration: 300,
        wavecolor: "#6f94ff"
    });

    $('#menu div button').wavebutton({
        duration: 300,
        wavecolor: "rgba(0, 0, 0, 0.3)"
    });
});




var tenki_adress_code = '';
var tenkinum = 0;

function tenki_message() {
    if (localStorage.getItem("UserAdress") !== null) {
        tenki(localStorage.getItem("UserAdress"))
    } else {
        tenkinum++;
        newmessage('<label>地域を選択してください：<select id="address-select' + tenkinum + '"><optgroup label="北海道地方"><option value="012000">旭川</option><option value="014100">釧路</option><option value="016000">札幌</option></optgroup><optgroup label="東北地方"><option value="020000">青森県</option><option value="030000">岩手県</option><option value="040000">宮城県</option><option value="050000">秋田県</option><option value="060000">山形県</option><option value="070000">福島県</option></optgroup><optgroup label="関東地方"><option value="080000">茨城県</option><option value="090000">栃木県</option><option value="100000">群馬県</option><option value="110000">埼玉県</option><option value="120000">千葉県</option><option value="130000"selected>東京都</option><option value="140000">神奈川県</option></optgroup><optgroup label="中部地方"><option value="150000">新潟県</option><option value="160000">富山県</option><option value="170000">石川県</option><option value="180000">福井県</option><option value="190000">山梨県</option><option value="200000">長野県</option><option value="210000">岐阜県</option><option value="220000">静岡県</option><option value="230000">愛知県</option></optgroup><optgroup label="近畿地方"><option value="240000">三重県</option><option value="250000">滋賀県</option><option value="260000">京都府</option><option value="270000">大阪府</option><option value="280000">兵庫県</option><option value="290000">奈良県</option><option value="300000">和歌山県</option></optgroup><optgroup label="中国地方"><option value="310000">鳥取県</option><option value="320000">島根県</option><option value="330000">岡山県</option><option value="340000">広島県</option><option value="350000">山口県</option></optgroup><optgroup label="四国地方"><option value="360000">徳島県</option><option value="370000">香川県</option><option value="380000">愛媛県</option><option value="390000">高知県</option></optgroup><optgroup label="九州地方"><option value="400000">福岡県</option><option value="410000">佐賀県</option><option value="420000">長崎県</option><option value="430000">熊本県</option><option value="440000">大分県</option><option value="450000">宮崎県</option><option value="460100">鹿児島県</option></optgroup><optgroup label="沖縄"><option value="471000">沖縄県（沖縄本島）</option></optgroup></select></label><button onclick="tenki(document.getElementById(\'address-select' + tenkinum + '\').value)">天気予報を表示</button>', 1, false, "sentiment_very_satisfied", false, "地域を選択してください");

        $('.robot_message button').wavebutton({
            duration: 400,
            wavecolor: "rgba(0, 0, 0, 0.3)"
        });
    }
}

/*
pathcode table

旭川 012000
釧路 014100
札幌 016000
青森県 020000
岩手県 030000
宮城県 040000
秋田県 050000
山形県 060000
福島県 070000
茨城県 080000
栃木県 090000
群馬県 100000
埼玉県 110000
千葉県 120000
東京都 130000
神奈川県 140000
新潟県 150000
富山県 160000
石川県 170000
福井県 180000
山梨県 190000
長野県 200000
岐阜県 210000
静岡県 220000
愛知県 230000
三重県 240000
滋賀県 250000
京都府 260000
大阪府 270000
兵庫県 280000
奈良県 290000
和歌山県 300000
鳥取県 310000
島根県 320000
岡山県 330000
広島県 340000
山口県 350000
徳島県 360000
香川県 370000
愛媛県 380000
高知県 390000
福岡県 400000
佐賀県 410000
長崎県 420000
熊本県 430000
大分県 440000
宮崎県 450000
鹿児島県 460100
沖縄県 471000
*/

function tenki(pathcode) {
    if (localStorage.getItem("UserAdress") == null && document.getElementById("address-select" + tenkinum).value !== undefined) {
        localStorage.setItem('UserAdress', document.getElementById("address-select" + tenkinum).value);
    }



    if (!window.navigator.onLine) {
        newmessage('インターネットエラー<br>現在、お使いの端末がインターネットに接続されていないため、気象情報を取得できません。', 1, false, "sentiment_very_dissatisfied", false, "インターネットエラー。現在、お使いの端末がインターネットに接続されていないため、気象情報を取得できません。");
        return;
    }

    let tenkiapi = "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/" + pathcode + ".json";

    fetch(tenkiapi)
        .then(function(response) {
            return response.json();
        })
        .then(function(weather) {
            const ts = Date.parse(weather.reportDatetime);
            const dt = new Date(ts);

            const requestDatetime = (dt.getFullYear() + "年" + (dt.getMonth() + 1) + "月" + dt.getDate() + "日" + dt.getHours() + "時" + dt.getMinutes() + "分");
            var weathertext = weather.text.replace(/\n\n/g, '<br>');
            var weathertext_s = weather.text.replace(/\n\n/g, '');
            console.log()

            tenkinum++;
            newmessage("　" + requestDatetime + '、' + weather.publishingOffice + '発表の、' + weather.targetArea + 'の気象予報です。<br>' + weathertext + '<a target="_blank" href=\'https://www.jma.go.jp/bosai/forecast/\'>詳細な気象情報を見るにはこちらをクリックしてください。</a><div style=\'margin-top:15px;padding-top:15px;border-top:solid 1px rgba(112.5,112.5,112.5,0.5)\'><div style="text-align:center">他の地域の天気を調べる</div><label>地域を選択してください：<select id="address-select' + tenkinum + '"><optgroup label="北海道地方"><option value="012000">旭川</option><option value="014100">釧路</option><option value="016000">札幌</option></optgroup><optgroup label="東北地方"><option value="020000">青森県</option><option value="030000">岩手県</option><option value="040000">宮城県</option><option value="050000">秋田県</option><option value="060000">山形県</option><option value="070000">福島県</option></optgroup><optgroup label="関東地方"><option value="080000">茨城県</option><option value="090000">栃木県</option><option value="100000">群馬県</option><option value="110000">埼玉県</option><option value="120000">千葉県</option><option value="130000"selected>東京都</option><option value="140000">神奈川県</option></optgroup><optgroup label="中部地方"><option value="150000">新潟県</option><option value="160000">富山県</option><option value="170000">石川県</option><option value="180000">福井県</option><option value="190000">山梨県</option><option value="200000">長野県</option><option value="210000">岐阜県</option><option value="220000">静岡県</option><option value="230000">愛知県</option></optgroup><optgroup label="近畿地方"><option value="240000">三重県</option><option value="250000">滋賀県</option><option value="260000">京都府</option><option value="270000">大阪府</option><option value="280000">兵庫県</option><option value="290000">奈良県</option><option value="300000">和歌山県</option></optgroup><optgroup label="中国地方"><option value="310000">鳥取県</option><option value="320000">島根県</option><option value="330000">岡山県</option><option value="340000">広島県</option><option value="350000">山口県</option></optgroup><optgroup label="四国地方"><option value="360000">徳島県</option><option value="370000">香川県</option><option value="380000">愛媛県</option><option value="390000">高知県</option></optgroup><optgroup label="九州地方"><option value="400000">福岡県</option><option value="410000">佐賀県</option><option value="420000">長崎県</option><option value="430000">熊本県</option><option value="440000">大分県</option><option value="450000">宮崎県</option><option value="460100">鹿児島県</option></optgroup><optgroup label="沖縄"><option value="471000">沖縄県（沖縄本島）</option></optgroup></select></label><button onclick="tenki(document.getElementById(\'address-select' + tenkinum + '\').value)">天気予報を表示</button></div>', 1, false, "sentiment_satisfied_alt", false, (requestDatetime + "、" + weather.publishingOffice + "発表の、" + weather.targetArea + "の気象予報です。" + weathertext_s + "詳細な気象情報を見るにはリンクをクリックしてください。"));
        });
}