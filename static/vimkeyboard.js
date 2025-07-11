class VimKeyboard extends HTMLElement {
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
      let bShift = this.makebutton("Shift", (e) => {
        if(this["shift"]){
          this["shift"] = false;
          this.shadowRoot.querySelector(".vim-keyboard").classList.remove("shift");
        }else{
          this["shift"] = true;
          this.shadowRoot.querySelector(".vim-keyboard").classList.add("shift");
        }
      });
      bShift.classList.add("enabled");
      this.shadowRoot.querySelector(".vim-keyboard").append(bShift, this.makebutton("Escape"));
      this.enableKeys(['Escape']);
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
          layout.append(this.makebutton(button));
        });
        layout.append(document.createElement("br"))
      });
    }

    makebutton(label, onclick){
      let div = document.createElement("div");
      div.classList.add("key")
      div.classList.add("k"+label)
      div.append(label)
      if(onclick != null){
        div.onclick = onclick;
      }
      return div
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
      this.enableKeys(['0', 'g', 'G', 'h', 'j', 'k', 'l', 'w', 'e', 'b', 'i', 'v']);
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
      this.enableKeys([]);
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
        ids.forEach((id) => {
          let key = this.shadowRoot.querySelector(".vim-keyboard .key.k" + id);
          if (key == null)
            return;
          key.classList.add("enabled");
          key.onclick = (e) => {
            window.dispatchEvent(new KeyboardEvent('keydown', { 'key': id, 'code': id }));
          };
        });
      }
    }
}

customElements.define('vim-keyboard', VimKeyboard);
