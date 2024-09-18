import exerciseJson from '../assets/exercises.json';
import fs from 'fs'
const ex = exerciseJson.strength.map(s => `${s.name.shared},${s.name.en},${s.name.he},${s.against},${s.muscle}`)

const result = `shared,english,hebrew,against,muscle`

fs.writeFileSync("./exercises.csv", result, 'utf-8');


ex.forEach((ex) => {
    fs.appendFileSync("./exercises.csv", ex, 'utf-8')
})

