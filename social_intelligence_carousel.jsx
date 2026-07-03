import { useState, useRef } from "react";

const NAVY  = "rgb(30, 4, 4)";
const NAVY2 = "#1E293B";
const GOLD  = "#1f1607";
const GOLD_L= "#1d1802";
const EM    = "#260917";
const ROSE  = "#29030c";
const BLUE  = "#190813";
const DARK  = "#111827";
const MUTED = "#360e39";
const WHITE = "#FFFFFF";
const OFF   = "#F9FAFB";

/* ── PER-SLIDE ACCENT ──────────────────── */
const ACCENTS = [GOLD, "#7C3AED", GOLD, EM, BLUE, GOLD];

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function SICarousel() {
  const [cur, setCur] = useState(0);
  const tx = useRef(null);
  const TOTAL = 6;
  const accent = ACCENTS[cur];

  const prev = () => setCur(c => (c - 1 + TOTAL) % TOTAL);
  const next = () => setCur(c => (c + 1) % TOTAL);
  const onTS  = e => { tx.current = e.touches[0].clientX; };
  const onTE  = e => {
    if (tx.current === null) return;
    const d = tx.current - e.changedTouches[0].clientX;
    if (d > 40) next(); else if (d < -40) prev();
    tx.current = null;
  };

  const slides = [Cover, S1, S2, S3, S4, S5];
  const Slide  = slides[cur];

  return (
    <div style={{
      fontFamily: "'Cairo',sans-serif",
      background: "#060A0F",
      minHeight: "100svh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "16px 0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── FRAME ── */}
      <div
        dir="rtl"
        onTouchStart={onTS}
        onTouchEnd={onTE}
        style={{
          width: "min(420px, 96vw)",
          height: "min(420px, 96vw)",
          borderRadius: "22px",
          overflow: "hidden",
          position: "relative",
          cursor: "grab",
          userSelect: "none",
          boxShadow: "0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <Slide cur={cur} total={TOTAL} />
      </div>

      {/* ── NAV ── */}
      <div dir="ltr" style={{ display:"flex", alignItems:"center", gap:"14px", marginTop:"16px" }}>
        <NavBtn onClick={prev}>‹</NavBtn>
        <div style={{ display:"flex", gap:"6px" }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} onClick={() => setCur(i)} style={{
              width: i === cur ? "22px" : "7px",
              height: "7px", borderRadius: "99px",
              background: i === cur ? accent : "#1E293B",
              border: `1.5px solid ${i === cur ? accent : "#2D3748"}`,
              transition: "all 0.3s ease",
              cursor: "pointer",
            }} />
          ))}
        </div>
        <NavBtn onClick={next}>›</NavBtn>
      </div>

      <div style={{ color:"#2A3444", fontSize:"10px", letterSpacing:"2px", marginTop:"7px" }}>
        {cur + 1} / {TOTAL}
      </div>
    </div>
  );
}

/* ── SHARED ATOMS ──────────────────────── */
function NavBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "#fff", width: "38px", height: "38px",
      borderRadius: "50%", fontSize: "22px",
      cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center",
    }}>{children}</button>
  );
}

function Dots({ cur, total, accent }) {
  return (
    <div dir="ltr" style={{ display:"flex", justifyContent:"center", gap:"5px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === cur ? "18px" : "5px",
          height: "5px", borderRadius: "99px",
          background: i === cur ? accent : "#E5E7EB",
          transition: "all 0.3s",
        }} />
      ))}
    </div>
  );
}

function DotsDark({ cur, total }) {
  return (
    <div dir="ltr" style={{ display:"flex", justifyContent:"center", gap:"5px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === cur ? "18px" : "5px",
          height: "5px", borderRadius: "99px",
          background: i === cur ? GOLD : "rgba(255,255,255,0.15)",
          transition: "all 0.3s",
        }} />
      ))}
    </div>
  );
}

