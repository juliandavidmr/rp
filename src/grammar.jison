/* rp:  rp is a php compiler */

%{
	const trans = require('./transpile')
	const seg = require('./segments')	
%}

/* lexical grammar */
%lex

id [a-zA-Z_][a-zA-Z0-9_]*

%%

\s+                     /* skip whitespace */
\/\*[\s\S]*?\*\/|\/\/.*	return 'COMMENT'
[0-9]+("."[0-9]+)?\b	return 'NUMBER'
"true"					return 'TRUE'
"false"					return 'FALSE'

/* reserved words */
"use"					return 'USE'
"if"					return 'IF'
"return"				return 'RETURN'
"class"					return 'CLASS'
"as"					return 'AS'
"each"					return 'EACH'
"for"					return 'FOR'
"in"					return 'IN'
"to"					return 'TO'
":"						return 'COLON'
"#"						return 'HASH'
"?"						return 'QUESTION'
"~"						return 'TILDE'
"_"						return 'UNDERSCORE'    
"def"					return 'DEF'
"end"					return 'END'
"not"					return 'NOT'

/* types */
"string"				return 'TYPE_STRING'
"integer"				return 'TYPE_NUMBER'
"array"					return 'TYPE_ARRAY'
"bool"					return 'TYPE_BOOL'
"float"					return 'TYPE_FLOAT'

/* Logic operators */
"and"					return 'AND'
"&&"					return 'AND'
"or"					return 'OR'
"||"					return 'OR'

/* privacity */
"public"				return 'PUBLIC'
"private"				return 'PRIVATE'
"protected"				return 'PROTECTED'
"static"				return 'STATIC'

/* echo */
"println"				return 'PRINTLN'
"print"					return 'PRINT'

/* snippets */
"typeof"				return "TYPEOF"

/* any */
"%"						return '%'
"="						return 'ASSIGN'
"=="					return 'EQUAL'
"==="					return 'IDENTICAL'
"*"						return '*'
"/"						return '/'
"-"						return '-'
"+"						return '+'
">"						return '>'
"<"						return '<'
">="					return '>='
"<="					return '<='
"!="					return '!='
"^"						return '^'
"("						return 'PAR_OPEN'
")"						return 'PAR_CLOSE'
"["						return '['
"]"						return ']'
"PI"					return 'PI'
"E"						return 'E'
";"						return 'SEMICOL'
'..'					return 'DOT2'
'.'						return 'DOT'
','						return 'COMMA'
{id}					return 'ID'
@{id}					return 'ATTR'
\"(?:\"\"|[^"])*\"		return 'STRING'

<<EOF>>					return 'EOF'
.						return 'INVALID'

/lex

%ebnf
%options flex

/* operator associations and precedence */

%left '%'
%left '+' '-'
%left '*' '/'
%left '^'
%left NOT
%left '>' '<' '>=' '<=' '<>' EQUAL '!='
%left 'NOT'
%left 'AND' 'OR'
%left '=' IDENTICAL
%left UMINUS
%left IF
%left DOT
%left DOT2
%left AND

%start syntax

%% /* language grammar */

syntax
	: SENTENCE* EOF
		{ return $1; }
	| PAR_OPEN SENTENCE* PAR_CLOSE EOF
		{ return $2; }
;

e
	: ID
		{ $$ = '$' + $ID; }
	| ATTR
		{ $$ = '$this->$' + $ATTR.toString().substring(1, $ATTR.length); }
	| e '+' e
		{ $$ = trans.operation($1, $3, '+'); }
	| NOT e
		{ $$ = seg.not($e); }
	| e OR e
		{ $$ = $1 + '||' + $3;}
	| e AND e
		{ $$ = trans.operation($1, $3, '&&'); }
	| e EQUAL e
		{ $$ = trans.operation($1, $3, '=='); }
	| e IDENTICAL e
		{ $$ = trans.operation($1, $3, '==='); }
	| e '<>' e
		{ $$ = trans.operation($1, $3, '!='); }
	| e '!=' e
		{ $$ = trans.operation($1, $3, '!='); }
	| e '-' e
		{ $$ = trans.operation($1, $3, '-'); }
	| e '*' e
		{ $$ = trans.operation($1, $3, '*'); }
	| e '/' e
		{ $$ = trans.operation($1, $3, '/'); }
	| e '>' e
		{ $$ = trans.operation($1, $3, '>'); }
	| e '<' e
		{ $$ = trans.operation($1, $3, '<'); }
	| e '>=' e
		{ $$ = trans.operation($1, $3, '>='); }
	| e '<=' e
		{ $$ = trans.operation($1, $3, '<='); }
	| e '^' e
		{
			if (trans.isOperable($1, $3)) {
				$$ = Math.pow($1, $3);
			} else {
				$$ = $1 + '^' + $3;
			}
		}
	| '-' e %prec UMINUS
		{
			$$ = -$2;
		}
	| e DOT e
		{ $$ = $1 + ' . ' + $3; }
	| PAR_OPEN e PAR_CLOSE
		{ $$ = $e; }
	| e '%'
		{
			if (trans.isOperable($1, 0)) {
				$$ = $e/100;
			} else {
				$$ = `(${$e}/100)`;
			}
		}
	| BOOLEAN
		{ $$ = `${ $1 }`; }
	| NUMBER
		{ $$ = Number(yytext); }
	| STRING
		{ $$ = $1; }
	| E
		{ $$ = Math.E; }
	| PI
		{ $$ = Math.PI; }
	| SNIPPETS
	| CAST
	| DEF_ARRAY
