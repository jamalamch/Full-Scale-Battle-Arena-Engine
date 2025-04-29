using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

public static class ExportScene
{
    [MenuItem("Export as json and collider")]
    public static void ExportSpritePositionandColliderAdsJson()
    {
        SpritecolliderDataList spriteDataList = new SpritecolliderDataList();

        // Find all SpriteRenderers in the scene
        SpriteRenderer[] allSprites = GameObject.FindObjectsOfType<SpriteRenderer>();

        foreach (SpriteRenderer sr in allSprites)
        {
            SpriteData data = new SpriteData();
            data.name = sr.sprite.name;
            data.position = sr.transform.position;
            data.zIndex = sr.sortingOrder;
            spriteDataList.sprites.Add(data);
        }

        // Find all SpriteRenderers in the scene
        Collider2D[] allcollider = GameObject.FindObjectsOfType<Collider2D>();

        foreach (Collider2D collider2D in allcollider)
        {
            Vector4 vector4 = new Vector4();
            Bounds bounds = collider2D.bounds;
            vector4.x = bounds.center.x;
            vector4.y = bounds.center.y;

            // Set size (width, height)
            vector4.z = collider2D.bounds.size.x;
            vector4.w = collider2D.bounds.size.y;

            // Add to the list
            spriteDataList.colliders.Add(vector4); // assuming it's called 'colliders'
        }


        // Convert to JSON
        string json = JsonUtility.ToJson(spriteDataList, true);

        // Save the JSON to a file
        string path = EditorUtility.SaveFilePanel("Save Sprite JSON", Application.dataPath, "sprites", "json");
        if (!string.IsNullOrEmpty(path))
        {
            File.WriteAllText(path, json);
            Debug.Log($"Exported {spriteDataList.sprites.Count} sprites to {path}");
        }
        else
        {
            Debug.LogWarning("Save canceled.");
        }
    }

    [System.Serializable]
    public class SpriteData
    {
        public string name;
        public Vector2 position;
        public int zIndex;
    }

    [System.Serializable]
    public class SpriteDataList
    {
        public List<SpriteData> sprites = new List<SpriteData>();
    }

    [System.Serializable]
    public class SpritecolliderDataList
    {
        public List<SpriteData> sprites = new List<SpriteData>();
        public List<Vector4> colliders = new List<Vector4>();
    }
}