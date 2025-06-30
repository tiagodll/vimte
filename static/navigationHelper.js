function findNextNonEmptySpace(caret){
  if(code[caret.line].length > 0 && ![' ', ''].find(x => x == code[caret.line].charAt(caret.col)))
    return caret;

  let startChar = caret.col;
  for(var j=caret.line; j<code.length; j++){
    let eol = code[j].length-1;
    if(startChar>=eol || code[j].length == 0){
      startChar = 0;
      continue;
    }
    for(var i=startChar; i <= eol; i++){
      if(![' ', ''].find(x => x == code[j].charAt(i)))
        return {line: j, col: i};
    }
    startChar = 0;
  }

  return null;
}
function findPreviousNonEmptySpace(caret){
  let startChar = caret.col;
  for(var j=caret.line; j>=0; j--){
    if(startChar == 0 || code[j].length == 0){
      startChar = code[j-1].length;
      continue;
    }

    for(var i=(startChar - 1); i >= 0; i--){
      if(![' ', ''].find(x => x == code[j].charAt(i)))
        return {line: j, col: i};
    }
    startChar = code[j-1].length;
  }
  return null;
}

function findBeginingOfWord(pos){
  if(pos.col < 1)
    return null;

  for(var i=(pos.col - 1); i >= 0; i--){
    if(delimiters.find(x => x == code[pos.line].charAt(i)))
      return {line: pos.line, col: i+1};
  }
  return {line: pos.line, col: 0};
}
function findEndOfWord(pos){
  var eol = code[pos.line].length;
  if(pos.col > eol - 1)
    return null;

  for(var i=(pos.col + 1); i < eol; i++){
    if(delimiters.find(x => x == code[pos.line].charAt(i)))
      return {line: pos.line, col: i-1};
  }
  return {line: pos.line, col: eol};
}
