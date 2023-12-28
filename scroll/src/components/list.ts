import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";


@customElement('my-list')
export class List extends LitElement {
    _onScroll(e: Event) {
        const target: any = e.target;
        // console.log(target.scrollTop); // 現在のスクロール位置
        // console.log(target.clientHeight); // 表示領域の高さ max-heightと一緒になる
        // console.log(target.scrollHeight); // スクロール領域の高さ 実際に含まれているコンテンツ分の高さ
    
        if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
            this.dispatchEvent(new CustomEvent('scroll-bottom', { bubbles: true, composed: true }));
        }
    }

    render() {
        return html`
        <div class="list-container" @scroll=${this._onScroll}>
            <ul class="items">
                <slot name="item"></slot>
            </ul>
            <button @click=${() => this.dispatchEvent(new CustomEvent('add-item', { bubbles: true, composed: true}))}>Add Item</button>
        </div>
        `
    }

    static styles = css`
        .list-container {
            background-color: cyan;
            border: 1px solid gray;
            border-radius: 5px;
            overflow-y: scroll;
            max-height: var(--my-list-max-height, 300px);
        }
        
        .items {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 8px 16px;
        }
    `
}
// paddingって, もしかして、色んな人が使うこと考えるとpadding入れない方がいい？