;

SENTENCE
	: VAR_ASSIGN
	| CONDITION
	| FUNCTION
	| ECHO
	| SNIPPETS
	| DEFCLASS
	| LOOP
	| CAST
	| DEF_RETURN
	| DEF_USE
	| DEF_CALL_FUNCTION
	| COMMENT
		{ $$ = `` }
;

DEF_USE
	: USE STRING[package]
		{ $$ = seg.use($package); }
	| USE STRING[package] AS ID
		{ $$ = seg.use($package, $ID); }
	| USE DEF STRING[package]
		{ $$ = seg.use_function($package); }
	| USE DEF STRING[package] AS ID
		{ $$ = seg.use_function($package, $ID); }
;

/* variables */

BOOLEAN
	: TRUE
	| FALSE
;

DEF_ARRAY /* TODO */
	: '[' ']'
;

/* functions */

FUNCTION
	: PRIVACITY?[priv] DEF ID[name] (PAR_OPEN DEF_ARGUMENT* PAR_CLOSE)?[args]
			SENTENCE*[content]
		END
			{
				$$ = seg.def_function($name, $args, $content, $priv);				
			}
;

DEF_ARGUMENT
	: ID[arg] COLON? TYPE?[type] COMMA?
		{ $$ = seg.def_argument($arg, $type); }
;

DEF_RETURN
	: RETURN e
		{ $$ = seg.return($e); }
;

// defines input argument.
ARGUMENT_CALL
	: ID
;

ARGUMENTS_CALL
	: ARGUMENT_CALL COMMA?
;

DEF_CALL_FUNCTION
	: ID PAR_OPEN ARGUMENTS_CALL* PAR_CLOSE
;

ECHO
	: PRINTLN e
		{ $$ = seg.print($e, true); }
	| PRINT e
		{ $$ = seg.print($e); }
;

DEFCLASS
	: CLASS ID[classname] (COLON ID)?[name_extended]
			SENTENCE*[sentence]
		END
			{
				if ($name_extended) {
					$$ = seg.def_class($classname, $sentence, $name_extended[1]);
				} else {
					$$ = seg.def_class($classname, $sentence);
				}
			}
;

VAR_ASSIGN
	: ID[name] ASSIGN e
		{ $$ = seg.assign_var($name, $e, false); }
	| PRIVACITY[priv] ID[name] ASSIGN e
		{ $$ = seg.assign_var($name, $e, false, $priv); }
	| PRIVACITY[priv] ID[name]
		{ $$ = seg.assign_var($name, 'null', false, $priv); }
	| ATTR[name] ASSIGN e
		{ $$ = seg.assign_var($name, $e, true); }
	| PRIVACITY[priv] ATTR[name] ASSIGN e
		{ $$ = seg.assign_var($name, $e, true, $priv); }
;

PRIVACITY
    : PUBLIC
    | PRIVATE
    | PROTECTED
	| STATIC
;

/* conditions */

CONDITION_STMT
	: e
;

CONDITION
    : IF CONDITION_STMT
        SENTENCE*
      END
        { $$ = `if(${ $2 }) { ${ $3 } }` }	
;


/* loops */

LOOP
	: FOR_LOOP
	| EACH_LOOP
;

EACH_LOOP:
 	EACH ID[a] AS ID[b]
		SENTENCE*[sentence]
	END
		{ $$ = seg.each($a, $b, $sentence); }
;

FOR_LOOP
	: FOR e[to]
		SENTENCE*[sentence]
	  END
		{ $$ = seg.loop1($to, $sentence); }
;

/* snippets code */

SNIPPETS
	: GETTYPE
	| RANGE
;

GETTYPE
	: TYPEOF ID
		{ $$ = seg.getType('$' + $ID) }
	| TYPEOF (NUMBER|STRING|TRUE|FALSE)
		{ $$ = seg.getType($2) }
;

RANGE
	: NUMBER[a] DOT2 NUMBER[b]
		{ $$ = seg.range($a, $b); }
;

/* casting */

CAST
	: ID TO TYPE
		{ $$ = seg.cast($ID, $TYPE); }
;

TYPE
	: TYPE_STRING
	| TYPE_NUMBER
	| TYPE_FLOAT
	| TYPE_ARRAY
	| TYPE_BOOL
;