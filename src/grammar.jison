/* rp:  rp is a php compiler */

%{
	const utils = require('./util')
%}

/* lexical grammar */
%lex
%%

\s+                     /* skip whitespace */
\/\*[\s\S]*?\*\/|\/\/.* return 'COMMENT'
[0-9]+("."[0-9]+)?\b    return 'NUMBER'
"true"                  return 'TRUE'
"false"                 return 'FALSE'

/* reserved words */
"class"                 return 'CLASS'
":"                     return 'COLON'
"#"                     return 'HASH'
"?"                     return 'QUESTION'
"~"                     return 'TILDE'
"_"                     return 'UNDERSCORE'    
"def"                   return 'DEF'
"end"                   return 'END'
"not"                   return 'NOT'

/* Logic operators */
"and"                   return 'AND'
"&&"                    return 'AND'
"or"                    return 'OR'
"||"                    return 'OR'

/* privacity */
"public"              return 'PUBLIC'
"private"             return 'PRIVATE'
"protected"           return 'PROTECTED'

/* echo */
"println"             return 'PRINTLN'
"print"               return 'PRINT'

/* conditons */
"if"                  return 'IF'

/* Objects */
[a-zA-Z_][a-zA-Z0-9_]*      return 'ID'
/* \((\s*\w+\s*,*)*\)       return 'ARGS' */
"%"                   return '%'
"="                   return 'ASSIGN'
"=="                  return 'EQUAL'
"==="                 return 'IDENTICAL'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
">"                   return '>'
"<"                   return '<'
">="                  return '>='
"<="                  return '<='
"^"                   return '^'
"("                   return 'PAR_OPEN'
")"                   return 'PAR_CLOSE'
"PI"                  return 'PI'
"E"                   return 'E'
";"                   return 'SEMICOL'
'.'                   return 'DOT'
\"(?:\"\"|[^"])*\"    return 'STRING'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%ebnf
%options flex

/* operator associations and precedence */

%left '%'
%left '+' '-'
%left '*' '/'
%left '^'
%left '>' '<' '>=' '<='
%left 'NOT'
%left 'AND' 'OR' 
%left '=' '<>' EQUAL IDENTICAL
%left UMINUS
%left IF
%left DOT
%left COLON

%start expressions

%% /* language grammar */

expressions
	: SENTENCE* EOF
		{ return $1; }
;

e
	: e '+' e
		{
			if (! isNaN($1) && ! isNaN($2)) {
				$$ = $1 + $3;
			} else {
				$$ = $1 + '+' + $3;
			}
		}
	| 'NOT' e
		{
			if (! isNaN($e)) {
				$$ = !$2;
			} else {
				$$ = `!${ $2 }`;
			}
		}
	| e 'OR' e
		{$$ = $1 + '||' + $3;}
	| e AND e
		{
			if (utils.isOperable($1, $2)) {
				console.log("Operable")
				$$ = $1 && $3;
			} else {
				$$ = $1 + '&&' + $3;
			}		
		}
	| e EQUAL e
		{
			if (utils.isOperable($1, $2)) {
				$$ = $1 == $3;
			} else {
				$$ = $1 + '==' + $3;
			}
		}
	| e IDENTICAL e
		{
			$$ = $1 + '===' + $3;
		}
	| e '<>' e
		{$$ = $1 != $3;}
	| e '-' e
		{$$ = $1-$3;}
	| e '*' e
		{$$ = $1*$3;}
	| e '/' e
		{$$ = $1/$3;}
	| e '>' e
		{$$ = $1>$3;}
	| e '<' e
		{$$ = $1<$3;}
	| e '>=' e
		{$$ = $1>=$3;}
	| e '<=' e
		{$$ = $1<=$3;}
	| e '^' e
		{$$ = Math.pow($1, $3);}
	| '-' e %prec UMINUS
		{$$ = -$2;}
	| e DOT e
		{$$ = $1 + ' . ' + $3;}
	| '(' e PAR_CLOSE
		{$$ = $e;}    
	| e '%'
		{$$ = $1 / 100;}
	| TRUE
		{$$ = true;}
	| FALSE
		{$$ = false;}
	| NUMBER
		{$$ = Number(yytext);}
	| STRING
		{$$ = $1;}
	| E
		{$$ = Math.E;}
	| PI
		{$$ = Math.PI;}
	| ID
		{$$ = '$' + $ID;}
;

FUNCTION
	: PRIVACITY? DEF ID (PAR_OPEN PAR_CLOSE)?
			SENTENCE*
		END
			{
				if ($1) {
					$$ = `${ $1 } function ${ $3 }(){ ${ $5 } }`;
				} else {
					$$ = `function ${ $3 }(){ ${ $5 } }`;
				}
			}
;

SENTENCE
	: VAR_ASSIGN
	| CONDITION    
	| FUNCTION
	| ECHO
	| DEFCLASS    
	| COMMENT
			{ $$ = `` }
;

ECHO
	: PRINTLN PAR_OPEN? e PAR_CLOSE?
			{ $$ = `echo ${ $e } . PHP_EOL;` }
	| PRINT PAR_OPEN? e PAR_CLOSE?
			{ $$ = `echo ${ $e };` }
;

DEFCLASS
	: CLASS ID[classname] (COLON ID)?[name_extended]
			SENTENCE*[sentence]
		END
			{
				if ($name_extended) {
					$$ = `class ${ $classname } extends ${$name_extended[1]} { ${ $sentence } }`;
				} else {
					$$ = `class ${ $classname } { ${ $sentence } }`;
				}
			}
;

VAR_ASSIGN
	: ID ASSIGN e 
		{ $$ = '$' + $1 + '=' + $3 + ';' }
;

PRIVACITY
    : PUBLIC
    | PRIVATE
    | PROTECTED
;

/* if */

CONDITION_STMT
	: e
;

CONDITION
    : IF PAR_OPEN CONDITION_STMT PAR_CLOSE
        SENTENCE*
      END
        { $$ = `if(${$3}) { ${ $5 } }` }
		| IF CONDITION_STMT
        SENTENCE*
      END
        { $$ = `if(${ $2 }) { ${ $3 } }` }
;