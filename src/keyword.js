//import     from   ;

const keyword_extractor = require('keyword-extractor');
const sentence = "";
//?.addEventListener("click", ) 
const extraction_result = keyword_extractor.extract(sentence, 
	{
		language:"english",
		remove_digits: true,
		return_changed_case: true,
		remove_duplicates: false
	}
);

export default extraction_result;