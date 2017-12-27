/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"true"                return 'TRUE'
"false"               return 'FALSE'
"not"                 return 'NOT'
"and"                 return 'AND'
"or"                  return 'OR'
'.'                   return 'DOT'
"def"                 return 'DEF'
"end"                 return 'END'
/* Privacity */
"public"              return 'PUBLIC'
"private"             return 'PRIVATE'
"protected"           return 'PROTECTED'
/* echo */
"println"             return 'PRINTLN'
"print"               return 'PRINT'

/* Objects */
[a-zA-Z_][a-zA-Z0-9_]*   return 'ID'
/* \((\s*\w+\s*,*)*\)       return 'ARGS' */
/* \(\s*(\s*\w+\s*,*)*\s*\) return 'ARGS' */
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
\"(?:\"\"|[^"])*\"    return 'STRING'
<<EOF>>               return 'EOF'
.                     return 'INVALID'
%options flex

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

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    | FUNCTION* EOF
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
    : PRIVACITY? DEF ID PAR_OPEN PAR_CLOSE
        SENTENCE*
      END
        {
            if ($1) {
                $$ = `${ $1 } function ${ $3 }(){ ${ $6 } }` 
            } else {
                $$ = `function ${ $3 }(){ ${ $6 } }` 
            }
        };

SENTENCE
    : ECHO
    | VAR_ASSIGN
    | EOF;

ECHO
    : PRINTLN PAR_OPEN? e PAR_CLOSE?
        { $$ = `echo ${ $e } . PHP_EOL;` }
    | PRINT PAR_OPEN? e PAR_CLOSE?
        { $$ = `echo ${ $e };` }
;

VAR_ASSIGN
    : ID EQUAL e 
        { $$ = '$' + $1 + '=' + $3 + ';' };

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