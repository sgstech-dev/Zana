using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Server.models;

class Program
{
    static async Task Main(string[] args)
    {
        string filePath = "data.txt";

        Console.WriteLine("📤 خواندن Targetها با تاخیر زمانی بین آن‌ها:");
        Console.WriteLine($"📂 مسیر فایل: {filePath}");

        if (!System.IO.File.Exists(filePath))
        {
            Console.WriteLine("❌ فایل وجود ندارد. ابتدا باید داده‌ها نوشته شوند.");
            return;
        }

        await ReadTargetsWithDelay(filePath);

        Console.WriteLine("✅ پایان خواندن.");
    }


    static async Task ReadTargetsWithDelay(string filePath)
    {
        Target? previous = null;

        using (StreamReader reader = new StreamReader(filePath))
        {
            string? line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                Target current = JsonConvert.DeserializeObject<Target>(line)!;

                if (previous != null)
                {
                    TimeSpan delay = current.DetectedTime - previous.DetectedTime;
                    if (delay.TotalMilliseconds > 0)
                        await Task.Delay(delay);
                }

                // مثال استفاده
                Console.WriteLine($"[{current.DetectedTime:HH:mm:ss}] Read Target ID: {current.TargetId}");

                previous = current;
            }
        }
    }
}