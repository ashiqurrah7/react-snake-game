import{F as e,R as t,a as l}from"./vendor.d75053e4.js";class o{constructor(e){this.val=e,this.next=null}}class n{constructor(e){const t=new o(e);this.head=t,this.tail=t}}var r,c;(c=r||(r={})).UP="UP",c.DOWN="DOWN",c.RIGHT="RIGHT",c.LEFT="LEFT";const a=()=>{const[l,c]=e.exports.useState(s(15)),[a,w]=e.exports.useState(new Set([106])),[v,p]=e.exports.useState(!1),[f,N]=e.exports.useState(new n({row:7,col:0,cell:106})),[T,x]=e.exports.useState(r.RIGHT),[G,R]=e.exports.useState(f.head.val.cell+5),[S,I]=e.exports.useState(0),[D,H]=e.exports.useState(!1);e.exports.useEffect((()=>{window.addEventListener("keydown",(e=>{L(e)}))}),[]),function(t,l){const o=e.exports.useRef();e.exports.useEffect((()=>{o.current=t}),[t]),e.exports.useEffect((()=>{function e(){o.current&&o.current()}if(null!==l){let t=setInterval(e,l);return()=>clearInterval(t)}}),[l])}((function(){if(!D){const e={row:f.head.val.row,col:f.head.val.col},t=i(e,T);if(W(t,l))return void U();const n=l[t.row][t.col];if(a.has(n))return void U();const r=new o({row:t.row,col:t.col,cell:n}),c=f.head;f.head=r,c.next=r;const s=new Set(a);s.delete(f.tail.val.cell),s.add(n),null!==f.tail.next?f.tail=f.tail.next:f.tail=f.head;n===G&&(F(s),v&&O(),(e=>{const t=225;let l;for(;l=h(1,t),e.has(l)||G===l;);const o=Math.random()<.2;R(l),p(o),I((e=>e+100))})(s)),w(s)}}),150);const L=e=>{const t=u(e.key);""!==t&&(console.log(T),x(t))},W=(e,t)=>e.row<0||e.col<0||(e.row>=t.length||e.col>=t[0].length);const F=e=>{const t=m(f.tail,T);if(W(t,l))return;const n=l[t.row][t.col],r=new o({row:t.row,col:t.col,cell:n}),c=f.tail;f.tail=r,f.tail.next=c,e.add(n),w(e)},O=()=>{const e=d(f.tail,T),t=E(e);!function(e){let t=null,l=e;for(;null!==l;){const e=l.next;l.next=t,t=l,l=e}}(f.tail);const l=f.head;f.head=f.tail,f.tail=l,x(t)},U=()=>{H(!0)};return t.createElement("div",null,t.createElement("div",{className:"score"},t.createElement("h1",null,D?"Game Over":`Score: ${S}`)),t.createElement("div",{className:"instructions"},t.createElement("h1",null,"Controls: "),t.createElement("div",{className:"controls"},t.createElement("p",null,"W")," Go Up"),t.createElement("div",{className:"controls"},t.createElement("p",null,"S")," Go Down"),t.createElement("div",{className:"controls"},t.createElement("p",null,"A")," Go Left"),t.createElement("div",{className:"controls"},t.createElement("p",null,"D")," Go Right"),t.createElement("div",{className:"note"},"Note: Careful when eating the ",t.createElement("span",null," ")," because it makes you go reverse!")),t.createElement("div",{className:"board"},l.map(((e,l)=>t.createElement("div",{key:l,className:"row"},e.map(((e,l)=>t.createElement("div",{key:l,className:`cell  \n                            ${a.has(e)?"snake-cell":""}  \n                            ${G==e?v?"rev-food-cell":"food-cell":""}\n                            ${T===r.RIGHT?"head-right":T===r.LEFT?"head-left":T===r.UP?"head-up":T===r.DOWN?"head-down":""}`},t.createElement("h1",{className:""+(T===r.RIGHT?"space-right":T===r.LEFT?"space-left":T===r.UP?"space-up":T===r.DOWN?"space-down":"")},f.head.val.cell==e?":":"")))))))),t.createElement("div",{className:"buttons"},t.createElement("button",{onClick:()=>{w(new Set([106])),p(!1),N(new n({row:7,col:0,cell:106})),x(r.RIGHT),R(f.head.val.cell+5),I(0),H(!1)}}," RESTART")))},s=e=>{let t=1;const l=[];for(let o=0;o<e;o++){let o=[];for(let l=0;l<e;l++)o.push(t++);l.push(o)}return l},u=e=>"w"==e||"W"==e?r.UP:"s"==e||"S"==e?r.DOWN:"d"==e||"D"==e?r.RIGHT:"a"==e||"A"==e?r.LEFT:"",i=(e,t)=>t===r.UP?{row:e.row-1,col:e.col}:t===r.DOWN?{row:e.row+1,col:e.col}:t===r.LEFT?{row:e.row,col:e.col-1}:t===r.RIGHT?{row:e.row,col:e.col+1}:{row:e.row,col:e.col},d=(e,t)=>{if(null===e.next)return t;const{row:l,col:o}=e.val,{row:n,col:c}=e.next.val;return l==n&&o+1===c?r.RIGHT:l==n&&o-1===c?r.LEFT:l+1==n&&o===c?r.DOWN:l-1==n&&o-1===c?r.UP:t},m=(e,t)=>{const l=d(e,t),o=E(l);return w(e,o)},w=(e,t)=>{const{row:l,col:o}=e.val;return t===r.UP?{row:l-1,col:o}:t===r.DOWN?{row:l+1,col:o}:t===r.LEFT?{row:l,col:o-1}:t===r.RIGHT?{row:l-1,col:o+1}:{row:l,col:o}},E=e=>e===r.UP?r.DOWN:e===r.DOWN?r.UP:e===r.LEFT?r.RIGHT:e===r.RIGHT?r.LEFT:e;function h(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function v(){return e.exports.useState(0),t.createElement("div",{className:"App"},t.createElement(a,null))}l.render(t.createElement(t.StrictMode,null,t.createElement(v,null)),document.getElementById("root"));
