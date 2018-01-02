'use strict' ;

module.exports = class Interval {
	constructor(str){
		var matches = str.match(/^([Ad]*)(([AdmM][2367])|([AdP][145]))$/) ;
        if ((matches)&&(matches.length > 0)){
			var pref = matches[1] ;
			var core = matches[2] ;
			var l = core.charAt(0) ;
			var n = parseInt(core.substring(1)) ;

			this.acc = 0 ;
			if (l == "A"){
				if ((n == 2)||(n == 3)||(n == 6)||(n == 7)){
					l = "M" ;
				}
				else {
					l = "P" ;
				}
				this.acc = pref.length + 1 ;
			}
			else if (l == "d"){
				if ((n == 2)||(n == 3)||(n == 6)||(n == 7)){
					l = "m" ;
				}
				else {
					l = "P" ;
				}
				this.acc = -(pref.length + 1) ;
			}

			this.quality = l ;
			this.steps = n - 1 ;
			this.semitones = this._countSemitones(l + n) ;
		}
		else {
			throw new Error("Unknown interval '" + str + "'") ;
		}
	}

	_countSemitones(str){
		switch (str){
			case "P1": return 0 ;
			case "m2": return 1 ;
			case "M2": return 2 ;
			case "m3": return 3 ;
			case "M3": return 4 ;
			case "P4": return 5 ;
			case "P5": return 7 ;
			case "m6": return 8 ;
			case "M6": return 9 ;
			case "m7": return 10 ;
			case "M7": return 11 ;
		}
	}

	toString(){
		return this.getQuality() + (this.getSteps() + 1) ;
	}

	getSteps(){
		return this.steps ;
	}

	getSemitones(){
		return this.semitones + this.acc ;
	}

	getQuality(){
		if (this.acc > 0){
			return "A".repeat(this.acc) ;
		}
		else if (this.acc < 0){
			return "d".repeat(-this.acc) ;
		}
		else {
			return this.quality ;
		}
	}

	augment(){
		var ret = Object.assign(Object.create(Interval.prototype), this) ;
		if ((ret.quality == "m")&&(ret.acc == 0)){
			ret.quality = "M" ;
			ret.semitones += 1 ;
		}
		else {
			ret.acc++ ;
		}
		return ret ;
	}

	diminish(){
		var ret = Object.assign(Object.create(Interval.prototype), this) ;
		if ((ret.quality == "M")&&(ret.acc == 0)){
			ret.quality = "m" ;
			ret.semitones -= 1 ;
		}
		else {
			ret.acc-- ;
		}
		return ret ;
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
