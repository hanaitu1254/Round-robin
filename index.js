const userName = document.getElementById('user-name');
const menber = document.getElementById('menber');
const listUpArea = document.getElementById('list-area');
const stringArea = document.getElementById('str-area');
const tournamentArea = document.getElementById('tournament-area');
const fightArea = document.getElementById('fight');
const eventLog = document.getElementById('eventLog');
const inputBox = document.getElementById('input-box');
const detekuru = document.getElementById('detekuru');
const kieru = document.getElementById('kieru');

//参加者のリストアップ
let set = new Set(); //set map←名前つき配列、連想配列
const showMenber = () => {
    const inputValue = userName.value;
    let start = confirm('入力した名前をリストに追加します。\r\n登録しますか？');
    if(start) {
        if (inputValue.length === 0) { //空欄なら動作しない
            return;
        } else {
            set.add(inputValue);
            menber.innerHTML = ``;
            for (let inputValue of set) {
                menber.innerHTML += `<input type="radio" class="class" id="${inputValue}" name="name" value="${inputValue}"> <label for=${inputValue}> ${inputValue} </label><br>`;
            }
            userName.value='';
            console.log(set.size);
        }
    }
};
//リストから名前を選択削除
const deleteMenber = () => {
    let nameList = document.getElementsByName('name');
    let result = confirm('選択した名前をリストから削除します。\r\nこの名前を削除しますか？');
    if (result) {
        for (a=0; a<nameList.length; a++) {
            if (nameList[a].checked) {
                set.delete(nameList[a].value);
                menber.innerHTML = ``;
                for (let value of set) {
                    menber.innerHTML += `<input type="radio" id="${value}" name="name" value="${value}"> <label for=${value}> ${value} </label><br>`;
                    console.log(value);
                }
                alert('削除しておきました');
                console.log('現在' + set.size + '人');
            }
        }
    } else {
        alert('やめときますね');
    }
};
//対面の抽選、新規ゲーム作成
fightArea.style.display = "none";
let playerList = [];
let newList = [];
const startGame = () => {
    let nameList = document.getElementsByName('name');
    let ready = confirm('登録したメンバーで抽選を始めます。\r\nゲームを開始しますか？');
    if (ready) {
        if (nameList.length === 0) {
            alert('参加者が見当たりませんね？');
        } else {
            listUpArea.style.display = "none";
            stringArea.style.display = "none";
            fightArea.style.display = "";
            for (b=0; b<nameList.length; b++) {
                playerList.push(nameList[b].value);
            }
            while (playerList.length) {
                const shuffle = Math.floor(Math.random()*playerList.length);
                newList.push(playerList[shuffle]);
                playerList.splice(shuffle,1);
            }
            console.log(newList);
            //ここから表作る
            let tempHtml = "";
            tempHtml += `<tr> <td>-</td>`;
            for (c=0;c<newList.length;c++) {
                tempHtml += `<td>${newList[c]}</td>`;
            }
            tempHtml += `</tr>`;
            for (d=0;d<newList.length;d++) {
                tempHtml += `<tr><td>${newList[d]}</td>`;
                for (e=0;e<newList.length;e++) {
                    let x;
                    if(d>e){
                        x = `${d}-${e}`;
                    } else if (d<e) {
                        x = `${e}-${d}`;
                    }
                    if (d==e) {
                        tempHtml += `<td>-</td>`;
                    } else {
                        tempHtml += `<td><input type="radio" class="class" name="${x}" value="${newList[d]}"></td>`;
                    }
                }
            }
            tournamentArea.innerHTML = tempHtml; //最後にまとめて追加
        }
    } //else {
      //  alert('もう少しだけ待ちますね');
    //}
};
//JSONでデータ保存、コピぺ用文字列出力
function outputLog(){
    eventLog.value = "";
    let listlog = { //整理用オブジェクトの中身を空にする(連打での無限追加防止)
        names: [],
        winner: [],
    };
    const radios = tournamentArea.querySelectorAll(".class");
    console.log(radios[2].value);
    for(p=0;p<radios.length;p++){
        console.log(radios[p]);
        if (radios[p].checked) {
            listlog.winner.push(`${radios[p].value}`);
        } else {
            listlog.winner.push("none");
        }
    }
    let x;
    if(d>e){
        x = `${d}-${e}`;
    } else if (d<e) {
        x = `${e}-${d}`;
    }
    for(f=0;f<newList.length;f++){
        listlog.names.push(`${newList[f]}`,);
    }
    alert('再開用のコードを出力しました。\r\nコピーボタンを押して保存してください。')
    const newListstr = JSON.stringify(listlog);
    eventLog.value = newListstr;
    console.log(newListstr); //確認用
};
//JSON.perseで文字列をjsに読み込む
function reStartGame(){ //前回使用時のJSONから対戦表再現
    let restartAlert = confirm('前回に生成したコードからゲーム状況を再現できます。\r\nゲームを再開しますか？\r\n(適切な入力でない場合、動作しない可能性があります。)');
    if (restartAlert) {
        if (inputBox.value.length > 5) {
            listUpArea.style.display = "none";
            stringArea.style.display = "none";
            fightArea.style.display = "";
            const inputLog = JSON.parse(inputBox.value);
            console.log(inputLog);
            newList = inputLog.names;
            //表の再生成
            let tempHtml = "";
            tempHtml += `<tr> <td>-</td>`;
            for (c=0;c<newList.length;c++) {
                tempHtml += `<td>${newList[c]}</td>`;
            }
            tempHtml += `</tr>`;
            for (d=0;d<newList.length;d++) {
                tempHtml += `<tr><td>${newList[d]}</td>`;
                for (e=0;e<newList.length;e++) {
                    let x;
                    if(d>e){
                        x = `${d}-${e}`;
                    } else if (d<e) {
                        x = `${e}-${d}`;
                    }
                    if (d==e) {
                        tempHtml += `<td>-</td>`;
                    } else {
                        tempHtml += `<td ><input type="radio" class="class" name="${x}" value="${newList[d]}"></td>`;
                    }
                }
            }
            tournamentArea.innerHTML = tempHtml;
            const inputs = document.querySelectorAll(".class");
            for (f=0;f<inputs.length;f++){
                console.log(inputs[f].value)
                if (inputLog.winner[f] == inputs[f].value){
                    inputs[f].checked = true;
                }        
            }
        }
    }
};
//作った文字列コピー
function copyButton(){
    if(eventLog.value.length > 4) {
        if(!navigator.clipboard) {
            alert("クリップボードにコピーできませんでした");
        }
        navigator.clipboard.writeText(eventLog.value).then(
            ()=>alert("クリップボードにコピーしました"),
            ()=>alert("クリップボードにコピーできませんでした")
        );
    }
};
//以下、没コードのコメントアウト達
//エンター入力でも動作(没,変換確定目的の入力でも追加されるから)
//userName.onkeydown = event => {
//    if (event.key === 'Enter') {
//        showMenber()
//    }
//};
//配列でペアを作るfor文
//if(newList.length == 0){
//    newList.push({first:shaffuledname, second: null});
//}else {
//    var b = newList[newList.length - 1];
//    if(b.second == null) {
//        b.second = shaffuledname;
//    } else {
//        newList.push({first:shaffuledname, second: null});
//    } 
//}

//            二重のfor文で表生成(没、余白できない)
//            let tempHtml = "";
//            for (c=0;c<newList.length;c++){
//                tempHtml +=`<tr>`;
//                for (d=0;d<newList.length;d++){
//                    if(c==d){
//                        tempHtml +=`<td>-</td>`;
//                    } else {
//                        tempHtml += `<td>${newList[d]}</td>`;
//                    }
//                }
//                tempHtml += `</tr>`;
//            }
//            tournamentArea.innerHTML = tempHtml;
//        } //専用に変数を作って、後から全部入れる