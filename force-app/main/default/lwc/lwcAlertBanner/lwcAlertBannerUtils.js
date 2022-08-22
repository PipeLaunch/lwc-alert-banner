// @ts-check

/**
 * @description validates type
 * @param {String} input
 * @returns {String}
 */
export function validateType(input) {
  const VALID_TYPES = ["base", "offline", "warning", "error", "info"];
  if (!input || typeof input !== "string" || !VALID_TYPES.includes(input)) {
    return VALID_TYPES[0];
  }
  return input;
}

/**
 * @description validates target
 * @param {String} input
 * @returns {String}
 */
export function validateTarget(input) {
  const VALID_TYPES = ["_self", "_blank", "_parent", "_top"];
  if (!input || typeof input !== "string" || !VALID_TYPES.includes(input)) {
    return VALID_TYPES[0];
  }
  return input;
}

/**
 * @description computes parent container classes
 * @param {String} type
 * @returns {String}
 */
export function computeClasses(type = "base") {
  const baseClasses = ["slds-notify", "slds-notify_alert"];

  switch (type) {
    case "offline":
      baseClasses.push("slds-alert_offline");
      break;
    case "warning":
      baseClasses.push("slds-alert_warning");
      break;
    case "error":
      baseClasses.push("slds-alert_error");
      break;
    case "info":
      baseClasses.push("custom-alert_info");
      break;
    default:
      break;
  }

  return baseClasses.join(" ");
}

/**
 * @description computes icon name based on type
 * @param {String} type
 * @param {String} iconName icon name optionally provided by the user
 * @returns {String}
 */
export function computeIconName(type = "base", iconName = null) {
  if (iconName) {
    return iconName;
  }

  switch (type) {
    case "offline":
      return "utility:offline";
    case "warning":
      return "utility:warning";
    case "error":
      return "utility:error";
    case "info":
      return "utility:info";
    case "base":
    default:
      return "utility:user";
  }
}

/**
 * @description computes icon alternative text
 * @param {String} type
 * @returns {String}
 */
export function computeIconAlternativeText(type = "base") {
  switch (type) {
    case "offline":
      return "offline";
    case "warning":
      return ":warning";
    case "error":
      return "error";
    case "info":
      return "info";
    case "base":
    default:
      return "user";
  }
}

/**
 * @description computes icon variant
 * @param {String} type
 * @returns {String}
 */
export function computeIconVariant(type = "base") {
  return type === "warning" ? null : "inverse";
}

/**
 * @description Normalize Boolean
 * @param {*} value value
 * @returns {Boolean} value in boolean
 */
export function normalizeBoolean(value) {
  if (
    typeof value === "string" &&
    (value === "0" || value.toLowerCase() === "false")
  )
    return false;
  return Boolean(value);
}

/**
 * @description Validates string
 * @param {String} value
 * @returns {String|null}
 */
export function validateString(value = "") {
  if (typeof value !== "string") return null;
  const _value = value.trim();
  return _value.length === 0 ? null : _value;
}

/**
 * @description Validates icon name
 * @param {String} value 
 * @returns {String|null}
 */
export function validateIconName(value = "") {
  if (validateString(value) === null) return null;

  const VALID_ICON_CATEGORIES = ["utility", "action", "standard", "custom", "doctype"];

  const hasValidCategory = VALID_ICON_CATEGORIES.some((category) =>
    value.startsWith(`${category}:`)
  );

  return hasValidCategory ? value : null;
}

/**
 * @description check if slot has content
 * @param {*} evt
 * @returns {Boolean} true if slot has content
 */
 export function hasSlotContent(evt) {
  const slot = evt.target !== undefined ? evt.target : evt.currentTarget;
  const hasSlotContent =
    slot && (slot.innerText || slot.assignedElements().length > 0);
  return hasSlotContent;
}
