##### 1. Install dependencies.
```
npm install
```

##### Not using Memcached since there is not official support for windows build.

##### 2. For windows download the zip of redis binaries.
https://github.com/dmajkic/redis/downloads


##### 3. Run `redis-server` and `redis-cli` then execute `node index.js`.

Note: I have used `client-side.js` file to simulate event requests. No need to run it seperately as
I have forked it into child_process.
