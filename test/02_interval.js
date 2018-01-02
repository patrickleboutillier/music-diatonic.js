var tap = require('tap') ;
var Interval = require('../src/Interval.js') ;
var Note = require('../src/Note.js') ;
tap.pass('Interval loaded') ;

var P1 = new Interval("P1") ;
tap.equals(P1.getSemitones(), 0) ;
tap.equals(P1.toString(), "P1") ;
var m2 = new Interval("m2") ;
tap.equals(m2.getSemitones(), 1) ;
tap.equals(m2.toString(), "m2") ;
var M2 = new Interval("M2") ;
tap.equals(M2.getSemitones(), 2) ;
tap.equals(M2.toString(), "M2") ;
var m3 = new Interval("m3") ;
tap.equals(m3.getSemitones(), 3) ;
tap.equals(m3.toString(), "m3") ;
var M3 = new Interval("M3") ;
tap.equals(M3.getSemitones(), 4) ;
tap.equals(M3.toString(), "M3") ;
var P4 = new Interval("P4") ;
tap.equals(P4.getSemitones(), 5) ;
tap.equals(P4.toString(), "P4") ;
var A4 = new Interval("A4") ;
tap.equals(A4.getSemitones(), 6) ;
tap.equals(A4.toString(), "A4") ;
var d5 = new Interval("d5") ;
tap.equals(d5.getSemitones(), 6) ;
tap.equals(d5.toString(), "d5") ;
var P5 = new Interval("P5") ;
tap.equals(P5.getSemitones(), 7) ;
tap.equals(P5.toString(), "P5") ;
var m6 = new Interval("m6") ;
tap.equals(m6.getSemitones(), 8) ;
tap.equals(m6.toString(), "m6") ;
var M6 = new Interval("M6") ;
tap.equals(M6.getSemitones(), 9) ;
tap.equals(M6.toString(), "M6") ;
var m7 = new Interval("m7") ;
tap.equals(m7.getSemitones(), 10) ;
tap.equals(m7.toString(), "m7") ;
var M7 = new Interval("M7") ;
tap.equals(M7.getSemitones(), 11) ;
tap.equals(M7.toString(), "M7") ;

var A3 = new Interval("A3") ;
tap.equals(A3.getSemitones(), 5) ;
tap.equals(A3.toString(), "A3") ;

var d3 = new Interval("d3") ;
tap.equals(d3.getSemitones(), 2) ;
tap.equals(d3.toString(), "d3") ;

tap.same(d3.augment(), m3) ;
tap.same(m3.augment(), M3) ;
tap.same(M3.augment(), A3) ;
tap.same(A3.augment().toString(), "AA3") ;

tap.same(m2.diminish().toString(), "d2") ;
tap.same(m3.diminish(), d3) ;
tap.same(M3.diminish(), m3) ;
tap.same(A3.diminish(), M3) ;
tap.same(A3.augment().diminish(), A3) ;

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
