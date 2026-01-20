import {useState} from 'react'
export default function Home(){
 const [a,setA]=useState('');const[r,setR]=useState(null)
 async function check(){
  const res=await fetch('/api/score?address='+a)
  setR(await res.json())
 }
 return (<main style={{padding:40}}>
  <h1>Activity Score (Privacy Mode)</h1>
  <input placeholder='0x...' value={a} onChange={e=>setA(e.target.value)} />
  <button onClick={check}>Check</button>
  {r&&<p>Score: {r.score} | Tier: {r.tier}</p>}
 </main>)
}