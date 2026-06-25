import i18n from "./index";
import en from "./locales/en.translation.json";
import bg from "./locales/bg.translation.json";

function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

describe("i18n", () => {
  it("initializes with en as the default/fallback language", () => {
    expect(i18n.language).toBe("en");
    expect(i18n.options.fallbackLng).toEqual(["en"]);
  });

  it("registers en and bg resource bundles", () => {
    expect(i18n.hasResourceBundle("en", "translation")).toBe(true);
    expect(i18n.hasResourceBundle("bg", "translation")).toBe(true);
  });

  it("does not escape interpolated values", () => {
    expect(i18n.options.interpolation?.escapeValue).toBe(false);
  });

  it("can switch language and translate a known nested key", async () => {
    const sampleKey = `${Object.keys(en)[0]}.${Object.keys((en as any)[Object.keys(en)[0]])[0]}`;
    await i18n.changeLanguage("en");
    expect(i18n.language).toBe("en");
    expect(i18n.t(sampleKey)).toBe(getNestedValue(en, sampleKey));

    await i18n.changeLanguage("bg");
    const bgTopKey = Object.keys(bg)[0];
    const bgKey = `${bgTopKey}.${Object.keys((bg as any)[bgTopKey])[0]}`;
    expect(i18n.t(bgKey)).toBe(getNestedValue(bg, bgKey));
  });

  it("falls back to the key itself for unknown translation keys", () => {
    const missingKey = "__definitely_missing_key__";
    expect(i18n.t(missingKey)).toBe(missingKey);
  });
});
