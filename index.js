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
let set = new Set();
const showMenber = () => {
    const inputValue = userName.value;
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
};

//エンター入力でも動作(没,変換確定目的の入力でも追加されるから)
//userName.onkeydown = event => {
//    if (event.key === 'Enter') {
//        showMenber()
//    }
//};

const deleteMenber = () => { //リストの名前削除
    let nameList = document.getElementsByName('name');
    let result = confirm('削除しますか？');
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
}; //set map←名前つき配列、連想配列

//対面の抽選、ゲーム作成
fightArea.style.display = "none";
let playerList = [];
let newList = [];
const startGame = () => {
    let nameList = document.getElementsByName('name');
    let ready = confirm('開始しますか？');
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
            tournamentArea.innerHTML = tempHtml; //最後に追加
        }
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
    } else {
        alert('もう少しだけ待ちますね');
    }
};

//JSONでデータ保存 文字列作るよ
let listlog = { //整理用オブジェクト
    names: [],
    winner: [],
};
detekuru.style.display = "none";
function outputLog(){
    eventLog.value = "";
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
    const newListstr = JSON.stringify(listlog);
    eventLog.value = newListstr;
    detekuru.style.display = "";
    kieru.style.display = "none";

    console.log(newListstr); //確認用
};

//JSON.perseで文字列をjsに落とし込む
function reStartGame(){ //前回使用時のJSONから対戦表再現
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
            } //else {
                //inputs[f].checked = false;
            //}
        }
        //tournamentArea.innerHTML = tempHtml;
    }
};

function copyButton(){ //作った文字列コピー
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
