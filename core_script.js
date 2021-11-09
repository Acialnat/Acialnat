javascript1_check_core = true;

var messagetype, h, data, now, day, maybe_function, proposal_text, face, new_function, explanation, result, function_num, new_word, new_reply, kakunin, i, result2, message2, utterance_content, recognition;
var ctx, analyser, frequencies, getByteFrequencyDataAverage, draw;
var MaxVolume = 0.001;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var message_area = document.getElementById("message_area");
var error_message = document.getElementById('error-message');
var kaisu = sleep = m_kaisu = 0;
var maybe = add_words = [];
var greeting = 'こんにちは';
var utterance = new SpeechSynthesisUtterance();
var speak = true;
var now_voice_recognition = false;
var now_recognition = false;
speechSynthesis.onvoiceschanged = function() {
    voiceset();
};



function voice_recognition() {
    speechSynthesis.cancel();
    media = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    }).then(function(stream) {
        if (now_recognition) {
            $("#utterance_content").slideUp('fast', function() {
                $("#utterance_text_content").text('');
                now_recognition = false;
            });
            now_voice_recognition = false;
            recognition.abort();
            return;
        }

        if (!now_voice_recognition) {
            now_recognition = true

            SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;

            if ('SpeechRecognition' in window) {
                recognition = new SpeechRecognition();
                recognition.lang = 'ja-JP';
                recognition.interimResults = true;
                $("#utterance_content").css('display', 'inline-block');
                $("#utterance_text_content").text('音声を待機しています...');

                recognition.onresult = event => {
                    now_voice_recognition = true;
                    utterance_content = event.results[0][0].transcript;

                    if (event.results[0].isFinal) {
                        recognition.stop();
                        $("#message").val(utterance_content);
                        $("#utterance_content").slideUp('fast', function() {
                            $("#utterance_text_content").text('');
                            now_recognition = false;
                        });
                        $("#send_button").click();
                        now_voice_recognition = false;
                    } else {
                        $("#utterance_text_content").text(utterance_content);
                    }
                };

                recognition.onsoundstart = function() {
                    $("#utterance_text_contentn").text("発話を待機しています...");
                };
                recognition.onspeechstart = function() {
                    $("#utterance_text_contentn").text("認識中...");
                }
                recognition.onnomatch = function() {
                    recognition.stop();
                    $("#utterance_content").slideUp('fast');
                    $("#utterance_text_content").text('');
                    now_recognition = false;
                    $('#error-details').html("<div class='material-icons-round'>warning</div><div><p>認識できません。もう一度お試しください</p></div>");
                    $("#cover3").fadeIn('fast').css('display', 'flex');
                };

                recognition.onerror = function() {
                    recognition.stop();
                    $("#utterance_content").slideUp('fast');
                    $("#utterance_text_content").text('');
                    now_recognition = false
                    $('#error-details').html("<div class='material-icons-round'>warning</div><div><p>エラーが発生しました。もう一度お試しください</p></div>");
                    $("#cover3").fadeIn('fast').css('display', 'flex');
                };

                recognition.start();
            } else {
                $("#voice").css('display', 'none');
                $('#error-details').html("<div class='material-icons-round'>warning</div><div><p>お使いのブラウザは音声認識に対応していません。</p></div>");
                $("#cover3").fadeIn('fast').css('display', 'flex');
            }
        }

        ctx = new AudioContext();
        analyser = ctx.createAnalyser();
        frequencies = new Uint8Array(analyser.frequencyBinCount);
        window.hackForMozzila = stream;
        ctx.createMediaStreamSource(stream).connect(analyser);
        getByteFrequencyDataAverage = function() {
            analyser.getByteFrequencyData(frequencies);
            return frequencies.reduce(function(previous, current) {
                return previous + current;
            }) / analyser.frequencyBinCount;
        };
        (draw = function() {
            if (now_recognition) {
                var volume_temp = getByteFrequencyDataAverage();
                if (MaxVolume < volume_temp) {
                    MaxVolume = volume_temp;
                }

                document.getElementById("volume-progress").style.width = (volume_temp / MaxVolume) * 100 + "%";
                setTimeout(function() {
                    requestAnimationFrame(draw);
                }, 100);
            }
        })();


    }).catch(e => {
        $('#error-details').html("<div class='material-icons-round'>warning</div><div><p>音声認識を利用するには、マイクの使用を許可してください。</p><p>エラーコード：" + e + "</p></div>");
        $("#cover3").fadeIn('fast').css('display', 'flex');
    });
}

