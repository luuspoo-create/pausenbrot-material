'use strict';
const form=document.getElementById('prompt-form');
const output=document.getElementById('generated');
const outputButton=document.querySelector('[data-copy="generated"]');
const outputStatus=document.querySelector('.prompt-output .status');
function makePrompt(){
 const value=id=>document.getElementById(id).value.trim();
 const topic=value('topic')||'[Thema oder Material eintragen]';
 const context=[`Auftrag: ${topic}`,`Stufe und Vorwissen: ${value('class')||'[noch zu klären]'}`,`Lernziel: ${value('goal')||'[noch zu klären]'}`,`Rahmen und Unterstützung: ${value('context')||'[noch zu klären]'}`];
 if(document.getElementById('files').checked)context.push('Lies zuerst die angehängten Unterlagen. Sage ausdrücklich, wenn du eine Datei nicht lesen kannst oder etwas darin unklar ist. Erfinde keine fehlenden Inhalte.');
 context.push('Berücksichtige die Angaben oben. Frage nur nach wichtigen Punkten, die noch offen sind. Stelle höchstens drei konkrete Rückfragen und warte auf meine Antworten, bevor du das Material erstellst. Wenn alles Nötige geklärt ist, fasse den Auftrag kurz zusammen und warte auf mein Okay. Erfinde keine Angaben über meine Klasse.');
 output.textContent=context.join('\n\n');outputButton.disabled=false;outputStatus.textContent='Deine Vorlage ist aktualisiert und bereit zum Kopieren.';
}
form.addEventListener('submit',e=>{e.preventDefault();makePrompt()});
form.addEventListener('input',()=>{outputButton.disabled=true;outputStatus.textContent='Angaben geändert. Bitte zuerst «Meine Vorlage erstellen» wählen.'});
form.addEventListener('reset',()=>setTimeout(makePrompt,0));
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
 const target=document.getElementById(button.dataset.copy),text=target.textContent;
 const status=button.closest('.takeaway,.prompt-output,.disclosure').querySelector('.status');
 try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);else{const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.top='-1000px';document.body.appendChild(area);area.select();const ok=document.execCommand('copy');area.remove();if(!ok)throw Error('copy');}status.textContent='Kopiert. Du kannst den Text jetzt in deine KI-Anfrage einfügen.';}
 catch{const sel=window.getSelection(),range=document.createRange();range.selectNodeContents(target);sel.removeAllRanges();sel.addRange(range);status.textContent='Bitte den markierten Text über das Menü deines Geräts kopieren.';}
}));
