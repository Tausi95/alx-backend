---

```markdown
# Queuing System - Redis Task

This project implements a queuing system that uses Redis to store and retrieve key-value pairs.

## Task Overview

1. **Install and configure Redis**:
   - Download and compile Redis version 6.0.10.
   - Start the Redis server and verify it is running.
   
2. **Set a key-value pair**:
   - Set the key `ALX` with the value `School` in the Redis database.
   
3. **Copy the Redis snapshot**:
   - Copy the `dump.rdb` file to the root of the `0x03-queuing_system_in_js` directory to persist the data.
   
4. **Verify the functionality**:
   - Restart the Redis server and verify that the `get ALX` command returns `"School"`.

## Requirements

- Redis version `6.0.10`
- Operating System: Linux (or any Unix-based system)
- Node.js (for the project setup)

## How to Run

1. **Start Redis server**:
   ```bash
   src/redis-server &
   ```

2. **Set key-value pair**:
   ```bash
   src/redis-cli set ALX School
   ```

3. **Verify key-value retrieval**:
   ```bash
   src/redis-cli get ALX
   ```

4. **Stop Redis server**:
   ```bash
   ps aux | grep redis
   kill [PID]
   ```

5. **Copy `dump.rdb`**:
   - Copy the `dump.rdb` file to the root of this project.

6. **Test the snapshot**:
   - Restart the Redis server and verify that the data is persisted by running `get ALX`.

## `.gitignore`

The project includes a `.gitignore` file to exclude the following from version control:
- `node_modules/`
- `package-lock.json`
- `redis-6.0.10/`
- `redis-6.0.10.tar.gz`

## License

This project is licensed under the MIT License.
```

