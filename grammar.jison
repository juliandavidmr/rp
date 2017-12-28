/* rp:  rp is a php compiler */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
\/\*[\s\S]*?\*\/|\/\/.* return 'COMMENT'
[0-9]+("."[0-9]+)?\b    return 'NUMBER'
"true"                  return 'TRUE'
"false"                 return 'FALSE'
"not"                   return 'NOT'
"and"                   return 'AND'
"or"                    return 'OR'
"def"                   return 'DEF'
"end"                   return 'END'

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
"="                   return 'EQUAL'
"!="                  return '='
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

/* operator associations and precedence */

%left '%'
%left '+' '-'
%left '*' '/'
%left '^'
%left '>' '<' '>=' '<='
%left 'NOT'
%left 'AND' 'OR' 
%left '=' '<>'
%left UMINUS
%left IF
%left DOT

%start expressions

%% /* language grammar */

expressions
    : SENTENCE* EOF
        {return $1;}
;

e
    : e '+' e
        {$$ = $1 + '+' + $3;}
    | 'NOT' e
        {$$ = !$2;}
    | e 'OR' e
        {$$ = $1 + '||' + $3;}
    | e 'AND' e
        {$$ = $1 && $3;}
    | e '=' e
        {$$ = $1 == $3;}
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
                $$ = `${ $1 } function ${ $3 }(){ ${ $5 } }` 
            } else {
                $$ = `function ${ $3 }(){ ${ $5 } }` 
            }
        };

SENTENCE
    : VAR_ASSIGN
    | CONDITION
    | FUNCTION
    | ECHO
    | COMMENT
        { $$ = '' }
    | EOF
;

ECHO
    : PRINTLN PAR_OPEN? e PAR_CLOSE?
        { $$ = `echo ${ $e } . PHP_EOL;` }
    | PRINT PAR_OPEN? e PAR_CLOSE?
        { $$ = `echo ${ $e };` }
;

CONDITION
    : IF PAR_OPEN? e PAR_CLOSE?
        SENTENCE*
      END
        { $$ = `if(${ $3 }) { ${ $5 } }` }
;

VAR_ASSIGN
    : ID EQUAL e 
        { $$ = '$' + $1 + '=' + $3 + ';' }
;

UNARY_OPERATOR
	: '&'
	| '*'
	| '+'
	| '-'
	| '~'
	| '!'
;

PRIVACITY
    : PUBLIC
    | PRIVATE
    | PROTECTED
;