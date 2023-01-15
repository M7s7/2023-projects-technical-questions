import express from "express";
import { send } from "process";

// location is the simple (x, y) coordinates of an entity within the system
// spaceCowboy models a cowboy in our super amazing system
// spaceAnimal models a single animal in our amazing system
type location = { x: number; y: number };
type spaceCowboy = { name: string; lassoLength: number };
type spaceAnimal = { type: "pig" | "cow" | "flying_burger" };

// spaceEntity models an entity in the super amazing (ROUND UPPER 100) system
type spaceEntity =
  | { type: "space_cowboy"; metadata: spaceCowboy; location: location }
  | { type: "space_animal"; metadata: spaceAnimal; location: location };

// === ADD YOUR CODE BELOW :D ===
// === ExpressJS setup + Server setup ===
const spaceDatabase = [] as spaceEntity[];
const app = express();
app.use(express.json());

// the POST /entity endpoint adds an entity to your global space database
app.post("/entity", (req, res) => {
  try {
    const entities = req.body.entities

    entities.map((entity: spaceEntity) => {
      spaceDatabase.push(entity)
    })
    console.log(spaceDatabase)
    res.status(200)
    res.send({message: "Entities created"})
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
});

// lasooable returns all the space animals a space cowboy can lasso given their name
app.get("/lassoable", (req, res) => {
  try {
    const cowboyName = req.query.cowboy_name
    const cowboy: any = spaceDatabase.filter((item) => {
      return (
        item.type === "space_cowboy" && item.metadata.name === cowboyName
      )
    })[0]

    const cowboyLength = cowboy.metadata.lassoLength
    const cowboyLocation = cowboy.location
  
    const onlyAnimals = spaceDatabase.filter((item) => item.type === "space_animal")
  
    const AnimalsandReachable = onlyAnimals.filter((item) => {
      const x = cowboyLocation.x - item.location.x
      const y = cowboyLocation.y - item.location.y
      const distance = Math.sqrt(x*x + y*y)
  
      return distance <= cowboyLength 
    })
  
    const output = {
      space_animals: AnimalsandReachable.map((item: any) => ({
          type: item.metadata.type,
          location: item.location
      }))
  }

    res.status(200)
    res.send(output)

  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
});

app.listen(8080);