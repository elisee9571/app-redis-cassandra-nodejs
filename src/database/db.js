const cassandra = require('cassandra-driver');

clientCassandra = new cassandra.Client({
    contactPoints: ["localhost"],
    localDataCenter: "datacenter1",
    keyspace: "app"
});

module.exports = clientCassandra;