function voiceset() {
    if (window.speechSynthesis) {
        var voices = [];
        speechSynthesis.addEventListener("voiceschanged", select_voices);
        select_voices();
    }
}

function select_voices() {
    document.getElementById("select_voice").innerHTML = "";
    speechSynthesis.getVoices().filter(v => v.lang.startsWith("ja")).forEach(v => {
        var opt = document.createElement("option");
        opt.innerText = v.name;
        opt.value = v.name;

        if (v.name == "Google 日本語" && localStorage.getItem('catalina_voice') == undefined) {
            opt.selected = true;
            utterance.voice = speechSynthesis.getVoices().filter(voice => voice.name === "Google 日本語")[0];
        } else if (v.name == localStorage.getItem('catalina_voice') && localStorage.getItem('catalina_voice') !== undefined) {
            opt.selected = true;
            utterance.voice = speechSynthesis.getVoices().filter(voice => voice.name === localStorage.getItem('catalina_voice'))[0];
        }

        document.getElementById("select_voice").appendChild(opt);
    });
}

var catalinaname = ["catalinaさん", "カタリナさん", "catalina", "カタリナ"];
/*
sendmessage(引数１,引数２,引数３)
引数１ 送信するメッセージ
引数２ true=ユーザー側のメッセージを非表示（省略可）
引数３ true=返答を戻り値として取得（省略可）
*/

