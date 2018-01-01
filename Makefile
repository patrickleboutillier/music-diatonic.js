
.PHONY: test

clean:
	rm music-diatonic.js npm-shrinkwrap.json

test:
	npm test

bundle:
	npm shrinkwrap
