"use strict";

var id = function(x){ return x },


isType = function(s, x){
  var t = typeof x,
      s = s.toLowerCase();
  if (s === 'object') return (t === 'object') && (x.length !=  +x.length);
  if (s === 'array' ) return (t === 'object') && (x.length === +x.length);
  return (s === t);
},


replicate = function(n, x){
  var result = [], i = 0;
  while (i++ < n)
    result.push(x);
  return result;
},


dot = function(prop, obj){
  return obj[prop];
},


pluck = function(prop, xs){
  var result = [], i = -1, len = xs.length;
  while (++i < len)
    result.push(xs[i][prop])
  return result;
},


each = function(fn, xs){
  if (xs.forEach) return xs.forEach(fn);
  if (xs.length === +xs.length) {
    var i = -1, len = xs.length;
    while (++i < len)
      fn(xs[i]);
  } else {
    for (var k in xs)
      xs.hasOwnProperty(k) && fn(xs[k]);
  }
  return xs;
},



map = function(fn, xs){
  if (xs.map) return xs.map(fn);
  if (xs.length === +xs.length) {
    var result = [], i = -1, len = xs.length;
    while (++i < len)
      result.push(fn(xs[i]));
    return result;
  } else {
    var result = {};
    for (var k in xs)
      if (xs.hasOwnProperty(k)) result[k] = fn(xs[k]);
    return result;
  }
},


filter = function(fn, xs){
  if (xs.filter) return xs.filter(fn);
  if (xs.length === +xs.length) {
    var result = [], i = -1, len = xs.length;
    while (++i < len)
      fn(xs[i]) && result.push(xs[i]);
    return result;
  } else {
    var result = {};
    for (var k in xs)
      if (xs.hasOwnProperty(k) && fn(xs[k])) result[k] = xs[k];
    return result;
  }
},


reject = function(fn, xs){
  if (xs.reject) return xs.reject(fn);
  if (xs.length === +xs.length) {
    var result = [], i = -1, len = xs.length;
    while (++i < len)
      if (!fn(xs[i])) result.push(xs[i]);
    return result;
  } else {
    var result = {};
    for (var k in xs)
      if (xs.hasOwnProperty(k) && !fn(xs[k])) result[k] = xs[k];
    return result;
  }
},


partition = function(fn, xs){
  if (xs.length === +xs.length) {
    var a = [], b = [], i = -1, len = xs.length;
    while (++i < len)
      fn(xs[i]) ? a.push(xs[i]) : b.push(xs[i]);
    return [a, b];
  } else {
    var a = {}, b = {};
    for (var k in xs) {
      if (xs.hasOwnProperty(k))
        fn(xs[k]) ? a[k] = xs[k] : b[k] = xs[k];
    }
    return [a, b];
  }
},


find = function(fn, xs){
  if (xs.length === +xs.length) {
    var i = -1, len = xs.length;
    while (++i < len)
      if (fn(xs[i])) return xs[i];
  } else {
    for (var k in xs)
      if (xs.hasOwnProperty(k) && fn(xs[k])) return xs[k];
  }
},



head    = function(xs){ return xs[0]; },
tail    = function(xs){ return xs.slice(1); },
last    = function(xs){ return xs[xs.length-1]; },
initial = function(xs){ return xs.slice(0,xs.length-1); },

take = function(n, xs){
  var result = [], i = -1;
  while (++i < n)
    if (xs[i]) result.push(xs[i]);
  return result;
},

drop = function(n, xs){
  var result = [], i = n-1, len = xs.length;
  while (++i < len)
    result.push(xs[i]);
  return result;
},

takeWhile = function(fn, xs){
  var result = [], i = -1, len = xs.length;
  while (++i < len)
    if (fn(xs[i]))
      result.push(xs[i]);
    else
      break;
  return result;
},

dropWhile = function(fn, xs){
  var result = [], i = -1, len = xs.length, drop = true;
  while (++i < len) {
    if (drop) {
      if (!fn(xs[i])) drop = false, i--;
    } else {
      result.push(xs[i]);
    }
  }
  return result;
},

span = function(fn, xs){
  var a = [], b = [], i = -1, len = xs.length, drop = true;
  while (++i < len) {
    if (drop) {
      if (fn(xs[i]))
        a.push(xs[i]);
      else
        drop = false, i--;
    } else {
      b.push(xs[i]);
    }
  }
  return [a, b];
},

breakList = function(fn, xs){
  var a = [], b = [], i = -1, len = xs.length, drop = true;
  while (++i < len) {
    if (drop) {
      if (fn(xs[i]))
        drop = false, i--;
      else
        a.push(xs[i]);
    } else {
      b.push(xs[i]);
    }
  }
  return [a, b];
},


empty = function(xs){
  if (xs.length === +xs.length)
    return xs.length === 0;
  for (var k in xs)
    if (xs.hasOwnProperty(k)) return false;
  return true;
},

reverse = function(xs){
  var result = [], i = xs.length;
  while (i--)
    result.push(xs[i]);
  return result;
},


foldl = function(fn, memo, xs){
  var i = -1, len = xs.length;
  while (++i < len)
    memo = fn(memo, xs[i]);
  return memo;
},
foldl1 = function(fn, xs){
  // TODO
},

foldr = function(fn, memo, xs){
  var i = xs.length;
  while (i--)
    memo = fn(memo, xs[i]);
  return memo;
},
foldr1 = function(fn, xs){
  // TODO
},


concat = function(xs){
  var result = [], i = -1, len = xs.length;
  while (++i < len)
    result = result.concat(xs[i]);
  return result;
},


