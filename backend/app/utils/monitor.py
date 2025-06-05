import psutil
import platform
import socket
import time
import requests

def get_local_server_info():
    name = platform.node()
    status = True
    cpu_load = psutil.cpu_percent(interval=0.5)
    ram_usage = psutil.virtual_memory().percent
    temperature = 0.0
    if hasattr(psutil, "sensors_temperatures"):
        temps = psutil.sensors_temperatures()
        if temps:
            for entries in temps.values():
                if entries:
                    temperature = entries[0].current
                    break
    ip = socket.gethostbyname(socket.gethostname())
    os_info = f"{platform.system()} {platform.release()}"
    uptime = time.time() - psutil.boot_time()
    days = int(uptime // 86400)
    hours = int((uptime % 86400) // 3600)
    uptime_str = f"{days} дней {hours} ч" if days else f"{hours} ч"
    return {
        "id": 0,
        "name": name,
        "status": status,
        "temperature": temperature,  # <-- только число!
        "cpu_load": cpu_load,
        "ram_usage": ram_usage,
        "vms": [],
        "ip": ip,
        "os": os_info,
        "uptime": uptime_str,
    }

def get_remote_server_info(remote_host):
    try:
        res = requests.get(f"http://{remote_host}:8000/servers/")
        # Можно брать первый сервер из списка, если их несколько
        return res.json()[0]
    except Exception as e:
        return {
            "id": -1,
            "name": f"Ошибка {remote_host}",
            "status": False,
            "temperature": 0.0,
            "cpu_load": 0.0,
            "ram_usage": 0.0,
            "vms": [],
            "ip": remote_host,
            "os": "недоступно",
            "uptime": "недоступно",
        }