const input = document.getElementById('input');
const output = document.getElementById('output');
const command = document.getElementById('command');
const copy = document.getElementById('copy');
function styleCode(code,bool,name){
    if(eval(`boolist.${bool}`) && !/[𒀀𒀁]/s.test(trans[i][j])){
        trans[i][j] = `<span class="${name}">${trans[i][j]}</span>`;
    }else if(RegExp(`${code}`,'s').test(trans[i][j])){
        trans[i][j] = trans[i][j].replace(RegExp(`${code}(.*)$`,'s'),`<span class="${name}">$1</span>`);
        eval(`boolist.${bool} = true`);
    };
};
input.oninput = ()=>{
    output.innerHTML = '';
    command.innerHTML = '';
    json = {'rawtext':input.value};//jsonObject
    json.rawtext = json.rawtext.match(/<:.*?:>|\[:.*?:\]|.+?(?=<:.*?:>|\[:.*?:\])|.+/sg);
    for(i=0;i<json.rawtext.length;i++){
        if(/<:.+?:>/sg.test(json.rawtext[i])){
            json.rawtext[i] = {'selector':json.rawtext[i].replace(/<:(.+?):>/sg,'$1')};
        }else if(/\[:.+?:.+?:\]/sg.test(json.rawtext[i])){
            json.rawtext[i] = {'score':{'name':json.rawtext[i].replace(/\[:(.+?):.+?:\]/sg,'$1'),'objective':json.rawtext[i].replace(/\[:.+?:(.+?):\]/g,'$1')}};
        }else{
            json.rawtext[i] = {'text':json.rawtext[i]};
        };
    };
    command.innerHTML = JSON.stringify(json);//command
    trans = '';//output
    for(i=0;i<json.rawtext.length;i++){
        if(json.rawtext[i].text !== undefined){
            trans += json.rawtext[i].text;
        }else if(json.rawtext[i].selector !== undefined){
            trans += '𒀀Steve𒀁';
        }else if(json.rawtext[i].score !== undefined){
            trans += '𒀀87𒀁';
        };
    };
    trans = trans.replace(/§{2}/sg,'');//§§
    trans = trans.replace(/§𒀀/sg,'𒀀§');//§[::]
    trans = trans.replace(/§𒀁/sg,'𒀁§');//[:§:]
    trans = trans.replace(/§[^0-9a-gklor]/sg,'');//§?
    trans = trans.split('§r');//§r
    for(i=0;i<trans.length;i++){
        trans[i] = trans[i].match(/^.*?(?=§k)|(?<=§k).*|^.*$/sg);//§k
        if(trans[i][1]){
            trans[i][1] = trans[i][1].replace(/§k/sg,'');
            trans[i][1] = trans[i][1].replace(/[^0-9a-glo§𒀀𒀁\n]|(?<!§)[0-9a-glo]/sg,'ⵍ');
        };
        trans[i] = trans[i].reduce((x,y)=>x+y);//复原
        trans[i] = trans[i].replace(/</sg,'&lt;');//<
        trans[i] = trans[i].replace(/>/sg,'&gt;');//>
        trans[i] = trans[i].match(/[𒀀𒀁]+|[^𒀀𒀁]*/sg);
        boolist = {lbool:false,obool:false,color:null};
        for(j=0;j<trans[i].length;j++){
            styleCode('§l','lbool','bold');//§l
            styleCode('§o','obool','italic');//§o
            if(boolist.color!==null && !/[𒀀𒀁]/s.test(trans[i][j])){//color
                trans[i][j] = `<span class="c${boolist.color}">${trans[i][j]}</span>`;
            };
            while(/§[0-9a-g]/s.test(trans[i][j])){
                boolist.color = trans[i][j].replace(/^.*?§([0-9a-g]).*$/s,'$1');
                trans[i][j] = trans[i][j].replace(/§[0-9a-g](.*)$/s,`<span class="c${boolist.color}">$1</span>`);
            };
        };
        trans[i] = trans[i].reduce((x,y)=>x+y);
    };
    trans = trans.reduce((x,y)=>x+y);
    trans = trans.replace(/\n/sg,'<br>');
    for(i=0;i<json.rawtext.length;i++){
        if(json.rawtext[i].selector !== undefined){
            trans = trans.replace(/(?<=.*?)𒀀(.*?)𒀁/s,`<a title='<:${json.rawtext[i].selector}:>'>$1</a>`);
        }else if(json.rawtext[i].score !== undefined){
            trans = trans.replace(/(?<=.*?)𒀀(.*?)𒀁/s,`<a title='[:${json.rawtext[i].score.name}|${json.rawtext[i].score.objective}:]'>$1</a>`);
        };
    };
    output.innerHTML = trans;
};
copy.onclick = ()=>{
    navigator.clipboard.writeText(command.innerHTML);
};
/*
=-=-=-=-=-=-=-=-=
MENU
=-=-=-=-=-=-=-=-=
<:alex:>---[:alex:money:]
§00 §11 §22 §33 §44 §55 §66 §77 §88
§99 §aa §bb §cc §dd §ee §ff §gg
§r§kk§r<-k   §ll§r<-l   §oo§r<-o
*/