function sendmessage(message, a, b) {
    kaisu++;

    if (message == "") {} else {
        message = escapeHtml(message);
        message2 = message;
        result2 = message.toLowerCase().replace("?", "？").replace("1", "１").replace("2", "２").replace("3", "３").replace("4", "４").replace("5", "５").replace("6", "６").replace("7", "７").replace("8", "８").replace("9", "９").replace("0", "０").replace("#", "＃").replace("$", "＄").replace("%", "％").replace("&", "＆").replace("(", "（").replace(")", "）").replace(";", "；").replace(":", "：").replace("/", "／").replace(",", "、").replace("，", "、");

        while (result2 !== message2) {
            result2 = result2.toLowerCase().replace("?", "？").replace("1", "１").replace("2", "２").replace("3", "３").replace("4", "４").replace("5", "５").replace("6", "６").replace("7", "７").replace("8", "８").replace("9", "９").replace("0", "０").replace("#", "＃").replace("$", "＄").replace("%", "％").replace("&", "＆").replace("(", "（").replace(")", "）").replace(";", "；").replace(":", "：").replace("/", "／").replace(",", "、").replace("，", "、");
            message2 = message2.toLowerCase().replace("?", "？").replace("1", "１").replace("2", "２").replace("3", "３").replace("4", "４").replace("5", "５").replace("6", "６").replace("7", "７").replace("8", "８").replace("9", "９").replace("0", "０").replace("#", "＃").replace("$", "＄").replace("%", "％").replace("&", "＆").replace("(", "（").replace(")", "）").replace(";", "；").replace(":", "：").replace("/", "／").replace(",", "、").replace("，", "、");
        }

        $('#message').val("");

        if (!a) {
            newmessage(message, 0, false, null, true);
        }

        if (catalinaname.includes(hankana2Zenkana(kigounashi(message)))) {
            sleep = 0;
        }

        if (/って呼んでいい$/.test(hankana2Zenkana(kigounashi(message)))) {
            var catalinaname_temp = hankana2Zenkana(kigounashi(message)).split('って呼んでいい').join('');

            if (catalinaname_temp == "" || catalinaname_temp == " " || catalinaname_temp == "　") {
                newmessage("すみません。その呼び方には他の意味があるので、別の呼び方をしてください。", 1, false, "sentiment_dissatisfied", false, true);
                return;
            }

            if (catalinaname.includes(catalinaname_temp)) {
                newmessage("良いですよ！", 1, false, "sentiment_very_satisfied", false, true);
                return;
            }

            var canicall = learning(catalinaname_temp, "はい！お手伝いできることはありますか？", "sentiment_very_satisfied", true);

            if (canicall !== false) {
                catalinaname.push(catalinaname_temp);
                newmessage("良いですよ！", 1, false, "sentiment_very_satisfied", false, true);

                for (let i = 0; i < words.length; i++) {
                    if (words[i].word.indexOf('catalina') != -1) {
                        add_words.push({
                            word: words[i].word.split('catalina').join(catalinaname_temp),
                            explanation: words[i].explanation,
                            face: words[i].face
                        });
                    }
                }

                for (let i = 0; i < add_words.length; i++) {
                    if (add_words[i].word.indexOf('catalina') != -1) {
                        add_words.push({
                            word: add_words[i].word.split('catalina').join(catalinaname_temp),
                            explanation: add_words[i].explanation,
                            face: add_words[i].face
                        });
                    }
                }
            }

            if (!(/ちゃん$/.test(catalinaname_temp) || /さん$/.test(catalinaname_temp))) {
                canicall = learning(catalinaname_temp + "さん", "はい！お手伝いできることはありますか？", "sentiment_very_satisfied", true, true);

                if (canicall !== false) {
                    catalinaname.push(catalinaname_temp + "さん");
                }

                canicall = learning(catalinaname_temp + "ちゃん", "はい！お手伝いできることはありますか？", "sentiment_very_satisfied", true, true);

                if (canicall !== false) {
                    catalinaname.push(catalinaname_temp + "ちゃん");
                }
            }

            return;
        }

        if (sleep == 0) {
            result = words.find(v => v.word === message2);

            if (result === undefined) {
                result = words.find(v => v.word === hankana2Zenkana(message2));
            }

            if (result === undefined) {
                result = words.find(v => v.word === hankana2Zenkana(kigounashi(message2)));
            }

            if (result === undefined) {
                result = add_words.find(v => v.word === message2);
            }

            if (result === undefined) {
                result = add_words.find(v => v.word === hankana2Zenkana(kigounashi(message2)));

                if (result === undefined) {
                    maybe = [];
                    i = maybe_a_word.length;
                    maybe_function = undefined;
                    m_kaisu++;

                    while (i--) {
                        if (message.indexOf(maybe_a_word[i].word) !== -1) {
                            maybe_function = new Function(maybe_a_word[i].function);
                            proposal_text = maybe_a_word[i].proposal_text;
                            function_num = i;
                        }
                    }

                    if (b !== true) {
                        if (maybe_function !== undefined) {
                            if (maybe_a_word[function_num].function.indexOf('sendmessage') != -1) {
                                new_word = maybe_a_word[function_num].function.replace('sendmessage(\'', '').replace('\',true)', '');
                                new_reply = sendmessage(new_word, true, true);

                                if (new_function !== undefined) {
                                    newmessage("すみません、よくわかりません。<br>もしかして、「<button class='proposal_button' onclick=\"" + maybe_a_word[function_num].function+";add_words.push({word: '" + message + "',function: '" + new_reply.new_function + "', face: '" + new_reply.face + "'});this.disabled=true;\">" + proposal_text + "</button>」のことですか？", 1, message, "sentiment_dissatisfied", false, "すみません、よくわかりません。もしかして、「" + proposal_text + "」のことですか？");
                                } else {
                                    if (new_reply.read !== undefined) {
                                        newmessage("すみません、よくわかりません。<br>もしかして、「<button class='proposal_button' onclick=\"" + maybe_a_word[function_num].function+";add_words.push({word: '" + message + "',explanation: '" + new_reply.explanation + "', face: '" + new_reply.face + "',read:'" + new_reply.read + "'});this.disabled=true;\">" + proposal_text + "</button>」のことですか？", 1, message, "sentiment_dissatisfied", false, "すみません、よくわかりません。もしかして、「" + proposal_text + "」のことですか？");
                                    } else {
                                        newmessage("すみません、よくわかりません。<br>もしかして、「<button class='proposal_button' onclick=\"" + maybe_a_word[function_num].function+";add_words.push({word: '" + message + "',explanation: '" + new_reply.explanation + "', face: '" + new_reply.face + "'});this.disabled=true;\">" + proposal_text + "</button>」のことですか？", 1, message, "sentiment_dissatisfied", false, "すみません、よくわかりません。もしかして、「" + proposal_text + "」のことですか？");
                                    }
                                }
                            } else {
                                newmessage("すみません、よくわかりません。<br>もしかして、「<button class='proposal_button' onclick=\"" + maybe_a_word[function_num].function+";add_words.push({word: \'" + message + "\', function: \'" + maybe_a_word[function_num].function+"\', face: \'" + maybe_a_word[function_num].face + "\'});this.disabled=\'true;\'\">" + proposal_text + "</button>」のことですか？", 1, message, "sentiment_dissatisfied", false, "すみません、よくわかりません。もしかして、「" + proposal_text + "」のことですか？");
                            }
                        } else {
                            newmessage("すみません、よくわかりません。", 1, message, "sentiment_dissatisfied", false, "すみません、よくわかりません。");
                        }
                    }
                }
            } else {
                data = JSON.parse(JSON.stringify(result));
                explanation = data.explanation;
                face = data.face;
                var read = data.read;
                new_function = data.function;

                if (explanation !== undefined) {
                    if (b) {
                        if (read !== undefined) {
                            return {
                                explanation,
                                face,
                                read
                            };
                        } else {
                            return {
                                explanation,
                                face
                            };
                        }
                    } else {
                        if (data.read == undefined) {
                            newmessage(explanation, 1, false, face, false, explanation);
                        } else {
                            newmessage(explanation, 1, false, face, false, data.read);
                        }
                    }
                }

                if (new_function !== undefined) {
                    if (b) {
                        return {
                            new_function,
                            face
                        };
                    } else {
                        eval(new_function);
                    }
                }
            }
        }

        if (/^(さようなら|さよなら|バイバイ|おやすみ|おやすみなさい)$/.test(message)) {
            sleep = 1;
        }
    }
}
/*
newmessage(引数１,引数２,引数３,引数４,引数５,引数６,引数７)
引数１ メッセージの内容
引数２ 1=Catalina側のメッセージ 0=ユーザー側のメッセージ
引数３ ユーザー側のメッセージを格納（「Googleで検索」オプション用）（基本Catalina側のメッセージの場合のみ）
引数４ 表情（基本Catalina側のメッセージの場合のみ）
引数５ true=タイムアウトなし false/設定無し=ランダムなタイムアウト（省略可能）
引数６ true=引数１の内容を読み上げ　文字列=その文字列を読み上げ（省略可能）
引数７ true=読み上げをしない false=読み上げる（省略可能）
*/


