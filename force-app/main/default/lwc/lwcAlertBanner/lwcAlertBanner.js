/**
 * @description       : SLDS Alert Banner Generic Component
 *                      NOTE: styles doesn't work on local dev environment
 * @group             : Generic Components
 * @author            : samuel@pipelaunch.com
 * @last modified on  : 2023-01-13
 * @last modified by  : samuel@pipelaunch.com
 * @changelog         : 23-07-2022 - Initial version
 *                      13-01-2023 - Added mainClass and better documentation
 **/
import { LightningElement, api, track } from "lwc";

import * as utils from "./lwcAlertBannerUtils";

export default class LwcAlertBanner extends LightningElement {
  /**
   * @property {string} mainClass CSS classes for the main element.
   */
  @api mainClass = "";

  /**
   * @property {string} link link to be used in the message
   * @default null
   * @example "mailto:samuel@pipelaunch.com"
   */
  @api link = null;

  /**
   * @property {string} linkMessage message
   * @default null
   * @example "Contact us"
   */
  @api linkMessage = null;

  /**
   * @property {*} buttonAction a function to be executed when the user clicks the action button
   * @default null
   */
  @api buttonAction = null; // function

  /**
   * @property {*} buttonAction a function to be executed when the user clicks the close button
   * @default null
   */
  @api closeButtonAction = null; // function

  /**
   * @description main message to display before the icon
   * @default ""
   */
  @api
  get message() {
    return this._message;
  }
  _message = "";
  set message(value) {
    this._message = utils.validateString(value);
  }

  /**
   * @description icon name to display before the message
   * @property {string} iconName
   * @default null
   */
  @api
  get iconName() {
    return this._iconName;
  }
  _iconName = null;
  set iconName(value) {
    this._iconName = utils.validateIconName(value);
  }

  /**
   * @description Propagate events up with bubble and composed to use when the component
   * is nested
   * @property {boolean} propagateEvents
   * @default false
   */
  @api get propagateEvents() {
    return this._propagateEvents;
  }
  _propagateEvents = false;
  set propagateEvents(value) {
    this._propagateEvents = utils.normalizeBoolean(value);
  }

  /**
   * @description type of the state. Valid values are: base,warning, error, offline
   * @property {string} type
   * @default "base"
   */
  @api
  get type() {
    return this._type;
  }
  _type = "base";
  set type(value) {
    this._type = utils.validateType(value);
  }

  /**
   * @description hide the banner when user clicks close
   * @property {boolean} hideOnClose
   */
  @api
  get hideOnClose() {
    return this._hideOnClose;
  }
  _hideOnClose = false;
  set hideOnClose(value) {
    this._hideOnClose = utils.normalizeBoolean(value);
  }

  /**
   * @description target of the html link
   * @property {string} target
   * @default _self
   */
  @api
  get target() {
    return this._target;
  }
  _target = "_self"; // _blank
  set target(value) {
    this._target = utils.validateTarget(value);
  }

  // to control the status of the component
  @track status = {
    show: true
  };

  /**
   * @type {String}
   */
  get computeIconName() {
    return utils.computeIconName(this._type, this._iconName);
  }

  /**
   * @type {String}
   */
  get computeIconAlternativeText() {
    return utils.computeIconAlternativeText(this._type);
  }

  /**
   * @type {String}
   */
  get computeClasses() {
    return utils.computeClasses(this._type);
  }

  /**
   * @type {String}
   */
  get computeIconVariant() {
    return utils.computeIconVariant(this._type);
  }

  /**
   * @description handle slot content change
   * @param {*} evt
   */
  handleSlotChange(evt) {
    this._hasSlot = utils.hasSlotContent(evt);
  }

  /**
   * @description execute a function if user clicks on the link
   */
  handleClickButton(evt) {
    if (typeof this.buttonAction === "function") {
      evt.preventDefault(); // don't follow link
      this.buttonAction();
    }
  }

  handleClickButtonClose() {
    if (this._hideOnClose) {
      this.status.show = false;
    }

    if (typeof this.closeButtonAction === "function") {
      this.closeButtonAction();
    }

    this._dispatchEvent("close");
  }

  /**
   * @description dispatch an event to the parent
   * @param {String} eventName
   */
  _dispatchEvent(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        composed: this.propagateEvents,
        bubbles: this.propagateEvents
      })
    );
  }
}
