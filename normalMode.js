function NewNormalMode(code) {
  return {
    code: code,
    moveLeft: (c) => {
      if (c.col > 0) c.col--;
      return c;
    },
    moveDown: (c) => {
      if (c.line < code.length) c.line++
      return c;
    },
    moveUp: (c) => {
      if (c.line > 0) c.line--
      return c;
    },
    moveRight: (c) => {
      if (c.col < (code[c.line].length - 1)) c.col++
      return c;
    },
    nextWord: (caret) => {
      let eol = code[caret.line].length - 1;

      // it is on top of a word
      if (code[caret.line].length > 0 && !delimiters.find(x => x == code[caret.line].charAt(caret.col))) {
        caret = findEndOfWord(caret);
      }
      caret.col++;

      if (caret.col > eol)
        caret = { line: caret.line + 1, col: 0 };

      caret = findNextNonEmptySpace(caret);

      return caret;
    },
    nextEndOfWord: (caret) => {
      let eol = code[caret.line].length - 1;
      // it is on top of a word, return end of word
      if (code[caret.line].length > 0 && caret.col < eol && !delimiters.find(x => x == code[caret.line].charAt(caret.col + 1))) {
        caret = findEndOfWord(caret);
        return caret;
      }
      caret.col++;
      if (nonSpaceDelimiters.find(x => x == code[caret.line].charAt(caret.col))) {
        return caret;
      }

      if (caret.col >= eol)
        caret = { line: caret.line + 1, col: 0 };

      caret = findNextNonEmptySpace(caret);
      if (!delimiters.find(x => x == code[caret.line].charAt(caret.col)))
        caret = findEndOfWord(caret);

      return caret;
    },
    previousWord: (caret) => {
      // it is in the middle of a word
      if (caret.col > 0 && !delimiters.find(x => x == code[caret.line].charAt(caret.col - 1))) {
        pos = findBeginingOfWord(caret);
        return pos;
      }

      pos = findPreviousNonEmptySpace(caret);
      if (!delimiters.find(x => x == code[pos.line].charAt(pos.col)))
        pos = findBeginingOfWord(pos);

      return pos;
    }
  }
}
