'use strict';

const latencies = {};
exports.initLatency = (name) => {
    Object.assign(latencies, { [name]: 0 });
}

exports.startPoint = (name) => {
    const currentTime = latencies[name];
    latencies[name] = Date.now() - currentTime;
}

exports.endPoint = (name) => {
    this.startPoint(name);
}
exports.getLatency = (name) => {
    return latencies[name];
}