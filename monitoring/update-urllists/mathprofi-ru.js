var LinkExtractor = require('../../parser/linkExtractor.js').LinkExtractor;

var extractor = new LinkExtractor({
	flushEvery: 10,
	name:	'mathprofi-ru',
});

extractor.extractURLlistFromURLsequence({
	pagesCount:	1,
	reportEvery: 1,
	flushEvery: 1,
	prefix:	'http://mathprofi.ru/lekcii_po_vysshei_matematike.html#',
	linkpattern:	'',
	linkprefix:	'http://mathprofi.ru/',
	pause:2000,
});
