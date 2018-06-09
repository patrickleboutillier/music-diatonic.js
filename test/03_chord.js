var tap = require('tap') ;
var Note = require('../src/Note.js') ;
var Chord = require('../src/Chord.js') ;
tap.pass('Chord loaded') ;

var Cmaj = new Chord("C") ;
tap.ok(Cmaj.isMajor()) ;
var Dmin7 = new Chord("D-7") ;
tap.ok(Dmin7.isMinor()) ;
var G9 = new Chord("G9") ;
tap.ok(G9.isDominant()) ;
var Cso = new Chord("C#o") ;
tap.ok(Cso.isDiminished()) ;
var Bh = new Chord("Bh") ;
tap.ok(Bh.isMinor7b5()) ;

tap.same(Bh.getRoot(), new Note("Bh")) ;
tap.same(Bh.getQuality(), "h") ;


