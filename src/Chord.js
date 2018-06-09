'use strict' ;

var Note = require("./Note.js") ;

module.exports = class Chord {
	constructor(str){
		var matches = str.match(/^(([A-G])(#+|b+|))(.*)$/) ;
		if ((matches)&&(matches.length > 0)){
			this.root = new Note(matches[1]) ;
			this.rest = matches[4] ;
			
			this.quality = "" ; // Major
			if (this._checkMinor(this.rest)){
				this.quality = "m" ;
			}
			else if (this._checkMinor7b5(this.rest)){
				this.quality = "h" ;
			}
			else if (this._checkDominant(this.rest)){
				this.quality = "7" ;
			}
			else if (this._checkDiminished(this.rest)){
				this.quality = "o" ;
			}
		}
		else {
			throw new Error("Unknown chord '" + str + "'") ;
		}
	}

	getRoot(){
		return this.root ;
	}

	getQuality(){
		return this.quality ;
	}

	isMajor(){
		return this.quality == "" ;
	}

	isMinor(){
		return this.quality == "m" ;
	}

	isMinor7b5(){
		return this.quality == "h" ;
	}

	isDominant(){
		return this.quality == "7" ;
	}

	isDiminished(){
		return this.quality == "o" ;
	}

	_checkMinor(str){
		var matches = str.match(/^-/) ;
		if ((matches)&&(matches.length > 0)){
			return true ;
		}
		return false ;
	}

	_checkMinor7b5(str){
		var matches = str.match(/^h/) ;
		if ((matches)&&(matches.length > 0)){
			return true ;
		}
		return false ;
	}

	_checkDominant(str){
		var matches = str.match(/^(7|9|13)/) ;
		if ((matches)&&(matches.length > 0)){
			return true ;
		}
		return false ;
	}

	_checkDiminished(str){
		var matches = str.match(/^o/) ;
		if ((matches)&&(matches.length > 0)){
			return true ;
		}
		return false ;
	}
}
