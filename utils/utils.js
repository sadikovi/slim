
var removeKeySpaces = require('./objs').removeKeySpaces;

function processTime(t) {
  return t ? t : undefined;
}

function maybeParseInt(n) {
  if (typeof n === 'string' && n.match(/^[0-9]+$/)) {
    return parseInt(n);
  }
  return n;
}

function accumulablesObj(accumulables) {
  var o = {};
  accumulables.forEach(function(a) {
    a.Update = maybeParseInt(a.Update);
    a.Value = maybeParseInt(a.Value);
    o[a.ID] = a;
  });
  return o;
}

function taskEndObjRec(o) {
  if (typeof o !== 'object') return o;
  for (var k in o) {
    if (k === 'Executor ID') {
      o[k] = maybeParseInt(o[k]);
    } else {
      taskEndObjRec(o[k]);
    }
  }
  return o;
}
function taskEndObj(o) {
  return removeKeySpaces(taskEndObjRec(o));
}

module.exports = {
  PENDING: undefined,
  RUNNING: 1,
  SUCCEEDED: 2,
  FAILED: 3,
  SKIPPED: 4,
  REMOVED: 5
};

module.exports.status = {};
module.exports.status[module.exports.PENDING] = "PENDING";
module.exports.status[module.exports.RUNNING] = "RUNNING";
module.exports.status[module.exports.FAILED] = "FAILED";
module.exports.status[module.exports.SUCCEEDED] = "SUCCEEDED";
module.exports.status[module.exports.SKIPPED] = "SKIPPED";
module.exports.status[module.exports.REMOVED] = "REMOVED";

module.exports.processTime = processTime;
module.exports.accumulablesObj = accumulablesObj;
module.exports.taskEndObj = taskEndObj;
module.exports.maybeParseInt = maybeParseInt;
