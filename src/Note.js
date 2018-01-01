'use strict' ;

module.exports = class Note {
	constructor(str){
		var matches = str.match(/^([A-G])(#+|b+|)/) ;
		if ((matches)&&(matches.length > 0)){
			this.note = matches[1] ;
			this.acc = 0 ;
			if (matches[2].length > 0){
				if (matches[2].charAt(0) == 'b'){
					this.acc = -matches[2].length ;
				}
				else {
					this.acc = matches[2].length ;
				}
			}
		}
		else {
			throw new Error("Unknown note '" + str + "'") ;
		}
	}

	toString(){
		return this.getNote() + this.getAccidental() ;
	}

	getNote(){
		return this.note ;
	}

	getAccidental(){
		return (this.acc < 0 ? "b".repeat(-this.acc) : "#".repeat(this.acc)) ;
	}

	isNatural(){
		return (this.acc == 0) ;
	}

	isSharp(){
		return (this.acc > 0) ;
	}

	isFlat(){
		return (this.acc < 0) ;
	}

	natural(){
		return this._adjust(-this.acc) ;
	}

	raise(){
		return this._adjust(1) ;
	}

	sharp(){ 
		return this.raise() ;
	}
	
	lower(){
		return this._adjust(-1) ;
	}

	flat(){ 
		return this.lower() ;
	}

	next(){
		return new Note(this.note == "G" ? "A" : String.fromCharCode(this.note.charCodeAt(0) + 1)) ;
	}

	prev(){
		return new Note(this.note == "A" ? "G" : String.fromCharCode(this.note.charCodeAt(0) - 1)) ;
	}


	// Adjusts the note by the given number of semitones (>0 is sharp, <0 is flat)
	_adjust(i){
		var ret = Object.assign(Object.create(Note.prototype), this) ;
		ret.acc += i ;
		return ret ;
	}


	_step_distance(n){
		if (this.natural().toString() == n.natural().toString()){
			return 0 ;
		}
		else {
			return 1 + this.next()._step_distance(n) ;
		}
	}

	_semitone_distance(n){
		if (this.isSharp()){
			return this.lower()._semitone_distance(n) - 1 ;
		}
		if (this.isFlat()){
			return this.raise()._semitone_distance(n) + 1 ;
		}
		if (n.isSharp()){
			return this._semitone_distance(n.lower()) + 1 ;
		}
		if (n.isFlat()){
			return this._semitone_distance(n.raise()) - 1 ;
		}

		// All accidentals are gone.
		var steps = this._step_distance(n) ;
		switch (steps){
			case 0: return 0 ;
			case 1: return (((this.note == "E")||(this.note == "B")) ? 1 : 2) ;
			default:
				var nn = this.next() ;
				return this._semitone_distance(nn) + nn._semitone_distance(n) ;
		}
	}
}