function Header({ num, total, accent, dark = false }) {
  return (
    <div style={{
      background: dark ? "rgba(255,255,255,0.05)" : accent,
      borderBottom: dark ? "1px solid rgba(255,255,255,0.07)" : "none",
      padding: "12px 18px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexShrink: 0,
    }}>
      <div style={{
        background: dark ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.18)",
        border: dark ? "1px solid rgba(245,158,11,0.3)" : "none",
        color: dark ? GOLD : WHITE,
        fontWeight: 900, fontSize: "10px",
        padding: "3px 12px", borderRadius: "99px", letterSpacing: "1px",
      }}>المهارة {num} / {total - 1}</div>
      <span style={{ color: dark ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.9)", fontWeight: 900, fontSize: "11px", letterSpacing: "3px" }}>
        ⚡ FL<span style={{ color: GOLD }}>A</span>SH
      </span>
    </div>
  );
}

function Tag({ label, accent }) {
  return (
    <div style={{
      background: `${accent}15`, border: `1px solid ${accent}35`,
      color: accent, fontWeight: 900, fontSize: "10px",
      padding: "3px 12px", borderRadius: "99px", letterSpacing: "0.5px",
      display: "inline-block",
    }}>{label}</div>
  );
}

/* ══════════════════════════════════════
   SLIDE 0 · COVER
══════════════════════════════════════ */
function Cover({ cur, total }) {
  return (
    <div style={{
      width:"100%", height:"100%",
      background: "radial-gradient(ellipse at 35% 30%, #162840 0%, #0D1B2A 55%, #060D18 100%)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"26px 24px", position:"relative", overflow:"hidden",
    }}>

      {/* SVG social-graph bg */}
      <svg viewBox="0 0 420 420" style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.13 }}>
        {/* Nodes */}
        {[[70,90],[200,55],[350,100],[120,210],[295,185],[375,275],[55,310],[205,325],[310,350]].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r={i===0||i===4?20:13} fill={GOLD} />
        ))}
        {/* Edges */}
        {[
          [70,90,200,55],[200,55,350,100],[70,90,120,210],
          [350,100,295,185],[200,55,120,210],[120,210,295,185],
          [295,185,375,275],[55,310,120,210],[55,310,205,325],
          [205,325,295,185],[205,325,375,275],[310,350,295,185],
        ].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth={i>8?"0.6":"1"} strokeDasharray={i>8?"4 4":""} />
        ))}
      </svg>

      {/* FLASH top-right */}
      <div style={{ position:"absolute", top:"17px", right:"20px" }}>
        <span style={{ color:"rgba(255,255,255,0.8)", fontWeight:900, fontSize:"12px", letterSpacing:"3px" }}>
          ⚡ FL<span style={{ color:GOLD }}>A</span>SH
        </span>
      </div>

      {/* Content */}
      <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
        <div style={{
          background:"rgba(245,158,11,0.13)", border:"1px solid rgba(245,158,11,0.3)",
          color:GOLD, fontWeight:700, fontSize:"9.5px", letterSpacing:"2.5px",
          padding:"4px 16px", borderRadius:"99px", marginBottom:"18px",
          display:"inline-block",
        }}>SOCIAL INTELLIGENCE</div>

        <div style={{ fontSize:"clamp(13px,3.8vw,17px)", fontWeight:700, color:"rgba(108, 26, 26, 0.5)", marginBottom:"6px" }}>
          ازاي يبقى عندك
        </div>

        <div style={{ fontSize:"clamp(36px,10.5vw,54px)", fontWeight:900, color:WHITE, lineHeight:1.0, letterSpacing:"-1.5px" }}>
          ذكاء اجتماعي
        </div>

        <div style={{ height:"4px", background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, borderRadius:"99px", margin:"10px auto 16px", width:"70%" }} />

        <div style={{ fontSize:"clamp(12px,3.4vw,14px)", fontWeight:700, color:"rgba(255,255,255,0.38)", lineHeight:2 }}>
           مهارات هتخليك أذكى 5<br/>في التعامل مع الناس
        </div>
      </div>

      {/* Swipe hint */}
      <div style={{
        position:"absolute", bottom:"32px", left:"50%", transform:"translateX(-50%)",
        display:"flex", alignItems:"center", gap:"8px",
        color:"rgba(255,255,255,0.18)", fontSize:"10px", letterSpacing:"2px",
      }}>
        <span>←</span><span>سوايب</span><span>←</span>
      </div>

      <div style={{ position:"absolute", bottom:"14px", left:"50%", transform:"translateX(-50%)" }}>
        <DotsDark cur={cur} total={total} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 1 · لغة الجسد — BAR CHART
