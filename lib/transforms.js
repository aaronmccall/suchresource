var Transform = require('stream').Transform;
var util = require('util');
var transforms = {};

function InstanceListStream(options) {
    Transform.call(this, options);
    this._writableState.objectMode = true;
}

util.inherits(InstanceListStream, Transform);

InstanceListStream.prototype._transform = function (instance, encoding, done) {
    // if we've already started the stream, prefix a comma
    // if we haven't, prefix with a [ to start the array
    if (this.started) {
        this.push(',');
    } else {
        this.push('[');
        this.started = true;
    }
    // Write JSON serialized instance to the stream
    this.push(instance.toString());
    done();
};
 
// end the json array
InstanceListStream.prototype._flush = function (done) {
    this.push(']');
    done();
};

transforms.InstanceListStream = InstanceListStream;

module.exports = transforms;