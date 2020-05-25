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

##### 4. Get cacheObj
You can get cacheObj_0 for 1st interval using redis-cli command `get 'cacheObj_0'`.
In node.js you can get cacheObj by `client.get('cacheObj_0',callback)`. Callback have args (err,data)
