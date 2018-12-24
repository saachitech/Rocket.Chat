import { EventEmitter } from 'eventemitter3';
import { Meteor } from 'meteor/meteor';

RocketChat.metrics.streamer = new RocketChat.promclient.Counter({
	name: 'rocketchat_meteor_streamer_broadcast',
	help: 'summary of streamer',
	labelNames: ['stream', 'eventName'],
});

RocketChat.metrics.stream = new RocketChat.promclient.Counter({
	name: 'rocketchat_meteor_stream',
	help: 'summary of stream',
	labelNames: ['stream', 'eventName', 'listeners'],
});

export const Streamer = new class Streamer extends EventEmitter {
	broadcast(stream, eventName, ...args) {
		Meteor.StreamerCentral.emit('broadcast', stream, eventName, args); // TODO: remove that emiter

	}
	// internal(stream, eventName, ...args) {
	// RocketChat.Services.broadcast('stream-internal', { stream, eventName, args });
	// }
};

Streamer.on('broadcast', (stream, eventName) => {
	RocketChat.metrics.streamer.labels(stream, eventName).inc();
});

Streamer.on('emit', (stream, eventName) => {
	RocketChat.metrics.streamer.labels(stream, eventName).inc();
});