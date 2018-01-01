var tap = require('tap') ;
var Interval = require("../src/Interval.js") ;
var Note = require('../src/Note.js') ;
tap.pass('Note loaded') ;

var C = new Note("C") ;
var Cs = new Note("C#") ;
var D = new Note("D") ;
var Db = new Note("Db") ;
var G = new Note("G") ;
var A = new Note("A") ;

tap.equals(C.toString(), "C") ;
tap.equals(D.toString(), "D") ;
tap.ok(Db.isFlat()) ;
tap.ok(Cs.isSharp()) ;
tap.ok(D.isNatural()) ;

tap.same(G.next(), A) ;
tap.same(G.sharp().next(), A) ;
tap.same(C.flat().next(), D) ;
tap.same(A.prev(), G) ;
tap.same(A.sharp().prev(), G) ;
tap.same(D.flat().prev(), C) ;

tap.throws(function(){ new Note("X")}, "Unknown") ;

tap.same(C.raise(), new Note("C#")) ;
tap.same(C.lower(), new Note("Cb")) ;
tap.equals(C.lower().toString(), "Cb") ;
tap.equals(C.raise().toString(), "C#") ;
tap.equals(C.lower().toString(), "Cb") ;

tap.equals(C.natural().getAccidental(), "") ;
tap.equals(C.raise().getAccidental(), "#") ;

tap.same(C.next(), D) ;
tap.same(C.sharp().next(), D) ;
tap.same(D.prev(), C) ;
tap.same(D.flat().prev(), C) ;

tap.equals(C._step_distance(C), 0) ; 
tap.equals(C._step_distance(C.flat()), 0) ; 
tap.equals(C._step_distance(C.sharp()), 0) ; 
tap.equals(C._step_distance(D), 1) ; 
tap.equals(C._step_distance(Db), 1) ; 
tap.equals(C._step_distance(D.sharp()), 1) ; 

tap.equals(C._semitone_distance(C), 0) ;
tap.equals(C._semitone_distance(C.sharp()), 1) ;
tap.equals(Cs._semitone_distance(Cs), 0) ;
tap.equals(Cs._semitone_distance(D), 1) ;
tap.equals(Cs._semitone_distance(Db), 0) ;
tap.equals(C._semitone_distance(Db), 1) ;

