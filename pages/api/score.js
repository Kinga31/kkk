import {isAddressLike,getScoreOnly} from '../../lib/scoring'
export default function handler(req,res){
 const address=String(req.query.address||'').trim()
 if(!isAddressLike(address))return res.status(400).json({error:'Invalid address'})
 return res.status(200).json(getScoreOnly(address))
}