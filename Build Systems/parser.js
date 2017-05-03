var types = []
var tokens = []
var cars = []
var cdrs = []

var n

function initScanner() {
  types.length = 0
  tokens.length = 0
  cars.length = 0
  cdrs.length = 0
  types[0] = 0
  tokens[0] = ''
  cars[0] = 0
  cdrs[0] = 0
  n = 1
}

function token(t, s, p, q) {
  // cdrs[n - 1] = n
  types[n] = t
  tokens[n] = s.substring(p, q)
  cars[n] = 0
  cdrs[n] = 0
  ++n
}

var BLANK = 0
var COMMENT = 1
var STRING = 2
var NUMBER = 3
var OPERATOR = 4
var PUNCTUATOR = 5
var KEYWORD = 6
var IDENTIFIER = 7

function scan(s) {
  var reg = /(?:\/\/.*)|(?:\/\*(?:[^\*]|\*[^\/])*\*?\/)|(?:(['"`])((?:(?!\1)[^]|\\[^])*)(?:\1))|(\.[0-9]+|[0-9]+(?:\.[0-9]*)?)|([!\^*\-+\/<>&|]*[=]+|[~!\^%\/:?]|[&*\-+|\.<>]+)|([()\[\]{};,])|(\b(?:break|continue|throw|try|catch|with|yield|return|if|else|switch|case|default|do|while|for|in|of|super|this|get|set|var|let|const|static|function|class|extends|new)\b)|(#?[a-zA-Z_$][\w$]*)/g
  //         ^ comment  ^ block comment                 ^$1       ^$2 string content            ^$3 number                     ^$4 operator                                     ^$5 punctuator ^$6 keyword                                                                                                                                                                  ^$7 identifier

  var r
  var i = 0
  while ((r = reg.exec(s))) {
    var j = r.index
    if (j > i)
      token(0, s, i, j)

    var type = 1
    if (0) {
    } else if (r[2] !== void 0) {
      type = 2
    } else if (r[3] !== void 0) {
      type = 3
    } else if (r[4] !== void 0) {
      type = 4
    } else if (r[5] !== void 0) {
      type = 5
    } else if (r[6] !== void 0) {
      type = 6
    } else if (r[7] !== void 0) {
      type = 7
    } else {}

    i = j + r[0].length
    if (type === IDENTIFIER) {
      if (s[j] === '#') {
        token(type, s, j + 1, i)
        tokens[n - 1] = '_' + tokens[n - 1]
      } else {
        token(type, s, j, i)
      }
    } else {
      token(type, s, j, i)
    }
  }

  var j = s.length
  if (j > i)
    token(0, s, i, j)
}

var t = 0

var NODE_UNKNOWN = --t
var NODE_UNEXPECTED = --t
var NODE_IDENTIFIER = --t

var NODE_IF = --t
var NODE_ELSE = --t
var NODE_FOR = --t
var NODE_FOR_IN = --t
var NODE_FOR_OF = --t
var NODE_DO = --t
var NODE_WHILE = --t
var NODE_SWITCH = --t
var NODE_CASE_BLOCK = --t
var NODE_CASE = --t
var NODE_CASE_DEFAULT = --t
var NODE_BREAK = --t
var NODE_CONTINUE = --t
var NODE_RETURN = --t
var NODE_EXPR_STATEMENT = --t

var NODE_CLASS = --t
var NODE_FUNCTION = --t
var NODE_VAR_DECLAR = --t
var NODE_LET_DECLAR = --t
var NODE_CONST_DECLAR = --t

var NODE_SUPER = --t

var NODE_BINDING_IDENTIFIER = --t
var NODE_INITIALIZER = --t

var NODE_BRACE = --t
var NODE_PAREN = --t
var NODE_BRACKET = --t

var NODE_BLOCK = --t

var NODE_ARGUMENTS = --t
var NODE_NEW_ARGUMENTS = --t

var NODE_ARRAY_LITERAL = --t
var NODE_OBJECT_LITERAL = --t

var NODE_CLASS_EXTENDS = --t
var NODE_CLASS_MEMBER = --t
var NODE_CLASS_FIELD = --t
var NODE_CLASS_METHOD = --t
var NODE_CLASS_FIELD_MODIFIER = --t
var NODE_CLASS_METHOD_MODIFIER = --t
var NODE_FUNCTION_BRACE = --t
var NODE_PARAMETERS_PAREN = --t
var NODE_PARAM = --t

var NODE_REPLACED = --t

var EMPTY_TAG = --t

var nodeTags = {
  [NODE_UNKNOWN]: 'unknown',
  [NODE_UNEXPECTED]: 'unexpected',
  [NODE_IDENTIFIER]: 'identifier',
  [NODE_IF]: 'if',
  [NODE_ELSE]: 'else',
  [NODE_FOR]: 'for',
  [NODE_FOR_IN]: 'for in',
  [NODE_FOR_OF]: 'for of',
  [NODE_DO]: 'do',
  [NODE_WHILE]: 'while',
  [NODE_SWITCH]: 'switch',
  [NODE_CASE_BLOCK]: 'case block',
  [NODE_CASE]: 'case',
  [NODE_CASE_DEFAULT]: 'case default',
  [NODE_BREAK]: 'break',
  [NODE_CONTINUE]: 'continue',
  [NODE_RETURN]: 'return',
  [NODE_EXPR_STATEMENT]: 'expr',
  [NODE_CLASS]: 'class',
  [NODE_FUNCTION]: 'function',
  [NODE_VAR_DECLAR]: 'var declar',
  [NODE_LET_DECLAR]: 'let declar',
  [NODE_CONST_DECLAR]: 'const declar',
  [NODE_SUPER]: 'super',
  [NODE_BINDING_IDENTIFIER]: 'binding identifier',
  [NODE_INITIALIZER]: 'initializer',
  [NODE_BRACE]: 'brace',
  [NODE_BRACKET]: 'bracket',
  [NODE_BLOCK]: 'block',
  [NODE_ARGUMENTS]: 'arguments',
  [NODE_NEW_ARGUMENTS]: 'new arguments',
  [NODE_ARRAY_LITERAL]: 'array literal',
  [NODE_OBJECT_LITERAL]: 'object literal',
  [NODE_PAREN]: 'paren',
  [NODE_CLASS_EXTENDS]: 'class extends',
  [NODE_CLASS_MEMBER]: 'class member',
  [NODE_CLASS_FIELD]: 'class field',
  [NODE_CLASS_METHOD]: 'class method',
  [NODE_CLASS_FIELD_MODIFIER]: 'class field modifier',
  [NODE_CLASS_METHOD_MODIFIER]: 'class method modifier',
  [NODE_FUNCTION_BRACE]: 'function brace',
  [NODE_PARAMETERS_PAREN]: 'parameters paren',
  [NODE_PARAM]: 'param',
  [NODE_REPLACED]: 'replaced',

  [EMPTY_TAG]: 'EMPTY TAG',
}

function node(t) {
  var k = setNode(n++, t)
  cars[k] = 0
  cdrs[k] = 0
  return k
}

function setNode(i, t) {
  var type
  var tag

  if (typeof t === 'number') {
    if (t === EMPTY_TAG) {
      type = t
      tag = ''
    } else {
      type = t
      tag = nodeTags[t]
    }
  } else {
    type = 1
    tag = t
  }

  types[i] = type
  tokens[i] = `/* ${tag} */`

  return i
}

function textNode(s, t) {
  types[n] = t
  tokens[n] = s
  cars[n] = 0
  cdrs[n] = 0

  n++

  return n - 1
}

var N

var A = []
var Q

function initParser() {
  A.length = 0
  Q = 0
  A[Q++] = 0
  N = n
}

function push(i, t) {
  var j = node(t)
  cdrs[A[--Q]] = j
  A[Q++] = j

  out(types[i], tokens[i])
  cars[j] = i
  A[Q++] = i
}

function pushEmpty(t) {
  var j = node(t)
  cdrs[A[--Q]] = j
  A[Q++] = j

  var i = node(EMPTY_TAG)

  cars[j] = i
  A[Q++] = i

  return j
}

function pop() {
  if (Q === 0)
    throw new Error()
  A[--Q]
}

function append(i) {
  out(types[i], tokens[i])
  cdrs[A[--Q]] = i
  A[Q++] = i
}

function white(i) {
  while (types[i] === BLANK || types[i] === COMMENT) {
    append(i++)
  }
  return i
}

function lookaheadWhite(j) {
  while (types[j] === BLANK || types[j] === COMMENT) {
    ++j
  }
  return j
}

function eat(i, j) {
  while (i < j) {
    append(i++)
  }
  return i
}

function parseStatements(i) {
  while (i < N) {
    if (types[i] === PUNCTUATOR && tokens[i] === '}') {
      break
    }

    var j = parseStatement(i)
    if (j !== i) {
      i = j
      i = white(i)
      continue
    }

    push(i++, NODE_UNKNOWN)
    pop()
    i = white(i)
  }
  return i
}

function parseStatement(i) {
  if (types[i] === KEYWORD) {
    if (isDeclaration(i)) {
      i = parseDeclaration(i)
    } else if (tokens[i] === 'if') {
      i = parseIfStatement(i)
    } else if (tokens[i] === 'for') {
      i = parseForStatement(i)
    } else if (tokens[i] === 'do') {
      i = parseDoWhileStatement(i)
    } else if (tokens[i] === 'while') {
      i = parseWhileStatement(i)
    } else if (tokens[i] === 'switch') {
      i = parseSwitchStatement(i)
    } else if (tokens[i] === 'break') {
      i = parseBreakStatement(i)
    } else if (tokens[i] === 'continue') {
      i = parseContinueStatement(i)
    } else if (tokens[i] === 'return') {
      i = parseReturnStatement(i)
    } else if (tokens[i] === 'super') {
      i = parseSuperStatement(i)
    } else {
      i = parseExpressionStatement(i)
    }
  } else if (types[i] === PUNCTUATOR) {
    if (tokens[i] === '{') {
      i = parseBlockStatement(i)
    } else if (tokens[i] === ';') {
      append(i++)
    }
  } else {
    i = parseExpressionStatement(i)
  }

  var j = i
  j = lookaheadWhite(j)
  if (types[j] === PUNCTUATOR && tokens[j] === ';') {
    i = white(i)
    append(i++)
  }
  // append(node('end statement'))

  return i
}

function parseSuperStatement(i) {
  var j = i + 1
  j = lookaheadWhite(j)
  if (types[j] === PUNCTUATOR && tokens[j] === '(') {
    push(i++, NODE_SUPER)
    i = eat(i, j)
    i = parseArguments(i, NODE_ARGUMENTS)
    pop()
  } else {
    i = parseExpressionStatement(i)
  }

  return i
}

function parseIfStatement(i) {
  push(i++, NODE_IF)
  i = white(i)

  if (types[i] === PUNCTUATOR && tokens[i] === '(') {
    push(i++, NODE_PAREN)
    i = white(i)

    i = parseExpression(i)
    i = white(i)

    while (i < N) {
      if (types[i] === PUNCTUATOR && tokens[i] === ')') {
        break
      }
      push(i++, NODE_UNEXPECTED)
      pop()
      i = white(i)
    }

    append(i++)
    // append(node('end paren'))
    pop()
    i = white(i)

    i = parseStatement(i)

    var j = i
    j = lookaheadWhite(j)
    if (types[j] === KEYWORD && tokens[j] === 'else') {
      i = white(i)

      push(i++, NODE_ELSE)
      i = white(i)

      i = parseStatement(i)
      // append(node('end else'))
      pop()
    }
  }

  // append(node('end if'))
  pop()
  return i
}

function parseForStatement(i) {
  push(i++, NODE_FOR)
  i = white(i)

  if (types[i] === PUNCTUATOR && tokens[i] === '(') {
    push(i++, NODE_PAREN)
    i = white(i)

    if (types[i] === KEYWORD) {
      if (tokens[i] === 'var' || tokens[i] === 'let' || tokens[i] === 'const') {
        i = parseVariableDeclaration(i)
        i = white(i)

        if (types[i] === PUNCTUATOR && tokens[i] === ';') {
          append(i++)
          i = white(i)

          i = parseExpression(i)
          i = white(i)

          if (types[i] === PUNCTUATOR && tokens[i] === ';') {
            append(i++)
            i = white(i)

            i = parseExpression(i)
            i = white(i)
          }
        } else if (types[i] === KEYWORD) {
          if (tokens[i] === 'in') {
            push(i++, NODE_FOR_IN)
            pop()
            i = white(i)

            i = parseExpression(i)
            i = white(i)
          } else if (tokens[i] === 'of') {
            push(i++, NODE_FOR_OF)
            pop()
            i = white(i)

            i = parseExpression(i)
            i = white(i)
          }
        }
      }
    } else {
      i = parseExpression(i)
      i = white(i)

      if (types[i] === PUNCTUATOR && tokens[i] === ';') {
        append(i++)
        i = white(i)

        i = parseExpression(i)
        i = white(i)

        if (types[i] === PUNCTUATOR && tokens[i] === ';') {
          append(i++)
          i = white(i)

          i = parseExpression(i)
          i = white(i)
        }
      } else if (types[i] === KEYWORD) {
        if (tokens[i] === 'in') {
          push(i++, NODE_FOR_IN)
          pop()
          i = white(i)

          i = parseExpression(i)
          i = white(i)
        } else if (tokens[i] === 'of') {
          push(i++, NODE_FOR_OF)
          pop()
          i = white(i)

          i = parseExpression(i)
          i = white(i)
        }
      }
    }

    while (i < N) {
      if (types[i] === PUNCTUATOR && tokens[i] === ')') {
        break
      }
      push(i++, NODE_UNEXPECTED)
      pop()
      i = white(i)
    }

    append(i++)
    // append(node('end paren'))
    pop()
    i = white(i)

    i = parseStatement(i)
  }

  pop()

  return i
}

function parseDoWhileStatement(i) {
  push(i++, NODE_DO)
  i = white(i)

  if (types[i] === PUNCTUATOR && tokens[i] === '(') {
    push(i++, NODE_PAREN)
    i = white(i)

    i = parseExpression(i)
    i = white(i)

    while (i < N) {
      if (types[i] === PUNCTUATOR && tokens[i] === ')') {
        break
      }
      push(i++, NODE_UNEXPECTED)
      pop()
      i = white(i)
    }

    append(i++)
    // append(node('end paren'))
    pop()
    i = white(i)

    i = parseStatement(i)
    i = white(i)

    if (types[i] === KEYWORD && tokens[i] === 'while') {
      push(i++, NODE_WHILE)
    }
  }

  pop()

  return i
}

function parseWhileStatement(i) {
  push(i++, NODE_WHILE)
  i = white(i)

  if (types[i] === PUNCTUATOR && tokens[i] === '(') {
    push(i++, NODE_PAREN)
    i = white(i)

    i = parseExpression(i)
    i = white(i)

    while (i < N) {
      if (types[i] === PUNCTUATOR && tokens[i] === ')') {
        break
      }
      push(i++, NODE_UNEXPECTED)
      pop()
      i = white(i)
    }

    append(i++)
    // append(node('end paren'))
    pop()
    i = white(i)

    i = parseStatement(i)
  }

  pop()

  return i
}

function parseSwitchStatement(i) {
  push(i++, NODE_SWITCH)
  i = white(i)

  if (types[i] === PUNCTUATOR && tokens[i] === '(') {
    push(i++, NODE_PAREN)
    i = white(i)

    i = parseExpression(i)
    i = white(i)

    while (i < N) {
      if (types[i] === PUNCTUATOR && tokens[i] === ')') {
        break
      }
      push(i++, NODE_UNEXPECTED)
      pop()
      i = white(i)
    }

    append(i++)
    // append(node('end paren'))
    pop()
    i = white(i)

    if (types[i] === PUNCTUATOR && tokens[i] === '{') {
      push(i++, NODE_CASE_BLOCK)
      i = white(i)

      while (i < N) {
        if (types[i] === PUNCTUATOR && tokens[i] === '}') {
          break
        }

        if (types[i] === KEYWORD) {
          if (tokens[i] === 'case') {
            push(i++, NODE_CASE)
            i = white(i)

            i = parseExpression(i)
            i = white(i)
          } else if (tokens[i] === 'default') {
            push(i++, NODE_CASE_DEFAULT)
            i = white(i)
          }

          if (types[i] === OPERATOR && tokens[i] === ':') {
            append(i++)
            i = white(i)
          }

          while (i < N) {
            if (types[i] === PUNCTUATOR && tokens[i] === '}') {
              // append(node('end case'))
              pop()
              break
            }

            if (types[i] === KEYWORD) {
              if (tokens[i] === 'case' || tokens[i] === 'default') {
                // append(node('end case'))
                pop()
                break
              }
            }

            var j = parseStatement(i)
            if (j !== i) {
              i = j
              i = white(i)
              continue
            }

            push(i++, NODE_UNKNOWN)
            pop()
            i = white(i)
          }
          continue
        }

        push(i++, NODE_UNKNOWN)
        i = white(i)
      }
      if (i < N) {
        append(i++)
        // append(node('end case block'))
        pop()
      }
    }
  }

  pop()

  return i
}

function parseBreakStatement(i) {
  push(i++, NODE_BREAK)
  pop()

  return i
}

function parseContinueStatement(i) {
  push(i++, NODE_CONTINUE)
  pop()

  return i
}

function parseReturnStatement(i) {
  push(i++, NODE_RETURN)

  while (types[i] === BLANK || types[i] === COMMENT) {
    if (types[i] === BLANK && tokens[i].indexOf('\n') !== -1) {
      pop()
      return i
    }
    append(i++)
  }

  i = parseExpression(i)
  // append(node('end return'))
  pop()

  return i
}

function parseBlockStatement(i) {
  push(i++, NODE_BLOCK)
  i = white(i)

  i = parseStatements(i)
  i = white(i)

  append(i++)
  // append(node('end block'))
  pop()

  return i
}

function parseExpressionStatement(i) {
  pushEmpty(NODE_EXPR_STATEMENT)
  i = parseExpression(i)
  pop()

  return i
}

function isDeclaration(i) {
  return (
    tokens[i] === 'class' ||
    tokens[i] === 'function' ||
    tokens[i] === 'var' ||
    tokens[i] === 'let' ||
    tokens[i] === 'const')
}

function parseDeclaration(i) {
  if (tokens[i] === 'class') {
    i = parseClass(i)
  } else if (tokens[i] === 'function') {
    i = parseFunction(i)
  } else if (tokens[i] === 'var') {
    i = parseVariableDeclaration(i)
  } else if (tokens[i] === 'let' || tokens[i] === 'const') {
    i = parseVariableDeclaration(i)
  }

  return i
}

function parseVariableDeclaration(i) {
  if (tokens[i] === 'var') {
    push(i++, NODE_VAR_DECLAR)
  } else if (tokens[i] === 'let') {
    push(i++, NODE_LET_DECLAR)
  } else if (tokens[i] === 'const') {
    push(i++, NODE_CONST_DECLAR)
  }
  i = white(i)

  while (i < N) {
    if (types[i] === IDENTIFIER) {
      push(i++, NODE_BINDING_IDENTIFIER)
      var j = lookaheadWhite(i)

      if (types[j] === OPERATOR && tokens[j] === '=') {
        i = eat(i, j)
        i = parseInitializer(i)
        j = lookaheadWhite(i)
      }

      // append(node('end variable declaration'))
      pop()

      if (types[j] === PUNCTUATOR && tokens[j] === ',') {
        i = eat(i, j)
        append(i++)
        i = white(i)
        continue
      }
    }

    break
  }

  // append(node('end var declar'))
  pop()

  return i
}

function parseInitializer(i) {
  push(i++, NODE_INITIALIZER)
  i = white(i)

  i = parseAssignmentExpression(i)
  pop()

  return i
}

function parseExpression(i) {
  while (i < N) {
    i = parseAssignmentExpression(i)
    var j = i
    j = lookaheadWhite(j)

    if (types[j] === PUNCTUATOR) {
      if (tokens[j] === ')') {
        i = eat(i, j)
        break
      } else if (tokens[j] === ',') {
        i = eat(i, j)
        append(i++)
        i = white(i)
        continue
      }
    }

    break
  }

  return i
}

function parseAssignmentExpression(i) {
  while (i < N) {
    i = parseMemberExpression(i)
    var j = i
    j = lookaheadWhite(j)

    if (types[j] === OPERATOR) {
      i = eat(i, j)
      append(i++)
      i = white(i)
      continue
    } else if (types[j] === PUNCTUATOR) {
      // i = eat(i, j)
      if (tokens[j] === ')') {
        break
      }
    }

    break
  }

  return i
}

function parseMemberExpression(i) {
  var isContinue = false
  var isNew = false

  var parens = 0
  while (i < N) {
    var j = lookaheadWhite(i)
    if (!isContinue) {
      if (types[j] === IDENTIFIER) {
        i = eat(i, j)
        push(i++, NODE_IDENTIFIER)
        pop()
        isContinue = true
        continue
      } else if (types[j] === NUMBER) {
        i = eat(i, j)
        append(i++)
        isContinue = true
        continue
      } else if (types[j] === STRING) {
        i = eat(i, j)
        append(i++)
        isContinue = true
        continue
      } else if (types[j] === KEYWORD) {
        if (tokens[j] === 'class') {
          i = eat(i, j)
          i = parseClass(i)
          isContinue = true
          continue
        } else if (tokens[j] === 'function') {
          i = eat(i, j)
          i = parseFunction(i)
          isContinue = true
          continue
        } else if (tokens[j] === 'this' || tokens[j] === 'super') {
          i = eat(i, j)
          append(i++)
          isContinue = true
          continue
        } else if (tokens[j] === 'new') {
          i = eat(i, j)
          append(i++)
          if (types[i] === OPERATOR) {
            if (tokens[i] === '.') {
              append(i++)
              if (types[i] === IDENTIFIER) {
                append(i++)
                isContinue = true
                continue
              }
            }
          }
          isNew = true
          isContinue = false
          continue
        }
      } else if (types[j] === PUNCTUATOR) {
        if (tokens[j] === '{') {
          i = eat(i, j)
          push(i++, NODE_OBJECT_LITERAL)

          var braces = 1
          while (braces !== 0 && i < N) {

            if (types[i] === PUNCTUATOR) {
              if (tokens[i] === '{') {
                ++braces
                append(i++)
                continue
              } else if (tokens[i] === '}') {
                --braces
                if (braces !== 0) {
                  append(i++)
                  continue
                } else {
                  break
                }
              }
            }

            append(i++)
          }
          if (i < N) {
            append(i++)
            pop()
            isContinue = true
            continue
          }
        } else if (tokens[j] === '[') {
          i = eat(i, j)
          push(i++, NODE_ARRAY_LITERAL)

          var brackets = 1
          while (brackets !== 0 && i < N) {

            if (types[i] === PUNCTUATOR) {
              if (tokens[i] === '[') {
                ++brackets
                append(i++)
                continue
              } else if (tokens[i] === ']') {
                --brackets
                if (brackets !== 0) {
                  append(i++)
                  continue
                } else {
                  break
                }
              }
            }

            append(i++)
          }
          if (i < N) {
            append(i++)
            pop()
            isContinue = true
            continue
          }
        } else if (tokens[j] === '(') {
          i = eat(i, j)
          ++parens
          append(i++)
          i = parseExpression(i)
          continue
        } else if (tokens[j] === ')') {
          i = eat(i, j)
          if (parens === 0) {
            break
          } else {
            --parens
            append(i++)
            isContinue = true
            continue
          }
        }
      }
    } else {
      if (types[j] === OPERATOR) {
        if (tokens[j] === '.') {
          i = eat(i, j)
          append(i++)

          if (types[i] === IDENTIFIER || types[i] === KEYWORD) {
            append(i++)

            continue
          }
        }
      } else if (types[j] === PUNCTUATOR) {
        if (tokens[j] === '(') {
          i = eat(i, j)
          if (isNew) {
            i = parseArguments(i, NODE_NEW_ARGUMENTS)

            isNew = false

            continue
          } else {
            i = parseArguments(i, NODE_ARGUMENTS)

            continue
          }
        } else if (tokens[j] === '[') {
          i = eat(i, j)
          i = parseBrackets(i)

          continue
        } else if (tokens[j] === ')') {
          i = eat(i, j)
          if (parens === 0) {
            break
          } else {
            --parens
            append(i++)
            continue
          }
        } /*else if (tokens[j] === '}') {
          throw new Error()
        }*/
      }
    }

    if (parens === 0) {
      break
    } else {
      i = eat(i, j)
      push(i++, NODE_UNEXPECTED)
      pop()

      isContinue = true
      continue
    }
  }

  return i
}

function parseArguments(i, t = NODE_PAREN) {
  push(i++, t)

  var parens = 1
  while (parens !== 0 && i < N) {
    i = white(i)

    if (types[i] === PUNCTUATOR) {
      if (tokens[i] === '(') {
        ++parens
        append(i++)
        continue
      } else if (tokens[i] === ')') {
        --parens
        if (parens !== 0) {
          append(i++)
          continue
        } else {
          break
        }
      } else if (tokens[i] === ',') {
        append(i++)
        continue
      }
    }

    var j = parseAssignmentExpression(i)
    if (i === j) {
      append(i++)
    } else {
      i = j
    }
  }
  if (i < N) {
    append(i++)
    pop()
  }
  return i
}

function parseBrackets(i) {
  push(i++, NODE_BRACKET)

  var brackets = 1
  while (brackets !== 0 && i < N) {
    i = white(i)

    if (types[i] === PUNCTUATOR) {
      if (tokens[i] === '[') {
        ++brackets
        append(i++)
        continue
      } else if (tokens[i] === ']') {
        --brackets
        if (brackets !== 0) {
          append(i++)
          continue
        } else {
          break
        }
      }
    }

    var j = parseAssignmentExpression(i)
    if (i === j) {
      append(i++)
    } else {
      i = j
    }
  }
  if (i < N) {
    append(i++)
    pop()
  }
  return i
}

function parseFunction(i) {
  push(i++, NODE_FUNCTION)
  i = white(i)

  if (types[i] === IDENTIFIER) {
    append(i++)
    i = white(i)
  }

  if (types[i] === PUNCTUATOR && tokens[i] === '(') {
    i = parseFunctionParameters(i)
    i = white(i)

    if (types[i] === PUNCTUATOR && tokens[i] === '{') {
      i = parseFunctionBody(i)
    }
  }

  // append(node('end function'))
  pop()

  return i
}

function parseFunctionParameters(i) {
  push(i++, NODE_PARAMETERS_PAREN)
  i = white(i)

  while (i < N) {
    if (types[i] === IDENTIFIER) {
      push(i++, NODE_PARAM)
      i = white(i)

      if (types[i] === OPERATOR && tokens[i] === '=') {
        i = parseInitializer(i)
        i = white(i)
      }

      // append(node('end param'))
      pop()

      if (types[i] === PUNCTUATOR && tokens[i] === ',') {
        append(i++)
        i = white(i)
        continue
      }
    }

    if (types[i] === PUNCTUATOR) {
      if (tokens[i] === ')') {
        break
      }
    } else {
      append(i++)
      i = white(i)
    }
  }

  append(i++)
  // append(node('end parameters'))
  pop()

  return i
}

function parseFunctionBody(i) {
  push(i++, NODE_FUNCTION_BRACE)
  i = white(i)

  i = parseStatements(i)
  if (i < N) {
    append(i++)
    pop()
  }

  return i
}

function parseClass(i) {
  push(i++, NODE_CLASS)
  i = white(i)

  if (types[i] === IDENTIFIER) {
    append(i++)
    i = white(i)
  }

  if (types[i] === KEYWORD && tokens[i] === 'extends') {
    push(i++, NODE_CLASS_EXTENDS)
    i = white(i)

    if (types[i] === IDENTIFIER) {
      append(i++)
      i = white(i)
    }
    pop()
  }

  if (types[i] === PUNCTUATOR && tokens[i] === '{') {
    push(i++, NODE_BRACE)

    var braces = 1
    while (braces !== 0 && i < N) {
      i = white(i)

      if (i === N)
        break

      if (types[i] === PUNCTUATOR) {
        if (tokens[i] === '{') {
          ++braces
          push(i++, NODE_BRACE)
          continue
        } else if (tokens[i] === '}') {
          --braces
          if (braces !== 0) {
            append(i++)
            // append(node('end brace'))
            pop()
            continue
          } else {
            break
          }
        }
      } else if (types[i] === KEYWORD) {
        if (tokens[i] === 'class') {
          i = parseClass(i)
          continue
        }
      }
      if (braces === 1) {
        if (types[i] === KEYWORD || types[i] === IDENTIFIER) {
          i = parseClassMember(i)
          continue
        }
      }

      append(i++)
    }
  }

  if (i < N) {
    append(i++)
    // append(node('end brace'))
    pop()
    
    // append(node('end class'))
    pop()
  }

  return i
}

function parseClassMember(i) {
  var k = pushEmpty(NODE_CLASS_MEMBER)

  if (types[i] === KEYWORD) {
    if (tokens[i] === 'static') {
      var j = i + 1
      j = lookaheadWhite(j)
      if (types[j] === KEYWORD || types[j] === IDENTIFIER) {
        push(i++, NODE_CLASS_FIELD_MODIFIER)
        pop()
        i = white(i)
      }
    }
  }
  if (types[i] === KEYWORD) {
    if (tokens[i] === 'get' || tokens[i] === 'set') {
      var j = i + 1
      j = lookaheadWhite(j)
      if (types[j] === KEYWORD || types[j] === IDENTIFIER) {
        push(i++, NODE_CLASS_METHOD_MODIFIER)
        pop()
        i = white(i)
      }
    }
  }

  var j = i + 1
  j = lookaheadWhite(j)
  if (types[j] === PUNCTUATOR && tokens[j] === '(') {
    setNode(k, NODE_CLASS_METHOD)
    append(i++)
    // push(i++, NODE_CLASS_METHOD)

    i = white(i)

    if (types[i] === PUNCTUATOR && tokens[i] === '(') {
      i = parseFunctionParameters(i)

      i = white(i)

      if (types[i] === PUNCTUATOR && tokens[i] === '{') {
        i = parseFunctionBody(i)
      }
    }
  } else {
    setNode(k, NODE_CLASS_FIELD)
    append(i++)
    // push(i++, NODE_CLASS_FIELD)

    var j = lookaheadWhite(i)
    if (types[j] === OPERATOR && tokens[j] === '=') {
      i = eat(i, j)
      i = parseInitializer(i)
    }
  }

  // append(node('end class field'))
  // pop()

  // append(node('end class member'))
  pop()

  return i
}

function parse() {
  for (var i = 1; i < N; ) {
    i = white(i)

    if (i < N) {
      var j = parseStatements(i)
      if (j !== i) {
        i = j
        continue
      }

      push(i++, NODE_UNEXPECTED)
      pop()
    }
  }
}

function transform() {
  var a = []
  var q = 0
  a[q++] = cdrs[0]

  var memberIsStatic
  var memberName

  function getClassMemberDescriptor(i, p) {
    memberName = ''
    memberIsStatic = false

    // log('!', tokens[i], types[i])
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === IDENTIFIER) {
        if (memberName) {
          error(`DUPLICATE MEMBER_NAME: ${memberName}`)
        }
        memberName = tokens[i]

        q = p
        return
      } else if (types[i] === NODE_CLASS_FIELD_MODIFIER) {
        if (cars[i] !== 0) {
          var k = cars[i]
          if (tokens[k] === 'static') {
            memberIsStatic = true
          }
        }
      }/* else if (types[i] === NODE_PARAMETERS_PAREN) {
        log(tokens[i])
      }*/

      // log(tokens[i], types[i])

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }
  }

  var classMemberIndent = ''

  function removeClassMember(i, k) {
    classMemberIndent = ''
    cdrs[k] = cdrs[i]
    if (types[k] === BLANK) {
      // tokens[k] = tokens[k].replace(/(?:(?!\n)\s)+$/, '')

      var m = tokens[k].match(/(?:(?!\n)\s)+$/)
      if (m) {
        classMemberIndent = m[0]
        tokens[k] = tokens[k].substr(0, tokens[k].length - classMemberIndent.length)
        // console.log('!!' + classMemberIndent)
      }
    }
    if (cdrs[i] !== 0) {
      var t = cdrs[i]
      if (types[t] === BLANK) {
        tokens[t] = tokens[t].replace(/^\s*\n/, '')
      }
    }
  }

  var varStack = []
  // var varSetStack = []
  var varCurrentSetStack = []

  function pushVars() {
    var variables = []
    // var variableSet = getIdentifierSet()
    var varCurrentSet = new Set()

    varStack.push(variables)
    // varSetStack.push(variableSet)
    varCurrentSetStack.push(varCurrentSet)

    return varCurrentSetStack.length - 1
  }

  function popVars() {
    varStack.pop()
    // varSetStack.pop()
    varCurrentSetStack.pop()
  }

  function addVar(x) {
    var varCurrentSet = varCurrentSetStack[varCurrentSetStack.length - 1]
    if (!varCurrentSet.has(x)) {
      varStack[varStack.length - 1].push(x)
      // varSetStack[varSetStack.length - 1].add(x)
      varCurrentSet.add(x)
    } else {
      return true
    }
  }

  function getFunctionDeclared(i, p) {
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === IDENTIFIER) {
        addVar(tokens[i])
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }
  }

  function getVarDeclared(i, p) {
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === NODE_BINDING_IDENTIFIER) {
        // dprint(tokens[i])

        var k = cars[i]
        if (k !== 0) {
          addVar(tokens[k])
        }
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }
  }

  function getFunctionVars(i, p) {
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === NODE_VAR_DECLAR) {
        // dprint(tokens[i])
        getVarDeclared(i, q)

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
      } else if (types[i] === NODE_FUNCTION) {
        // dprint('/* function declar */')
        // dprint(tokens[i])
        getFunctionDeclared(i, q)

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
      } else {
        if (/*types[i] >= 0 && */types[i] !== COMMENT) {
          // dprint(tokens[i])
        } /*else if (types[i] === 0) {
          dprint(tokens[i].replace(/^(?:((?:(?!\n)\s)+)|(\s+))$/, function(whole, m1, m2) {
            if (m1) {
              return ' '
            } else if (m2) {
              return '\n'
            } else {
              throw new Error()
            }
          }))
        }*/

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
        if (types[i] !== NODE_EXPR_STATEMENT && types[i] !== NODE_RETURN) {
          if (cars[i] !== 0) {
            a[q++] = cars[i]
          }
        }
      }
    }
    // dflush()
  }

  function getFunctionParameters(i, p) {
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === NODE_PARAM) {
        if (cars[i] !== 0) {
          var k = cars[i]
          addVar(tokens[k])
        }
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }
  }

  function getIdentifierSet() {
    return varStack.length ? new Set(varStack[varStack.length - 1]) : new Set()
  }

  function transformIdentifierToFieldVar(i, j) {
    setNode(i, NODE_REPLACED)

    var t = textNode('this', KEYWORD)
    var tt = textNode('.', OPERATOR)
    cdrs[t] = tt
    cdrs[tt] = j
    cars[i] = t
  }

  function replaceMethodVars(i, p, set) {
    log(set)
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      // var k = i
      i = a[--q]

      if (types[i] === NODE_IDENTIFIER) {
        var j = cars[i]
        if (j !== 0) {
          // dprint(tokens[j])

          if (set.has(tokens[j])) {
            transformIdentifierToFieldVar(i, j)
          }
        }

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
      } else {
        // dprint(tokens[i])

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
        if (types[i] !== NODE_FUNCTION) {
          if (cars[i] !== 0) {
            a[q++] = cars[i]
          }
        }
      }
    }
    // dflush()
  }

  function replaceStaticInitializerVars(i, p, set, className) {
    log(set)
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      // var k = i
      i = a[--q]

      if (types[i] === NODE_IDENTIFIER) {
        var j = cars[i]
        if (j !== 0) {
          // dprint(tokens[j])

          if (set.has(tokens[j])) {
            transformStaticFieldIdentifier(i, j, className)
          }
        }

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
      } else {
        // dprint(tokens[i])

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
        if (types[i] !== NODE_FUNCTION) {
          if (cars[i] !== 0) {
            a[q++] = cars[i]
          }
        }
      }
    }
    // dflush()
  }

  function replaceStaticFieldVars(i, p, set, className) {
    log(set)
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      // var k = i
      i = a[--q]

      if (types[i] === NODE_IDENTIFIER) {
        var j = cars[i]
        if (j !== 0) {
          // dprint(tokens[j])

          if (set.has(tokens[j])) {
            transformStaticFieldIdentifier(i, j, className)
          }
        }

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
      } else {
        // dprint(tokens[i])

        if (cdrs[i] !== 0) {
          a[q++] = cdrs[i]
        }
        if (types[i] !== NODE_FUNCTION) {
          if (cars[i] !== 0) {
            a[q++] = cars[i]
          }
        }
      }
    }
    // dflush()
  }

  function transformMethod(i, p, className) {
    pushVars()

    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === NODE_PARAMETERS_PAREN) {
        getFunctionParameters(i, q)
      } else if (types[i] === NODE_FUNCTION_BRACE) {
        log(varStack[varStack.length - 1])
        getFunctionVars(i, q)
        log(varStack[varStack.length - 1])
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }

    var set = new Set()

    var k = varStack.length - 1

    var jj = fieldIndices.length - 1
    var gg = staticFieldIndices.length - 1

    var jjj = false
    var ggg = false

    for (; jj >= 0 || gg >= 0;) {
      var c = -1

      var j
      if (jj >= 0) {
        j = fieldIndices[jj]
        c = j
      }
      var g
      if (gg >= 0) {
        g = staticFieldIndices[gg]
        if (g > c) {
          c = g
        }
      }

      if (c === j) {
        if (jjj) {
          break
        }
      } else if (c === g) {
        if (ggg) {
          break
        }
      }

      var fieldVarSet = new Set()

      for (var t = k; t > c; --t) {
        var s = varStack[t]
        var n = s.length
        for (var l = 0; l < n; ++l) {
          set.add(s[l])
        }
      }

      var s = varStack[c]
      var n = s.length
      for (var l = 0; l < n; ++l) {
        var o = s[l]
        if (!set.has(o)) {
          // log(o)
          fieldVarSet.add(o)
          set.add(o)
        }
      }

      if (c === j) {
        replaceMethodVars(i, q, fieldVarSet)
        --jj
        jjj = true
      } else if (c === g) {
        replaceStaticFieldVars(i, q, fieldVarSet, className)
        --gg
        ggg = true
      } else {
        break
      }

      k = c
    }

    popVars()
  }

  function transformStaticMethod(i, p) {
    pushVars()

    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === NODE_PARAMETERS_PAREN) {
        getFunctionParameters(i, q)
      } else if (types[i] === NODE_FUNCTION_BRACE) {
        log(varStack[varStack.length - 1])
        getFunctionVars(i, q)
        log(varStack[varStack.length - 1])
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }

    var set = new Set()

    var k = varStack.length - 1
    for (var jj = staticFieldIndices.length - 1; jj >= 0; --jj) {
      var j = staticFieldIndices[jj]
      var fieldVarSet = new Set()

      for (var t = k; t > j; --t) {
        var s = varStack[t]
        var n = s.length
        for (var l = 0; l < n; ++l) {
          set.add(s[l])
        }
      }

      var s = varStack[j]
      var n = s.length
      for (var l = 0; l < n; ++l) {
        var o = s[l]
        if (!set.has(o)) {
          // log(o)
          fieldVarSet.add(o)
          set.add(o)
        }
      }

      replaceMethodVars(i, q, fieldVarSet)
      k = j

      break
    }

    popVars()
  }

  function transformStaticInitializer(i, p, className) {
    pushVars()

    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === NODE_PARAMETERS_PAREN) {
        getFunctionParameters(i, q)
      } else if (types[i] === NODE_FUNCTION_BRACE) {
        log(varStack[varStack.length - 1])
        getFunctionVars(i, q)
        log(varStack[varStack.length - 1])
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }

    var set = new Set()

    var k = varStack.length - 1
    for (var jj = staticFieldIndices.length - 1; jj >= 0; --jj) {
      var j = staticFieldIndices[jj]
      var fieldVarSet = new Set()

      for (var t = k; t > j; --t) {
        var s = varStack[t]
        var n = s.length
        for (var l = 0; l < n; ++l) {
          set.add(s[l])
        }
      }

      var s = varStack[j]
      var n = s.length
      for (var l = 0; l < n; ++l) {
        var o = s[l]
        if (!set.has(o)) {
          // log(o)
          fieldVarSet.add(o)
          set.add(o)
        }
      }

      replaceStaticInitializerVars(i, q, fieldVarSet, className)
      k = j

      break
    }

    popVars()
  }

  function buildSuperStatement(f, indent) {
    cdrs[f] = textNode('\n' + indent + '  ', BLANK)
    f = cdrs[f]
    cdrs[f] = node(NODE_SUPER)
    f = cdrs[f]
    var g = textNode('super', IDENTIFIER)
    cars[f] = g
    cdrs[g] = node(NODE_ARGUMENTS)
    g = cdrs[g]
    var h = textNode('(', PUNCTUATOR)
    cars[g] = h
    cdrs[h] = textNode(')', PUNCTUATOR)
    h = cdrs[h]
    return f
  }

  function buildEmptyConstructor(indent, superClass) {
    var a = node(NODE_CLASS_METHOD)
    var b = node(EMPTY_TAG)
    var c = textNode('constructor', IDENTIFIER)
    var d = node(NODE_PARAMETERS_PAREN)
    var dd = textNode(' ', BLANK)
    var e = node(NODE_FUNCTION_BRACE)
    cars[a] = b
    cdrs[b] = c
    cdrs[c] = d
    cdrs[d] = dd
    cdrs[dd] = e

    var d1 = textNode('(', PUNCTUATOR)
    var d2 = textNode(')', PUNCTUATOR)
    cars[d] = d1
    cdrs[d1] = d2

    var f = textNode('{', PUNCTUATOR)
    var e2 = textNode('\n' + indent, BLANK)
    var e3 = textNode('}', PUNCTUATOR)
    var e4 = textNode('\n', BLANK)
    cdrs[e2] = e3
    cdrs[e3] = e4
    cars[e] = f

    if (superClass) {
      f = buildSuperStatement(f, indent)
    }

    cdrs[f] = e2

    return a
  }

  function transformClassField(i, p) {
    // console.log('??' + tokens[i])

    var j = i
    if (cars[j] !== 0) {
      a[q++] = cars[j]
    }

    while (p !== q) {
      var k = j
      j = a[--q]

      if (types[j] === IDENTIFIER) {
        setNode(i, NODE_EXPR_STATEMENT)
        var b = node(NODE_IDENTIFIER)
        cars[b] = cdrs[k]
        cdrs[k] = b
        transformIdentifierToFieldVar(b, j)
      }

      if (cdrs[j] !== 0) {
        a[q++] = cdrs[j]
      }
    }
  }

  function hasInitializer(i, p) {
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === NODE_INITIALIZER) {
        q = p
        return true
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }

    return false
  }

  function transformConstructorBody(i, p, fields, indent) {
    log(fields)

    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }

    i = a[--q]
    if (cdrs[i] !== 0) {
      a[q++] = cdrs[i]
    }

    while (p !== q) {
      var k = i
      i = a[--q]

      while (types[i] === BLANK || types[i] === COMMENT) {
        if (cdrs[i] !== 0) {
          i = cdrs[i]
        }
      }

      if (types[i] === NODE_SUPER) {
        k = i
        // while (cdrs[k] !== 0 && types[cdrs[k]] === BLANK || types[cdrs[k]] === COMMENT) {
        //   k = cdrs[k]
        // }
      }

      var kk = cdrs[k]
      var n = fields.length
      for (var j = 0; j < n; ++j) {
        var t = fields[j]

        if (hasInitializer(t, q)) {
          cdrs[k] = textNode('\n' + indent + '  ', BLANK)
          k = cdrs[k]
          transformClassField(t, q)
          cdrs[k] = t
          k = cdrs[k]
          // console.log('~' + tokens[t])
        }
      }
      cdrs[k] = kk

      break
    }
    dflush()
  }

  function transformConstructor(i, p, fields, indent) {
    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      i = a[--q]

      if (types[i] === NODE_FUNCTION_BRACE) {
        transformConstructorBody(i, q, fields, indent)
        q = p
        return
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }
  }

  var fieldIndices = []
  var staticFieldIndices = []

  function transformClassBody(i, p, className, superClass) {
    var methods = []
    var staticMethods = []
    var constructorIndice = -1

    var instanceNames = []
    var fields = []
    var staticFields = []
    var staticNames = []

    var indiceBeforeFirstField = -1

    var indent = ''

    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      var k = i
      i = a[--q]
      if (types[i] === NODE_CLASS_FIELD) {
        getClassMemberDescriptor(i, q)
        log(`${memberIsStatic ? 'static ' : ''}field: ${memberName}`)
        if (!memberIsStatic) {
          instanceNames.push(memberName)
          if (indiceBeforeFirstField === -1) {
            indiceBeforeFirstField = k
          }
          removeClassMember(i, k)
          fields.push(i)
          if (indent.length === 0) {
            indent = classMemberIndent
          }
        } else {
          staticNames.push(memberName)
          removeClassMember(i, k)
          staticFields.push(i)
        }
      } else if (types[i] === NODE_CLASS_METHOD) {
        getClassMemberDescriptor(i, q)
        log(`${memberIsStatic ? 'static ' : ''}method: ${memberName}`)
        if (!memberIsStatic) {
          instanceNames.push(memberName)
          methods.push(i)

          if (memberName === 'constructor') {
            constructorIndice = i
          }
        } else {
          staticNames.push(memberName)
          staticMethods.push(i)
        }
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }

    if (constructorIndice === -1 && fields.length > 0) {
      constructorIndice = buildEmptyConstructor(indent, superClass)

      if (indiceBeforeFirstField === -1) {
        throw new RangeError()
      }

      var t = textNode(indent, BLANK)
      cdrs[t] = constructorIndice
      var tt = t
      while (cdrs[tt] !== 0) {
        tt = cdrs[tt]
      }
      cdrs[tt] = textNode('\n', BLANK)
      tt = cdrs[tt]
      cdrs[tt] = cdrs[indiceBeforeFirstField]
      cdrs[indiceBeforeFirstField] = t

      methods.push(constructorIndice)
    }

    if (staticNames.length > 0) {
      staticFieldIndices.push(pushVars())

      var n = staticNames.length
      for (var i = 0; i < n; ++i) {
        addVar(staticNames[i])
      }
    }

    fieldIndices.push(pushVars())

    var n = instanceNames.length
    for (var i = 0; i < n; ++i) {
      addVar(instanceNames[i])
    }

    if (fields.length > 0) {
      transformConstructor(constructorIndice, q, fields, indent)
    }

    var n = methods.length
    for (var i = 0; i < n; ++i) {
      transformMethod(methods[i], q, className)
    }

    popVars()
    fieldIndices.pop()

    if (staticNames.length > 0) {
      var n = staticMethods.length
      for (var i = 0; i < n; ++i) {
        transformStaticMethod(staticMethods[i], q)
      }

      var xxx = buildClassStaticInitializer(staticFields, className)
      transformStaticInitializer(xxx, q, className)

      popVars()
      staticFieldIndices.pop()

      return xxx
    }
  }

  function buildClassStaticInitializerBody(indent, className) {
    var e = node(NODE_FUNCTION_BRACE)
    var f0 = textNode('{', PUNCTUATOR)
    var f1 = textNode('\n' + indent, BLANK)
    var f2 = textNode('}', PUNCTUATOR)
    var f3 = textNode('', BLANK)
    cars[e] = f0
    cdrs[f0] = f1
    cdrs[f1] = f2
    cdrs[f2] = f3

    return e
  }

  function transformStaticFieldIdentifier(i, j, className) {
    setNode(i, NODE_REPLACED)

    var t = textNode(className, IDENTIFIER)
    var tt = textNode('.', OPERATOR)
    cdrs[t] = tt
    cdrs[tt] = j
    cars[i] = t
  }

  function transformStaticClassFieldInitializer(i, p, className) {
    // console.log('??' + tokens[i])

    var j = i
    if (cars[j] !== 0) {
      a[q++] = cars[j]
    }

    while (p !== q) {
      var k = j
      j = a[--q]

      if (types[j] === IDENTIFIER) {
        setNode(i, NODE_EXPR_STATEMENT)
        var b = node(NODE_IDENTIFIER)
        cars[b] = cdrs[k]
        cdrs[k] = b
        transformStaticFieldIdentifier(b, j, className)

        while (p !== q) {
          var k = j
          j = a[--q]

          if (cdrs[j] !== 0) {
            a[q++] = cdrs[j]
          }
        }
      } else {
        if (cdrs[k] === j) {
          cdrs[k] = cdrs[j]
          j = k
        }

        if (cdrs[j] !== 0) {
          a[q++] = cdrs[j]
        }
      }
    }
  }

  function transformClassStaticInitializer(i, p, staticFields, className, indent) {
    log(staticFields)

    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }

    i = a[--q]
    if (cdrs[i] !== 0) {
      a[q++] = cdrs[i]
    }

    while (p !== q) {
      var k = i
      i = a[--q]

      while (types[i] === BLANK || types[i] === COMMENT) {
        if (cdrs[i] !== 0) {
          i = cdrs[i]
        }
      }

      if (types[i] === NODE_SUPER) {
        k = i
        // while (cdrs[k] !== 0 && types[cdrs[k]] === BLANK || types[cdrs[k]] === COMMENT) {
        //   k = cdrs[k]
        // }
      }

      var kk = cdrs[k]
      var n = staticFields.length
      for (var j = 0; j < n; ++j) {
        var t = staticFields[j]

        if (hasInitializer(t, q)) {
          cdrs[k] = textNode('\n' + indent + '  ', BLANK)
          k = cdrs[k]
          transformStaticClassFieldInitializer(t, q, className)
          cdrs[k] = t
          k = cdrs[k]
          // console.log('~' + tokens[t])
        }
      }
      cdrs[k] = kk

      break
    }
    dflush()
  }

  function buildClassStaticInitializer(staticFields, className) {
    var e = node(NODE_REPLACED)
    var f = textNode(' ', BLANK)
    var g = buildClassStaticInitializerBody('', className)
    transformClassStaticInitializer(g, q, staticFields, className, '')

    cars[e] = f
    cdrs[f] = g

    return e
  }

  function transformClass(i, p) {
    var className = ''
    var superClass = ''

    if (cars[i] !== 0) {
      a[q++] = cars[i]
    }
    while (p !== q) {
      var i = a[--q]

      if (types[i] === IDENTIFIER) {
        className = tokens[i]
        log(`class: ${tokens[i]}`)
      } else if (types[i] === NODE_CLASS_EXTENDS) {
        var k = cars[i]
        if (k !== 0) {
          k = cdrs[k]
          while (types[k] === BLANK || types[k] === COMMENT) {
            k = cdrs[k]
          }
          log(`extends: ${tokens[k]}`)
          superClass = tokens[k]
        }
      } else if (types[i] === NODE_BRACE) {
        var xxx = transformClassBody(i, q, className, superClass)
        if (xxx) {
          var tt = cdrs[i]
          cdrs[i] = xxx
          cdrs[cdrs[i]] = tt
        }
      }

      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
    }
  }

  while (q !== 0) {
    var i = a[--q]

    if (types[i] !== NODE_PARAMETERS_PAREN) {
      // fprint(tokens[i])
    }

    if (types[i] === NODE_CLASS) {
      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
      transformClass(i, q)
    } else {
      if (cdrs[i] !== 0) {
        a[q++] = cdrs[i]
      }
      if (cars[i] !== 0) {
        a[q++] = cars[i]
      }
    }
  }
}

