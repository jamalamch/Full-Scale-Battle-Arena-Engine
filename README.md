# PIXI Battle Arena ECS Engine

A modular, real-time 2D battle arena framework built using [PIXI.js](https://pixijs.com/) and a custom ECS (Entity-Component-System) architecture.

> Featuring sprite rendering, autonomous AI agents, spatial collision detection, animated HP bars, particles, bullets, and more.

---

## 🚀 Features

- 🧠 **Custom ECS** (Entities, Components, Systems)
- 🎯 **Units** with movement, health, factions, and ranged attacks
- 💥 **Bullets + Damage System**
- 🧠 **AI Agent Behaviors**
  - Patrolling
  - Seeking nearest enemies
  - Dodging bullets
  - Retreating on low ammo
- 🌀 **Collision Detection** using spatial grid
- 🖼️ **Sprite Rendering System**
  - Static & Animated sprite support
  - Auto-stage handling
- 🔥 **Particle FX System**
  - Muzzle flashes, explosions, smoke trails
- ❤️ **Tiny HP Bars**
  - Dynamically positioned and updated
- 🧪 **Debug Tools**
  - Collision outlines, entity state logs (coming soon)
- 📦 **Modular Game Loop**
  - Fixed timestep update + delta-based rendering
- 🗺️ **Parallax Background** (planned)

---

## 🛠️ Setup

### 1. Clone

```bash
git clone [https://github.com/yourname/pixi-battle-ecs.git](https://github.com/jamalamch/Full-Scale-Battle-Arena-Engine.git)
cd pixi-battle-ecs
npm install
npm run dev
```
🧩 Project Structure
graphql
src/
├── ecs/
│   ├── base/                    # Core ECS framework
│   │   ├── components/          # Basic components: Position, Velocity, Health, SpriteRenderer, etc.
│   │   └── systems/             # Systems: Movement, Rendering, Bullets, Particles, AI logic
│   ├── map.ts                   # Map loader and procedural generation
│   └── arenaWorld.ts            # World initialization and ECS setup
│
├── effects/                     # Particle FX definitions and emitters
├── ui/                          # UI components (HP bars, debug overlays, etc.)
├── mainGame.ts                  # Game bootstrap and PIXI application entry point


🖼️ Entity Example
```bash
const entity = new Entity();
entity.addComponent(new Position(x, y));
entity.addComponent(new Velocity(vx, vy));
entity.addComponent(new Health(100, 100));
entity.addComponent(new SpriteRenderer(texture, { anchor: 0.5 }));
world.addEntity(entity);
```


🗺️ Why Use Unity for Map Creation?
Unity has a great scene editor — you can visually place:

Obstacles

Spawn points

Terrain features

Zones (safe areas, choke points, etc.)

Then you export the scene data (not the game itself) to .json — and load it into PIXI.js to generate your battle arena layout.

🧰 Unity Map Export Workflow (to .json)
Step 1: Create a "Map Exporter" script in Unity
```bash
using System.Collections.Generic;
using UnityEngine;
using System.IO;

[System.Serializable]
public class MapObjectData {
    public string type;
    public float x, y, width, height;
}

[System.Serializable]
public class MapData {
    public List<MapObjectData> objects = new List<MapObjectData>();
}

public class MapExporter : MonoBehaviour {
    public string outputFile = "map.json";

    void Export() {
        var map = new MapData();

        foreach (Transform child in transform) {
            var obj = new MapObjectData {
                type = child.gameObject.tag, // e.g., "wall", "spawn"
                x = child.position.x,
                y = child.position.y,
                width = child.localScale.x,
                height = child.localScale.y
            };
            map.objects.Add(obj);
        }

        string json = JsonUtility.ToJson(map, true);
        File.WriteAllText(Path.Combine(Application.dataPath, outputFile), json);
        Debug.Log("Map exported!");
    }
}
```
✔️ Attach this script to a GameObject that acts as your MapRoot
✔️ Place map elements as children (walls, spawns, etc.)
✔️ Tag them accordingly
✔️ Hit "Export" in Unity to generate a .json

📦 Example .json Output
```
{
  "sprites": [
        {
            "name": "Grass_2",
            "position": {
                "x": 0.9599999785423279,
                "y": 9.149999618530274
            },
            "zIndex": -2
        },
        {
            "name": "Grass_1",
            "position": {
                "x": -17.270000457763673,
                "y": -2.380000114440918
            },
            "zIndex": 0
        },]
"colliders":
[
        {
            "x": -18.89824676513672,
            "y": -3.3499999046325685,
            "z": 5.103513717651367,
            "w": 0.6200001239776611
        },
        {
            "x": -23.948244094848634,
            "y": -3.3400001525878908,
            "z": 5.103511810302734,
            "w": 0.6200001239776611
        },
  ]
}
```
🎮 PIXI.js Side — Load Map into Arena
Step 1: Load JSON in TypeScript
```bash
async function loadMapData(path: string): Promise<any> {
    const res = await fetch(path);
    return await res.json();
}
```
Step 2: Parse and Create Entities
```
loadMapData('assets/maps/map1.json').then(map => {
    for (const obj of map.objects) {
        switch (obj.type) {
            case 'wall':
                createWall(obj.x, obj.y, obj.width, obj.height);
                break;
            case 'spawn':
                createSpawnPoint(obj.x, obj.y);
                break;
            // Add more cases as needed
        }
    }
});
```
🔨 createWall() Example
```bash
function createWall(x: number, y: number, width: number, height: number) {
    const entity = new Entity();
    entity.addComponent(new Position(x, y));
    entity.addComponent(new Collider(width, height));
    entity.addComponent(new Obstacle());
    entity.addComponent(new SpriteRenderer(wallTexture));
    world.addEntity(entity);
}
```
