class VimKeyboard extends HTMLElement {
  static keyCodes = [
    { label: 'Esc', code: 'Escape' }, { label: 'Shift', code: 'Shift' },
    { label: '1', code: 'd1' }, { label: '2', code: 'd2' }, { label: '3', code: 'd3' }, { label: '4', code: 'd4' }, { label: '5', code: 'd5' }, { label: '6', code: 'd6' }, { label: '7', code: 'd7' }, { label: '8', code: 'd8' }, { label: '9', code: 'd9' }, { label: '0', code: 'd0' },
    { label: 'q', code: 'lkq' }, { label: 'w', code: 'lkw' }, { label: 'e', code: 'lke' }, { label: 'r', code: 'lkr' }, { label: 't', code: 'lkt' }, { label: 'y', code: 'lky' }, { label: 'u', code: 'lku' }, { label: 'i', code: 'lki' }, { label: 'o', code: 'lko' }, { label: 'p', code: 'lkp' },
    { label: 'a', code: 'lka' }, { label: 's', code: 'lks' }, { label: 'd', code: 'lkd' }, { label: 'f', code: 'lkf' }, { label: 'g', code: 'lkg' }, { label: 'h', code: 'lkh' }, { label: 'j', code: 'lkj' }, { label: 'k', code: 'lkk' }, { label: 'l', code: 'lkl' },
    { label: 'z', code: 'lkz' }, { label: 'x', code: 'lkx' }, { label: 'c', code: 'lkc' }, { label: 'v', code: 'lkv' }, { label: 'b', code: 'lkb' }, { label: 'n', code: 'lkn' }, { label: 'm', code: 'lkm' },
    { label: '!', code: 'hkExclamation' }, { label: '@', code: 'hkAt' }, { label: '#', code: 'hkHash' }, { label: '$', code: 'hkDollar' }, { label: '%', code: 'hkPercent' }, { label: 'ˆ', code: 'hkHat' }, { label: '&', code: 'hkAmp' }, { label: '*', code: 'hkStar' }, { label: '(', code: 'hkOpenParentesis' }, { label: ')', code: 'hkCloseParentesis' },
    { label: 'Q', code: 'hkQ' }, { label: 'W', code: 'hkW' }, { label: 'E', code: 'hkE' }, { label: 'R', code: 'hkR' }, { label: 'T', code: 'hkT' }, { label: 'Y', code: 'hkY' }, { label: 'U', code: 'hkU' }, { label: 'I', code: 'hkI' }, { label: 'O', code: 'hkO' }, { label: 'P', code: 'hkP' },
    { label: 'A', code: 'hkA' }, { label: 'S', code: 'hkS' }, { label: 'D', code: 'hkD' }, { label: 'F', code: 'hkF' }, { label: 'G', code: 'hkG' }, { label: 'H', code: 'hkH' }, { label: 'J', code: 'hkJ' }, { label: 'K', code: 'hkK' }, { label: 'L', code: 'hkL' },
    { label: 'Z', code: 'hkZ' }, { label: 'X', code: 'hkX' }, { label: 'C', code: 'hkC' }, { label: 'V', code: 'hkV' }, { label: 'B', code: 'hkB' }, { label: 'N', code: 'hkN' }, { label: 'M', code: 'hkM' },
  ];
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <style>
          .vim-keyboard {
                border: solid black 1px;
                display: inline-block;
                padding: 0.5vh;
                margin: 10px auto;
            }
          .vim-keyboard.normal {
                background: #82aaff;
            }
            .vim-keyboard.insert {
                background: #c3e88d;
            }
            .vim-keyboard.visual {
                background: #c099ff;
            }

            .key {
                width: 3vh;
                height: 3vh;
                border: solid #333 1px;
                display: inline-block;
                align-content: center;
                text-align: center;
                background: #ccc;
                color: #666;
                margin: 0.1vh;
                opacity: 0.8;
            }
             .key.enabled {
                background: #eee;
                color: #222;
                cursor: pointer;
            }
             .key.enabled:hover {
                background: #ffffee;
            }
            .vim-keyboard .normal-layout{display:block}
            .vim-keyboard .shift-layout{display:none}
            .vim-keyboard.shift .normal-layout{display:none}
            .vim-keyboard.shift .shift-layout{display:block}