function regenerate() {
  var a = []
  var q = 0
  a[q++] = cdrs[0]

  while (q !== 0) {
    var i = a[--q]

    if (types[i] > 1 || types[i] === 0 || types[i] === 1) {
    // if (types[i] !== NODE_PARAMETERS_PAREN) {
      fprint(tokens[i])
    // }
    }

    if (cdrs[i] !== 0) {
      a[q++] = cdrs[i]
    }
    // if (q <= 3) {
      if (cars[i] !== 0) {
        a[q++] = cars[i]
      }
    // }
  }

  fflush()

  return ss
}

function transpile(s) {
  initScanner()
  scan(s)

  initParser()
  parse()

  // debug()

  transform()

  return regenerate()
}

exports.transpile = transpile




function log(x) {
  // console.log(x)
}

function error(x) {
  console.error(x)
}

var outStrs = []
function print(s) {
  outStrs.push(s)
}

function flush() {
  log(outStrs.join(''))
  outStrs.length = 0
}

function out(type, token) {
  // if (type !== COMMENT)
  //   print(token)
}

var genStrs = []
function fprint(s) {
  genStrs.push(s)
}

var ss
function fflush() {
  var s = genStrs.join('')
  genStrs.length = 0

  ss = s
}

function debug() {
  for (var i = 0; i < n; ++i) {
    log(`${i} = ${cars[i]} ${cdrs[i]} ${tokens[i]}`)
  }

  flush()
}





var debugStrs = []
function dprint(s) {
  debugStrs.push(s)
}

function dflush() {
  log(debugStrs.join(''))
  debugStrs.length = 0
}
