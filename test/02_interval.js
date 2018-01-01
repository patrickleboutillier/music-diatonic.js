var tap = require('tap') ;
var Interval = require('../src/Interval.js') ;
var Note = require('../src/Note.js') ;
tap.pass('Interval loaded') ;

var m2 = new Interval("m2") ;
tap.equals(m2.getSemitones(), 1) ;
tap.equals(m2.getSteps(), 1) ;
var M2 = new Interval("M2") ;
tap.equals(M2.getSemitones(), 2) ;
tap.equals(M2.getSteps(), 1) ;
var P5 = new Interval("P5") ;
tap.equals(P5.getSemitones(), 7) ;
tap.equals(P5.getSteps(), 4) ;

tap.throws(function(){ new Interval("X")}, "Unknown") ;


var C = new Note("C") ;
var D = new Note("D") ;
var Db = new Note("Db") ;
var G = new Note("G") ;
tap.same(m2.above(C), Db) ;
tap.same(m2.below(D), C.sharp()) ;

tap.same(P5.above(C), G) ;
tap.same(P5.above(new Note("B")), new Note("F#")) ;
tap.same(P5.above(new Note("Bb")), new Note("F")) ;
tap.same(P5.above(new Note("F#")), new Note("C#")) ;
tap.same(P5.above(new Note("F##")), new Note("C##")) ;

var c5 = Interval.circleOfFifths(C) ;
tap.same(c5[0], new Note("Cb")) ;
tap.same(c5[1], new Note("Gb")) ;
tap.same(c5[2], new Note("Db")) ;
tap.same(c5[3], new Note("Ab")) ;
tap.same(c5[4], new Note("Eb")) ;
tap.same(c5[5], new Note("Bb")) ;
tap.same(c5[6], new Note("F")) ;
tap.same(c5[7], C) ;
tap.same(c5[8], G) ;
tap.same(c5[9], D) ;
tap.same(c5[10], new Note("A")) ;
tap.same(c5[11], new Note("E")) ;
tap.same(c5[12], new Note("B")) ;
tap.same(c5[13], new Note("F#")) ;
tap.same(c5[14], new Note("C#")) ;
