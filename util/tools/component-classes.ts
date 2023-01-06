/**
 * source by `component-classes`
 * https://github.com/component/classes.git
 */

import indexOf from 'lodash-es/indexOf';

/**
 * Whitespace regexp.
 */
const re = /\s+/;

export class ClassList {
  el: Element;
  list: DOMTokenList;

  constructor(el: Element) {
    if (!el || !el.nodeType) {
      throw new Error('A DOM element reference is required');
    }
    this.el = el;
    this.list = el.classList;
  }

  /**
   * @description: 变为数组
   * @author: Guixiang
   */
  array() {
    const className = this.el.getAttribute('class') || '';
    const str = className.replace(/^\s+|\s+$/g, '');
    const arr = str.split(re);
    if ('' === arr[0]) arr.shift();
    return arr;
  }

  /**
   * @description 添加一个 class name
   * @param {String} name
   * @return {ClassList}
   * @api public
   */
  add(name: string): ClassList {
    // classList
    if (this.list) {
      this.list.add(name);
      return this;
    }

    // fallback
    const arr = this.array();
    const i = indexOf(arr, name);
    if (!~i) arr.push(name);
    this.el.className = arr.join(' ');
    return this;
  }
  /**
   * @description 可通过正则以及名称来移除类名
   * @param {String|RegExp} name
   * @return {ClassList}
   * @api public
   */
  remove(name: string | RegExp): ClassList {
    if ('[object RegExp]' === toString.call(name)) {
      return this._removeMatching(name as RegExp);
    }

    // classList
    if (this.list) {
      this.list.remove(name as string);
      return this;
    }

    // fallback
    const arr = this.array();
    const i = indexOf(arr, name);
    if (~i) arr.splice(i, 1);
    this.el.className = arr.join(' ');
    return this;
  }
  /**
   * Remove all classes matching `re`.
   *
   * @param {RegExp} re
   * @return {ClassList}
   * @api private
   */
  _removeMatching(re: RegExp): ClassList {
    const arr = this.array();
    for (let i = 0; i < arr.length; i++) {
      if (re.test(arr[i])) {
        this.remove(arr[i]);
      }
    }
    return this;
  }

  /**
   * Toggle class `name`, can force state via `force`.
   *
   * For browsers that support classList, but do not support `force` yet,
   * the mistake will be detected and corrected.
   *
   * @param {String} name
   * @param {Boolean} force
   * @return {ClassList}
   * @api public
   */
  toggle(name: string, force: boolean): ClassList {
    // classList
    if (this.list) {
      if ('undefined' !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name); // toggle again to correct
        }
      } else {
        this.list.toggle(name);
      }
      return this;
    }

    // fallback
    if ('undefined' !== typeof force) {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }

    return this;
  }
  /**
   * @description 检查 类名是否存在
   * @param {String} name
   * @api public
   */
  has(name: string) {
    return this.list ? this.list.contains(name) : !!~indexOf(this.array(), name);
  }
  /**
   * @description 检查 类名是否存在
   * @param {String} name
   * @api public
   */
  contains(name: string) {
    return this.has(name);
  }
}

/**
 * 获取 el 中的 classlist
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 * @example
 * Classes(el);
 */
export default function (el: Element): ClassList {
  return new ClassList(el);
}
