'use strict' ;

module.exports = class Interval {
	constructor(str){
		switch (str){
			case "m2":
				this.semitones = 1 ;
				this.steps = 1 ;
				break ;
			case "M2":
				this.semitones = 2 ;
				this.steps = 1 ;
				break ;
			case "P5":
				this.semitones = 7 ;
				this.steps = 4 ;
				break ;
			default:
				throw new Error("Unknown interval '" + str + "'") ;
		}
		this.name = str ;
	}

	getSteps(){
		return this.steps ;
	}

	getSemitones(){
		return this.semitones ;
	}

	above(n){
		var n2 = n ;
		var steps = this.getSteps() ;
		for (var j = 0 ; j < steps ; j++){
			n2 = n2.next() ;
		}

		var semis = this.getSemitones() ;
		return n2._adjust(semis - n._semitone_distance(n2)) ;
	}

	below(n){
		var n2 = n ;
		var steps = this.getSteps() ;
		for (var j = 0 ; j < steps ; j++){
			n2 = n2.prev() ;
		}

		var semis = this.getSemitones() ;
		return n2._adjust(n2._semitone_distance(n) - semis) ;
	}

	static circleOfFifths(n){
		var P5 = new Interval("P5") ;
		var ret = new Array() ;
		ret[7] = n ;
		for (var i = 6 ; i >= 0 ; i--){
			ret[i] = P5.below(ret[i+1]) ;
		}
		for (var i = 8 ; i < 15 ; i++){
			ret[i] = P5.above(ret[i-1]) ;
		}
		return ret ;
	}

}
