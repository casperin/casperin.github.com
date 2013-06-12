// All methods from
//  * Arrays
//  * Numbers
//  * Objects
//  * Regexp
//  * Strings
// as autoCurried functions of the same name.


var root   // Not used




  // String.charAt()
  // charAt :: int -> string -> char
  , charAt = function( i, s ){
      return s[i];
    }.autoCurry()




  // String.charCodeAt()
  // charCodeAt :: int -> string -> int
  , charCodeAt = function( i, s ){
      return s.charCodeAt( i );
    }.autoCurry()




  // Array.concat()
  // String.concat()
  , concat = function( a, b ){
      return b.concat( a );
    }.autoCurry()




  // String.contains()
  , contains = function( value, s ){
      return s.indexOf( value ) !== -1;
    }.autoCurry()


  

  // String.endsWith()
  // ! optional args
  , endsWith = function( value, s){
      return s.lastIndexOf( value ) === s.length - value.length;
    }.autoCurry()




  // Regexp.exec()
  , exec = function( r, str ){
      return r.exec( str );
    }.autoCurry()




  // Object.hasOwnProperty()
  , hasOwnProperty = function( prop, o ){
      return o.hasOwnProperty( prop );
    }.autoCurry()




  // Array.indexOf()
  // String.indexOf()
  // ! optional args
  , indexOf = function( value, a ){
      return a.indexOf( value );
    }.autoCurry()




  // Object.isPrototypeOf()
  // May want to check if this is correct implementation.
  , isPrototypeOf = function( a, b ){
      return a.prototype.isPrototypeOf( b );
    }.autoCurry()




  // Array.join()
  // Implicitly forced separator
  // Not sure what this would do to strings. Add a separator between each char?
  , join = function( separator, arr ){
      return arr.join( separator );
    }.autoCurry()




  // Array.lastIndexOf()
  // Array.lastIndexOf()
  // ! optional args
  , lastIndexOf = function( value, a ){
      return a.lastIndexOf( value );
    }.autoCurry()




  // Not a technically a method, but useful still
  , length = function( a ){
      return a.length;
    }




  // String.localeCompare()
  // ! optional args
  // Most browsers don't support the optional args, so ignoring them for now
  , localeCompare = function( compareStr, s ){
      return s.localeCompare( compareStr );
    }.autoCurry()




  // String.match()
  , match = function( regexp, s ){
      return s.match( regexp );
    }.autoCurry()



  
  // Array.pop()
  // Returns last element of array and leaves array intact
  // Works for strings too
  , pop = function( a){
      return a[a.length-1];
    }




  // Works for strings too
  , pop_ = function( a ){
      if( typeof a === 'string') {
        var b = a.split('').slice(0);
        b.pop();
        return b.join('');
      }
      var b = a.slice(0);
      b.pop();
      return b;
    }




  // Array.push()
  // ! optional args
  // Works for strings too
  , push = function( value, a ){
      if( typeof a === 'string' ) return a + value;
      // cloning the array
      var b = a.slice(0);
      b.push( value ); 
      return b;
    }.autoCurry()




  // Object.propertyIsEnumerable()
  , propertyIsEnumerable = function( prop, o ){
      return o.propertyIsEnumerable( prop );
    }.autoCurry()




  // String.replace()
  // Ignoring the nonstard flags
  , replace = function( a, b, s ){
      return s.replace( a, b );
    }.autoCurry()




  // Array.reverse()  -> reverse()
  // ! Will colide with _.reverse()
  // Works for strings too
  , reverse = function( a ){
      if( typeof a === 'string' ) {
        var b = a.split('').slice(0);
        return b.reverse().join('');
      }
      var b = a.slice(0);
      return b.reverse();
    }




  // String.search()
  // ! Probably conflicting name
  , search = function( regexp, s ){
      return s.search( regexp );
    }.autoCurry()




  // Array.shift()
  // Returns first element of array and leaves array intact
  // Works for strings too
  , shift = function( arr ){
      return arr[0];
    }




  // Works for strings too
  , shift_ = function( a ){
      if( typeof a === 'string' ) {
        var b = a.split('').slice(0);
        b.shift();
        return b.join('');
      }
      var b = a.slice(0);
      b.shift();
      return b;
    }




  // Array.slice()
  // String.slice()
  // Forced the end argument
  , slice = function( begin, end, a ){
      return a.slice( begin, end );
    }.autoCurry()




  // Array.sort()
  // ! optional args
  // Ignoring optional args because of `sortBy()`
  // Works for strings too... but... why?
  , sort = function( a ){
      if( typeof a === 'string' ) {
        return a.split('').slice(0).sort().join('');
      }
      return a.slice(0).sort();
    }




  // Array.splice()
  // Works for strings too
  , splice = function( index, count, a ){
      if( typeof a === 'string' ) {
        return a.substring( 0, index ) + a.substring( index + count );
      }
      var b = a.slice(0);
      b.splice( index, count ); 
      return b;
    }.autoCurry()



  
  // Array.splice()
  // Works for strings too
  , splice_ = function( index, count, value, a ){
      if( typeof a === 'string' ) {
        return a.substring( 0, index ) + value + a.substring( index + count );
      }
      var b = a.slice(0);
      b.splice( index, count, value ); 
      return b;
    }.autoCurry()



  
  // String.split()
  // ! optional args
  // ignoring limit because I feel like it
  , split = function( separator, s ){
      return s.split( separator );
    }.autoCurry()




  // String.startsWith()
  , startsWith = function( value, s ){
      return s.indexOf( value ) === 0; 
    }.autoCurry()
  



  // String.substr()
  , substr = function( start, length, s ){
      return s.substr( start, length );
    }.autoCurry()




  // String.substring()
  , substring = function( start, end, s ){
      return s.substring( start, end );
    }.autoCurry()




  // Regexp.test()
  // Overly conflicting name?
  , test = function( r, str ){
      return r.test( str );
    }.autoCurry()




  // Number.toExponential()
  // ! optional args
  // Enforced optional arg
  , toExponential = function( fractionDigits, n ){
      return n.toExponential( fractionDigits );
    }.autoCurry()




  // Number.toFixed()
  // ! optional args
  // Enforced optional arg
  , toFixed = function( digits, n ){
      return n.toFixed( digits );
    }.autoCurry()




  // String.toLocaleLowerCase()
  , toLocaleLowerCase = function( s ){
      return s.toLocaleLowerCase();
    }




  // String.toLocaleUpperCase()
  , toLocaleUpperCase = function( s ){
      return s.toLocaleUpperCase();
    }




  // Number.toPrecision()
  // ! optional args
  // Enforced optional arg
  , toPrecision = function( precision, n ){
      return n.toPrecision( precision );
    }.autoCurry()




  // Array.toString()
  // String.toString()
  // Object.toString()
  , toString = function( a ){
      return a.toString();
    }




  // String.toUpperCase()
  , toUpperCase = function( s ){
      return s.toUpperCase();
    }




  // String.trim()
  , trim = function( s ){
      // polyfill
      return s.replace(/^\s+|\s+$/g,'');
    }




  // String.trimLeft()
  // No polyfills for these
  , trimLeft = function( s ){
      return s.trimLeft();
    }




  // String.trimRight()
  , trimRight = function( s ){
      return s.trimRight();
    }




  // Array.unshift()
  // ! optional args
  // Works for strings too
  , unshift = function( value, a ){
      if( typeof a === 'string' ) return value + a;
      var b = a.slice(0);
      b.unshift( value ); 
      return b;
    }.autoCurry()




  // String.valueOf()
  // Object.valueOf()
  , valueOf = function( a ){
      return a.valueOf();
    }




  ; 