function newmessage(a, b, c, d, e, f, g) {
    var i;

    if (e) {
        i = 0;
    } else {
        i = Math.floor(Math.random() * (2001 - 100) + 100);
    }

    setTimeout(function() {
        if (b == 0) {
            messagetype = "user_message";
            $("#message_area").append("<div><div class='" + messagetype + "'>" + a + "</div></div>");
        } else {
            if (f === true && g !== false) {
                new_speak(a);
            } else if (g !== false) {
                new_speak(f);
            }

            messagetype = "robot_message";

            if (c) {
                $("#message_area").append("<div><div class='face'>" + d + "</div><div class='" + messagetype + "'>" + a + "<br><a href='https://www.google.com/search?q=" + c + "' target='_blank'>Googleで「" + c + "」を検索</a></div></div>");
            } else {
                $("#message_area").append("<div><div class='face'>" + d + "</div><div class='" + messagetype + "'>" + a + "</div></div>");
            }
        }

        message_area.scroll(0, message_area.scrollHeight - message_area.clientHeight);
    }, i);
}

function datasave() {
    if (add_words == "") {
        $('#error-details').html("<div class='material-icons-round'>warning</div><div><p>学習データがありません。</p></div>");
        $("#cover3").fadeIn('fast').css('display', 'flex');
    } else {
        var catalinaname_output = "[";
        for (let i = 0; i < catalinaname.length; i++) {
            catalinaname_output += "\'" + catalinaname[i] + "\'";
            if (i == catalinaname.length - 1) {
                catalinaname_output += "]";
            } else {
                catalinaname_output += ",";
            }
        }

        var blob = new Blob(["add_words = " + JSON.stringify(add_words) + ";" + "catalinaname = " + catalinaname_output + ";"], {
            type: "text/javascript"
        });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Catalina_Assistant_Data.js';
        link.click();
    }
}