            </style>
            <div class="vim-keyboard">
              <div class="layout normal-layout"></div>
              <div class="layout shift-layout"></div>
            </div>
        `;
    }

    connectedCallback() {
      let bShift = this.makeButton("Shift", (e) => {
        if(this["shift"]){
          this["shift"] = false;
          this.shadowRoot.querySelector(".vim-keyboard").classList.remove("shift");
        }else{
          this["shift"] = true;
          this.shadowRoot.querySelector(".vim-keyboard").classList.add("shift");
        }
      });
      bShift.classList.add("enabled");

      this.shadowRoot.querySelector(".vim-keyboard").append(bShift, this.makeButton("Esc"));
      this.enableKeys(['Esc']);


      this.makeLayoutButtons(this.shadowRoot.querySelector('.normal-layout'), [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
      ]);
      this.makeLayoutButtons(this.shadowRoot.querySelector('.shift-layout'), [
        ['!', '@', '#', '$', '%', 'ˆ', '&', '*', '(', ')'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
      ]);
      this.setNormalMode();
    }

    makeLayoutButtons(layout, buttons){
      buttons.forEach(row => {
        row.forEach(button => {
          layout.append(this.makeButton(button));
        });
        layout.append(document.createElement("br"))
      });
    }

    makeButton(label, onclick){
      try{
        let id = VimKeyboard.keyCodes.find(x => x.label == label).code;
        let div = document.createElement("div");
        div.classList.add("key")
        div.classList.add(id)
        div.append(label)

        if(onclick != null){
          div.onclick = onclick;
        }
        return div
      }catch(error){
        console.log("error: ", label, error);
      }
    }

    static get observedAttributes() {
        return ['mode', 'shift'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch(name){
        case 'mode':
          this.shadowRoot.querySelector('.vim-keyboard').classList.remove(oldValue);
          this.shadowRoot.querySelector('.vim-keyboard').classList.add(newValue);
          switch(newValue){
            case 'normal': this.setNormalMode(); break;
            case 'visual': this.setVisualMode(); break;
            case 'insert': this.setInsertMode(); break;
          }
          break;
        case 'shift':
        this.shadowRoot.querySelector('.vim-keyboard').classList.remove('normal');
        this.shadowRoot.querySelector('.vim-keyboard').classList.remove('shift');
          this.shadowRoot.querySelector('.vim-keyboard').classList.add(newValue == 'true' ? 'shift' : 'normal');
      }
    }

    setNormalMode(){
      this.shadowRoot.querySelectorAll(".vim-keyboard .layout .key").forEach((item) => {
        item.classList.remove('enabled');
      })
      this.enableKeys(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'g', 'h', 'j', 'k', 'l', 'w', 'e', 'b', 'i', 'v']);
      this.enableKeys(['$', 'G']);
    }
    setInsertMode(){
      this.shadowRoot.querySelectorAll(".vim-keyboard .layout .key").forEach((item) => {
        item.classList.remove('enabled');
      })
      this.enableKeys("all");
    }
    setVisualMode(){
      this.shadowRoot.querySelectorAll(".vim-keyboard .layout .key").forEach((item) => {
        item.classList.remove('enabled');
      })
      // this.enableKeys([]);
    }

    enableKeys(ids){
      if (ids == "all") {
        this.shadowRoot.querySelectorAll(".vim-keyboard .layout .key").forEach(el => {
          el.classList.add("enabled");
          el.onclick = (e) => {
            window.dispatchEvent(new KeyboardEvent('keydown', { 'key': e.innerText, 'code': e.innerText }));
          };
      });
      } else {
        ids.forEach((label) => {
          let id = VimKeyboard.keyCodes.find(x => x.label == label).code;
          let key = this.shadowRoot.querySelector(".vim-keyboard .key." + id);
          if (key == null)
            return;
          key.classList.add("enabled");
          key.onclick = (e) => {
            window.dispatchEvent(new KeyboardEvent('keydown', { 'key': label, 'code': id }));
          };
        });
      }
    }
}

customElements.define('vim-keyboard', VimKeyboard);