// Notice that this function is recursive, so if you change the name, make sure
// to change the function called inside it as well
flatten = function(xs){
  var result = [], i = -1, len = xs.length;
  while (++i < len) {
    result = result.concat(
      typeof xs[i] === 'object' && xs[i].length === +xs[i].length
      ? flatten(xs[i])
      : xs[i]
    );
  }
  return result;
},


any = function(fn, xs){
  var i = -1, len = xs.length;
  while (++i < len)
    if (fn(xs[i])) return true;
  return false;
},

all = function(fn, xs){
  var i = -1, len = xs.length;
  while (++i < len)
    if (!fn(xs[i])) return false;
  return true;
},

sort = function(xs){
  return xs.slice(0).sort(function(x,y){return x-y});
},

sortBy = function(fn, xs){
  return xs.slice(0).sort(fn);
},


sum = function(xs){
  var result = 0, i = -1, len = xs.length;
  while (++i < len)
    result += xs[i];
  return result;
},

product = function(xs){
  if (xs.length === 0) return 0;
  var result = 1, i = -1, len = xs.length;
  while (++i < len)
    result = result * xs[i];
  return result;
},

even = function(x) { return x%2 === 0 },
odd  = function(x) { return x%2 === 1 },

lt = function(n, x) { return x < n },
gt = function(n, x) { return x > n },
eq = function(n, x) { return x === n },
lteq = function(n, x) { return x <= n },
gteq = function(n, x) { return x >= n },


mean = function(xs){
  var result = 0, i = -1, len = xs.length;
  while (++i < len)
    result += xs[i];
  return result/xs.length;
},

maximum = function(xs) {
  var result = xs[0], i = -1, len = xs.length;
  while (++i < len)
    if (xs[i] > result) result = xs[i];
  return result;
},

minimum = function(xs) {
  var result = xs[0], i = -1, len = xs.length;
  while (++i < len)
    if (xs[i] < result) result = xs[i];
  return result;
},


zip = function(xs, ys){
  var result = [], i = -1, len = Math.min(xs.length, ys.length);
  while (++i < len)
    result.push([xs[i], ys[i]]);
  return result;
},

zipWith = function(fn, xs, ys){
  var result = [], i = -1, len = Math.min(xs.length, ys.length);
  while (++i < len)
    result.push( fn(xs[i], ys[i]) );
  return result;
},



// Objects

keys = function(o){
  var result = [];
  for (var k in o)
    o.hasOwnProperty(k) && result.push(k);
  return result;
},

values = function(o){
  var result = [];
  for (var k in o)
    o.hasOwnProperty(k) && result.push(o[k]);
  return result;
},

pairsToObj = function(xs){
  var result = {}, i = -1, len = xs.length;
  while (++i < len)
    result[xs[i][0]] = xs[i][1];
  return result;
},

objToPairs = function(o){
  var result = [];
  for (var k in o)
    o.hasOwnProperty(k) && result.push([k,o[k]]);
  return result;
},

listsToObj = function(xs, ys){
  var result = {}, i = -1, len = Math.min(xs.length, ys.length);
  while (++i < len)
    result[xs[i]] = ys[i];
  return result;
},

objToLists = function(o){
  var a = [], b = [];
  for (var k in o)
    o.hasOwnProperty(k) && a.push(k) && b.push(o[k]);
  return [a, b];
},

extend = function(o, p){
  var result = {}, i = -1, objs = [o, p];
  while (++i < 2) {
    for (var k in objs[i]) {
      if (objs[i].hasOwnProperty(k))
        result[k] = objs[i][k];
    }
  }
  return result;
},

extendAll = function( /* n objects */ ){
  var objs = Array.prototype.slice.call(arguments,0),
      result = {}, i = -1, len = objs.length;
  while (++i < len) {
    for (var k in objs[i]) {
      if (objs[i].hasOwnProperty(k))
        result[k] = objs[i][k];
    }
  }
  return result;
},

pick = function(xs, o){
  var result = {}, i = -1, len = xs.length;
  while (++i < len)
    result[xs[i]] = o[xs[i]];
  return result;
},

omit = function(xs, o){
  var result = {}, len = xs.length;
  for (var k in o) {
    if (o.hasOwnProperty(k)) {
      var i = -1, found = false;
      while (++i < len) {
        if (xs[i] === k) {
          found = true;
          break;
        }
      }
      if (!found) result[k] = o[k];
    }
  }
  return result;
},



// Functions

// can't curry this :(
compose = function() {
  var fns = arguments;
  return function() {
    var args = arguments, i = fns.length;
    while (i--)
      args = [fns[i].apply(this, args)];
    return args[0];
  };
},


curry = function(fn) {
  var toArray = function(arr, from) {
    return Array.prototype.slice.call(arr, from || 0);
  },
  args = toArray(arguments, 1);
  return function() {
    return fn.apply(this, args.concat(toArray(arguments)));
  };
},

autoCurry = function(fn, numArgs) {
  var toArray = function(arr, from) {
    return Array.prototype.slice.call(arr, from || 0);
  },
  numArgs = numArgs || fn.length;
  return function() {
    var rem;
    if (arguments.length < numArgs) {
      rem = numArgs - arguments.length;
      if (numArgs - rem > 0) {
        return autoCurry(curry.apply(this, [fn].concat(toArray(arguments))), rem);
      } else {
        return curry.apply(this, [fn].concat(toArray(arguments)));
      }
    } else {
      return fn.apply(this, arguments);
    }
  };
},


// args must be an array of the arguments (allows currying)
applyl = function(fn, args) {
  return function() {
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  };
},
applyr = function(fn, args) {
  return function() {
    return fn.apply(this, Array.prototype.slice.call(arguments).concat(args));
  };
}
;

