export function isAddressLike(s){return /^0x[a-fA-F0-9]{40}$/.test((s||'').trim())}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function tierFromScore(s){if(s>=85)return'S';if(s>=70)return'A';if(s>=55)return'B';if(s>=40)return'C';return'D'}
function pseudoRandom(seed){let h=2166136261;for(let i=0;i<seed.length;i++){h^=seed.charCodeAt(i);h=Math.imul(h,16777619)}
return()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return(h>>>0)/4294967296}}
function computeScorePrivate(address){
 const rnd=pseudoRandom(address.toLowerCase())
 const activeDays=Math.floor(rnd()*28)+1
 const trades=Math.floor(rnd()*220)
 const vault=Math.floor(rnd()*35)
 const markets=Math.floor(rnd()*18)
 const s1=clamp((activeDays/20)*40,0,40)
 const s2=clamp((Math.log10(trades+1)/Math.log10(220))*30,0,30)
 const s3=clamp((Math.log10(vault+1)/Math.log10(36))*20,0,20)
 const s4=clamp((markets/12)*10,0,10)
 return clamp(Math.round(s1+s2+s3+s4),0,100)
}
export function getScoreOnly(address){
 const score=computeScorePrivate(address)
 return {address,score,tier:tierFromScore(score)}
}