import { useState, useEffect } from "react";

const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{overflow-x:hidden}
a{text-decoration:none;color:inherit}
@keyframes breathe{0%{opacity:.7;transform:scaleY(1)}100%{opacity:1;transform:scaleY(1.07)}}
@keyframes sway{0%,100%{transform:rotate(-2.5deg) scaleY(1)}50%{transform:rotate(2.5deg) scaleY(1.08)}}
@keyframes blip{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
@keyframes floatUp{0%{opacity:0;transform:translateY(0)}20%{opacity:.6}80%{opacity:.2}100%{opacity:0;transform:translateY(-80px)}}
@keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.hero-glow{animation:breathe 9s ease-in-out infinite alternate}
.shaft{position:absolute;top:-15%;height:75%;background:linear-gradient(to bottom,rgba(76,168,240,.18),transparent);transform-origin:top center}
.shaft:nth-child(1){width:1.5px;left:18%;animation:sway 12s ease-in-out infinite;opacity:.55}
.shaft:nth-child(2){width:2.5px;left:32%;animation:sway 15s ease-in-out infinite .7s;opacity:.35}
.shaft:nth-child(3){width:1.5px;left:50%;animation:sway 11s ease-in-out infinite 1.4s;opacity:.6}
.shaft:nth-child(4){width:2px;left:68%;animation:sway 14s ease-in-out infinite 2s;opacity:.3}
.shaft:nth-child(5){width:1.5px;left:82%;animation:sway 13s ease-in-out infinite .3s;opacity:.45}
.ptcl{position:absolute;width:2px;height:2px;border-radius:50%;background:#4CA8F0;animation:floatUp linear infinite;opacity:0}
.ptcl:nth-child(1){left:15%;top:20%;animation-duration:8s}
.ptcl:nth-child(2){left:35%;top:40%;animation-duration:11s;animation-delay:2s}
.ptcl:nth-child(3){left:55%;top:15%;animation-duration:9s;animation-delay:4s}
.ptcl:nth-child(4){left:70%;top:50%;animation-duration:12s;animation-delay:1s}
.ptcl:nth-child(5){left:85%;top:30%;animation-duration:7s;animation-delay:3s}
.ptcl:nth-child(6){left:8%;top:60%;animation-duration:10s;animation-delay:5s}
.dot-pulse{animation:blip 2.2s ease-in-out infinite}
.ticker-strip{display:flex;gap:1.8rem;width:max-content;animation:tick 28s linear infinite}
.ticker-strip:hover{animation-play-state:paused}
.scard{transition:all .3s}
.scard:hover{border-color:rgba(76,168,240,.3)!important;transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.4),0 0 36px rgba(18,96,208,.1)}
.qmod{transition:all .25s ease}
.qmod:hover{border-color:rgba(76,168,240,.3)!important;transform:translateX(5px)}
.btn-p{background:linear-gradient(135deg,#1260D0,#0A40A0);color:#fff;box-shadow:0 0 26px rgba(18,96,208,.4);transition:all .25s ease;cursor:pointer}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 0 42px rgba(18,96,208,.6)!important}
.btn-o{background:transparent;border:1px solid rgba(76,168,240,.15);color:#D8EEFF;transition:all .25s ease;cursor:pointer}
.btn-o:hover{background:rgba(255,255,255,.04)!important;border-color:#4CA8F0!important;color:#4CA8F0!important}
.nav-a{transition:color .2s}
.nav-a:hover{color:#D8EEFF!important}
.faq-ans{transition:max-height .38s ease,padding .38s ease;overflow:hidden;max-height:0;padding:0 1.4rem}
.faq-ans.open{max-height:250px;padding:0 1.4rem 1.25rem}
.mob-nav{display:none;position:fixed;inset:0;background:rgba(5,14,28,.97);flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;z-index:990}
.mob-nav.open{display:flex}
@media(max-width:780px){
  .dsk-nav{display:none!important}
  .ham-btn{display:flex!important}
  .aud-grid,.quant-layout,.foot-inner{grid-template-columns:1fr!important}
  .steps-track{grid-template-columns:1fr!important}
  .steps-connector{display:none!important}
  .stats-row{gap:2rem!important}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

const T = {
  bg0:"#050E1C",bg1:"#091828",
  az:"#1260D0",sky:"#4CA8F0",
  fr:"#D8EEFF",mi:"#7AAFC6",dim:"#3A5F78",
  bd:"rgba(76,168,240,0.12)",glass:"rgba(255,255,255,0.035)",
  fn:"'Space Grotesk',system-ui,sans-serif",
  fb:"'Inter',system-ui,sans-serif",
};

const btn = {display:"inline-flex",alignItems:"center",gap:".4rem",fontFamily:T.fn,fontWeight:600,border:"none",textDecoration:"none"};
const card = {background:T.glass,border:`1px solid ${T.bd}`,borderRadius:16,padding:"1.9rem"};

const Lbl = ({c}) => <span style={{display:"inline-block",fontSize:".72rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:T.sky,marginBottom:".7rem"}}>{c}</span>;

const SHead = ({label,title,sub}) => (
  <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
    <Lbl c={label}/>
    <h2 style={{fontFamily:T.fn,fontWeight:600,fontSize:"clamp(1.5rem,2.8vw,2.3rem)",letterSpacing:"-.02em",color:T.fr}}>{title}</h2>
    {sub && <p style={{maxWidth:520,margin:".6rem auto 0",fontSize:".97rem",color:T.mi,lineHeight:1.8}}>{sub}</p>}
  </div>
);

const Btn = ({href,children,primary,lg,style:sx,className}) => (
  <a href={href} className={`${primary?"btn-p":"btn-o"} ${className||""}`}
    style={{...btn,borderRadius:lg?11:9,fontSize:lg?"1rem":".9rem",padding:lg?".95rem 2.1rem":".7rem 1.5rem",...sx}}>
    {children}
  </a>
);

function Header({scrolled}) {
  const [open,setOpen] = useState(false);
  const links = [["Services","#services"],["Quant Trading","#quant"],["Who We Help","#audience"],["Process","#how"],["FAQ","#faq"]];
  return (
    <>
      <header style={{position:"fixed",top:0,width:"100%",zIndex:999,padding:".9rem 1.5rem",background:"rgba(5,14,28,.78)",backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:scrolled?"0 4px 40px rgba(0,0,0,.5)":"none",transition:"box-shadow .3s"}}>
        <a href="#" style={{display:"flex",alignItems:"center",gap:".55rem"}}>
          <div style={{width:34,height:34,background:"linear-gradient(135deg,#1260D0,#4CA8F0)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.fn,fontWeight:700,fontSize:".95rem",color:"#fff",flexShrink:0}}>CX</div>
          <span style={{fontFamily:T.fn,fontWeight:700,fontSize:"1.08rem",color:T.fr}}>Couin <span style={{color:T.sky}}>XAI</span></span>
        </a>
        <nav className="dsk-nav" style={{display:"flex",alignItems:"center",gap:"1.8rem"}}>
          {links.map(([n,h])=><a key={n} href={h} className="nav-a" style={{color:T.mi,fontSize:".88rem",fontWeight:500}}>{n}</a>)}
          <Btn href="#contact" primary>Get Started</Btn>
        </nav>
        <button className="ham-btn" onClick={()=>setOpen(o=>!o)} aria-label="Toggle menu"
          style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:".4rem",flexDirection:"column",gap:"5px"}}>
          <span style={{width:22,height:2,background:T.mi,borderRadius:2,display:"block"}}/>
          <span style={{width:22,height:2,background:T.mi,borderRadius:2,display:"block"}}/>
          <span style={{width:22,height:2,background:T.mi,borderRadius:2,display:"block"}}/>
        </button>
      </header>
      <div className={`mob-nav${open?" open":""}`}>
        {[...links,["Get Started","#contact"]].map(([n,h])=>(
          <a key={n} href={h} onClick={()=>setOpen(false)}
            style={{color:T.fr,fontSize:"1.3rem",fontWeight:600,fontFamily:T.fn}}>{n}</a>
        ))}
      </div>
    </>
  );
}

function Hero() {
  return (
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"7rem 1.5rem 4rem",position:"relative",overflow:"hidden",background:T.bg0}}>
      <div className="hero-glow" style={{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 90% 55% at 50% -5%,rgba(18,96,208,.32) 0%,transparent 65%),radial-gradient(ellipse 60% 35% at 25% 60%,rgba(76,168,240,.06) 0%,transparent 55%),radial-gradient(ellipse 60% 35% at 75% 55%,rgba(18,96,208,.07) 0%,transparent 55%)"}} aria-hidden="true"/>
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}} aria-hidden="true">
        <div className="shaft"/><div className="shaft"/><div className="shaft"/>
        <div className="shaft"/><div className="shaft"/>
      </div>
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}} aria-hidden="true">
        {[0,1,2,3,4,5].map(i=><div key={i} className="ptcl"/>)}
      </div>
      <div style={{position:"relative",zIndex:1,maxWidth:760}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:".45rem",background:"rgba(18,96,208,.12)",border:"1px solid rgba(76,168,240,.22)",color:T.sky,padding:".35rem .95rem",borderRadius:20,fontSize:".75rem",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:"1.6rem"}}>
          <span className="dot-pulse" style={{width:6,height:6,background:T.sky,borderRadius:"50%",display:"inline-block"}} aria-hidden="true"/>
          Port Harcourt's AI Growth Agency
        </div>
        <h1 style={{fontFamily:T.fn,fontWeight:700,fontSize:"clamp(2.2rem,5.5vw,4.6rem)",lineHeight:1.07,letterSpacing:"-.035em",marginBottom:"1.4rem",color:T.fr}}>
          Clip Smarter.<br/>
          <span style={{background:"linear-gradient(130deg,#2278F0,#4CA8F0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Automate Everything.</span><br/>
          Grow Faster.
        </h1>
        <p style={{fontSize:"1.1rem",maxWidth:540,margin:"0 auto 2.5rem",color:T.mi,lineHeight:1.8}}>
          Couin XAI Agency helps beginner to intermediate clippers, AI automators, and quant traders across Nigeria build powerful, profitable workflows — without the overwhelm.
        </p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          <Btn href="#contact" primary lg>Start Your AI Journey</Btn>
          <Btn href="#services" lg>Explore Services</Btn>
        </div>
        <div style={{marginTop:"3.5rem",display:"flex",justifyContent:"center",gap:"2rem",flexWrap:"wrap"}}>
          {["Beginner-Friendly","Nigeria-Based Support","Real Tools. Real Results."].map(t=>(
            <span key={t} style={{display:"flex",alignItems:"center",gap:".4rem",color:T.mi,fontSize:".8rem"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.sky} strokeWidth="2.5" aria-hidden="true"><polyline points="20,6 9,17 4,12"/></svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <div style={{padding:"2rem 1.5rem",background:"rgba(9,24,40,.6)",borderTop:`1px solid ${T.bd}`,borderBottom:`1px solid ${T.bd}`}}>
      <div className="stats-row" style={{maxWidth:1060,margin:"0 auto",display:"flex",justifyContent:"center",gap:"4rem",flexWrap:"wrap"}}>
        {[["200+","Nigerian Creators Helped"],["50+","Automation Workflows Built"],["10×","Average Output Increase"],["100%","Nigeria-Focused"]].map(([n,l])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:T.fn,fontSize:"2rem",fontWeight:700,background:"linear-gradient(130deg,#D8EEFF,#4CA8F0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{n}</div>
            <div style={{fontSize:".75rem",color:T.dim,marginTop:".2rem"}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Ticker() {
  const tools = ["🤖 Make.com","⚡ Zapier","✂️ CapCut","🧠 ChatGPT","🎬 DaVinci Resolve","🔗 N8N","🎙️ ElevenLabs","📊 Airtable","📝 Notion AI","🎯 HeyGen","🐍 Python / Pandas","📈 Backtrader"];
  return (
    <div style={{padding:"2.5rem 0",background:"rgba(5,14,28,.7)",borderBottom:`1px solid ${T.bd}`,overflow:"hidden"}}>
      <p style={{textAlign:"center",fontSize:".7rem",fontWeight:700,letterSpacing:".13em",textTransform:"uppercase",color:T.dim,marginBottom:"1.2rem"}}>Tools &amp; Platforms We Work With</p>
      <div style={{overflow:"hidden"}} aria-hidden="true">
        <div className="ticker-strip">
          {[...tools,...tools].map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:".45rem",padding:".45rem 1.1rem",background:T.glass,border:`1px solid ${T.bd}`,borderRadius:7,whiteSpace:"nowrap",fontSize:".8rem",color:T.mi,fontWeight:500}}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services() {
  const cards = [
    {icon:"✂️",title:"Video Clipping & Editing",desc:"Professional short-form clips from long-form content. We train you to clip efficiently or handle it for you — fast turnaround, sharp results.",tag:"For Clippers"},
    {icon:"⚡",title:"AI Workflow Automation",desc:"Build no-code and low-code automations using Make.com, Zapier, and N8N. Turn hours of repetitive work into 5-minute automated systems.",tag:"For Automators"},
    {icon:"🧠",title:"AI Coaching & Training",desc:"Step-by-step guidance for beginners entering the AI space. From prompt engineering to full automation builds — explained in plain terms.",tag:"Beginner Friendly"},
    {icon:"📈",title:"Quant Trading Tutoring",desc:"Learn algorithmic trading with AI. Build backtested strategies in Python, integrate ML signals, and deploy live — Nigeria's first AI-powered quant program.",tag:"New",highlight:true},
    {icon:"🚀",title:"Content Pipeline Setup",desc:"Design end-to-end workflows: ideation → creation → distribution, all AI-powered and running on autopilot so you focus on growth.",tag:"Growth Focused"},
    {icon:"📦",title:"Done-For-You Systems",desc:"Don't want to build it yourself? We design your full automation system from scratch and hand it over fully documented and running.",tag:"Full Service"},
    {icon:"🤝",title:"Agency Consulting",desc:"Running a clipping or digital agency? We integrate AI tools to 10× your output without the overhead of hiring more staff.",tag:"Intermediate+"},
  ];
  return (
    <section id="services" style={{padding:"5rem 1.5rem",background:"rgba(9,24,40,.3)"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <SHead label="What We Offer" title="Services Built for the African Creator" sub="From raw footage to fully automated pipelines — we have the tools and training to take you further."/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"1.4rem"}}>
          {cards.map(({icon,title,desc,tag,highlight})=>(
            <article key={title} className="scard" style={{background:highlight?"linear-gradient(135deg,rgba(18,96,208,.1),rgba(76,168,240,.05))":T.glass,border:highlight?"1px solid rgba(18,96,208,.4)":`1px solid ${T.bd}`,borderRadius:16,padding:"1.9rem",position:"relative",overflow:"hidden"}}>
              {highlight && <div style={{position:"absolute",top:12,right:12,padding:".2rem .55rem",background:"rgba(18,96,208,.2)",border:"1px solid rgba(18,96,208,.4)",borderRadius:6,fontSize:".65rem",color:T.sky,fontWeight:700,letterSpacing:".06em"}}>✦ NEW</div>}
              <div style={{width:46,height:46,background:"linear-gradient(135deg,rgba(18,96,208,.2),rgba(76,168,240,.1))",border:"1px solid rgba(76,168,240,.2)",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem",marginBottom:"1.2rem"}} aria-hidden="true">{icon}</div>
              <h3 style={{fontFamily:T.fn,fontSize:"1.05rem",fontWeight:600,color:T.fr,marginBottom:".55rem"}}>{title}</h3>
              <p style={{fontSize:".87rem",color:T.mi,lineHeight:1.75}}>{desc}</p>
              <span style={{display:"inline-block",marginTop:".9rem",padding:".22rem .6rem",background:"rgba(18,96,208,.1)",border:"1px solid rgba(18,96,208,.2)",borderRadius:6,fontSize:".7rem",color:T.sky,fontWeight:700}}>{tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuantTrading() {
  const modules = [
    {icon:"📊",num:"01",title:"Market Structure & Trading Fundamentals",desc:"Understand order books, market microstructure, price action, and the mathematical foundations behind how assets are priced and traded in real markets.",level:"Foundation"},
    {icon:"🐍",num:"02",title:"Python for Quantitative Analysis",desc:"NumPy, Pandas, Matplotlib, and SciPy applied to financial data — from raw price feeds to clean, analysis-ready datasets with real backtesting capability.",level:"Core Skill"},
    {icon:"⚙️",num:"03",title:"Algorithmic Strategy Development",desc:"Build systematic trading strategies from scratch: momentum, mean-reversion, and statistical arbitrage — all with clear, rule-based entry and exit logic.",level:"Strategy"},
    {icon:"🧪",num:"04",title:"Backtesting & Performance Analysis",desc:"Validate strategies on historical data, avoid overfitting pitfalls, and measure performance using Sharpe ratio, max drawdown, and win rate metrics.",level:"Validation"},
    {icon:"🤖",num:"05",title:"AI-Powered Trading Signals",desc:"Integrate ML models — LSTM, Random Forest, XGBoost — into your trading pipeline. Use AI to detect patterns and generate signals human traders miss.",level:"Advanced"},
  ];
  const outcomes = ["A working algorithmic trading strategy in Python","Full backtesting suite with real performance metrics","AI signal integration pipeline","Risk management & position sizing framework","Live trading deployment readiness"];
  const audience = [{e:"💡",t:"Beginners wanting a systematic trading edge"},{e:"💻",t:"Developers or data professionals exploring finance"},{e:"📈",t:"Active traders looking to automate their strategy"},{e:"🤖",t:"AI automators ready to expand into fintech"}];

  return (
    <section id="quant" style={{padding:"5rem 1.5rem",background:T.bg0}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(18,96,208,.12)",border:"1px solid rgba(18,96,208,.3)",borderRadius:20,padding:".3rem 1rem",marginBottom:".8rem"}}>
            <span style={{fontSize:".72rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:T.sky}}>Quant Trading Tutoring</span>
            <span style={{padding:".1rem .4rem",background:"rgba(18,96,208,.3)",borderRadius:4,fontSize:".65rem",color:T.sky,fontWeight:700}}>NEW</span>
          </div>
          <h2 style={{fontFamily:T.fn,fontWeight:600,fontSize:"clamp(1.5rem,2.8vw,2.3rem)",letterSpacing:"-.02em",color:T.fr}}>
            From Charts to Code —<br/>AI-Powered Trading Education
          </h2>
          <p style={{maxWidth:560,margin:".7rem auto 0",fontSize:".97rem",color:T.mi,lineHeight:1.8}}>
            Nigeria's first AI-integrated quant trading program. Learn to build, test, and deploy algorithmic strategies — guided by real data science, not speculation.
          </p>
        </div>

        <div className="quant-layout" style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:"1.8rem",alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:".9rem"}}>
            {modules.map(({icon,num,title,desc,level})=>(
              <div key={num} className="qmod" style={{...card,padding:"1.5rem",display:"flex",gap:"1rem",alignItems:"flex-start"}}>
                <div style={{flexShrink:0,textAlign:"center"}}>
                  <div style={{width:44,height:44,background:"linear-gradient(135deg,rgba(18,96,208,.2),rgba(76,168,240,.1))",border:"1px solid rgba(76,168,240,.2)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",marginBottom:".3rem"}}>{icon}</div>
                  <span style={{fontSize:".65rem",color:T.dim,fontWeight:600,fontFamily:T.fn}}>{num}</span>
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".35rem",flexWrap:"wrap"}}>
                    <h3 style={{fontFamily:T.fn,fontSize:".98rem",fontWeight:600,color:T.fr}}>{title}</h3>
                    <span style={{padding:".15rem .5rem",background:"rgba(76,168,240,.1)",border:"1px solid rgba(76,168,240,.2)",borderRadius:5,fontSize:".65rem",color:T.sky,fontWeight:700,whiteSpace:"nowrap"}}>{level}</span>
                  </div>
                  <p style={{fontSize:".85rem",color:T.mi,lineHeight:1.75}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"1.2rem"}}>
            <div style={{background:"linear-gradient(135deg,rgba(18,96,208,.1),rgba(76,168,240,.04))",border:"1px solid rgba(18,96,208,.35)",borderRadius:16,padding:"1.75rem"}}>
              <Lbl c="Program Outcomes"/>
              <h3 style={{fontFamily:T.fn,fontSize:"1.1rem",fontWeight:600,color:T.fr,marginBottom:"1.1rem"}}>What You'll Walk Away With</h3>
              {outcomes.map((o,i)=>(
                <div key={i} style={{display:"flex",gap:".5rem",marginBottom:".6rem",alignItems:"flex-start"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.sky} strokeWidth="2.5" style={{flexShrink:0,marginTop:2}} aria-hidden="true"><polyline points="20,6 9,17 4,12"/></svg>
                  <span style={{fontSize:".85rem",color:T.mi,lineHeight:1.65}}>{o}</span>
                </div>
              ))}
            </div>

            <div style={{...card}}>
              <Lbl c="Who It's For"/>
              {audience.map(({e,t},i)=>(
                <div key={i} style={{display:"flex",gap:".65rem",marginBottom:".65rem",alignItems:"flex-start"}}>
                  <span style={{fontSize:"1rem",flexShrink:0}}>{e}</span>
                  <span style={{fontSize:".85rem",color:T.mi,lineHeight:1.65}}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".7rem"}}>
              {[["Python-based","All strategies"],["Live mentorship","Weekly sessions"],["No finance degree","Beginner safe"],["ML integrated","AI signals"]].map(([a,b])=>(
                <div key={a} style={{...card,padding:".8rem .9rem",textAlign:"center"}}>
                  <div style={{fontFamily:T.fn,fontSize:".82rem",fontWeight:600,color:T.fr}}>{a}</div>
                  <div style={{fontSize:".72rem",color:T.dim,marginTop:".1rem"}}>{b}</div>
                </div>
              ))}
            </div>

            <Btn href="#contact" primary style={{justifyContent:"center",textAlign:"center",padding:"1rem 2rem",fontSize:"1rem",borderRadius:11}}>
              Enroll in Quant Tutoring →
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Audience() {
  const data = [
    {title:"🌱 Beginners",feat:true,desc:"Never touched an AI tool? Zero experience, zero worries. We start from the very beginning and build your confidence step by step.",items:["Learn short-form video clipping from scratch","Set up your first AI automation in one session","Understand prompt engineering in plain language","Get a curated starter toolkit for Nigerian creators"]},
    {title:"📈 Intermediates",feat:false,desc:"You know the basics but want faster delivery, better systems, and more clients. Let's level up what you already have.",items:["Build multi-step automation workflows","Scale clipping output without burning out","Integrate AI voices, avatars, and content tools","Set competitive rates and pitch your services"]},
  ];
  return (
    <section id="audience" style={{padding:"5rem 1.5rem",background:"rgba(9,24,40,.2)"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <SHead label="Who We Serve" title="Built for Where You Are Right Now" sub="Whether you're just starting out or ready to scale — Couin XAI meets you exactly at your level."/>
        <div className="aud-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.4rem"}}>
          {data.map(({title,feat,desc,items})=>(
            <div key={title} style={{background:feat?"linear-gradient(135deg,rgba(18,96,208,.09),rgba(76,168,240,.04))":T.glass,border:feat?"1px solid rgba(18,96,208,.38)":`1px solid ${T.bd}`,borderRadius:16,padding:"2rem"}}>
              <h3 style={{fontFamily:T.fn,fontSize:"1.18rem",fontWeight:600,color:T.fr,marginBottom:".7rem"}}>{title}</h3>
              <p style={{fontSize:".87rem",color:T.mi,lineHeight:1.75,marginBottom:"1rem"}}>{desc}</p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".55rem"}}>
                {items.map(t=><li key={t} style={{display:"flex",gap:".5rem",fontSize:".86rem",color:T.mi,alignItems:"flex-start"}}><span style={{color:T.sky,flexShrink:0}}>→</span>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {n:"1",h:"Book a Free Discovery Call",d:"Tell us where you are and what you want to build. We'll map the right path for your goals and skill level."},
    {n:"2",h:"Get Your Custom Roadmap",d:"Receive a tailored plan — tools, workflows, and training — built specifically around your goals and use case."},
    {n:"3",h:"Build, Automate & Grow",d:"Execute with our support. Track your progress, hit milestones, and unlock the next stage of your AI journey."},
  ];
  return (
    <section id="how" style={{padding:"5rem 1.5rem",background:T.bg1}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <SHead label="The Process" title="From Zero to Running in 3 Steps" sub="Simple, structured, and designed to get you real results fast."/>
        <div className="steps-track" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",position:"relative"}}>
          <div className="steps-connector" style={{position:"absolute",top:37,left:"17%",right:"17%",height:1,background:"linear-gradient(90deg,transparent,rgba(76,168,240,.15),#2278F0,rgba(76,168,240,.15),transparent)"}}/>
          {steps.map(({n,h,d})=>(
            <div key={n} style={{textAlign:"center",padding:"2rem 1.5rem"}}>
              <div style={{width:48,height:48,margin:"0 auto 1.2rem",background:"linear-gradient(135deg,#1260D0,#0A40A0)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.fn,fontWeight:700,fontSize:"1rem",color:"#fff",boxShadow:"0 0 22px rgba(18,96,208,.45)",position:"relative",zIndex:1}}>{n}</div>
              <h3 style={{fontFamily:T.fn,fontSize:"1rem",fontWeight:600,color:T.fr,marginBottom:".45rem"}}>{h}</h3>
              <p style={{fontSize:".86rem",color:T.mi,lineHeight:1.75}}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const cards = [
    {i:"TI",q:"Before Couin XAI, I was manually editing clips for 4 hours every day. Now I have a workflow that handles 80% automatically. Complete game changer.",n:"Tochi Ike",r:"Freelance Clipper · Port Harcourt"},
    {i:"AO",q:"I had zero knowledge of Make.com. After two sessions, I built my first automation that now handles client onboarding by itself.",n:"Amaka Obi",r:"AI Automator · Lagos"},
    {i:"KE",q:"The coaching is in plain language — no jargon, no confusion. I finally feel like AI is for me too, not just tech people abroad.",n:"Kelechi Eze",r:"Content Creator · Abuja"},
  ];
  return (
    <section id="testimonials" style={{padding:"5rem 1.5rem",background:T.bg0}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <SHead label="Social Proof" title="What Nigerian Creators Are Saying"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.4rem"}}>
          {cards.map(({i,q,n,r})=>(
            <div key={n} style={{...card}}>
              <div style={{color:T.sky,fontSize:".82rem",letterSpacing:".05em",marginBottom:".9rem"}} aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote style={{fontSize:".87rem",color:T.mi,lineHeight:1.75,marginBottom:"1.2rem",fontStyle:"italic"}}>"{q}"</blockquote>
              <div style={{display:"flex",alignItems:"center",gap:".7rem"}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#1260D0,#4CA8F0)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.fn,fontWeight:700,fontSize:".72rem",color:"#fff",flexShrink:0}}>{i}</div>
                <div>
                  <div style={{fontSize:".83rem",fontWeight:600,color:T.fr,fontFamily:T.fn}}>{n}</div>
                  <div style={{fontSize:".73rem",color:T.dim}}>{r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open,setOpen] = useState(null);
  const items = [
    ["Do I need any experience to work with Couin XAI?","Not at all. Our services are designed for complete beginners. All you need is willingness to learn and a device. We start by understanding exactly where you are and build from there."],
    ["Are your services available across Nigeria, not just Port Harcourt?","Yes! While based in Port Harcourt, Rivers State, we serve clients across Nigeria — Lagos, Abuja, Enugu, Warri and beyond — fully remotely via WhatsApp and Zoom."],
    ["What tools will I need to get started?","Most tools we use have generous free tiers — Make.com, CapCut, ChatGPT, Notion, and Python are all accessible with no upfront cost. We guide you through setup from scratch."],
    ["Do I need a finance background for the Quant Trading program?","No finance degree needed. We start with fundamentals and build toward advanced algorithmic strategies. A basic curiosity for numbers and willingness to learn Python is all you need."],
    ["How long does it take to see real results?","Most clients build their first working automation within 1–2 sessions. For clipping and quant trading, you'll see measurable results within your first two weeks."],
    ["Do you offer ongoing support after training?","Absolutely. All clients get access to our community group for follow-up questions, tool updates, and monthly live Q&A sessions. You're never left to figure it out alone."],
  ];
  return (
    <section id="faq" style={{padding:"5rem 1.5rem",background:"rgba(9,24,40,.2)"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <SHead label="FAQ" title="Frequently Asked Questions"/>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",flexDirection:"column",gap:".9rem"}}>
          {items.map(([q,a],i)=>(
            <div key={i} style={{background:T.glass,border:`1px solid ${T.bd}`,borderRadius:13,overflow:"hidden"}}>
              <button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}
                style={{width:"100%",background:"none",border:"none",color:open===i?T.sky:T.fr,fontFamily:T.fn,fontSize:".93rem",fontWeight:600,textAlign:"left",padding:"1.2rem 1.4rem",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
                {q}
                <span style={{fontSize:"1.1rem",transition:"transform .3s",transform:open===i?"rotate(180deg)":"none",color:T.mi,flexShrink:0}}>▾</span>
              </button>
              <div className={`faq-ans${open===i?" open":""}`}>
                <p style={{fontSize:".86rem",color:T.mi,lineHeight:1.75}}>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" style={{padding:"5rem 1.5rem",textAlign:"center",background:"radial-gradient(ellipse 70% 80% at 50% 50%,rgba(18,96,208,.13) 0%,transparent 70%),rgba(9,24,40,.3)",borderTop:`1px solid ${T.bd}`,borderBottom:`1px solid ${T.bd}`}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <Lbl c="Get Started Today"/>
        <h2 style={{fontFamily:T.fn,fontWeight:600,fontSize:"clamp(1.5rem,2.8vw,2.3rem)",letterSpacing:"-.02em",color:T.fr,marginBottom:".9rem"}}>Your AI Journey Starts Here</h2>
        <p style={{maxWidth:460,margin:"0 auto 2rem",fontSize:".97rem",color:T.mi,lineHeight:1.8}}>Join hundreds of Nigerian creators, automators, and traders building smarter, faster, and more profitable workflows with Couin XAI Agency.</p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          <Btn href="https://wa.me/2348155499435" primary lg>💬 WhatsApp Us Now</Btn>
          <Btn href="mailto:giftycouin@gmail.com" lg>📩 Email Us</Btn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = {
    Services:["#services","#services","#services","#quant","#services"],
    Company:["#audience","#how","#faq","#contact"],
  };
  const labels = {
    Services:["Video Clipping","AI Automation","AI Coaching","Quant Trading","Done-For-You"],
    Company:["Who We Help","Our Process","FAQ","Contact"],
  };
  return (
    <footer style={{background:"rgba(5,14,28,.9)",borderTop:`1px solid ${T.bd}`,padding:"3rem 1.5rem 2rem"}}>
      <div className="foot-inner" style={{maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"2.5rem"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:".55rem",marginBottom:".9rem"}}>
            <div style={{width:34,height:34,background:"linear-gradient(135deg,#1260D0,#4CA8F0)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.fn,fontWeight:700,fontSize:".95rem",color:"#fff"}}>CX</div>
            <span style={{fontFamily:T.fn,fontWeight:700,fontSize:"1.08rem",color:T.fr}}>Couin <span style={{color:T.sky}}>XAI</span></span>
          </div>
          <p style={{fontSize:".83rem",color:T.mi,maxWidth:270,lineHeight:1.75}}>Port Harcourt's AI automation, video clipping, and quant trading agency — helping Nigerian creators build smarter workflows.</p>
        </div>
        {Object.keys(cols).map(cat=>(
          <div key={cat}>
            <h4 style={{fontSize:".73rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:T.mi,marginBottom:".9rem",fontFamily:T.fn}}>{cat}</h4>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".55rem"}}>
              {labels[cat].map((l,j)=>(
                <li key={l}><a href={cols[cat][j]} style={{color:T.dim,fontSize:".83rem"}}
                  onMouseEnter={e=>e.currentTarget.style.color=T.sky}
                  onMouseLeave={e=>e.currentTarget.style.color=T.dim}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{maxWidth:1060,margin:"2rem auto 0",paddingTop:"1.5rem",borderTop:`1px solid ${T.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:".8rem"}}>
        <p style={{fontSize:".76rem",color:T.dim}}>© 2026 Couin XAI Agency. All rights reserved. Port Harcourt, Rivers State, Nigeria.</p>
        <div style={{display:"flex",alignItems:"center",gap:".35rem",fontSize:".76rem",color:T.dim}}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Port Harcourt, Rivers State, Nigeria
        </div>
      </div>
    </footer>
  );
}

export default function CouinXAI() {
  const [scrolled,setScrolled] = useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",h,{passive:true});
    return ()=>window.removeEventListener("scroll",h);
  },[]);
  return (
    <>
      <style dangerouslySetInnerHTML={{__html:GCSS}}/>
      <div style={{fontFamily:T.fb,background:T.bg0,color:T.fr,overflowX:"hidden"}}>
        <Header scrolled={scrolled}/>
        <main>
          <Hero/>
          <Stats/>
          <Ticker/>
          <Services/>
          <QuantTrading/>
          <Audience/>
          <HowItWorks/>
          <Testimonials/>
          <FAQ/>
          <CTA/>
        </main>
        <Footer/>
      </div>
    </>
  );
}