══════════════════════════════════════ */
function S1({ cur, total }) {
  const accent = "#7C3AED";
  const bars = [
    { pct:55, label:"لغة الجسد",  color:GOLD,   width:"100%" },
    { pct:38, label:"نبرة الصوت", color:accent,  width:"69%"  },
    { pct:7,  label:"الكلام",     color:ROSE,    width:"13%"  },
  ];
  return (
    <div style={{ width:"100%", height:"100%", background:WHITE, display:"flex", flexDirection:"column" }}>
      <Header num="١" total={total} accent={accent} />

      <div style={{ flex:1, padding:"16px 20px 10px", display:"flex", flexDirection:"column" }}>
        {/* Title row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
          <span style={{ fontSize:"38px", lineHeight:1 }}>👁️</span>
          <div style={{ textAlign:"right" }}>
            <Tag label="#لغة_الجسد" accent={accent} />
            <div style={{ fontSize:"clamp(17px,5vw,22px)",textAlign: right fontWeight:900, color:DARK, lineHeight:1.2, marginTop:"6px" }}>اقرأ الرسالة</div>
            <div style={{ fontSize:"clamp(17px,5vw,22px)", fontWeight:900, color:DARK,  lineHeight:1.2 }}>الكاملة</div>
          </div>
        </div>

        {/* Eyebrow label */}
        <div style={{ fontSize:"10.5px", fontWeight:700, color:MUTED, textAlign:"right", marginBottom:"10px", letterSpacing:"0.5px" }}>
          Mehrabian's Rule — التواصل الفعلي بيتكون من:
        </div>

        {/* Bars */}
        <div style={{ display:"flex", flexDirection:"column", gap:"12px", flex:1, justifyContent:"center" }}>
          {bars.map((b, i) => (
            <div key={i}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"5px" }}>
                <div style={{ fontWeight:900, fontSize:"clamp(26px,7vw,34px)", color:b.color, lineHeight:1 }}>{b.pct}%</div>
                <div style={{ fontWeight:700, fontSize:"clamp(13px,3.5vw,15px)", color:MUTED }}>{b.label}</div>
              </div>
              <div style={{ height:"12px", background:"#F3F4F6", borderRadius:"99px", overflow:"hidden" }}>
                <div style={{ height:"100%", width:b.width, background:b.color, borderRadius:"99px" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ background:`${accent}0D`, border:`1px solid ${accent}20`, borderRadius:"10px", padding:"7px 12px", marginTop:"10px", textAlign:"right" }}>
          <span style={{ fontWeight:900, fontSize:"11px", color:accent }}>الخلاصة: </span>
          <span style={{ fontWeight:700, fontSize:"11px", color:MUTED }}>جسمك بيتكلم أكتر من أي كلمة بتقولها</span>
        </div>
      </div>

      <div style={{ padding:"0 20px 12px" }}><Dots cur={cur} total={total} accent={accent} /></div>
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 2 · الاستماع — QUOTE LAYOUT
══════════════════════════════════════ */
function S2({ cur, total }) {
  return (
    <div style={{ width:"100%", height:"100%", background:GOLD_L, display:"flex", flexDirection:"column" }}>
      <Header num="٢" total={total} accent={NAVY2} />

      <div style={{ flex:1, padding:"14px 22px 10px", display:"flex", flexDirection:"column" }}>
        {/* Icon + tag */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
          <span style={{ fontSize:"36px", lineHeight:1 }}>👂</span>
          <Tag label="#الاستماع_الفعّال" accent="#92400E" />
        </div>

        {/* Giant opening quote */}
        <div style={{ fontSize:"80px", color:GOLD, lineHeight:0.75, textAlign:"right", fontFamily:"Georgia,serif", opacity:0.55, marginBottom:"0" }}>"</div>

        {/* Quote text */}
        <div style={{ fontWeight:900, fontSize:"clamp(20px,5.8vw,28px)", color:DARK, lineHeight:1.4, textAlign:"right", padding:"0 4px" }}>
          استمع لتفهم…<br/>
          <span style={{ color:"#B45309" }}>مش لترد.</span>
        </div>

        {/* Closing quote */}
        <div style={{ fontSize:"80px", color:GOLD, lineHeight:0.55, textAlign:"left", fontFamily:"Georgia,serif", opacity:0.55 }}>"</div>

        {/* Divider */}
        <div style={{ height:"2px", background:`linear-gradient(90deg,${GOLD},transparent)`, borderRadius:"99px", margin:"6px 0", alignSelf:"flex-end", width:"50px" }} />

        {/* 3 tip pills */}
        <div style={{ display:"flex", flexDirection:"column", gap:"7px", marginTop:"4px" }}>
          {[
            { icon:"👀", text:"حافظ على التواصل البصري" },
            { icon:"✋", text:"لا تقاطع — سيب الشخص يكمل كلامه" },
            { icon:"❓", text:"اسأل أسئلة مفتوحة" },
          ].map((item, i) => (
            <div key={i} style={{
              background: WHITE,
              border: "1.5px solid #FDE68A",
              borderRadius: "10px",
              padding: "7px 13px",
              display: "flex", alignItems: "center", gap: "10px",
              textAlign: "right", flexDirection: "row-reverse",
            }}>
              <span style={{ fontSize:"16px", flexShrink:0 }}>{item.icon}</span>
              <span style={{ fontWeight:700, fontSize:"12px", color:"#78350F" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"0 22px 12px" }}><Dots cur={cur} total={total} accent={NAVY2} /></div>
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 3 · المشاعر — SPLIT CARDS
══════════════════════════════════════ */
function S3({ cur, total }) {
  const accent = EM;
  return (
    <div style={{ width:"100%", height:"100%", background:WHITE, display:"flex", flexDirection:"column" }}>
      <Header num="٣" total={total} accent={accent} />

      <div style={{ flex:1, padding:"14px 20px 10px", display:"flex", flexDirection:"column" }}>
        {/* Title row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
          <span style={{ fontSize:"36px", lineHeight:1 }}>🧭</span>
          <div style={{ textAlign:"right" }}>
            <Tag label="#قراءة_المشاعر" accent={accent} />
            <div style={{ fontSize:"clamp(16px,4.8vw,21px)", fontWeight:900, color:accent, lineHeight:1.2, marginTop:"6px" }}>الناس بتتصرف</div>
            <div style={{ fontSize:"clamp(16px,4.8vw,21px)", fontWeight:900, color:DARK,  lineHeight:1.2 }}>بعاطفة وتبرر بمنطق</div>
          </div>
        </div>

        {/* Split comparison */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", flex:1, marginBottom:"8px" }}>
          {/* LOGIC — dimmed */}
          <div style={{
            background:"#F9FAFB", border:"1.5px solid #E5E7EB",
            borderRadius:"16px", padding:"16px 12px",
            display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", textAlign:"center", opacity:0.55,
          }}>
            <div style={{ fontSize:"34px", marginBottom:"8px" }}>🧠</div>
            <div style={{ fontWeight:900, fontSize:"15px", color:MUTED }}>المنطق</div>
            <div style={{ fontWeight:700, fontSize:"11px", color:"#9CA3AF", marginTop:"5px", lineHeight:1.5 }}>
              بيجي بعدين<br/>كـ تبرير
            </div>
          </div>

          {/* EMOTION — highlighted */}
          <div style={{
            background:`${accent}12`, border:`2.5px solid ${accent}`,
            borderRadius:"16px", padding:"16px 12px",
            display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", textAlign:"center",
            position:"relative",
          }}>
            {/* "First" badge */}
            <div style={{
              position:"absolute", top:"-10px", left:"50%", transform:"translateX(-50%)",
              background:accent, color:WHITE, fontWeight:900, fontSize:"9px",
              padding:"2px 10px", borderRadius:"99px", letterSpacing:"1px",
            }}>الأول ✓</div>
            <div style={{ fontSize:"34px", marginBottom:"8px" }}>❤️</div>
            <div style={{ fontWeight:900, fontSize:"15px", color:accent }}>العاطفة</div>
            <div style={{ fontWeight:700, fontSize:"11px", color:`${accent}CC`, marginTop:"5px", lineHeight:1.5 }}>
              بتحرك<br/>القرارات
            </div>
          </div>
        </div>

        {/* Key insight pill */}
        <div style={{ background:`${accent}0E`, border:`1px solid ${accent}25`, borderRadius:"11px", padding:"9px 14px", textAlign:"right" }}>
          <span style={{ fontWeight:900, fontSize:"11.5px", color:accent }}>⚡ الحيلة: </span>
          <span style={{ fontWeight:700, fontSize:"11.5px", color:MUTED }}>اعرف مشاعر الشخص الأول — وبعدين كلمه بمنطق</span>
        </div>
      </div>

      <div style={{ padding:"0 20px 12px" }}><Dots cur={cur} total={total} accent={accent} /></div>
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 4 · الـ Rapport — 2×2 GRID
══════════════════════════════════════ */
function S4({ cur, total }) {
  const accent = BLUE;
  const items = [
    { icon:"🪞", color:"#7C3AED", title:"قلّد لغة الجسد",    sub:"Mirror بشكل طبيعي وغير مقصود" },
    { icon:"🗣️", color:GOLD,     title:"اذكر اسمه",          sub:"أجمل كلمة يسمعها أي إنسان" },
    { icon:"🔗", color:EM,       title:"دور على حاجات مشتركة",      sub:"أي نقطة مشتركة تبني جسر ثقة" },
    { icon:"😊", color:ROSE,     title:"أول 7 ثواني",        sub:"الانطباع الأول بيفضل أطول" },
  ];
  return (
    <div style={{ width:"100%", height:"100%", background:WHITE, display:"flex", flexDirection:"column" }}>
      <Header num="٤" total={total} accent={accent} />

      <div style={{ flex:1, padding:"14px 18px 10px", display:"flex", flexDirection:"column" }}>
        {/* Title row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
          <span style={{ fontSize:"34px", lineHeight:1 }}>🤝</span>
          <div style={{ textAlign:"right" }}>
            <Tag label="#الـ_Rapport" accent={accent} />
            <div style={{ fontSize:"clamp(16px,4.5vw,21px)", fontWeight:900, color:accent, lineHeight:1.2, marginTop:"6px" }}>ابنِ الثقة</div>
            <div style={{ fontSize:"clamp(16px,4.5vw,21px)", fontWeight:900, color:DARK, lineHeight:1.2 }}>في دقايق</div>
          </div>
        </div>

        {/* 2×2 grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"9px", flex:1 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              background: OFF,
              border: `1.5px solid ${item.color}25`,
              borderRadius: "13px",
              padding: "12px",
              display: "flex", flexDirection: "column",
              textAlign: "right",
              position: "relative", overflow:"hidden",
            }}>
              {/* Color accent top strip */}
              <div style={{ position:"absolute", top:0, right:0, left:0, height:"3px", background:item.color, borderRadius:"13px 13px 0 0" }} />
              <span style={{ fontSize:"26px", marginBottom:"7px", marginTop:"4px" }}>{item.icon}</span>
              <div style={{ fontWeight:900, fontSize:"clamp(11px,3.2vw,13px)", color:DARK, lineHeight:1.3, marginBottom:"4px" }}>{item.title}</div>
              <div style={{ fontWeight:700, fontSize:"clamp(9px,2.7vw,11px)", color:MUTED, lineHeight:1.5 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"8px 18px 12px" }}><Dots cur={cur} total={total} accent={accent} /></div>
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 5 · تحكم — BOLD on DARK
══════════════════════════════════════ */
function S5({ cur, total }) {
  return (
    <div style={{
      width:"100%", height:"100%",
      background:`radial-gradient(ellipse at 60% 30%, #1A2744 0%, ${NAVY} 60%, #060D18 100%)`,
      display:"flex", flexDirection:"column", position:"relative", overflow:"hidden",
    }}>
      {/* Watermark exclamation */}
      <div style={{
        position:"absolute", fontSize:"260px", fontWeight:900,
        color:`${GOLD}08`, right:"-15px", bottom:"-20px",
        lineHeight:1, userSelect:"none", pointerEvents:"none",
      }}>!</div>

      <Header num="٥" total={total} accent={GOLD} dark />

      <div style={{ flex:1, padding:"16px 22px 10px", display:"flex", flexDirection:"column", position:"relative", zIndex:1 }}>
        {/* Tag + icon */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
          <span style={{ fontSize:"34px", lineHeight:1 }}>🎯</span>
          <div style={{ background:"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.3)", color:GOLD, fontWeight:900, fontSize:"10px", padding:"3px 12px", borderRadius:"99px" }}>
            #التحكم_في_ردود_الأفعال
          </div>
        </div>

        {/* Bold quote block */}
        <div style={{ textAlign:"right", marginBottom:"12px" }}>
          <div style={{ fontSize:"11px", fontWeight:700, color:"rgba(255,255,255,0.3)", letterSpacing:"1px", marginBottom:"8px" }}>تذكر دايماً ←</div>
          <div style={{ fontWeight:900, fontSize:"clamp(20px,5.8vw,27px)", color:WHITE, lineHeight:1.45 }}>
            اللي بيغضب{" "}
            <span style={{ color:GOLD }}>بسهولة…</span>
            <br/>
            بيتحكم فيه{" "}
            <span style={{ color:ROSE }}>بسهولة.</span>
          </div>
        </div>

        {/* Gold divider */}
        <div style={{ height:"2px", background:`linear-gradient(90deg,${GOLD},transparent)`, width:"50px", borderRadius:"99px", alignSelf:"flex-end", marginBottom:"12px" }} />

        {/* 3 action items */}
        <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
          {[
            { icon:"⏸", text:"استني 3 ثواني قبل ما ترد", color:GOLD },
            { icon:"🫁", text:"خد نفس عميق وبطيء",       color:BLUE },
            { icon:"💭", text:"اسأل نفسك: هل يستاهل؟",   color:EM   },
          ].map((item, i) => (
            <div key={i} style={{
              background:"rgba(255,255,255,0.055)",
              border:`1px solid ${item.color}30`,
              borderRight:`3px solid ${item.color}`,
              borderRadius:"9px",
              padding:"8px 12px",
              display:"flex", alignItems:"center",
              gap:"10px", flexDirection:"row-reverse",
              textAlign:"right",
            }}>
              <span style={{ fontSize:"17px", flexShrink:0 }}>{item.icon}</span>
              <span style={{ fontWeight:700, fontSize:"clamp(11px,3.2vw,13px)", color:"rgba(255,255,255,0.8)" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"8px 22px 12px" }}>
        <DotsDark cur={cur} total={total} />
      </div>
    </div>
  );
}