function dataload() {
    $("#fileselect").click();
}

function learning(a, b, c, d, e) {
    if (a !== "" && b !== "" && c !== "") {
        if (add_words.find(v => v.word === hankana2Zenkana(a)) == undefined && words.find(v => v.word === hankana2Zenkana(a)) == undefined) {
            add_words.push({
                word: hankana2Zenkana(kigounashi(a)),
                explanation: b,
                face: c
            });

            for (let i = 0; i < catalinaname.length; i++) {
                if (hankana2Zenkana(kigounashi(a)).indexOf(catalinaname[i]) != -1) {
                    for (let e = 0; e < catalinaname.length; e++) {
                        if (!(catalinaname[e] == catalinaname[i])) {
                            add_words.push({
                                word: hankana2Zenkana(kigounashi(a)).split(catalinaname[i]).join(catalinaname[e]),
                                explanation: b,
                                face: c
                            });
                        }
                    }
                }
            }
            error_message.innerText = "";
            $('#question').val("");
            $('#answer').val("");
            $('#faceset').val("");
        } else {
            if (d) {
                if (e !== true) {
                    newmessage("すみません。その呼び方には他の意味があるので、別の呼び方をしてください。", 1, false, "sentiment_dissatisfied", false, true);
                }
                return false;
            } else {
                error_message.innerText = "すでに単語が登録されています。";
            }
        }
    } else {
        error_message.innerText = "未入力の項目があります。";
    }
}

function hankana2Zenkana(str) {
    var str2 = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }).toLowerCase();
    var kanaMap = {
        'ｶﾞ': 'ガ',
        'ｷﾞ': 'ギ',
        'ｸﾞ': 'グ',
        'ｹﾞ': 'ゲ',
        'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ',
        'ｼﾞ': 'ジ',
        'ｽﾞ': 'ズ',
        'ｾﾞ': 'ゼ',
        'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ',
        'ﾁﾞ': 'ヂ',
        'ﾂﾞ': 'ヅ',
        'ﾃﾞ': 'デ',
        'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ',
        'ﾋﾞ': 'ビ',
        'ﾌﾞ': 'ブ',
        'ﾍﾞ': 'ベ',
        'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ',
        'ﾋﾟ': 'ピ',
        'ﾌﾟ': 'プ',
        'ﾍﾟ': 'ペ',
        'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ',
        'ﾜﾞ': 'ヷ',
        'ｦﾞ': 'ヺ',
        'ｱ': 'ア',
        'ｲ': 'イ',
        'ｳ': 'ウ',
        'ｴ': 'エ',
        'ｵ': 'オ',
        'ｶ': 'カ',
        'ｷ': 'キ',
        'ｸ': 'ク',
        'ｹ': 'ケ',
        'ｺ': 'コ',
        'ｻ': 'サ',
        'ｼ': 'シ',
        'ｽ': 'ス',
        'ｾ': 'セ',
        'ｿ': 'ソ',
        'ﾀ': 'タ',
        'ﾁ': 'チ',
        'ﾂ': 'ツ',
        'ﾃ': 'テ',
        'ﾄ': 'ト',
        'ﾅ': 'ナ',
        'ﾆ': 'ニ',
        'ﾇ': 'ヌ',
        'ﾈ': 'ネ',
        'ﾉ': 'ノ',
        'ﾊ': 'ハ',
        'ﾋ': 'ヒ',
        'ﾌ': 'フ',
        'ﾍ': 'ヘ',
        'ﾎ': 'ホ',
        'ﾏ': 'マ',
        'ﾐ': 'ミ',
        'ﾑ': 'ム',
        'ﾒ': 'メ',
        'ﾓ': 'モ',
        'ﾔ': 'ヤ',
        'ﾕ': 'ユ',
        'ﾖ': 'ヨ',
        'ﾗ': 'ラ',
        'ﾘ': 'リ',
        'ﾙ': 'ル',
        'ﾚ': 'レ',
        'ﾛ': 'ロ',
        'ﾜ': 'ワ',
        'ｦ': 'ヲ',
        'ﾝ': 'ン',
        'ｧ': 'ァ',
        'ｨ': 'ィ',
        'ｩ': 'ゥ',
        'ｪ': 'ェ',
        'ｫ': 'ォ',
        'ｯ': 'ッ',
        'ｬ': 'ャ',
        'ｭ': 'ュ',
        'ｮ': 'ョ',
        '｡': '。',
        '､': '、',
        'ｰ': 'ー',
        '｢': '「',
        '｣': '」',
        '･': '・',
        ' ': '',
        '　': ''
    };
    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    var result3 = str2.replace(reg, function(match) {
        return kanaMap[match];
    }).replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜');
    return result3;
}

