import exercisesJSON from "./exercises.json";
import fs from "fs";
import { randomUUID } from "expo-crypto";


let newJson = exercisesJSON.strength.map((exercise, index) => {
    return {
        ...exercise,
        id: randomUUID()
    }
})

fs.writeFileSync('exercises2.json', JSON.stringify({ strength: newJson }), 'utf-8');