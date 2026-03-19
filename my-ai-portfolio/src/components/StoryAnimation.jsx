import { useEffect, useRef } from 'react';

export default function StoryAnimation() {
  const canvasRef = useRef(null);
  const tickRef = useRef(0);
  const animRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if(!cv) return;
    const cx = cv.getContext('2d');
    const W = 680, H = 320;
    cv.width = W; cv.height = H;

    const TEAL = '#00e5ff';
    const DIM = 'rgba(120,150,170,0.5)';
    const CYCLE = 500;

    function ease(t){ return t<0.5?2*t*t:-1+(4-2*t)*t; }
    function fadeIn(p,s,d){
      return Math.min(1,Math.max(0,(p-s)/d));
    }
    function phaseAlpha(p,s,e){
      const f=0.04;
      if(p<s||p>=e) return 0;
      if(p<s+f) return (p-s)/f;
      if(p>e-f) return (e-p)/f;
      return 1;
    }

    function phase1(p,a){
      if(a<=0) return;
      const prog=ease(Math.min(p/0.22,1));
      cx.save(); cx.globalAlpha=a;
      const ox=160,oy=155;
      cx.strokeStyle='rgba(0,229,255,0.05)';
      cx.lineWidth=0.5;
      for(let i=-110;i<=110;i+=22){
        cx.beginPath();cx.moveTo(ox+i,oy-85);
        cx.lineTo(ox+i,oy+85);cx.stroke();
        cx.beginPath();cx.moveTo(ox-110,oy+i);
        cx.lineTo(ox+110,oy+i);cx.stroke();
      }
      const segs=[
        [[ox-80,oy],[ox+80,oy]],
        [[ox+80,oy],[ox+63,oy-9]],
        [[ox+80,oy],[ox+63,oy+9]],
        [[ox-80,oy],[ox-66,oy-7]],
        [[ox-80,oy],[ox-66,oy+7]],
        [[ox+25,oy],[ox+8,oy-48]],
        [[ox+8,oy-48],[ox-12,oy-42]],
        [[ox-12,oy-42],[ox+25,oy]],
        [[ox+25,oy],[ox+8,oy+48]],
        [[ox+8,oy+48],[ox-12,oy+42]],
        [[ox-12,oy+42],[ox+25,oy]],
        [[ox-52,oy],[ox-64,oy-22]],
        [[ox-64,oy-22],[ox-80,oy]],
        [[ox-52,oy],[ox-64,oy+22]],
        [[ox-64,oy+22],[ox-80,oy]],
        [[ox+63,oy-9],[ox+49,oy-16]],
        [[ox+49,oy-16],[ox+29,oy-9]],
        [[ox+29,oy-9],[ox+29,oy]],
      ];
      const vis=Math.floor(prog*segs.length);
      cx.strokeStyle=TEAL; cx.lineWidth=1.2;
      segs.slice(0,vis).forEach(([a,b])=>{
        cx.beginPath();cx.moveTo(a[0],a[1]);
        cx.lineTo(b[0],b[1]);cx.stroke();
      });
      if(prog>0.7){
        cx.save();
        cx.globalAlpha=a*(prog-0.7)/0.3;
        cx.strokeStyle='rgba(0,229,255,0.25)';
        cx.lineWidth=0.5; cx.setLineDash([3,4]);
        cx.beginPath();
        cx.moveTo(ox-80,oy-68);cx.lineTo(ox+80,oy-68);
        cx.stroke(); cx.setLineDash([]);
        cx.fillStyle='rgba(0,229,255,0.4)';
        cx.font='8px monospace';cx.textAlign='center';
        cx.fillText('SPAN: 34.1M',ox,oy-76);
        cx.restore();
      }
      if(prog>0.5){
        cx.strokeStyle='rgba(0,229,255,0.3)';
        cx.lineWidth=1;
        [[ox-108,oy-88,1,1],[ox+108,oy-88,-1,1],
         [ox-108,oy+88,1,-1],[ox+108,oy+88,-1,-1]]
        .forEach(([x,y,sx,sy])=>{
          const s=10;
          cx.beginPath();
          cx.moveTo(x+sx*s,y);cx.lineTo(x,y);
          cx.lineTo(x,y+sy*s);cx.stroke();
        });
      }
      cx.restore();
    }

    function phase2(p,a){
      if(a<=0) return;
      const prog=ease(Math.min((p-0.2)/0.22,1));
      cx.save(); cx.globalAlpha=a;
      const ox=160,oy=155;
      cx.strokeStyle='rgba(0,229,255,0.15)';
      cx.lineWidth=0.8;
      [[[ox-80,oy],[ox+80,oy]],
       [[ox+25,oy],[ox+8,oy-48]],
       [[ox+8,oy-48],[ox-12,oy-42]],
       [[ox-12,oy-42],[ox+25,oy]],
       [[ox+25,oy],[ox+8,oy+48]],
       [[ox+8,oy+48],[ox-12,oy+42]],
       [[ox-12,oy+42],[ox+25,oy]]
      ].forEach(([a,b])=>{
        cx.beginPath();cx.moveTo(a[0],a[1]);
        cx.lineTo(b[0],b[1]);cx.stroke();
      });
      const nodes=[
        {x:ox+70,y:oy,    label:'ENGINE',risk:0.9},
        {x:ox+8, y:oy-46, label:'WING L',risk:0.65},
        {x:ox+8, y:oy+46, label:'WING R',risk:0.65},
        {x:ox-72,y:oy,    label:'TAIL',  risk:0.4},
        {x:ox+25,y:oy,    label:'FUSEL', risk:0.25},
      ];
      nodes.forEach((n,i)=>{
        const nv=fadeIn(prog,i*0.14,0.22);
        if(nv<=0) return;
        const pulse=0.5+Math.sin(tickRef.current*0.08+i)*0.5;
        const col=n.risk>0.5?TEAL:DIM;
        cx.save(); cx.globalAlpha=a*nv;
        cx.beginPath();
        cx.arc(n.x,n.y,5+pulse*4*n.risk,0,Math.PI*2);
        cx.strokeStyle=col;cx.lineWidth=1;cx.stroke();
        cx.beginPath();cx.arc(n.x,n.y,3,0,Math.PI*2);
        cx.fillStyle=col;cx.fill();
        cx.fillStyle=col;cx.font='8px monospace';
        cx.textAlign='center';
        cx.fillText(n.label,n.x,n.y-14);
        cx.fillStyle='rgba(255,255,255,0.08)';
        cx.fillRect(n.x-14,n.y+10,28,3);
        cx.fillStyle=col;
        cx.fillRect(n.x-14,n.y+10,28*n.risk,3);
        cx.restore();
      });
      cx.restore();
    }

    function phase3(p,a){
      if(a<=0) return;
      const prog=ease(Math.min((p-0.38)/0.22,1));
      cx.save(); cx.globalAlpha=a;
      const nodes=[
        {x:75, y:125,label:'INPUT',   dim:false},
        {x:185,y:88, label:'ANALYSE', dim:false},
        {x:300,y:75, label:'MODEL',   dim:false},
        {x:415,y:92, label:'DECIDE',  dim:false},
        {x:530,y:138,label:'ACT',     dim:true},
        {x:415,y:222,label:'FEEDBACK',dim:true},
        {x:285,y:242,label:'LEARN',   dim:false},
        {x:162,y:218,label:'ADAPT',   dim:true},
      ];
      const edges=[
        [0,1],[1,2],[2,3],[3,4],[4,5],
        [5,6],[6,7],[7,0],[1,6],[2,5]
      ];
      edges.forEach(([ai,bi],i)=>{
        const ev=fadeIn(prog,i*0.06,0.18);
        if(ev<=0) return;
        const n1=nodes[ai],n2=nodes[bi];
        const col=nodes[ai].dim||nodes[bi].dim?DIM:TEAL;
        cx.save(); cx.globalAlpha=a*ev*0.28;
        cx.strokeStyle=col;cx.lineWidth=0.8;
        cx.setLineDash([4,5]);
        cx.beginPath();cx.moveTo(n1.x,n1.y);
        cx.quadraticCurveTo(
          (n1.x+n2.x)/2,(n1.y+n2.y)/2-20,n2.x,n2.y
        );
        cx.stroke(); cx.setLineDash([]);
        const pp=((tickRef.current*0.025+i*0.12)%1);
        cx.globalAlpha=a*ev*Math.sin(pp*Math.PI)*0.8;
        cx.beginPath();
        cx.arc(
          n1.x+(n2.x-n1.x)*pp,
          n1.y+(n2.y-n1.y)*pp,
          2.5,0,Math.PI*2
        );
        cx.fillStyle=col;cx.fill();
        cx.restore();
      });
      nodes.forEach((n,i)=>{
        const nv=fadeIn(prog,i*0.08,0.2);
        if(nv<=0) return;
        const col=n.dim?DIM:TEAL;
        cx.save(); cx.globalAlpha=a*nv;
        cx.strokeStyle=col;
        cx.fillStyle=n.dim
          ?'rgba(120,150,170,0.06)'
          :'rgba(0,229,255,0.07)';
        cx.lineWidth=1;
        cx.beginPath();
        cx.roundRect(n.x-25,n.y-12,50,24,4);
        cx.fill(); cx.stroke();
        cx.fillStyle=col;cx.font='8px monospace';
        cx.textAlign='center';cx.fillText(n.label,n.x,n.y+4);
        cx.restore();
      });
      cx.restore();
    }

    function phase4(p,a){
      if(a<=0) return;
      const prog=ease(Math.min((p-0.56)/0.22,1));
      cx.save(); cx.globalAlpha=a;
      const ccx=W/2, ccy=H/2;
      const pulse=0.5+Math.sin(tickRef.current*0.06)*0.5;
      [80,100,120].forEach((r,i)=>{
        cx.beginPath();
        cx.arc(ccx,ccy,r+pulse*4*prog,0,Math.PI*2);
        cx.strokeStyle=`rgba(0,229,255,${0.03*(3-i)*prog})`;
        cx.lineWidth=1;cx.stroke();
      });
      cx.beginPath();cx.arc(ccx,ccy,34,0,Math.PI*2);
      cx.strokeStyle=`rgba(0,229,255,${0.5+pulse*0.3})`;
      cx.lineWidth=2;cx.stroke();
      for(let i=0;i<3;i++){
        const ang=tickRef.current*0.022+(i/3)*Math.PI*2;
        cx.beginPath();
        cx.arc(ccx,ccy,20,ang,ang+Math.PI*0.55);
        cx.strokeStyle=`rgba(180,200,220,${0.45*prog})`;
        cx.lineWidth=2;cx.stroke();
      }
      cx.beginPath();
      cx.arc(ccx,ccy,7+pulse*3*prog,0,Math.PI*2);
      cx.fillStyle=`rgba(0,229,255,${0.7+pulse*0.2})`;
      cx.fill();
      cx.fillStyle='rgba(0,229,255,0.8)';
      cx.font='7px monospace';cx.textAlign='center';
      cx.fillText('PM+AI',ccx,ccy+3);
      const labels=[
        'PROBLEM\nFRAME','HYPOTHESIS','ITERATE',
        'FEEDBACK\nLOOP','SHIP IT','USER\nINSIGHT','LEARN'
      ];
      labels.forEach((lb,i)=>{
        const nv=fadeIn(prog,i*0.09,0.2);
        if(nv<=0) return;
        const angle=(i/labels.length)*Math.PI*2-Math.PI/2;
        const r=108;
        const wobble=Math.sin(tickRef.current*0.03+i*0.9)*5;
        const nx=ccx+Math.cos(angle)*r+wobble;
        const ny=ccy+Math.sin(angle)*r+
                 Math.cos(tickRef.current*0.02+i)*4;
        const isDim=i%2===0;
        const col=isDim?DIM:TEAL;
        cx.save(); cx.globalAlpha=a*nv;
        cx.beginPath();cx.moveTo(ccx,ccy);cx.lineTo(nx,ny);
        cx.strokeStyle='rgba(0,229,255,0.15)';
        cx.lineWidth=0.8;cx.stroke();
        const pp=((tickRef.current*0.03+i*0.14)%1);
        cx.beginPath();
        cx.arc(
          ccx+(nx-ccx)*pp,ccy+(ny-ccy)*pp,2,0,Math.PI*2
        );
        cx.fillStyle=col;
        cx.globalAlpha=a*nv*Math.sin(pp*Math.PI)*0.9;
        cx.fill(); cx.globalAlpha=a*nv;
        cx.strokeStyle=col;
        cx.fillStyle=isDim
          ?'rgba(120,150,170,0.07)'
          :'rgba(0,229,255,0.07)';
        cx.lineWidth=1;
        const lines=lb.split('\n');
        const bh=lines.length>1?30:22;
        cx.beginPath();
        cx.roundRect(nx-25,ny-bh/2,50,bh,4);
        cx.fill();cx.stroke();
        cx.fillStyle=col;
        cx.font='7px monospace';cx.textAlign='center';
        lines.forEach((line,li)=>{
          const yo=lines.length>1?ny-5+li*12:ny+3;
          cx.fillText(line,nx,yo);
        });
        cx.restore();
      });
      cx.restore();
    }

    function phase5(p,a){
      if(a<=0) return;
      const prog=ease(Math.min((p-0.75)/0.25,1));
      cx.save(); cx.globalAlpha=a;
      const vals=[
        {x:85, y:95, v:'∞', label:'CURIOSITY',   dim:false},
        {x:595,y:95, v:'5+',label:'YRS BUILDING', dim:false},
        {x:85, y:240,v:'4', label:'CERTS',        dim:true},
        {x:595,y:240,v:'01',label:'AGENTS LIVE',  dim:false},
      ];
      vals.forEach((v,i)=>{
        const vv=fadeIn(prog,i*0.12,0.28);
        if(vv<=0) return;
        const pulse=0.5+Math.sin(tickRef.current*0.05+i)*0.5;
        const col=v.dim?DIM:TEAL;
        cx.save(); cx.globalAlpha=a*vv;
        cx.strokeStyle=col;
        cx.fillStyle=v.dim
          ?'rgba(120,150,170,0.06)'
          :'rgba(0,229,255,0.07)';
        cx.lineWidth=1;
        cx.beginPath();
        cx.roundRect(v.x-35,v.y-28,70,56,6);
        cx.fill();cx.stroke();
        cx.fillStyle=col;
        cx.font='bold 20px monospace';
        cx.textAlign='center';
        cx.fillText(v.v,v.x,v.y+6);
        cx.fillStyle='rgba(255,255,255,0.3)';
        cx.font='8px monospace';
        cx.fillText(v.label,v.x,v.y+20);
        cx.beginPath();
        cx.arc(v.x,v.y-4,26+pulse*7*vv,0,Math.PI*2);
        cx.strokeStyle=col+'22';cx.lineWidth=1;cx.stroke();
        cx.restore();
      });
      if(prog>0.65){
        const qv=fadeIn(prog,0.65,0.35);
        cx.save(); cx.globalAlpha=a*qv;
        cx.fillStyle='rgba(0,229,255,0.04)';
        cx.strokeStyle='rgba(0,229,255,0.18)';
        cx.lineWidth=0.5;
        cx.beginPath();
        cx.roundRect(W/2-180,H/2-28,360,56,6);
        cx.fill();cx.stroke();
        cx.fillStyle='rgba(255,255,255,0.85)';
        cx.font='11px monospace';cx.textAlign='center';
        cx.fillText(
          '"That\'s still the job."',W/2,H/2+4
        );
        cx.fillStyle='rgba(0,229,255,0.45)';
        cx.font='9px monospace';
        cx.fillText('— RAHIL POPAT',W/2,H/2+20);
        cx.restore();
      }
      cx.restore();
    }

    const PHASES=[
      {s:0,   e:0.28,label:'AERONAUTICAL ENGINEERING'},
      {s:0.18,e:0.46,label:'MAPPING FAILURE MODES'},
      {s:0.36,e:0.64,label:'SYSTEMS THINKING'},
      {s:0.54,e:0.82,label:'PM FUNDAMENTALS → AI'},
      {s:0.72,e:1.02,label:'VALUE CREATED'},
    ];

    function frame(){
      cx.clearRect(0,0,W,H);
      tickRef.current++;
      const raw=(tickRef.current%CYCLE)/CYCLE;
      const ph=PHASES.find(ph=>raw>=ph.s&&raw<ph.e);
      const labelEl=document.getElementById('story-label');
      if(ph&&labelEl) labelEl.textContent=ph.label;
      cx.save();
      cx.strokeStyle='rgba(0,229,255,0.025)';
      cx.lineWidth=1.5;
      const sy=(tickRef.current*0.9)%H;
      cx.beginPath();cx.moveTo(0,sy);cx.lineTo(W,sy);
      cx.stroke(); cx.restore();
      phase1(raw,phaseAlpha(raw,0,0.28));
      phase2(raw,phaseAlpha(raw,0.18,0.46));
      phase3(raw,phaseAlpha(raw,0.36,0.64));
      phase4(raw,phaseAlpha(raw,0.54,0.82));
      phase5(raw,phaseAlpha(raw,0.72,1.02));
      animRef.current=requestAnimationFrame(frame);
    }

    animRef.current=requestAnimationFrame(frame);
    return ()=>{
      if(animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div style={{
      background:'#030810',
      borderRadius:'12px',
      overflow:'hidden',
      width:'100%',
      marginTop:'2rem',
      position:'relative'
    }}>
      <canvas
        ref={canvasRef}
        style={{width:'100%',height:'320px',display:'block'}}
      />
      <div
        id="story-label"
        style={{
          position:'absolute',
          bottom:'12px',
          left:0, right:0,
          textAlign:'center',
          fontSize:'10px',
          color:'rgba(0,229,255,0.45)',
          letterSpacing:'3px',
          fontFamily:'monospace',
          pointerEvents:'none'
        }}
      >
        INITIALISING
      </div>
    </div>
  );
}