window.addEventListener('load', function() {
    try {
        SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
    } catch (error) {
        document.getElementById("voice").style.visibility = "hidden";
    }
    $(function() {
        $('#fileselect').change(function(e) {
            file = e.target.files;
            reader = new FileReader();
            reader.readAsText(file[0]);

            reader.onload = function() {
                if (add_words == "") {
                    eval(reader.result);
                } else {
                    kakunin = window.confirm('今回起動時から今までの学習データが失われます。\nキャンセルして学習データを出力することをおすすめします。\n続行する場合はOKを押してください。');

                    if (kakunin) {
                        eval(reader.result);
                    }
                }
            };
        });
    });
});

var escapeHtml = function(String) {
    var escapeMap = {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;'
    };
    var escapeReg = '[';
    var reg;

    for (var p in escapeMap) {
        if (escapeMap.hasOwnProperty(p)) {
            escapeReg += p;
        }
    }

    escapeReg += ']';
    reg = new RegExp(escapeReg, 'g');
    return function escapeHtml(str) {
        str = str === null || str === undefined ? '' : '' + str;
        return str.replace(reg, function(match) {
            return escapeMap[match];
        });
    };
}(String);

function new_speak(n, a) {
    if (speak && !now_recognition) {
        if (!a) {
            speechSynthesis.cancel();
        }

        utterance.text = n;
        speechSynthesis.speak(utterance);
    }
}

function speedchange(n) {
    utterance.rate = Number(n);
    document.getElementById("speed_preview").innerText = rounding(Number(n), 1).toFixed(1);
    localStorage.setItem('catalina_speed', n);
}

function pitchchange(n) {
    utterance.pitch = Number(n);
    document.getElementById("pitch_preview").innerText = rounding(Number(n), 1).toFixed(1);
    localStorage.setItem('catalina_pitch', n);
}

function volumechange(n) {
    utterance.volume = Number(n);
    document.getElementById("volume_preview").innerText = rounding(Number(n), 1).toFixed(1);
    localStorage.setItem('catalina_volume', n);
}

function voicechange(n) {
    utterance.voice = speechSynthesis.getVoices().filter(voice => voice.name === n)[0];
    localStorage.setItem('catalina_voice', n);
}

function rounding(a, b) {
    var c = Math.pow(10, b + 1) / 10;
    return Math.round(a * c) / c;
}

function kigounashi(str) {
    replacekigou = ["？", "?", , "！", "!", ",", "、", "。", ".", "，", "・", "「", "」", "（", "）", "\"", "\'", "”", "’", "$", "＄", "%", "％", "&", "＆", "-", "^", "~", "=", "＝"];

    for (let i = 0; i < replacekigou.length; i++) {
        str = str.split(replacekigou[i]).join('');
    }

    return str;
}