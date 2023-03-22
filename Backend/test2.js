const s1 = 'galarian moltres (17/198) [sword & shield: chilling reign]';
const s2 = 'galarian moltre  (17/198)   [sword & shield: chilling reign]';


const s4 = s1.replace(/\s+/g, ' ' ).trim()

const s5 = s4.substring(0, s1.indexOf('(') -1)


const s6 = s4.substring(s4.indexOf('[')+1, s4.indexOf(']'))

const s3 =  s4.substring(s4.indexOf('(')+1, s4.indexOf(')'))

console.log(s2.includes(s3) && s2.includes(s5) && s2.includes(s6))