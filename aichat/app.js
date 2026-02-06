const API = "https://ai-tools.takkunmcjp.workers.dev";
const log = document.getElementById("log");
const msg = document.getElementById("msg");
const send = document.getElementById("send");
let history=[];

function add(t,c){
  const d=document.createElement("div");
  d.className="bubble "+c;
  d.textContent=t;
  log.appendChild(d);
  log.scrollTop=log.scrollHeight;
}

send.onclick = async ()=>{
  const text=msg.value.trim();
  if(!text) return;
  msg.value="";
  add(text,"user");
  history.push({role:"user",content:text});

  try{
    const r = await fetch(API,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({message:text,history})
    });
    const d = await r.json();

    if(!d.choices){
      add("API Error:\n"+JSON.stringify(d,null,2),"ai");
      return;
    }

    const reply = d.choices[0].message.content;
    add(reply,"ai");
    history.push({role:"assistant",content:reply});

  }catch(e){
    add("Network error: "+e.message,"ai");
  }
};
